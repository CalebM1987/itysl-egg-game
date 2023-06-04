import { ref } from "vue"
import { randomNumber, checkForDevSettings, log } from "@/utils"

const randomRange = checkForDevSettings()

export function useEggs(min=randomRange.min, max=randomRange.max) {
  const totalEggs = ref(0)
  const random = ref(randomNumber(min, max))

  const eggInfo = ()=> {
    log('egg-info: ', {
      random: random.value,
      totalEggs: totalEggs.value
    })
  }

  eggInfo()

  const resetEggs = ()=> {
    totalEggs.value = 0
    random.value = randomNumber(min, max)
    eggInfo()
  }

  const eatEgg = ()=> totalEggs.value++

  return {
    random,
    totalEggs,
    resetEggs,
    eatEgg
  }
}