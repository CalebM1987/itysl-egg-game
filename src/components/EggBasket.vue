<script lang="ts" setup>
import { ref, onMounted } from 'vue'
import { useDraggable } from '@vueuse/core'
import { useEggDrop } from '@/composables/egg-drop';

interface Props {
  eggCount: number;
  disabled?: boolean;
}

const { disabled = false } = defineProps<Props>()

const { 
  movingEgg,
  movingEggPosition,
  onMove,
  startDrag,
  stopDrag,
  cancelDrag,
} = useEggDrop()

const dragElm = ref<HTMLDivElement | null>(null)

// create single egg image
const singleEgg = new URL('../assets/images/Single-Egg-60.png', import.meta.url).href
const img = new Image(42, 59)
img.src = singleEgg

const onTouchStart = ()=> {
  if (disabled) return;
  startDrag(true)
}

const onDragStart = (evt: DragEvent | TouchEvent)=> {
  if (!evt) return
  if (disabled){
    evt.preventDefault()
  }
  try {
    (evt as DragEvent)?.dataTransfer?.setDragImage(img, 20, 60)
  } catch(err){
    // um okay...
  }
  startDrag(false)
}

const onTouchEnd = ()=> {
  movingEggPosition.value = { display: 'none' }
  if (disabled) return;
  stopDrag()
}

const onDragEnd = () => {
  movingEggPosition.value = { display: 'none' }
  cancelDrag()
}

const basketImage = new URL('../assets/images/Basket.png', import.meta.url).href

onMounted(()=> {
  useDraggable(dragElm)
})
</script>

<template>
  <div class="egg-basket-wrapper">
    <img :src="basketImage" alt="" class="egg-basket">
    <div 
      :disabled="disabled"
      id="egg-basket"
      ref="dragElm"
      draggable="true"
      class="draggable-container" 
      @dragstart.stop="onDragStart"
      @touchstart.passive="onTouchStart"
      @touchmove.passive="(e) => disabled ? null: onMove(e)"
      @touchend="onTouchEnd"
      @dragend="onDragEnd"
      @drop="onDragEnd"
    >
      <div class="draggable-egg"></div>
      <p class="eggs-count" v-if="eggCount">EGGS: {{ eggCount }}</p>
    </div>
  </div>

  <!-- for mobile devices only -->
  <div class="moving-egg" v-if="movingEgg">
    <img :src="singleEgg" height="60" alt="" :style="movingEggPosition">
  </div>
</template>

<style>
  .eggs-count {
    margin-top: 0.5rem;
  }
  .transparent {
    opacity: 1;
  }

  .egg-basket-wrapper {
    touch-action: none;
  }
</style>