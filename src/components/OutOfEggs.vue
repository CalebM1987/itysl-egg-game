<script lang="ts" setup>
import { ref } from 'vue'
import VoiceMessage from './VoiceMessage.vue';

const emit = defineEmits<{
  'waiting-for-eggs': [];
  'bought-more-eggs': [];
  'user-cancelled': [];
}>()

const answer = ref<string>()
const outOfEggs = 'Dude, you ran out of eggs. Would you like to buy an 80 pack of eggs?'

const validate = ()=> {
  if (['YES', 'Y'].includes((answer.value ?? '').toUpperCase())){
    emit('bought-more-eggs')
  } else {
    emit('user-cancelled')
  }
  answer.value = undefined
}
</script>

<template>
  <div class="out-of-eggs">
    <voice-message :message="outOfEggs" style="text-transform: none !important;"/>
    <input 
      autofocus
      v-model="answer" 
      @keyup.enter="validate"
      @keydown.escape="emit('user-cancelled')"
      class="more-eggs--input" 
    />
  </div>
</template>

<style>
.more-eggs--input {
  width: 80%;
  margin: 1.5rem 0 1rem 0;
  text-transform: uppercase;
  padding: 0.2rem 0 0.2rem 0.5rem;
  font-size: 1.35rem;
  color: #505050;
  font-family: egg-font !important;
}
</style>