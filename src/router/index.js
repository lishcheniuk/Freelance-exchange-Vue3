import { createRouter, createWebHistory } from 'vue-router';
const routes = [
  { path: '/', name: 'tasks', component: () => import('@/views/Tasks') },
  { path: '/task/:id', name: 'task', component: () => import('@/views/Task') },
  { path: '/new', name: 'new', component: () => import('@/views/New') },
  { path: '/:notFound(.*)', redirect: { name: 'tasks' } }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
  linkActiveClass: 'active'
});

export default router;
