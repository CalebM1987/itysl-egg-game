<script lang="ts" setup>
</script>

<template>
  <div class="popup-wrapper">
    <div class="popup-container">

      <div class="popup-header"></div>
      <div class="popup-body">
        <slot>6 EGGS</slot>
      </div>
    </div>
  </div>
</template>

<style>
.popup-body {
  padding: 1rem;
  font-size: 1.5rem;
  text-transform: none;
}
</style>