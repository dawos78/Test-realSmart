<template>
  <div id="app">
    <RouterView />
  </div>
</template>

<script setup>

</script>

<style scoped>
#app {
  position: relative;
}

#app::before {
  content: "";
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background: url('https://assets.nflxext.com/ffe/siteui/vlv3/4da5d2b1-1b22-498d-90c0-4d86701dffcc/ad86b047-ece8-4294-ab4c-64cf2e345022/TH-en-20240129-popsignuptwoweeks-perspective_alpha_website_large.jpg') center/cover no-repeat;
  opacity: 0.5;
  z-index: -1;
}
</style>
