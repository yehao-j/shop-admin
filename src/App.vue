<script setup>
import { RouterView } from 'vue-router'
</script>

<template>
  <RouterView />
</template>

<style>
#nprogress .bar {
  background-color: #f4f4f4!important;
  height: 3px!important;
}

body {
  @apply bg-gray-100;
}
</style>
