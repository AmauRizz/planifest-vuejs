<script setup lang="ts">
</script>

<template>
  <section class="home">
    <div class="home__content">
      <div class="home__presentation">
        <h1 class="home__title">
          Connect<br />around the world<br />With everyone.
        </h1>
      </div>

      <div class="home__cta">
        <p class="home__cta-text">Create, connect, and<br />vibe with Plani'fest.</p>
        <div class="home__cta-buttons">
          <router-link class="home__cta-btn home__cta-btn--primary" to="/events">Explore Events</router-link>
          <router-link class="home__cta-btn home__cta-btn--secondary" to="/account">join the community</router-link>
        </div>
        <p class="home__cta-note"><em>Join +n users for free</em></p>
      </div>
    </div>

    <div class="home__illustration">
      <div class="home__card-fan">
        <img class="home__card home__card--left" src="/src/assets/images/illustration3.jpg" alt="card1" />
        <img class="home__card home__card--center" src="/src/assets/images/illustration1.jpg" alt="card2"/>
        <img class="home__card home__card--right" src="/src/assets/images/illustration2.jpg" alt="card3" />
      </div>
    </div>
  </section>
</template>

<style scoped>
  .home {
    color: #1D3557;
    display: flex;
    padding: 2rem 20rem;
    margin-bottom: 18vh;
    gap: 1rem;
  }

  .home__content {
    display: flex;
    flex-direction: column;
    gap: 2rem;
  }

  .home__presentation {
    margin-top: 10vh;
    display: flex;
    flex-direction: column;
    gap: 2rem;
  }

  .home__title {
    font-size: xxx-large;
    line-height: 1.3;
  }

  .home__cta {
    margin-top: 2vh;
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }

  .home__cta-text {
    font-size: larger;
    line-height: 1.4;
  }

  .home__cta-buttons {
    display: flex;
    gap: 1rem;
  }

  .home__cta-note {
    font-size: medium;
    font-style: italic;
  }

  .home__cta-btn {
    font-size: medium;
    font-weight: bold;
    padding: 1rem 1.5rem;
    border-radius: 5rem;
    cursor: pointer;
    text-decoration: none;
    transition: all 0.1s ease;
    border: 3px solid var(--cta-primary-color);
  }

  .home__cta-btn--primary {
    background-color: var(--cta-primary-color);
    color: #FFFFFF;
  }

  .home__cta-btn--primary:hover,
  .home__cta-btn--primary:focus {
    background-color: var(--cta-primary-color-hover);
    border-color: var(--cta-primary-color-hover);
  }

  .home__cta-btn--secondary {
    background-color: transparent;
    color: var(--cta-primary-color);
  }

  .home__cta-btn--secondary:hover,
  .home__cta-btn--secondary:focus {
    background-color: var(--cta-primary-color);
    color: var(--text-secondary-color);
  }

  .home__illustration {
    margin: 3rem 0 0 25vh;
  }

  .home__card-fan {
    position: relative;
    perspective: 1000px;
  }

  .home__card-fan:hover {
    animation: shake 0.5s ease-in-out;
  }

  .home__card {
    position: absolute;
    width: 10rem;
    height: auto;
    border-radius: 10px;
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.2);
    transform-origin: bottom center;
    opacity: 0;
    animation: home__fan-in 0.6s forwards;
  }

  .home__card--left {
    left: -20px;
    top: 10px;
    --angle: -5deg;
    transform: rotate(var(--angle)) translateY(20px) scale(1);
    animation-delay: 0.1s;
  }

  .home__card--center {
    left: 50px;
    --angle: 5deg;
    transform: rotate(var(--angle)) translateY(20px) scale(1);
    animation-delay: 0.3s;
  }

  .home__card--right {
    left: 130px;
    top: 20px;
    --angle: 15deg;
    transform: rotate(var(--angle)) translateY(20px) scale(1);
    animation-delay: 0.5s;
  }

  @keyframes home__fan-in {
    0% {
      transform: translateY(60px) scale(0.8);
      opacity: 0;
    }
    100% {
      transform: rotate(var(--angle)) translateY(20px) scale(1);
      opacity: 1;
    }
  }

  @keyframes shake {
    0%, 100% {
      transform: translateX(0);
    }
    25% {
      transform: rotate(-2deg);
    }
    50% {
      transform: rotate(2deg);
    }
    75% {
      transform: rotate(-2deg);
    }
  }
</style>