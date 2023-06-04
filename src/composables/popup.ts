import { ref } from 'vue'
import { delay } from '@/utils'

export function usePopups(){
  const showPopup = ref(false)
  const currentMessage = ref<string>()

  const displayPopup = async (msg?: string, duration=3000)=> {
    if (msg){
      currentMessage.value = msg
    }
    showPopup.value = true
    await delay(duration)
    showPopup.value = false
  }

  return {
    showPopup,
    currentMessage,
    displayPopup
  }
}