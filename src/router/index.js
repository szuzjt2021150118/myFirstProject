import { createRouter, createWebHistory } from 'vue-router'


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: ()=> import('../views/Home.vue'),
    },
    {
      path: '/announcementPost',
      name: 'announcementPost',
      component: ()=> import('../views/announcemetPost.vue'),
    },
    {
      path: '/announcement',
      name: 'announcement',
      component: ()=> import('../views/announcement.vue'),
    },
    {
      path: '/stumanagement',
      name: 'stumanagement',
      component: () => import('../views/stumanagement.vue'),
    },
    {
      path: '/groupInfo',
      name: 'groupInfo',
      component: () => import('../views/groupInfo.vue'),
    },
    {
      path: '/publishResources',
      name: 'groupInfo',
      component: () => import('../views/publishResources.vue'),
    },
    {
      path: '/Infoimport',
      name: 'Infoimport',
      component: () => import('../views/Infoimport.vue')
    },
  ],
})

export default router
