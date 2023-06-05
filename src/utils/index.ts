export { log } from './logger'
import { LocalStorageDevOverrides } from '@/types';

/** predictable random number generator */
export const randomNumber = (min=1, max=25) => Math.floor(Math.random() * (max - min + 1)) + min

  /**
 * creates a "sleep" function, will wait a user specified amount of milliseconds
 * @param {number} ms - number of milliseconds to sleep
 * @function delay
 * 
 * @example
 * // wait 3 seconds, then do a console log
 * delay(3000).then(()=> console.log('hello world'));
 * 
 * // async example
 * async function asyncHello(){
 *   await delay(3000);
 *   console.log('hello world')
 * }
 */
export const delay = (ms: number): Promise<void> => new Promise(res => setTimeout(res, ms));


/**
 * don't do the voice...
 * @param message 
 * @param voice 
 */
export const speak = (message: string, voice?: SpeechSynthesisVoice | string) => {
  const msg = new SpeechSynthesisUtterance()
  msg.text = message
  msg.rate = 0.85
  msg.pitch = 1.7
  if (voice){
    if (typeof voice === 'string'){
      const allVoices = speechSynthesis.getVoices()
      const match = allVoices.find(v => v.name === voice) ?? allVoices[0]
      msg.voice = match
    }else {
      try {
        msg.voice = voice
      } catch(err){
        console.warn("don't do the voice...")
      }
    }
  } 
  speechSynthesis.speak(msg)
}

/**
 * read animation duration from gif as Unit8Array
 * https://stackoverflow.com/a/74236879/3005089
 * @param uint8 
 * @returns 
 */
export function getGifAnimationDuration (uint8: Uint8Array) {
  let duration = 0
  for (let i = 0, len = uint8.length; i < len; i++) {
    if (uint8[i] == 0x21
      && uint8[i + 1] == 0xF9
      && uint8[i + 2] == 0x04
      && uint8[i + 7] == 0x00) 
    {
      const delay = (uint8[i + 5] << 8) | (uint8[i + 4] & 0xFF)
      duration += delay < 2 ? 10 : delay
    }
  }
  return duration / 100
}

/**
 * reads the duration of a gif from a given url
 * @param url 
 * @returns 
 */
export async function gifAnimationDuration(url: string){
  const resp = await fetch(url)
  const buff = await resp.arrayBuffer()
  return getGifAnimationDuration(new Uint8Array(buff))
}

/**
 * allow developers to override random range to win quicker
 * run this in console:
 * @example localStorage.setItem('egg-game', JSON.stringify({"min":5, "max": 10}))
 * @returns 
 */
export function checkForDevSettings(): LocalStorageDevOverrides {
  const key = 'egg-game'
  const item = localStorage.getItem(key) ?? '{}'
  const overrides: LocalStorageDevOverrides = {
    min: 35,
    max: 91
  }
  try {
    const parsed = JSON.parse(item)
    Object.assign(overrides, parsed)
  } catch(err){
    // who cares
  }
  return overrides
}

/**
 * debounce a function
 * 
 * @see https://blog.webdevsimplified.com/2022-03/debounce-vs-throttle/
 *  
 * @param cb - the callback function
 * @param delay - the time to delay in milliseconds
 * @returns 
 */
export function debounce<F extends Function>(cb: F, delay = 250) {
  let timeout: NodeJS.Timeout

  return (...args: any[]) => {
    clearTimeout(timeout)
    timeout = setTimeout(() => {
      cb(...args)
    }, delay)
  }
}
