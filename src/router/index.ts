import { createRouter, createWebHistory } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'
// import HomeView from '../views/HomeView.vue'
import HomeViewSimple from '@/views/HomeViewSimple.vue'
import JokesView from '@/views/JokesView.vue'
import JokeView from '@/views/SingleJokeView.vue'
import CollectionViewView from '@/views/CollectionView.vue'
import { RouteNames, Routes } from '@/types/Routes.ts'

const routes: RouteRecordRaw[] = [
  {
    path: Routes.HOME,
    name: RouteNames.HOME,
    component: HomeViewSimple,
  },
  {
    path: Routes.JOKES,
    name: RouteNames.JOKES,
    component: JokesView,
  },
  {
    path: Routes.JOKE,
    name: RouteNames.JOKE,
    component: JokeView,
    props: true,
  },
  {
    path: Routes.COLLECTION,
    name: RouteNames.COLLECTION,
    component: CollectionViewView,
  },
  {
    path: Routes.NOT_FOUND,
    name: RouteNames.NOT_FOUND,
    redirect: { name: RouteNames.HOME },
  },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

export default router
