import axios, { Axios } from "axios";

export const server = axios.create({
  baseURL: "http://localhost:5106/",
});
