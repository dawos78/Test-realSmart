import { defineStore } from "pinia";
import axios from "axios";
import { Ref, ref } from "vue";
interface getToken {
  getUser: Ref<Object>;
}
axios.defaults.baseURL = "";
export const useUserAuth = defineStore("useUserAuths", {
  state: (): getToken => ({
    getUser: {},
  }),
  actions: {
    // since we rely on `this`, we cannot use an arrow function
    login(req) {
      axios
        .post("http://localhost:8000/api/login", {
          identifier: req.identifier,
          password: req.password,
          rememberMe: req.rememberMe,
        })
        .then((res) => {
          this.getUser = res;
          localStorage.setItem(
            "acessToken",
            "Bearer " + this.getUser?.data?.token
          );
          localStorage.setItem(
            "userProfile",
            JSON.stringify(this.getUser?.data?.data)
          );
          location.reload();
        })
        .catch((error) => {
          console.error("Error during login request:", error);
        });
    },
    randomizeCounter() {
      this.count = Math.round(100 * Math.random());
    },
  },
});
