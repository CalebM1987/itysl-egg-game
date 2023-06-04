<script lang="ts" setup>
import { ref } from 'vue';

const emit = defineEmits<{
  'open-donate': [];
  'close-donate': [];
}>()

const openDonate = ref(false)

const onClick = ()=> {
  openDonate.value = !openDonate.value
  emit(openDonate.value ? 'open-donate': 'close-donate' as any)
}

const openGithub = ()=> {
  const url = 'https://github.com/CalebM1987/itysl-egg-game'
  window.open(url, '_blank')
}
</script>

<template>
<div class="eggcellent-header">
  <div class="donate-wrapper">
    <button @click="onClick" :class="openDonate ? 'donate-active': ''">DONATE</button>
  </div>

  <div class="og-artist">
    <a href="https://alec.land/" target="_blank">
      <div class="og-artist-wrapper">
        <p>OG ARTIST</p>
      </div>
    </a>
    <div class="github-repo" title="Go to Github Repo">
      <button @click="openGithub"><font-awesome-icon icon="fa-brands fa-github"></font-awesome-icon></button>
    </div>
  </div>

</div>
</template>

<style>

.donate-active {
  background: rgb(204, 202, 202); 
  margin-top: 4px;
}

.github-repo {
  text-align: center;
}
</style>