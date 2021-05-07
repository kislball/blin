<template>
  <div class="blin ">
    <Header />
    <router-view/>
  </div>
</template>

<style lang="scss">
.blin {
  width: 100%;
  height: 100%;
}
</style>

<script lang="ts">
import Header from './components/Header.vue'

export default {
  components: { Header }
}
</script>
