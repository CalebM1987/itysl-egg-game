<script setup lang="ts">
import { ref } from 'vue';
import EggGame from '@/views/EggGame.vue'
import EggcellentHeader from '@/components/EggcellentHeader.vue';

const shouldGive = ref(false)
</script>

<template>
  <div id="app">
    <eggcellent-header 
      @open-donate="shouldGive = true"
      @close-donate="shouldGive = false"
    />
   <egg-game :should-give="shouldGive"/>
  </div>
</template>

<style scoped>

</style>
