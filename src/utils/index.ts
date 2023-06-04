export { log } from './logger'

export const toTitleCase = (s: string)=> s.split(' ').map(function(word) {
    return word.charAt(0).toUpperCase() + word.substring(1, word.length);
  })
  .join(' ')


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

export const randomNumber = (min=1, max=25) => Math.floor(Math.random() * (max - min + 1)) + min

/**
 * Creates a range Array.
 *
 * @description Creates a range Array.
 *
 * since    1.0.0
 *
 * @function range
 *
 * @param {number} start - start number, or if only one number supplied, it will be the size of range Array using a default step of 1.
 * @param {number} end - end number limit for range, non inclusive.
 * @param {number} [step=1] - step interval for the range. Default is 1.
 *
 * @example
 * // pass in one number, returns [0, 1, 2, 3, 4]
 * const rng = range(5);
 *
 * // pass in two numbers, returns [4, 5, 6, 7, 8, 9]
 * const rng = range(4, 10);
 *
 * // pass in all three arguments, returns [0, 5, 10, 15, 20, 25, 30, 35, 40, 45]
 * const rng = range(0, 50, 5);
 *
 * @return {number[]} a range Array.
 *
 */
export function range(start: number, end?: number, step = 1): number[] {
  if (start){
    if (!end){
      // if only one argument was given, make this end of range
      end = start
      start = 0
    }
  }

  // validate 
  end = end || start + 1
  step = step || 1
  if (end <= start){
    end += 1
  }

  return Array(Math.ceil((end - start) / step))
    .fill(0)
    .map((v, i) => start + i * step);
}

export /** @param {Uint8Array} uint8 */
function getGifAnimationDuration (uint8: Uint8Array) {
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

export async function gifAnimationDuration(url: string){
  const resp = await fetch(url)
  const buff = await resp.arrayBuffer()
  return getGifAnimationDuration(new Uint8Array(buff))
}
