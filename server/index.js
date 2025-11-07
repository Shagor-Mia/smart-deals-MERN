import express from "express";
import cors from "cors";
import "dotenv/config";
import { MongoClient, ObjectId, ServerApiVersion } from "mongodb";
import admin from "firebase-admin";
import fs from "fs";
import jwt from "jsonwebtoken";

const serviceAccount = JSON.parse(
  fs.readFileSync("./smart-deals-firebase-adminsdk.json", "utf8")
);

const app = express();

// TVAX4rBHFLzodpC9

// firebase SDK
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const uri = process.env.URL;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

app.use(cors());
app.use(express.json());
const port = process.env.PORT || 4000;

// verifyFireBaseToken
const verifyFireBaseToken = async (req, res, next) => {
  const headerAuthorization = req.headers.authorization;
  if (!headerAuthorization) {
    return res.status(401).send({ message: `unauthorize access` });
  }
  const token = headerAuthorization.split(" ")[1];
  if (!token) {
    return res.status(401).send({ message: `token not found!` });
  }
  // verify token
  try {
    const decoded = await admin.auth().verifyIdToken(token);
    req.token_email = decoded.email;
    // console.log(`after token validation:`, tokenInfo);
    next();
  } catch {
    return res.status(401).send({ message: `not validate token!` });
  }
};

// verify local storage token
const localStorageToken = async (req, res, next) => {
  const authorization = req.headers.authorization;
  if (!authorization) {
    return res.status(401).send({ message: `unauthorize access for local` });
  }
  const localToken = authorization.split(" ")[1];
  if (!localToken) {
    return res.status(401).send({ message: `local token not found!` });
  }
  // verify
  try {
    jwt.verify(localToken, process.env.JWT_SECRET, (err, decoded) => {
      if (err) {
        return res.status(401).send({ message: "unauthorize token!" });
      }
      // console.log("after decoded:", decoded);
      req.token_email = decoded.email;
      next();
    });
  } catch (error) {
    console.log(error);
  }
};

app.get("/", (req, res) => {
  res.send("Programming hero backend!");
});

// database connect
async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    const db = client.db("smart-dealsDB");
    const productCollections = db.collection("Products");
    const bidsCollections = db.collection("bids");
    const usersCollections = db.collection("Users");

    // custom jwt
    app.post("/getToken", (req, res) => {
      const loggedUser = req.body;
      const token = jwt.sign(loggedUser, process.env.JWT_SECRET, {
        expiresIn: "1h",
      });
      res.send({ token: token });
    });

    // users
    app.post("/users", async (req, res) => {
      const newUser = req.body;
      const email = req.body.email;
      const query = { email: email };

      const existingUser = await usersCollections.findOne(query);
      if (existingUser) {
        res.send("User already exist!");
      } else {
        const result = await usersCollections.insertOne(newUser);
        res.send(result);
      }
    });

    // products
    app.get("/products", async (req, res) => {
      //   const projectField = { title: 1, price_min: 1, price_max: 1 };
      //   const cursor = productCollections
      //     .find()
      //     .sort({ price_min: -1 })
      //     .skip(5)
      //     .limit(2)
      //     .project(projectField);
      const email = req.query.email;
      console.log(email);
      const query = {};
      if (email) {
        query.email = email;
      }
      const cursor = productCollections.find(query);
      const result = await cursor.toArray();
      res.send(result);
    });

    app.get("/latest-products", async (req, res) => {
      const cursor = productCollections
        .find()
        .sort({ created_at: -1 })
        .limit(6);
      const result = await cursor.toArray();
      res.send(result);
    });

    app.get("/products/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: id };
      const result = await productCollections.findOne(query);
      res.send(result);
    });

    app.post("/products", async (req, res) => {
      const newProduct = req.body;
      const result = await productCollections.insertOne(newProduct);
      res.send(result);
    });

    app.delete("/products/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const result = await productCollections.deleteOne(query);
      res.send(result);
    });

    app.patch("/products/:id", async (req, res) => {
      const id = req.params.id;
      const newUsers = req.body;
      const query = { _id: new ObjectId(id) };
      const update = {
        $set: {
          name: newUsers.name,
          price: newUsers.price,
        },
      };
      const options = {};
      const result = await productCollections.updateOne(query, update, options);
      res.send(result);
    });

    // local storage token
    app.get("/bids", localStorageToken, async (req, res) => {
      const email = req.query.email;
      // console.log(req.headers);
      const query = {};
      if (email) {
        query.buyer_email = email;
      }
      if (email !== req.token_email) {
        return res.status(403).send({ message: "forbidden access" });
      }
      const cursor = bidsCollections.find(query);
      const result = await cursor.toArray();
      res.send(result);
    });

    // bids with firebase token verify
    // app.get("/bids", verifyFireBaseToken, async (req, res) => {
    //   // console.log(`token email`, req);
    //   const email = req.query.email;
    //   console.log(email);
    //   const query = {};
    //   if (email) {
    //     if (email !== req.token_email) {
    //       return res.status(403).send({ message: `forbidden access` });
    //     }
    //     query.buyer_email = email;
    //   }
    //   const cursor = bidsCollections.find(query);
    //   const result = await cursor.toArray();
    //   res.send(result);
    // });

    app.get(
      "/products/bids/:productId",
      verifyFireBaseToken,
      async (req, res) => {
        const productId = req.params.productId;
        const query = { product: productId };
        const cursor = bidsCollections.find(query).sort({ bid_price: -1 });
        const result = await cursor.toArray();
        res.send(result);
      }
    );

    app.post("/bids", async (req, res) => {
      const newBids = req.body;
      const result = await bidsCollections.insertOne(newBids);
      res.send(result);
    });

    app.delete("/bids/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const result = await bidsCollections.deleteOne(query);
      res.send(result);
    });

    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!"
    );
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);

app.listen(port, () => {
  console.log(`server running on port: ${port}`);
});
