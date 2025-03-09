<script setup lang="ts">
import { ref, onMounted } from 'vue'

onMounted(() => {
  const token = localStorage.getItem('token')
  const expiryDate = localStorage.getItem('expiryDate')
  if (!token || !expiryDate) {
    return
  }
  if (new Date(expiryDate) <= new Date()) {
    localStorage.removeItem('token')
    localStorage.removeItem('expiryDate')
    return
  }
  const userId = localStorage.getItem('userId')
  // const remainingMilliseconds = new Date(expiryDate).getTime() - new Date().getTime()
  localStorage.setItem('userId', userId || '')
  localStorage.setItem('isAuth', 'true')
  localStorage.setItem('token', token)
})

const isAuth = ref(localStorage.getItem('isAuth') === 'true')
const data = ref('')

const handleLogout = () => {
  localStorage.removeItem('token')
  localStorage.removeItem('expiryDate')
  localStorage.removeItem('userId')
  localStorage.removeItem('isAuth')
  isAuth.value = false
}

const sendRequest = async () => {
  const token = localStorage.getItem('token')
  const response = await fetch('http://localhost:3000/', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    method: 'GET',
  })
  const data1 = await response.json()
  data.value = data1.message
}
</script>

<template>
  <header>
    <router-link to="/">Home</router-link>
    <ul>
      <router-link to="/signin" v-if="!isAuth">Sign in</router-link>
      <router-link to="/signup" v-if="!isAuth">Sign up</router-link>
      <a href="#" @click="handleLogout" v-if="isAuth">Logout</a>
    </ul>
  </header>
  <h1>Home page</h1>
  <div v-if="isAuth">
    <p>Welcome to the home page</p>
    <button @click="sendRequest">Send request</button>
    <p>{{ data }}</p>
  </div>
  <p v-else>Please login</p>
</template>

<style scoped>
header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  background-color: #f0f0f0;
}
header ul {
  display: flex;
  gap: 10px;
}
header ul li {
  list-style: none;
}
</style>
