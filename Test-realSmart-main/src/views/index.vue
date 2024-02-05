<style scoped></style>

<script setup>
import { useCounterStore } from "../store/couter.store";
import LoginForm from "../components/LoginForm.vue";
import profile from "../components/profile.vue";
const store = useCounterStore();
store.randomizeCounter();
const getProfile = localStorage.getItem("acessToken");
</script>

<template>
  <div class="h-screen flex items-center justify-center">
    <div class="flex flex-col items-center justify-center">
      <LoginForm v-if="!getProfile" />
      <profile v-else></profile>
    </div>
  </div>
  <!-- <div class="bg-black">
    {{ store.count }}
    <button @click="store.randomizeCounter()">Randomize</button>
</div> -->
</template>
