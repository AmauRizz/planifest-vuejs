<!-- src/views/Account.vue -->
<script setup lang="ts">
import {ref, onMounted} from 'vue'
import {useRouter} from 'vue-router'
import {deleteUser, getMe} from '@/services/userService'
import type {Image, User} from "@/types/database.ts";
import {useAuthStore} from "@/stores/auth.ts";
import {createImage} from "@/services/imageService.ts";

const user = ref<User>();
const image = ref<Image>()

const router = useRouter()
const authStore = useAuthStore()

async function handleLogout() {
  authStore.clearAuthToken()
  await router.push('/')
}

async function handleDeleteAccount() {
  if (!user.value) {
    return;
  }

  const resUser = await deleteUser(user.value.id);
  if (resUser.success) {
    await handleLogout()
  }
}

onMounted(async () => {
  try {
    if (!authStore.authToken) {
      await router.push('/')
      return
    }

    const resUser = await getMe()
    if (resUser.success) {
      user.value = resUser.data;
    }
  } catch (err: any) {
    if (err.code === 401) {
      authStore.clearAuthToken()
    }
    await router.push('/')
    return
  }
})
</script>

<template>
  <div v-if="user" class="account-container">
    <div class="account-header">
      <h2>My Account</h2>
    </div>

    <div class="account-info">
      <div class="account-field">
        <strong>Name:</strong> {{ user.name }}
      </div>
      <div class="account-field">
        <strong>Email:</strong> {{ user.email }}
      </div>
    </div>

    <div class="button-group">
      <button @click="handleLogout" class="logout-btn">Logout</button>
      <button @click="handleDeleteAccount" class="delete-account-btn">Delete Account</button>
    </div>
  </div>
</template>

<style scoped>
.account-container {
  max-width: 800px;
  margin: 3rem auto;
  padding: 2rem;
  background-color: white;
  border-radius: 12px;
  box-shadow: 0 5px 20px rgba(0, 0, 0, 0.1);
}

.account-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
  border-bottom: 1px solid #eee;
  padding-bottom: 1rem;
}

.account-info {
  margin-bottom: 2rem;
}

.account-field {
  margin-bottom: 1rem;
  display: flex;
}

.account-field strong {
  min-width: 100px;
}

.button-group {
  display: flex;
  gap: 1rem;
}

.logout-btn {
  background-color: var(--cta-primary-color);
  color: white;
  border: none;
  padding: 0.75rem 1.5rem;
  border-radius: 8px;
}

.delete-account-btn {
  background-color: transparent;
  color: #e63946;
  border: 1px solid #e63946;
  padding: 0.75rem 1.5rem;
  border-radius: 8px;
}
</style>
