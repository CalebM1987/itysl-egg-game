<script lang="ts" setup>
import { onMounted } from 'vue';
import { speak, delay } from '@/utils';

interface Props {
  message: string;
  voiceName?: string;
  beep?: boolean;
}

const { message, beep=true, voiceName='Eddy (English (US))' } = defineProps<Props>()
const beepSound = new Audio(new URL('../assets/sounds/beep.wav', import.meta.url).href)

const doTheVoice = async ()=> {
  if (beep){
    beepSound.addEventListener('ended', async ()=> {
      await delay(200)
      speak(message, voiceName)
    })
    await beepSound.play()
  } else {
    speak(message, voiceName)
  }
}

onMounted(()=> {
  doTheVoice()
})

</script>

<template>
  <div class="voice-message">
    {{ message }}
  </div>
</template>