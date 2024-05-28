import './style.css'
import router from './router/index.js'
import { createApp, provide, h } from 'vue'
import { DefaultApolloClient } from '@vue/apollo-composable'
import { ApolloClient, InMemoryCache } from '@apollo/client/core'
import App from './App.vue'
import 'swiper/swiper-bundle.css';

const cache = new InMemoryCache()

const apolloClient = new ApolloClient({
  cache,
  uri: 'https://rickandmortyapi.com/graphql',
}) 
const app = createApp({ 
    setup () { provide(DefaultApolloClient,apolloClient)},
render: () => h(App),

})
app.use(router);

app.mount('#app');