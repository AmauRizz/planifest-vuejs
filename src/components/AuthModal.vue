<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import {registerUser, loginUser} from '@/services/userService.ts'
import {useAuthStore} from "@/stores/auth.ts";

const show = defineModel<boolean>()
const isLoginMode = ref(true)

const name = ref('')
const email = ref('')
const password = ref('')
const error = ref('')
const loading = ref(false)

const router = useRouter()
const authStore = useAuthStore()

const toggleMode = () => {
  isLoginMode.value = !isLoginMode.value
  error.value = ''
}

const submit = async () => {
  error.value = ''
  loading.value = true
  try {
    if (isLoginMode.value) {
      const response = await loginUser({
        email: email.value,
        password: password.value
      })

      authStore.setAuthToken(response.token)

      show.value = false
      await router.push('/account')
    } else {

      await registerUser({name: name.value, email: email.value, password: password.value})

      const response = await loginUser({
        email: email.value,
        password: password.value
      })

      authStore.setAuthToken(response.token)

      show.value = false
      await router.push('/account')
    }
  } catch (err: any) {
    error.value = 'Une erreur est survenue.'
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <div v-if="show" class="modal">
    <div class="modal-content">
      <div class="modal-header">
        <h2>{{ isLoginMode ? 'Sign In' : 'Register' }}</h2>
        <button class="close-button" @click="show = false">&times;</button>
      </div>

      <form @submit.prevent="submit">
        <div v-if="!isLoginMode">
          <label for="name">Username</label>
          <input id="name" v-model="name" required />
        </div>

        <label for="email">Email</label>
        <input id="email" type="email" v-model="email" required />

        <label for="password">Password</label>
        <input id="password" type="password" v-model="password" required />

        <button type="submit" :disabled="loading">
          {{ isLoginMode ? 'Sign In' : 'Register' }}
        </button>
      </form>

      <p v-if="error" style="color:red">{{ error }}</p>

      <p>
        {{ isLoginMode ? "No account ?" : "Already Regitered ?" }}
        <a href="#" @click.prevent="toggleMode">
          {{ isLoginMode ? "Register" : "Sign In" }}
        </a>
      </p>
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

.modal-header h2 {
  font-size: 1.5rem;
  font-weight: bold;
}

.modal-content {
  background-color: white;
  padding: 2rem;
  border-radius: 12px;
  width: 100%;
  max-width: 450px;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
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

.modal-content input {
  padding: 0.75rem;
  border: 1px solid #ddd;
  border-radius: 6px;
  font-size: 1rem;
}

.modal-content button {
  background-color: var(--cta-primary-color);
  color: white;
  border: none;
  padding: 0.75rem;
  border-radius: 6px;
  font-weight: 600;
  margin-top: 1rem;
}
</style>