import { ref } from 'vue'
import { debounce } from '@/utils';
import mitt from 'mitt'

type EggDropEvents = {
  'drag-egg': void;
  'drop-egg': void;
  'cancel-drag': void;
  'moved-egg': TouchEvent;
  'did-touch': void;
}

const EventBus = mitt<EggDropEvents>()

const movingEgg = ref(false)
const isTouchEvent = ref(false)
const isOverDrop = ref<boolean>()
const movingEggPosition = ref<any>({ display: 'none'})
const moveEvent = ref<TouchEvent>()

export function useEggDrop(){
  const rect = ref<DOMRect>()

  const startDrag = (isTouch=false)=> {
    isTouchEvent.value = isTouch
    EventBus.emit('drag-egg')
  }

  const onMove = (evt: TouchEvent)=> {
    moveEvent.value = evt
    movingEgg.value = true
    EventBus.emit('moved-egg', evt)
    movingEggPosition.value = {
      position: 'absolute',
      right: `calc(100vw - ${Math.round(evt.targetTouches[0].pageX * 1.3) + 'px'})`,
      top: `calc(100vh - ${Math.round(evt.targetTouches[0].pageY * .8) + 'px'})`
    }
  }

  const stopDrag = ()=> {
    if (isOverDrop.value !== undefined){
      EventBus.emit('drop-egg')
    } else if (isOverDrop.value){
       EventBus.emit('drop-egg')
    }
    movingEgg.value = false
    moveEvent.value = undefined
    isOverDrop.value = false
  }

  const cancelDrag = ()=> {
    moveEvent.value = undefined
    movingEgg.value = false
    isOverDrop.value = false
    EventBus.emit('cancel-drag')
  }

  const waitForTouch = (el: HTMLElement) => {
    EventBus.on('moved-egg', debounce(()=> {
      // attempt to 
      if (touches(el) && !isOverDrop.value){
        isOverDrop.value = true
        EventBus.emit('did-touch')
      } else {
        isOverDrop.value = false
      }
    }, 50))
  }

  const touches = (el: HTMLElement) => {
    if (!moveEvent) return false;
    const touch = moveEvent.value?.touches[0]
    if (!touch) return false
    if (!rect.value){
      rect.value = el.getBoundingClientRect()
    }
    return touch.clientX > rect.value.left
      && touch.clientX < rect.value.right
      && touch.clientY < rect.value.bottom
      && touch.clientY > rect.value.top
  }

  return {
    EventBus,
    isOverDrop,
    moveEvent,
    movingEgg,
    movingEggPosition,
    touches,
    onMove,
    waitForTouch,
    startDrag,
    stopDrag,
    cancelDrag
  }

}