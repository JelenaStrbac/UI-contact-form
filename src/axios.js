import axios from "axios";

const instance = axios.create({
  baseURL: "https://ui-contact-form.firebaseio.com/",
});

export default instance;
