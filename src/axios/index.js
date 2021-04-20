import { config } from "@/config/index";
import axios from "axios";
import { useToast } from "vue-toastification";

const toast = useToast();

const instance = axios.create({
  baseURL: config.API_URL,
});

instance.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error) {
    if (500 === error.response.status) {
      toast.error(
        "Hi ha hagut un error del servidor; per favor, contacti amb informàtica..."
      );
      return Promise.reject(error);
    }

    if (400 === error.response.status) {
      return Promise.reject(error);
    } else {
      return Promise.reject(error);
    }
  }
);

export default instance;
