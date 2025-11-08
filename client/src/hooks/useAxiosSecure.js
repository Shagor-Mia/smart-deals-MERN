import axios from "axios";
import { useAuth } from "./useAuth";
import { useEffect } from "react";
import { useNavigate } from "react-router";

const instance = axios.create({
  baseURL: "http://localhost:4000",
});

export const useAxiosSecure = () => {
  const { user, signOutUser } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    // request interceptor
    const reqInterCeptor = instance.interceptors.request.use((config) => {
      const token = user.accessToken;
      if (token) {
        config.headers.authorization = `Bearer ${token}`;
      }
      return config;
    });
    // response interceptor
    const resInterCeptor = instance.interceptors.response.use(
      (res) => {
        return res;
      },
      (err) => {
        const status = err.status;
        if (status === 401 || status === 403) {
          signOutUser().then(() => {
            navigate("/register");
          });
        }
      }
    );

    return () => {
      instance.interceptors.request.eject(reqInterCeptor);
      instance.interceptors.response.eject(resInterCeptor);
    };
  }, [user, signOutUser, navigate]);
  return instance;
};
