<script setup lang="ts">
  import {onMounted, ref} from "vue";
  import {useRoute, useRouter} from "vue-router";
  import type { Event } from "../types/database.ts";
  import {getEventById, deleteEvent, updateEvent, createEvent} from "../services/eventService.ts";
  import {getMe} from "@/services/userService.ts";
  import {useAuthStore} from "@/stores/auth.ts";

  const route = useRoute();
  const router = useRouter()
  const eventId = +route.params.id;

  const event = ref<Event>();
  const isAuthor = ref(false);

  let authStore = useAuthStore()

  onMounted(async () => {
    const resEvent = await getEventById( eventId );
    if (resEvent.success) {
      event.value = resEvent.data;

      if (!authStore.authToken) {
        return;
      }

      const resUser = await getMe()
      if (resUser.success) {
        isAuthor.value = resUser.data.id === event.value.author.id;
      }
    }
  });

    async function handleDeleteEventButton() {
      if (!authStore.authToken) {
        return;
      }

      const res = await deleteEvent(eventId);
      if (res.success) {
        await router.push('/events');
      }
  }
</script>

<template>
  <section class="event-detail">
    <div class="event-header">
      <h1>{{ event?.name }}</h1>
      <button v-if="authStore.authToken && isAuthor" @click="handleDeleteEventButton" class="delete-btn">Delete Event</button>
    </div>

    <img v-if="event?.images && event.images.length > 0" :src="event.images[0].slug" alt="" class="event-image"/>

    <div class="event-info">
      <div class="event-description">
        <h2><strong>Category:</strong> {{ event?.category?.name }}</h2>
        <p><strong>Description:</strong> {{ event?.description }}</p>
      </div>

      <div class="event-meta">
        <div>
          <p><strong>Start:</strong> {{ new Date(event?.startingDate).toLocaleDateString('en-en', { day: 'numeric', month: 'long', year: 'numeric' }) }}</p>
          <p><strong>End:</strong> {{ new Date(event?.endingDate).toLocaleDateString('en-en', { day: 'numeric', month: 'long', year: 'numeric' }) }}</p>
          <p v-if="event?.address"><strong>Location:</strong> {{ event?.address }}</p>
          <p v-if="event?.websiteUrl"><strong>Website:</strong><a :href="event.websiteUrl" target="_blank">Visit event website</a></p>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.event-detail {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
}

.event-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
}

.event-header h1 {
  font-size: 2rem;
  font-weight: bold;
}

.event-image {
  width: 100%;
  height: 350px;
  object-fit: cover;
  border-radius: 12px;
  margin-bottom: 1.5rem;
}

.event-info {
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 2rem;
}

.event-description {
  line-height: 1.6;
  color: #4a4a4a;
}

.event-meta {
  background-color: #f8f9fa;
  padding: 1.5rem;
  border-radius: 10px;
  box-shadow: 0 3px 10px rgba(0, 0, 0, 0.05);
}

strong {
  font-weight: bold;
}

.delete-btn {
  background-color: #e63946;
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 6px;
  transition: all 0.2s;
}
</style>