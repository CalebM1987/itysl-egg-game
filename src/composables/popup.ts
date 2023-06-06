import { ref } from 'vue'
import { delay } from '@/utils'

export function usePopups(){
  const isBusy = ref(false)
  const showPopup = ref(false)
  const currentMessage = ref<string>()

  const displayPopup = async (msg?: string, duration=3000)=> {
    isBusy.value = true
    if (msg){
      currentMessage.value = msg
    }
    showPopup.value = true
    await delay(duration)
    showPopup.value = false
    isBusy.value = false
  }

  return {
    isBusy,
    showPopup,
    currentMessage,
    displayPopup
  }
}