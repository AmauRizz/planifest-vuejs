<script setup lang="ts">
import {computed, onMounted, ref} from "vue";
import type {Category, Event} from "@/types/database.ts";
import {getEvents} from "@/services/eventService.ts"
import {useAuthStore} from "@/stores/auth.ts";
import CreateEventModal from "@/components/CreateEventModal.vue"

const events = ref<Event[]>([]);
const showCreateEvent = ref(false);
const authStore = useAuthStore();

function handleCreateEventButton() {
  if (!authStore.authToken) {
    return
  }

  showCreateEvent.value = !showCreateEvent.value;
}

const groupedEvents = computed(() => {
  const groups: Record<string, Event[]> = {};
  for (const event of events.value) {
    const date = event.startingDate;
    if (!groups[date]) groups[date] = [];
    groups[date].push(event);
  }
  return groups;
});

onMounted(async () => {
  const resEvents = await getEvents();
  if (resEvents.success) {
    events.value = resEvents.data;
  }
});
</script>

<template>
  <section class="events-page">
    <div class="events-header">
      <h1>Upcoming Events</h1>
      <button v-if="authStore.authToken"
              @click="handleCreateEventButton"
              class="create-event-btn">
        <span class="btn-icon">+</span>
        Create Event
      </button>
    </div>

    <CreateEventModal v-model="showCreateEvent" />

    <div class="events-container">
      <div class="event-date-group" v-for="(dayEvents, date) in groupedEvents" :key="date">
        <div class="date-header">
          <div class="date-details">
            <span class="month">{{ new Date(date).toLocaleDateString('en-en', { day: 'numeric', month: 'long', year: 'numeric' }) }}</span>
          </div>
        </div>

        <div class="events-list">
          <router-link
              class="event-card"
              v-for="event in dayEvents"
              :key="event.id"
              :to="`/events/${event.id}`"
          >
            <div class="event-image-container">
              <img class="event-image"
                   :src="event.images[0]?.slug"
                   :alt="event.name" />
            </div>
            <div class="event-content">
              <h3 class="event-title">{{ event.name }}</h3>
              <div class="event-details">
                <p class="event-author">
                  <span class="material-icon">By:</span>
                  {{ event.author.name }}
                </p>
                <p class="event-location">
                  <span class="material-icon">Category:</span>
                  {{ event.category.name }}
                </p>
              </div>
            </div>
          </router-link>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.events-page {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
}

.events-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2.5rem;
}

.events-header h1 {
  font-size: 2.5rem;
  font-weight: 700;
  color: var(--text-primary-color);
}

.create-event-btn {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background-color: var(--cta-primary-color);
  color: white;
  font-weight: 600;
  padding: 0.75rem 1.25rem;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s ease;
}

.create-event-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.btn-icon {
  font-size: 1.2rem;
  font-weight: bold;
}

.events-container {
  display: flex;
  flex-direction: column;
  gap: 2.5rem;
}

.event-date-group {
  background-color: white;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
}

.date-header {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1.5rem;
  border-bottom: 1px solid rgba(0, 0, 0, 0.05);
}

.date-circle {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 3rem;
  height: 3rem;
  background-color: var(--cta-primary-color);
  color: white;
  border-radius: 50%;
  font-size: 1.4rem;
  font-weight: 700;
}

.date-details {
  display: flex;
  flex-direction: column;
}

.month {
  font-size: 1.2rem;
  font-weight: 600;
  color: var(--text-primary-color);
  text-transform: capitalize;
}

.year {
  font-size: 0.9rem;
  color: var(--text-primary-color-description);
}

.events-list {
  padding: 1rem;
  display: flex;
  flex-wrap: wrap;
  gap: 1.5rem;
}

.event-card {
  flex: 1 0 300px;
  max-width: calc(33.333% - 1rem);
  display: flex;
  flex-direction: column;
  border-radius: 10px;
  overflow: hidden;
  background-color: white;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  transition: all 0.3s ease;
  text-decoration: none;
  height: 100%;
}

.event-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.12);
}

.event-image-container {
  height: 180px;
  overflow: hidden;
}

.event-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.5s ease;
}

.event-card:hover .event-image {
  transform: scale(1.05);
}

.event-content {
  padding: 1.25rem;
  flex-grow: 1;
  display: flex;
  flex-direction: column;
}

.event-title {
  font-size: 1.2rem;
  font-weight: 600;
  color: var(--text-primary-color);
  margin-bottom: 1rem;
}

.event-details {
  margin-top: auto;
}

.event-author, .event-location {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.9rem;
  color: var(--text-primary-color-description);
  margin-bottom: 0.5rem;
}

.material-icon {
  font-size: 1rem;
  opacity: 0.7;
}

@media (max-width: 1024px) {
  .event-card {
    max-width: calc(50% - 0.75rem);
  }
}

@media (max-width: 768px) {
  .event-card {
    max-width: 100%;
  }
}
</style>