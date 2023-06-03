<script lang="ts" setup>
import { MouthState, LegState } from '@/types'
import { ref, computed, onMounted } from 'vue'
import { useDropZone } from '@vueuse/core'

const emit = defineEmits<{
  dropEgg: []
}>()


interface Props {
  legState: LegState;
  eating: boolean;
}

const dropZoneRef = ref()
const { legState='Down', eating=false } = defineProps<Props>()

const mouthState = computed<MouthState>(()=> eating ? 'Closed': 'Open')

const imageSource = computed(()=> new URL(`../assets/images/${mouthState.value}-Mouth-Egg-${legState}.png`, import.meta.url).href)

const onDrop = (evt: any)=> {
  console.log('on drop: ', evt)
  emit('dropEgg')
}

const onDragover = (evt: any)=> {
  // console.log('on dragover: ', evt)
  // emit('dropEgg')
}


onMounted(()=> {
  const { isOverDropZone } = useDropZone(dropZoneRef.value, onDrop)
  console.log('is over drop zone?', isOverDropZone)
  
})



</script>

<template>
  
  <div 
    :class="{'egg-guy-down': legState === 'Down', 'egg-guy-chewing': eating, 'egg-guy': legState === 'Up' && !eating }" 
    
  >
    <div class="egg-guy-img-wrapper" ref="dropZoneRef">
      <img :src="imageSource" alt="">
      <!-- <img src="" alt="" v-if="shouldEat" class="eating"> -->
    </div>
  </div>


</template>