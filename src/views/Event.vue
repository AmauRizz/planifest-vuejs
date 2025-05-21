<script setup lang="ts">
  import {onMounted, ref} from "vue";
  import { useRoute } from "vue-router";
  import type { Event } from "../types/database.ts";
  import {getEventById, deleteEvent, updateEvent} from "../services/eventService.ts";

  const route = useRoute();
  const eventId = route.params.id;

  const event = ref<Event>([]);
  const isLoading = ref(true);

  onMounted(async () => {
    try {
      const res = await getEventById( eventId );
      if (res.success) {
        event.value = res.data;
      } else {
        console.error('API Error:', res.error.message);
      }
    } catch (err) {
      console.error('Network Error:', err);
    } finally {
      isLoading.value = false;
    }
  });

  async function handleDeleteEventButton() {
    try {
      const res = await deleteEvent(eventId);
      if (res.success) {
        window.location.href = '/events';
      } else {
        console.error('API Error:', res.error.message);
      }
    } catch (err) {
      console.error('Network Error:', err);
    }
  }

  async function handleUpdateEventButton() {
    const eventData = {
      name: "EventModifieTest",
      websiteUrl: "https://www.amaurymulcey.fr"
    };

    try {
      const res = await updateEvent(eventId, eventData);
      if (res.success) {
        window.location.reload();
      } else {
        console.error('API Error:', res.error.message);
      }
    } catch (err) {
      console.error('Network Error:', err);
    }
  }
</script>

<template>
  <section>
    <article>
      <button @click="handleDeleteEventButton">delete event</button>
      <button @click="handleUpdateEventButton">update event</button>
      <img src="/src/assets/images/illustration1.jpg" alt=""/>
      <h3>{{ event.name }}</h3>
      <h2 v-if="event.category">{{ event.category.name }}</h2>
      <p>{{ event.description }}</p>
      <p>{{ event.startingDate }}</p>
      <p>{{ event.endingDate }}</p>
      <a :href="event.websiteUrl">event website</a>
      <p>{{ event.adress }}</p>
    </article>

    <article>

    </article>
  </section>
</template>

<style scoped>
  img {
    width: 1rem;
    height: auto;
  }
</style>