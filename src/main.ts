import { createApp } from 'vue'
import './style.scss'
import App from './App.vue'

import { registerFontAwesome } from './assets/icons/font-awesome'

const app = createApp(App)

registerFontAwesome(app)

app
  .mount('#app')
