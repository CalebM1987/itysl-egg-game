<script lang="ts" setup>
import { ref } from 'vue'

const emit = defineEmits<{
  'drag-egg': [];
  'cancel-drag': [];
}>()

interface Props {
  eggCount: number;
  disabled?: boolean;
}

const { disabled = false } = defineProps<Props>()

const dragElm = ref<HTMLDivElement | null>(null)

// create single egg image
const singleEgg = new URL('../assets/images/Single-Egg-60.png', import.meta.url).href
const img = new Image(48, 48)
img.src = singleEgg

const onDragStart = (evt: DragEvent)=> {
  if (!evt) return
  if (disabled){
    evt.preventDefault()
  }
  evt?.dataTransfer?.setDragImage(img, 20, 60)
  emit('drag-egg')
}

const onDragEnd = () => {
  emit('cancel-drag')
}

const basketImage = new URL('../assets/images/Basket.png', import.meta.url).href
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
      @dragend="onDragEnd"
      @drop="onDragEnd"
    >
      <div class="draggable-egg"></div>
      <p class="eggs-count" v-if="eggCount">EGGS: {{ eggCount }}</p>
    </div>
  </div>
</template>

<style>
  .eggs-count {
    margin-top: 0.5rem;
  }
  .transparent {
    opacity: 1;
  }
  .draggable-container, .draggable-container:active, .draggable-egg, .draggable-egg:active {
    cursor: url('./Tiny-Cursor.png'), pointer !important;
  }
</style>