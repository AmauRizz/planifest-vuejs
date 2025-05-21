<script setup lang="ts">
  import { ref, onMounted, onBeforeUnmount } from 'vue'

  const isScrolled = ref(false)

  const handleScroll = () => {
    isScrolled.value = window.scrollY > 0
  }

  onMounted(() => {
    window.addEventListener('scroll', handleScroll)
  })

  onBeforeUnmount(() => {
    window.removeEventListener('scroll', handleScroll)
  })
</script>

<template>
  <header :class="{scrolled: isScrolled}">
    <nav class="main-nav">
      <router-link to="/">
        <img src="/vite.svg" alt="Vue logo"/>
      </router-link>

      <div>
        <router-link class="nav-pages" to="/">Home</router-link>
        <router-link class="nav-pages" to="/events">Events</router-link>
      </div>
    </nav>

    <nav class="action-nav">
      <router-link class="nav-icon" to="/account">
        <img src="../assets/images/user.png" alt="Account"/>
      </router-link>
    </nav>
  </header>
</template>

<style scoped>
  header {
    position: sticky;
    top: 0;
    z-index: 1000;
    padding: 0.5rem 20rem;
    display: flex;
    justify-content: space-between;
    align-items: center;

    transition: background-color 0.2s ease, box-shadow 0.2s ease;
  }

  header.scrolled {
    background-color: var(--background-secondary-color);
    backdrop-filter: blur(6px);
  }

  header.scrolled a {
    color: var(--text-secondary-color);
  }

  a {
    text-decoration: none;
    color: var(--text-primary-color);
  }

  img {
    width: 2rem;
    height: auto;
  }

  .main-nav {
    display: flex;
    gap: 40px;
  }

  .main-nav div {
    display: flex;
    align-items: center;
    gap: 10px;
  }

  .action-nav {
    display: flex;
    align-items: center;
    gap: 20px;
  }

  .nav-pages,
  .nav-icon {
    position: relative;
  }

  header:not(.scrolled) a:hover, /*when scrolled false*/
  header:not(.scrolled) a:focus {
    color: var(--text-primary-color-hover);
  }

  header.scrolled a:hover, /*when scrolled true*/
  header:not(.scrolled) a:focus {
    color: var(--text-secondary-color-hover);
  }
</style>