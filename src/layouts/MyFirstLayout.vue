<template>
  <div class="layout">
    <!-- Header -->
    <header class="header">
      <nav class="nav-container">
        <router-link to="/" class="nav-link" active-class="active">Home</router-link>
        <router-link to="/about" class="nav-link" active-class="active">About</router-link>
        <div class="auth-links">
          <router-link to="/signin" class="nav-link auth-link" active-class="active"
            >Sign in</router-link
          >
          <router-link to="/signup" class="nav-link auth-link" active-class="active"
            >Sign up</router-link
          >
        </div>
      </nav>
    </header>

    <!-- Main content -->
    <main class="main">
      <slot></slot>
    </main>

    <!-- Footer -->
    <footer class="footer">
      <p>© 2024 Your Website</p>
    </footer>
  </div>
</template>

<script lang="ts">
export default {
  name: 'MainLayout',
}
</script>

<style scoped>
.layout {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.header {
  background-color: #ffffff;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  padding: 1rem 2rem;
}

.main {
  flex: 1;
  padding: 2rem;
}

.footer {
  padding: 1rem;
  background: #f8f9fa;
  text-align: center;
}

.nav-container {
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  position: relative;
}

.nav-link {
  text-decoration: none;
  color: #333;
  padding: 0.5rem 1rem;
  margin: 0 0.25rem;
  border-radius: 4px;
  transition: all 0.3s ease;
}

.nav-link:hover {
  background-color: #f5f5f5;
  color: #000;
}

.nav-link.active {
  color: #3498db;
  font-weight: 500;
}

.auth-links {
  margin-left: auto;
  display: flex;
  gap: 1rem;
}

.auth-link {
  border: 1px solid #3498db;
}

.auth-link:hover {
  background-color: #3498db;
  color: white;
}

/* Responsive design */
@media (max-width: 768px) {
  .nav-container {
    flex-direction: column;
    gap: 1rem;
  }

  .auth-links {
    margin-left: 0;
    width: 100%;
    justify-content: center;
  }
}
</style>
