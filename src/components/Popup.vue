<script lang="ts" setup>
// import { ref } from 'vue'
</script>

<template>
  <div class="popup-wrapper">
    <div class="popup-container">

      <div class="popup-header"></div>
      <div class="popup-body">
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<style>
.popup-body {
  font-size: 1.5rem;
}
</style>