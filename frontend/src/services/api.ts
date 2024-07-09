import axios from "axios";

export const baseUrl = "http://localhost:8000/api";

interface ReqParam {
  url: string;
  body: unknown;
}

export const getReq = async (url: string) => {
  const response = await axios.get(url, { withCredentials: true });
  return response.data;
};

export const postReq = async ({ url, body }: ReqParam) => {
  const response = await axios.post(url, body, { withCredentials: true });
  return response.data;
};

export const putReq = async ({ url, body }: ReqParam) => {
  const response = await axios.put(url, body, { withCredentials: true });
  return response.data;
};
