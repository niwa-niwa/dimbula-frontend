import axios from "axios";
import NAMES from "../const/names";
import PATHS from "../const/paths";

let instance = axios.create({
  baseURL: process.env.REACT_APP_BACKEND_URL,
  headers: {
    "Content-Type": "application/json",
    "X-Requested-With": "XMLHttpRequest",
  },
});

instance.interceptors.request.use(
  (config) => {
    config.headers.Authorization = `Bearer ${localStorage.getItem(NAMES.STORAGE_TOKEN)}`;
    return config;
  },
  (error) => Promise.reject(error),
);

let is_retry = true; // the flag that prevent infinite loop
instance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response.status === 403 && is_retry ) {
      is_retry = false;
      console.log(error.response.data.detail);
      if (error.response.data.detail.match(/Token expired/)) {
        const params = new URLSearchParams();
        params.append("grant_type", "refresh_token");
        params.append(
          "refresh_token",
          localStorage.getItem(NAMES.STORAGE_REFRESH_TOKEN)
        );
        return axios
          .post(
            process.env.REACT_APP_REFRESH_TOKEN_URL +
              process.env.REACT_APP_API_KEY,
            params,
            {
              headers: {
                "Content-Type": "application/x-www-form-urlencoded",
              },
            }
          )
          .then((response) => {
            localStorage.removeItem(NAMES.STORAGE_TOKEN);
            localStorage.setItem(
              NAMES.STORAGE_TOKEN,
              response.data.access_token
            );
            localStorage.removeItem(NAMES.STORAGE_REFRESH_TOKEN);
            localStorage.setItem(
              NAMES.STORAGE_REFRESH_TOKEN,
              response.data.refresh_token
            );
            axios(error.config);
          })
          .catch(() => {
            window.location.href = PATHS.SIGN_OUT;
          });
      }
    } else {
      return Promise.reject(error);
    }
  }
);
export const backend = instance;
