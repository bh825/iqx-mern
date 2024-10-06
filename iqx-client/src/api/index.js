import axios from "axios";
import { toast } from "react-toastify";

import { useUserStore } from "../store/user";

export const baseUrl = "http://localhost:8001/api";

let netWork = 0;

const Api = axios.create({
  baseURL: baseUrl,
});

Api.interceptors.request.use((req) => {
  const data = useUserStore.getState();

  if (data.user?.tk) {
    req.headers["Authorization"] = `Bearer ${data.user?.tk}`;
  }
  req.headers["s"] = "KirL4sVgwmDkWOCu0cuA";
  return req;
});

Api.interceptors.response.use(
  (response) => {
    if (response.data.status) {
      return response.data;
    } else {
      toast.error(response.data.message);
      return response.data;
    }
  },
  (err) => {
    if (err?.request?.responseURL?.includes("users/data")) {
      return;
    }
    if (err.response?.status === 401) {
      Api.post("/log")
        .then(() => useUserStore.persist.clearStorage())
        .catch(() => useUserStore.persist.clearStorage())
        .finally(() => {
          window.location.href = "http://localhost:3000/sign-in";
        });
    } else {
      if (err.message === "Network Error") {
        if (netWork < 1) {
          netWork = 1;
          setTimeout(() => {
            netWork = 0;
          }, 14000);
          toast.error("You are not connected to Internet");
        }
      } else if (err?.response?.status === 500) {
        toast.error(
          `${err?.response?.data?.line} ${err?.response?.data?.message}`
        );
      } else {
        toast.error(err?.response?.data?.message, err?.message);
      }
    }
    return Promise.reject(err);
  }
);

export default Api;

export const swrFetcher = (data1) => {
  const [url, data = {}] = typeof data1 === "string" ? [data1] : data1;

  return Api.get(url, { params: data });
};
