<script setup lang="ts">
import {onMounted, reactive, ref} from 'vue';
import type {Category, CreateEventPayload, CreateImagePayload} from "@/types/database.ts";
import {getCategories} from "@/services/categoryService.ts";
import {createEvent} from "@/services/eventService.ts";
import {createImage} from "@/services/imageService.ts";
import {getMe} from "@/services/userService.ts";
import {useAuthStore} from "@/stores/auth.ts";
import {useRouter} from "vue-router";

const show = defineModel<boolean>()

const formData = reactive({
  name: '',
  description: '',
  startingDate: '',
  endingDate: '',
  category: 0,
  websiteUrl: '',
  address: '',
});

const eventImage = ref<File | null>(null);
const imagePreview = ref<string | null>(null);
const categories = ref<Category[]>([]);
const isSubmitting = ref(false);

const router = useRouter()
let authStore = useAuthStore()

async function fetchCategories() {
  const resCategories = await getCategories();
  if (resCategories.success) {
    categories.value = resCategories.data;
  }
}

function handleImageChange(event: Event) {
  const input = event.target as HTMLInputElement;
  if (input.files && input.files[0]) {
    eventImage.value = input.files[0];
    imagePreview.value = URL.createObjectURL(input.files[0]);
  }
}

async function handleSubmit() {
  if (!authStore.authToken || isSubmitting.value) {
    return;
  }

  isSubmitting.value = true;

  try {
      const eventData: CreateEventPayload = {
        name: formData.name,
        description: formData.description,
        startingDate: formData.startingDate,
        endingDate: formData.endingDate,
        categoryId: Number(formData.category),
      };

      const resEvent = await createEvent(eventData);
      if (resEvent.success) {
        if (eventImage.value) {
          // Create FormData and append the image with the key 'image' to match backend
          const formDataImage = new FormData();
          formDataImage.append('image', eventImage.value); // Changed from 'file' to 'image'
          formDataImage.append('eventId', resEvent.data.id.toString());
          formDataImage.append('type', 'event');

          console.log('Uploading image:', eventImage.value.name);

          const imageRes = await createImage(formDataImage);
          if (imageRes.success) {
            await router.push('/events/' + resEvent.data.id);
            show.value = false;
        }
      }
    }
  } catch (error) {
    console.error('Error creating event:', error);
  } finally {
    isSubmitting.value = false;
  }
}

onMounted(() => {
  fetchCategories()
})
</script>

<template>
  <div v-if="show" class="modal">
    <div class="modal-content">
      <div class="modal-header">
        <h2>Créer un événement</h2>
        <button class="close-button" @click="show = false">&times;</button>
      </div>

      <form @submit.prevent="handleSubmit">
        <div>
          <label for="name">Nom</label>
          <input id="name" type="text" v-model="formData.name" required />
        </div>

        <div>
          <label for="description">Description</label>
          <textarea id="description" v-model="formData.description" required></textarea>
        </div>

        <div>
          <label for="startingDate">Date de début</label>
          <input type="date" id="startingDate" v-model="formData.startingDate" required />
        </div>

        <div>
          <label for="endingDate">Date de fin</label>
          <input type="date" id="endingDate" v-model="formData.endingDate" required />
        </div>

        <div>
          <label for="category">Catégorie</label>
          <select id="category" v-model="formData.category" required>
            <option value="" disabled>Sélectionnez une catégorie</option>
            <option v-for="category in categories" :key="category.id" :value="category.id">
              {{ category.name }}
            </option>
          </select>
        </div>

        <div>
          <label for="websiteUrl">Site web</label>
          <input type="url" id="websiteUrl" v-model="formData.websiteUrl" />
        </div>

        <div>
          <label for="address">Adresse</label>
          <input type="text" id="address" v-model="formData.address" />
        </div>

        <div>
          <label for="image">Image de l'événement</label>
          <input type="file" id="image" @change="handleImageChange" accept="image/*" required />
          <div v-if="imagePreview" class="image-preview">
            <img :src="imagePreview" alt="Aperçu de l'image" />
          </div>
        </div>

        <p v-if="error" style="color:red">{{ error }}</p>

        <button type="submit" :disabled="isSubmitting">
          {{ isSubmitting ? 'Création...' : 'Créer l\'événement' }}
        </button>
      </form>
    </div>
  </div>
</template>

<style scoped>
.modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
}

.modal-content {
  background-color: white;
  padding: 2rem;
  border-radius: 12px;
  width: 100%;
  max-width: 600px;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
  max-height: 90vh;
  overflow-y: auto;
}

.close-button {
  background: transparent;
  border: none;
  font-size: 1.8rem;
  cursor: pointer;
  line-height: 1;
  padding: 0.25rem 0.5rem;
  transition: color 0.2s;
}

.close-button:hover {
  color: #000;
}

.modal-content h2 {
  margin-bottom: 0;
}

.modal-content form {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.modal-content label {
  font-weight: 500;
  margin-bottom: 0.25rem;
  display: block;
}

.modal-content input,
.modal-content select,
.modal-content textarea {
  padding: 0.75rem;
  border: 1px solid #ddd;
  border-radius: 6px;
  font-size: 1rem;
  width: 100%;
}

.modal-content textarea {
  min-height: 120px;
  resize: vertical;
}

.image-preview {
  margin-top: 0.5rem;
  border-radius: 6px;
  overflow: hidden;
  max-width: 300px;
}

.image-preview img {
  width: 100%;
  height: auto;
  display: block;
}

.modal-content button[type="submit"] {
  background-color: var(--cta-primary-color);
  color: white;
  border: none;
  padding: 0.75rem;
  border-radius: 6px;
  font-weight: 600;
  margin-top: 1rem;
  cursor: pointer;
}

.modal-content button[type="submit"]:disabled {
  opacity: 0.7;
  cursor: not-allowed;
}
</style>