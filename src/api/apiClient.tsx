import axios from "axios";

const axiosClient = axios.create({
  baseURL: `http://localhost:8000`,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});

export function createProfile(key: string, data: object) {
  const payload = {
    key: key,
    value: data,
  };

  return axiosClient.post("/put", payload);
}

export function updateProfile(key: string, data: object, proof: object) {
  const payload = {
    key: key,
    value: data,
    proof: proof,
  };

  return axiosClient.post("/update", payload);
}

export function getProfile(key: string) {
  return axiosClient.get("/get/" + key);
}
