import HomeView from '../views/HomeView.vue'
import SignInView from '../views/SignInView.vue'
import SignUpView from '../views/SignUpView.vue'

const routes = [
  { path: '/', component: HomeView },
  { path: '/signin', component: SignInView },
  { path: '/signup', component: SignUpView },
]
export default routes
