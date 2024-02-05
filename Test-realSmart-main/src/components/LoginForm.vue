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

<script lang="ts">
import { useUserAuth } from "../service/useAPI";
import { defineComponent, ref } from "vue";
import { FormInst } from "naive-ui";

export default defineComponent({
  setup() {
    const apiUser = useUserAuth();
    const formRef = ref<FormInst | null>(null);
    const formValue = ref({
      identifier: "",
      password: "",
      rememberMe: true,
    });
    return {
      formValue,
      formRef,
      size: ref<"small" | "medium" | "large">("medium"),

      rules: {
        identifier: {
          required: true,
          message: "Please input your username",
          trigger: "blur",
        },
        password: {
          required: true,
          message: "Please input your password",
          trigger: ["input", "blur"],
        },
      },
      async handleValidateClick(e: MouseEvent) {
        e.preventDefault();
        formRef.value?.validate(async (errors) => {
          if (!errors) {
            await apiUser.login(formValue.value);
          } else {
            console.log(errors);
          }
        });
      },
    };
  },
});
</script>

<template>
  <div class="bg-white p-8 rounded-md shadow-md w-96 login-form-default">
    <h1 class="text-3xl text-white font-extrabold mb-6">Sign In</h1>
    <n-form
      ref="formRef"
      :model="formValue"
      :rules="rules"
      label-placement="left"
      require-mark-placement="right-hanging"
      :size="size"
      label-width="auto"
    >
      <div style="padding-bottom: 80px">
        <!-- <label for="email" class="block text-sm font-medium">Email or phone number</label> -->
        <n-form-item path="name">
          <n-input
            type="text"
            id="email"
            v-model:value="formValue.identifier"
            name="email"
            class="w-full border text-white border-gray-500 rounded-md focus:outline-none focus:ring focus:border-blue-300 input-login"
            placeholder="Email or phone number"
          />
        </n-form-item>
        <n-form-item path="password">
          <n-input
            type="password"
            id="password"
            name="password"
            v-model:value="formValue.password"
            class="w-full border text-white border-gray-500 rounded-md focus:outline-none focus:ring focus:border-blue-300 input-login"
            placeholder="Email or phone number"
          />
        </n-form-item>
        <!-- <label for="password" class="block mt-4 text-sm font-medium">Password</label> -->

        <button
          type="submit"
          @click="handleValidateClick"
          class="mt-4 w-full bg-red-700 text-white p-2 rounded-md hover:bg-red-600 focus:outline-none focus:ring focus:border-blue-300"
        >
          Sign In
        </button>
        <div class="pt-2">
          <a
            href="#"
            class="text-md text-white hover:text-gray-400 hover:underline"
            >Forgot password</a
          >
        </div>
      </div>
    </n-form>
    <div class="flex items-center mb-4">
      <input
        type="checkbox"
        id="rememberMe"
        name="rememberMe"
        class="mr-2 border rounded-md focus:outline-none focus:rin"
      />
      <label for="rememberMe" class="text-white text-md">Remember me</label>
    </div>

    <!-- Updated footer section -->
    <div class="text-left mt-4">
      <p class="text-md text-gray-300">
        New to Netflix?
        <a href="#" class="text-white font-bold">Sign up now.</a>
      </p>
      <p class="text-sm text-gray-400">
        This page is protected by Google reCAPTCHA to ensure you're not a bot.
        <a href="#" class="text-red-500">Learn more.</a>
      </p>
    </div>
  </div>
</template>
