import { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    redirect: '/index',
    children: [
      {
        path: 'index',
        component: () => import('pages/IndexPage.vue'),
      },
      {
        path: 'folder',
        redirect: '/folder/detail/0',
        component: () => import('pages/FolderPage.vue'),
        children: [
          {
            path: 'detail/:id',
            component: () => import('components/FolderCard.vue'),
          },
          {
            path: 'article',
            children: [
              {
                path: ':id',
                component: () => import('components/ArticleDetail.vue'),
              },
            ],
          },
        ],
      },
      {
        path: 'friend',
        component: () => import('pages/FriendPage.vue'),
      },
      {
        path: 'game',
        children: [
          {
            path: '',
            component: () => import('pages/GreetPage.vue'),
          },
          {
            path: 'choose/hero',
            component: () => import('pages/ChooseHeroPage.vue'),
          },
          {
            path: 'choose/enemy',
            component: () => import('pages/ChooseEnemyPage.vue'),
          },
        ],
      },
    ],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'),
  },
];

export default routes;
