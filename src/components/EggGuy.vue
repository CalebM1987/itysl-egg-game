<script lang="ts" setup>
import { MouthState, LegState } from '@/types'
import { ref, computed, onMounted, watch } from 'vue'
import { gifAnimationDuration, delay, log } from '@/utils'
import { useEggDrop } from '@/composables/egg-drop'
import { useDropZone } from '@vueuse/core'

const emit = defineEmits<{
  'started-winning-celebration': [];
  'started-walking': [];
  'stopped-waling': [];
  'showing-bush-bare-back-balls-and-butt': [];
  'showing-butt-frame': [];
  'ended-winning-celebration': [];
}>()

interface Props {
  legState: LegState;
  eating?: boolean;
  celebrate?: boolean;
  isDraggingTouch?: boolean;
}

const { 
  legState='Down', 
  eating=false, 
  celebrate=false, 
} = defineProps<Props>()

const { 
  isOverDrop,
  waitForTouch,
  stopDrag,
} = useEggDrop()

// defaults, but dynamically grab them on mounted
const walkingTimeout = ref(5430)
const nudeTimeout = ref(8050)
const shouldWalk = ref(false)
const showEmNude = ref(false)
const showButtFrame = ref(false)
const dropZoneRef = ref(null)

const mouthState = computed<MouthState>(()=> eating ? 'Closed': 'Open')

const walkingGif = new URL(`../assets/images/egg-walking.gif`, import.meta.url).href
const nudeGif = new URL(`../assets/images/bare-back-balls-butt.gif`, import.meta.url).href
const eggButtFrame = new URL(`../assets/images/egg-butt-frame.png`, import.meta.url).href

const imageSource = computed(()=> celebrate 
  ? shouldWalk.value  
    ? walkingGif
    : showEmNude.value 
      ? nudeGif
      : eggButtFrame 
  : new URL(`../assets/images/${mouthState.value}-Mouth-Egg-${legState}.png`, import.meta.url).href
)

const onDrop = ()=> {
  stopDrag()
}

const showBareBackButtAndBalls = async ()=> {
  // start celebration
  emit('started-winning-celebration')

  // start walking
  shouldWalk.value = true
  emit('started-walking')
  await delay(walkingTimeout.value)
  shouldWalk.value = false
  showEmNude.value = true
  emit('stopped-waling')

  // show em nude
  emit('showing-bush-bare-back-balls-and-butt')
  await delay(nudeTimeout.value)
  showButtFrame.value = true
  showEmNude.value = false

  // show still butt frame for 3 seconds
  emit('showing-butt-frame')
  await delay(5000)

  // end celebration
  emit('ended-winning-celebration')
}

watch(()=> celebrate, 
  (shouldCelebrate) => {
    log('should celebrate: ', shouldCelebrate)
    if (shouldCelebrate){
      showBareBackButtAndBalls()
    }
  }
)


onMounted(()=> {
  // wait for touch events on mobile
  waitForTouch(dropZoneRef.value!)

  const { isOverDropZone } = useDropZone(dropZoneRef.value, onDrop)
  watch(()=> isOverDropZone,
    (over)=> {
      isOverDrop.value = over.value
    }
  )

  gifAnimationDuration(walkingGif).then(d => { 
    walkingTimeout.value = (d * 1000) - 50 
    log(`set walking gif timeout: ${d}`)
  })

  gifAnimationDuration(nudeGif).then(d => {
    nudeTimeout.value = (d * 1000) - 50
    log(`set nude gif timeout: ${d}`)
  })
  
})

</script>

<template>
  <div 
    :class="celebrate ? 'egg-guy' :
      {
        'egg-guy-down': legState === 'Down', 
        'egg-guy-chewing': eating, 
        'egg-guy': legState === 'Up' && !eating 
      }
    " 
  >
    <div 
      class="egg-guy-img-wrapper" 
      ref="dropZoneRef" 
    >
      <img :src="imageSource" alt="" :class="celebrate ? 'walking-egg': ''">
    </div>
  </div>
</template>