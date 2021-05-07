<template>
  <div class="header">
    <h1>blin</h1>
    <p>
      Social network without the bustle. <br>
      Free and <a href="https://github.com/kislball/blin">Opensource</a>
    </p>
    <div class="links">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link> |
      <router-link to="/search">Search</router-link>
    </div>
  </div>
</template>

<style scoped lang="scss">
.header {
  font-family: monospace;
  text-align: center;
}
</style>
