import { createPinia } from 'pinia'
import { createApp } from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import { loadFonts } from './plugins/webfontloader'
import router from './routes/index'
import userStore, { authApi } from './store/user'
import 'nprogress/nprogress.css'
import Echo from 'laravel-echo';
import Pusher from 'pusher-js';
window.Pusher = Pusher;
 
window.Echo = new Echo({
    broadcaster: 'pusher',
    key: "ad76839829d578cecc9e",
    cluster: "ap1",
    encypted: true,
    forceTLS: true,
    //@ts-ignore
    authorizer: (channel, options) => {
      return {
          //@ts-ignore
          authorize: (socketId, callback) => {
              authApi.post('/broadcasting/auth', {
                  socket_id: socketId,
                  channel_name: channel.name
              })
              .then(response => {
                  callback(null, response.data);
              })
              .catch(error => {
                  callback(error);
              });
          }
      };
  },
});

//@ts-ignore
window.Echo.connector.pusher.connection.bind('connected', function () {
  //@ts-ignore
  authApi.defaults.headers.common['X-Socket-Id'] = window.Echo.socketId();
});

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

  
