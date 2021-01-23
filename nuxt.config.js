
export default {
  /*
  ** Nuxt rendering mode
  ** See https://nuxtjs.org/api/configuration-mode
  */
  // mode: 'universal',
  /*
  ** Nuxt target
  ** See https://nuxtjs.org/api/configuration-target
  */
  target: 'server',
  /*
  ** Headers of the page
  ** See https://nuxtjs.org/api/configuration-head
  */
  head: {
    title: 'Запись онлайн',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content:'Запись онлайн в сфере услуг красоты и здоровья' },
      { hid: 'keywords', name: 'keywords', content:'парикмахер,визажист,окраска волос,стоматолог,наращивание ресниц,маникюр,педикюр,врач' },
      {  name: 'yandex-verification', content:'fa8cd43cbcb187e6' },
      {  name: 'google-site-verification', content:'NL_g9nrlXMd57ZIYOtuLsnjNKwu3WtyaVadZ6P3U6uc' },


    ],
    link: [
      // {rel:'manifest',href: 'js13kpwa.webmanifest'},
      { rel: 'icon', type: 'image/png', href: '/logo.png' }
    ]
  },
  /*
  ** Global CSS
  */
 css: [
  '@/theme/index.css'
],
loading: {
  color: 'blue',
  height: '1px'
},
  /*
  ** Plugins to load before mounting the App
  ** https://nuxtjs.org/guide/plugins
  */
  plugins: [

  ],

extend(config, ctx) {},
babel: { compact: true },
  /*
  ** Auto import components
  ** See https://nuxtjs.org/api/configurationаа-components
  */
  components: true,
  /*
  ** Nuxt.js dev-modules
  */
 buildModules: [
  '@nuxtjs/pwa',
  '@nuxtjs/fontawesome',
],

manifest: {
  name: 'Запишись',
  start_url:'/',
  lang: 'en',
  display: 'standalone',
  theme_color:'#3cc0a6',
},
fontawesome:{
  component:'fa',
  icons:{
    solid:true,
    brands:true
  }


},
  /*
  ** Nuxt.js modules
  */
  modules: [


    // Doc: https://bootstrap-vue.js.org
    'bootstrap-vue/nuxt',
    // Doc: https://axios.nuxtjs.org/usage
    '@nuxtjs/axios',

  ],
  auth: {
    // Options
  },
  /*
  ** Axios module configuration
  ** See https://axios.nuxtjs.org/options
  */
  axios: {
  baseURL:process.env.BASE_URL || 'http://localhost:3000/'
  },
  /*
  ** Build configuration
  ** See https://nuxtjs.org/api/configuration-build/
  */
  build: {
  }
}
