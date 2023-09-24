<template>
  <div class="route-container">

    <router-link to="/coaches">Coaches</router-link>
    <router-link to="/register">Register</router-link>
    <router-link to="/requests">Requests</router-link>
  </div>
</template>
<style scoped>
.route-container {
  display: flex;
  align-content: center;
  justify-content: center;
  gap: 1rem;
}

a:link,
a:visited {
  text-decoration: none;
  color: #2c3e50;
}

a:active,
a:hover {
  color: red;
}
</style>