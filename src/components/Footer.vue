<script setup lang="ts">
</script>

<template>
  <footer>
    <div class="main-nav">
      <router-link to="/">
        <img src="/vite.svg" alt="Vue logo"/>
      </router-link>
      <a href="https://www.amaurymulcey.fr">My Portfolio</a>
    </div>

    <div class="information">
      <router-link to="Terms">Terms</router-link>
      <router-link to="Privacy">Privacy</router-link>
      <router-link to="Security">Security</router-link>
    </div>

    <p class="copyright">&copy; {{ new Date().getFullYear() }} Plani'fest. All rights reserved.</p>
  </footer>
</template>

<style scoped>
  footer {
    padding: 1rem 20rem 1rem 20rem;
    display: flex;
    flex-direction: column;
    gap: 0.8rem;
    background-color: var(--background-secondary-color);

    border-radius: 2rem 2rem 0 0;
  }

  .main-nav {
    display: flex;
    align-items: center;
    gap: 0.8rem;
  }

  .main-nav a {
    text-decoration: none;
    color: var(--text-secondary-color);
  }

  .information {
    display: flex;
    gap: 0.8rem;
  }

  .information a {
    text-decoration: none;
    color: var(--text-secondary-color-description);
  }

  a:hover,
  a:active {
    color: var(--text-secondary-color-hover);
  }

  .copyright {
    color: var(--text-secondary-color);
    text-align: center;
  }

</style>