import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import naive from 'naive-ui'
import '@/utils/flow.css'
import 'vfonts/Lato.css'
import * as ionicons5 from '@vicons/ionicons5'

const app = createApp(App)
Object.keys(ionicons5).forEach(key => {
    app.component(key, ionicons5[key])
})
app.config.globalProperties.$ionicons5 = ionicons5

app.use(createPinia())
app.use(naive)
app.mount('#app')
