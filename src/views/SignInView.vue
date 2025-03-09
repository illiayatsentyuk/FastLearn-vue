<script setup lang="ts">
import { ref } from 'vue'
import { useVuelidate } from '@vuelidate/core'
import { required } from '@vuelidate/validators'
import { useRouter } from 'vue-router'

const email = ref('')
const password = ref('')
const error = ref('')
const router = useRouter()

const API_URL = 'http://localhost:3000'

const rules = {
  email: { required },
  password: { required },
}

const v$ = useVuelidate(rules, { email, password })

const handleSubmit = async () => {
  const result = await v$.value.$validate()

  if (!result) {
    return
  }

  fetch(`${API_URL}/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email: email.value, password: password.value }),
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data)
      if (data.message) {
        if (data.message === 'Invalid password') {
          error.value = 'Invalid email or password'
        } else {
          error.value = data.message
        }
        return
      }
      localStorage.setItem('isAuth', 'true')
      localStorage.setItem('token', data.token)
      localStorage.setItem('expiryDate', data.expiryDate)
      localStorage.setItem('userId', data.userId)
      const remainingMilliseconds = 60 * 60 * 1000
      const expiryDate = new Date(new Date().getTime() + remainingMilliseconds)
      localStorage.setItem('expiryDate', expiryDate.toISOString())
      router.push('/')
    })
    .catch((err) => {
      console.log(err)
    })
}
</script>

<template>
  <div class="auth-container">
    <h1>Login</h1>

    <form @submit.prevent="handleSubmit" class="auth-form">
      <div class="form-group">
        <label for="email">Email:</label>
        <input
          type="email"
          id="email"
          v-model="email"
          @blur="v$.email.$touch"
          placeholder="Enter your email"
          :class="{ 'is-invalid': v$.email.$error }"
        />
        <small class="error-text" v-if="v$.email.$error"> Email is required </small>
      </div>

      <div class="form-group">
        <label for="password">Password:</label>
        <input
          type="password"
          id="password"
          v-model="password"
          @blur="v$.password.$touch"
          placeholder="Enter your password"
          :class="{ 'is-invalid': v$.password.$error }"
        />
        <small class="error-text" v-if="v$.password.$error"> Password is required </small>
      </div>
      <p v-if="error" class="error">{{ error }}</p>

      <button type="submit" class="submit-btn">Login</button>

      <p class="toggle-text">
        Don't have an account?
        <router-link to="/signup"> Register </router-link>
      </p>
    </form>
  </div>
</template>

<style scoped>
.auth-container {
  max-width: 400px;
  margin: 2rem auto;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

.auth-form {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

input {
  padding: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 1rem;
}

.submit-btn {
  padding: 0.75rem;
  background-color: #4a90e2;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 1rem;
}

.submit-btn:hover {
  background-color: #4385cf;
}

.error {
  color: red;
  font-size: 0.9rem;
}

.toggle-text {
  text-align: center;
  margin-top: 1rem;
}

.toggle-text a {
  color: #4a90e2;
  text-decoration: none;
}

.toggle-text a:hover {
  text-decoration: underline;
}
.is-invalid {
  border-color: red;
  background-color: #fff0f0;
}
.error-text {
  color: red;
  font-size: 0.8rem;
  margin-top: 0.25rem;
}
</style>
