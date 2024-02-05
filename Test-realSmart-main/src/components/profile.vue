<template>
  <div class="bg-white p-8 rounded-md shadow-md w-96 login-form-default">
    <h1 class="text-3xl text-white font-extrabold mb-6">Welcome</h1>
    <p class="text-white font-extrabold mb-6">
      {{ getProfile.username }}
    </p>
    <button
      type="submit"
      @click="clear()"
      class="mt-4 w-full bg-red-700 text-white p-2 rounded-md hover:bg-red-600 focus:outline-none focus:ring focus:border-blue-300"
    >
      Sign out
    </button>
  </div>
</template>

<script>
import { useRouter } from "vue-router";

export default {
  setup() {
    const router = useRouter();
    const getProfile = JSON.parse(localStorage.getItem("userProfile"));
    return {
      getProfile,
      clear() {
        localStorage.clear();
        location.reload();
      },
    };
  },
};
</script>

<style scoped>
.login-form-default {
  background-color: rgba(0, 0, 0, 0.7);
  border-radius: 4px;
  box-sizing: border-box;
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  -webkit-flex-direction: column;
  -ms-flex-direction: column;
  flex-direction: column;
  margin: 0;
  padding-bottom: 30px;

  h1 {
    text-align: left;
  }

  .form-input {
    padding: 12px;
    margin-bottom: 20px;
    background-color: transparent;
  }
}
</style>
