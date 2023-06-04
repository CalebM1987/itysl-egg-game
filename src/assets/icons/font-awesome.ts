import type { App } from 'vue'
import { library } from '@fortawesome/fontawesome-svg-core'

import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

import { faGithub } from '@fortawesome/free-brands-svg-icons'

library.add(faGithub)

export const registerFontAwesome = (app: App) => {
  app.component('font-awesome-icon', FontAwesomeIcon)
}