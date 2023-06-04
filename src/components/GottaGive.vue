<script lang="ts" setup>
import VoiceMessage from './VoiceMessage.vue';
</script>

<template>
  <div class="you-gotta-give">
    <voice-message :message="'YOU GOTTA GIVE'" class="my-3"/>
    <a href="https://ruthelliscenter.networkforgood.com/projects/105748-main-giving-page" target="_blank" rel="noopener noreferrer" class="my-3">
      <h2>DONATE TO THE RUTH ELLIS CENTER</h2>  
    </a>
    <a href="https://www.gofundme.com/f/biff-wiff" target="_blank" rel="noopener noreferrer" class="my-3">
      <h2>DONATE TO BIFF WIFF (shirt brother)
      </h2>
    </a>
  </div>
</template>

<style>
.my-3 {
  margin: 1.5rem 0 1.5rem 0;
}
</style>