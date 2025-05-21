<script setup lang="ts">
  import Header from './components/Header.vue';
  import Footer from './components/Footer.vue';
</script>

<template>
  <Header />
  <router-view/>
  <Footer />
</template>

<style>
  html, body, #app {
    height: 100%;
    margin: 0;
    display: flex;
    flex-direction: column;
  }

  body {
    background-color: #f2f2f2;
  }

  #app {
    display: flex;
    flex-direction: column;
  }
</style>
