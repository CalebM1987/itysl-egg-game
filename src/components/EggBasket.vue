<script lang="ts" setup>
import { ref } from 'vue'

const emit = defineEmits<{
  dragEgg: [];
  cancelDrag: [];
}>()

interface Props {
  showEggDrag: boolean;
}

const { showEggDrag=false } = defineProps<Props>()

const dragElm = ref<HTMLDivElement | null>(null)

// create single egg image
const singleEgg = new URL('../assets/images/Single-Egg-60.png', import.meta.url).href
const img = new Image(48, 48)
img.src = singleEgg

const onDragStart = (evt: DragEvent)=> {
  console.log('drag start??', evt)
  if (!evt) return
  evt?.dataTransfer?.setDragImage(img, 20, 60)
  emit('dragEgg')
}

const onDragEnd = (evt: DragEvent) => {
  console.log('drag end from basket?', evt)
  emit('cancelDrag')
}

const basketImage = new URL('../assets/images/Basket.png', import.meta.url).href
</script>

<template>
  <div class="egg-basket-wrapper">
    <img :src="basketImage" alt="" class="egg-basket">
    <div 
      id="egg-basket"
      ref="dragElm"
      draggable="true"
      class="draggable-container" 
      @dragstart.stop="onDragStart"
      @dragend="onDragEnd"
      @drop="onDragEnd"
    >
      <div class="draggable-egg"></div>
    </div>
  </div>
</template>

<style>
  .transparent {
    opacity: 1;
  }
</style>