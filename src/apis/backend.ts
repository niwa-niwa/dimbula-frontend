import axios from "axios";
import NAMES from "../const/names";
import PATHS from "../const/paths";
import debug from "../utils/debug";

let instance = axios.create({
  baseURL: process.env.REACT_APP_BACKEND_URL,
  headers: {
    "Content-Type": "application/json",
    "X-Requested-With": "XMLHttpRequest",
  },
});

instance.interceptors.request.use(
  (config) => {
    config.headers.Authorization = `Bearer ${localStorage.getItem(
      NAMES.STORAGE_TOKEN
    )}`;
    return config;
  },
  (error) => Promise.reject(error)
);

let is_retry: boolean = true; // the flag that prevent infinite loop
instance.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (
      error.response.status !== 403 &&
      !is_retry &&
      !error.response.data.detail.match(/Token expired/)
    ) {
      return Promise.reject(error);
    }
    debug(() => console.error(error.response.data.detail));

    is_retry = false; // the flag that prevent looping
    const params: any = new URLSearchParams();
    params.append("grant_type", "refresh_token");
    params.append(
      "refresh_token",
      localStorage.getItem(NAMES.STORAGE_REFRESH_TOKEN)
    );

    const response: any = await axios
      .post(NAMES.REFRESH_URL + process.env.REACT_APP_API_KEY, params, {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      })
      .catch(() => {
        window.location.href = PATHS.SIGN_OUT;
      });

    localStorage.setItem(NAMES.STORAGE_TOKEN, response.data.access_token);
    localStorage.setItem(
      NAMES.STORAGE_REFRESH_TOKEN,
      response.data.refresh_token
    );
    error.config.headers.Authorization = `Bearer ${localStorage.getItem(
      NAMES.STORAGE_TOKEN
    )}`;
    return axios.request(error.config);
  }
);
export const backend = instance;
