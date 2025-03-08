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
  localStorage.setItem('userId', userId)
  localStorage.setItem('isLogin', true)
  localStorage.setItem('token', token)
})

const isLogin = ref(localStorage.getItem('isLogin') === 'true')
console.log(isLogin.value)
</script>

<template>
  <div>
    <router-link to="/signin">Auth</router-link>
  </div>
  <h1>Home page</h1>
  <p v-if="isLogin">Welcome to the home page</p>
  <p v-else>Please login</p>
</template>

<style scoped></style>
