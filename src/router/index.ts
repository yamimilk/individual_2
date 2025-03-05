import { createRouter, createWebHistory } from 'vue-router'


import Form from '../pages/form/userData.vue'
import Other from '@/pages/other/test.vue'


export default createRouter({
  history: createWebHistory(),
  routes:[
    {
      path:'/form',
      component:Form
    },
    {
      path:'/other',
      component:Other
    },
  ]
})

