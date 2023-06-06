<script lang="ts" setup>
import { ref, defineAsyncComponent, onMounted } from 'vue'
import { useEggs } from '@/composables/eggs';
import { usePopups } from '@/composables/popup'
import { useEggDrop } from '@/composables/egg-drop';
import { randomNumber, speak, delay, log } from '@/utils';
import { eggs } from '@/utils/easter-eggs'
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
  isBusy,
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

const { 
  EventBus,
} = useEggDrop()

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

const onCancelDrag = ()=> {
  showEgg.value = false
}

const onDragEgg = ()=> {
  showEgg.value = true
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
        // make it more interesting to not automatically win at 39 eggs
      } else if (randomNumber(1,6) === 2 || eggCounter.value === 1){
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
        displayPopup(`${randomNumber(2, 10)} EGGS`)
      }
    }
  }, 1000)
}

onMounted(()=> {
  // handle all events globally
  EventBus.on('drop-egg', onEatEgg)
  EventBus.on('cancel-drag', onCancelDrag)
  EventBus.on('drag-egg', onDragEgg)
  EventBus.on('did-touch', ()=> log('is over egg man'))
})

// easter eggs
if (localStorage.getItem('debug')){
  eggs.doTheVoice = displayPopup
  eggs.showEmNude = ()=> isWinner.value = true
  // @ts-ignore
  window.eggs = eggs
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
              @showing-butt-frame="nudeEggMessage"
              @ended-winning-celebration="resetGame"
            />
          </div>
          <div class="egg-basket-container">
            <egg-basket 
              :egg-count="eggCounter"
              :disabled="disableFeed || isBusy"
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