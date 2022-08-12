import { createPinia } from 'pinia'
import { createApp } from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import { loadFonts } from './plugins/webfontloader'
import router from './routes/index'
import userStore from './store/user'
loadFonts()
const pinia = createPinia()
createApp({...App, mounted(){
  const userData = JSON.parse(localStorage.getItem('userData') || '{}');
  if(Object.keys(userData).length > 0){
    const $user = userStore();
    $user.setUser(userData);
  }
}})
  .use(pinia)
  .use(router)
  .use(vuetify)
  .mount('#app')
