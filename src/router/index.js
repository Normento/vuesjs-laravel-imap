import { createRouter, createWebHistory } from 'vue-router';
import LoginView from '../views/LoginView.vue';
import FoldersView from '../views/FoldersView.vue';
import MessagesView from '../views/MessagesView.vue';
import MessageDetailView from '../views/MessageDetailView.vue';

const routes = [
  {
    path: '/',
    name: 'LoginView',
    component: LoginView,
  },
  {
    path: '/folders',
    name: 'FoldersView',
    component: FoldersView,
  },
  {
    path: '/folders/:folder_name/messages',
    name: 'MessagesView',
    component: MessagesView,
    props: true,
  },
  {
    path: '/folders/:folder_name/messages/:message_uid',
    name: 'MessageDetailView',
    component: MessageDetailView,
    props: true,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
