import express from "express";
import cors from "cors";
import "dotenv/config";
import { MongoClient, ObjectId, ServerApiVersion } from "mongodb";
const app = express();

// TVAX4rBHFLzodpC9

const uri =
  "mongodb+srv://ProgrammingHero:TVAX4rBHFLzodpC9@cluster0.5pkif.mongodb.net/hero_start54";

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

    app.get("/products/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
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
