<script lang="ts" setup>
import { ref } from 'vue'
import EggGuy from '@/components/EggGuy.vue';
import EggBasket from '@/components/EggBasket.vue';
import Popup from '@/components/Popup.vue';

const showEgg = ref(false)

const shouldEat = ref(false)
const showPopup = ref(false)

const eatEgg = ()=> {
  console.log('should eat??')
  shouldEat.value = true
  showEgg.value = false
  setTimeout(()=> {
    shouldEat.value = false
  }, 1000)
}

// @ts-ignore
window.popup = ()=> showPopup.value = !showPopup.value
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
              :leg-state="(showEgg || shouldEat)? 'Up': 'Down'"
              :eating="shouldEat"
              @dropEgg="eatEgg"
            />
          </div>
          <div class="egg-basket-container">
            <egg-basket 
              :show-egg-drag="showEgg" 
              @dragEgg="showEgg = true"
              @cancelDrag="showEgg = false"
            />
          </div>
        </div>
      </div>
    </div>
    <popup v-if="showPopup">
      <div>6 EGGS</div>
    </popup>
  </div>
</template>