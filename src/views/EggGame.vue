<script lang="ts" setup>
import { ref, defineAsyncComponent } from 'vue'
import { useEggs } from '@/composables/eggs';
import { usePopups } from '@/composables/popup'
import { randomNumber, speak, delay, log } from '@/utils';
import EggGuy from '@/components/EggGuy.vue';
import EggBasket from '@/components/EggBasket.vue';
const Popup = defineAsyncComponent(()=> import('@/components/Popup.vue'));
const VoiceMessage = defineAsyncComponent(()=> import('@/components/VoiceMessage.vue'));
const OutOfEggs = defineAsyncComponent(()=> import('@/components/OutOfEggs.vue'));
const GottaGive = defineAsyncComponent(()=> import('@/components/GottaGive.vue'));


interface Props {
  shouldGive: boolean;
}

const { shouldGive } = defineProps<Props>()

const showEgg = ref(false)
const shouldEat = ref(false)
const isOutOfEggs = ref(false)
const disableFeed = ref(false)
const eggCounter = ref(0)
const isWinner = ref(false)

const { 
  showPopup,
  currentMessage,
  displayPopup
} = usePopups()

const {
  random,
  totalEggs,
  resetEggs,
  eatEgg
} = useEggs()

const resetGame = ()=> {
  isWinner.value = false
  eggCounter.value = 0
  isOutOfEggs.value = false
  disableFeed.value = false
  showPopup.value = false
  resetEggs()
}

const refusedMoreEggs = ()=> {
  log("you didn't buy any eggs")
  resetGame()
  displayPopup("I don't want to be around anymore...")
}

const nudeEggMessage = ()=> {
  displayPopup("You're looking at a nude egg.", 5000)
}

const buyMoreEggs = ()=> {
  log('bought more eggs')
  isOutOfEggs.value = false
  showPopup.value = false
  disableFeed.value = false
  eggCounter.value = 80
}

const onEatEgg = ()=> {
  shouldEat.value = true
  showEgg.value = false
  setTimeout(async ()=> {
    shouldEat.value = false
    eatEgg()
    log(`totalEggs: ${totalEggs.value}`)
    if (eggCounter.value){
      eggCounter.value -= eggCounter.value === 80 ? 40: 1
      if (eggCounter.value === 40){
        disableFeed.value = true
        displayPopup('You now have 40 eggs').then(()=> disableFeed.value = false)
        log('that one egg was 40 eggs!?')
      // } else if (eggCounter.value === 39){
        // make it more interesting to not automatically win at 39 eggs
      } else if (randomNumber(1,6) === 2 || eggCounter.value === 0){
        // win game
        disableFeed.value = true
        await displayPopup('41 EGGS')
        speak('you win', 'Eddy (English (US))')
        await delay(300)
        await displayPopup('Congrats big boy')
        isWinner.value = true
      }
    }
    else if (totalEggs.value === random.value){
      // random egg count popups
      disableFeed.value = true
      isOutOfEggs.value = true
      disableFeed.value = true
      showPopup.value = true
    } else if (totalEggs.value >= 10){
      disableFeed.value = false
      if (randomNumber(1, 6) === 3){
        currentMessage.value = `${randomNumber(2, 10)} EGGS`
        showPopup.value = true
      }
    }
  }, 1000)
}
</script>

<template>
  <div class="egg-game-container">
    <div class="egg-game-wrapper">
      <div class="egg-game-header"></div>
      <div class="egg-game-body">
        <h1>FEED EGGS</h1>
        <div class="egg-game-itself">
          <div class="egg-guy-container">
            <egg-guy 
              :celebrate="isWinner"
              :leg-state="(showEgg || shouldEat)? 'Up': 'Down'"
              :eating="shouldEat"
              @drop-egg="onEatEgg"
              @showing-butt-frame="nudeEggMessage"
              @ended-winning-celebration="resetGame"
            />
          </div>
          <div class="egg-basket-container">
            <egg-basket 
              :egg-count="eggCounter"
              :disabled="disableFeed"
              @drag-egg="showEgg = true"
              @cancel-drag="showEgg = false"
            />
          </div>
        </div>
      </div>
    </div>

    <popup v-if="shouldGive">
      <gotta-give />
    </popup>

    <popup v-if="(showPopup && (currentMessage || isOutOfEggs)) && !shouldGive">
      <out-of-eggs 
        v-if="isOutOfEggs"
        @bought-more-eggs="buyMoreEggs"
        @user-cancelled="refusedMoreEggs"
      />
      <voice-message :message="currentMessage!" ref="voiceMessage" v-else />
    </popup>
  </div>
</template>