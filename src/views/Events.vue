<script setup lang="ts">
  import {computed, onMounted, ref} from "vue";
  import type {Category, Event} from "@/types/database.ts";
  import {getEvents, createEvent} from "@/services/eventService.ts"
  import {getCategories} from "@/services/categoryService.ts";

  const events = ref<Event[]>([]);
  const categories = ref<Category[]>([]);
  const isLoading = ref(true);

  onMounted(async () => {
    try {
      const resEvents = await getEvents();
      const resCategories = await getCategories();
      if (resEvents.success) {
        events.value = resEvents.data;
      } else {
        console.error('API Error:', resEvents.error.message);
      }

      if (resCategories.success) {
        categories.value = resCategories.data;
      } else {
        console.error('API Error:', resCategories.error.message);
      }
    } catch (err) {
      console.error('Network Error:', err);
    } finally {
      isLoading.value = false;
    }
  });

  const groupedEvents = computed(() => {
    const groups: Record<string, Event[]> = {};
    for (const event of events.value) {
      const date = event.startingDate;
      if (!groups[date]) groups[date] = [];
      groups[date].push(event);
    }
    return groups;
  });

  async function handleCreateEventButton() {
    try {
      const eventData = {
        name: "EventTest",
        description: "DescriptionTest",
        startingDate: new Date(),
        endingDate: new Date(),
        category: 4,
      };

      const res = await createEvent(eventData);
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
  <section class="events">
    <div class="events__filter">
      <div>
        <h3>Sort by</h3>
        <div class="events__filter-order">
          <label for="date_order">Date</label>
          <input type="radio" id="date_order" name="order" value="date" checked />
        </div>
      </div>

      <div>
        <h3>Date range</h3>
        <div class="events__filter-range">
          <div>
            <label for="start">From</label>
            <input
                type="date"
                id="start"
                name="trip-start"
            />
          </div>

          <div>
            <label for="end">To</label>
            <input
                type="date"
                id="end"
                name="trip-end"
            />
          </div>
        </div>
      </div>

      <div>
        <h3>Category</h3>
        <div class="events__filter-category">
          <div>
            <label for="category">Category</label>
            <select id="category" name="category">
              <option value="all">All</option>
              <option v-for="category in categories" :key="category.id">{{category.name}}</option>
            </select>
          </div>
        </div>
      </div>
    </div>

    <div class="events__container">
      <div>
        <button @click="handleCreateEventButton">create event</button>
      </div>
      <article class="events__lists" v-for="(dayEvents, date) in groupedEvents" :key="date">
        <p class="events__lists-date">{{ new Date(date).toLocaleDateString('fr-FR', { day: '2-digit', month: '2-digit', year: 'numeric' }) }}</p>
        <router-link class="events__lists-card" v-for="event in dayEvents" :key="event.id" :to="`/events/${event.id}`" >
          <img class="events__card-image" src="/src/assets/images/illustration1.jpg" :alt="event.name" />
          <div class="events__card-information">
            <h3 class="events__card-title">{{ event.name }}</h3>
            <p class="events__card-author">By author</p>
            <p class="events__card-location">{{event.address}}</p>
          </div>
        </router-link>
      </article>
    </div>
  </section>
</template>

<style scoped>
  .category {
    padding: 0 20rem 0;
  }

  .category__container {
    display: flex;
    justify-content: space-between;
    background-color: var(--background-primary-card-color);
  }

  .category__list {
    display: flex;
  }

  .category__item-card {
    position: relative;
    overflow: hidden;
    border-radius: 1rem;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 6rem;
    height: 4rem;
    margin: 0 0.5rem;
    user-select: none;
    transition: transform 0.1s ease;
  }

  .category__item-card:hover,
  .category__item-card:focus {
    transform: scale(1.05);
  }

  .category__item-image {
    width: 100%;
    height: 100%;
    object-fit: cover;
    filter: blur(2px);
    opacity: 0.8;
  }

  .category__item-title {
    position: absolute;
    color: var(--text-secondary-color);
    font-weight: bold;
    z-index: 1;
    text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.5);
    font-size: 1.2rem;
  }


  .events {
    display: flex;
    flex-direction: column;
    gap: 2rem;
    padding: 0 20rem 0;
  }

  .events__filter {
    display: flex;
    gap: 5rem;
    background-color: var(--background-primary-card-color);
  }

  .events__filter-range {
    display: flex;
  }

  .events__container {
    margin-top: 1rem;
    padding: 1rem;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    gap: 1rem;
    height: 90%;
    width: 100%;

    background-color: var(--background-primary-card-color);
    overflow-y: auto;
    overflow-x: hidden;
  }

  .events__lists {
    display: flex;
    flex-direction: column;
  }

  .events__lists-date {
    padding: 1rem;
    font-weight: bold;
  }

  .events__lists-card {
    padding: 1rem;
    overflow: hidden;
    border-radius: 0.8rem;
    background-color: var(--background-primary-card-color);
    display: flex;
    align-items: center;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
    transition: transform 0.1s ease;
  }

  .events__lists-card:hover,
  .events__lists-card:focus {
    background-color: var(--background-primary-color);
  }

  .events__card-image {
    width: 5rem;
    height: 5rem;
    object-fit: cover;
  }

  .events__card-information {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    padding: 0 1rem;
    width: 100%;
  }

  .events__card-title {
    font-weight: bold;
    color: var(--text-primary-color);
  }

  .events__card-author,
  .events__card-location {
    font-size: 0.9rem;
    color: var(--text-primary-color-description);
  }
</style>