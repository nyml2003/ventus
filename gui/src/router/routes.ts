import { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    redirect: '/folder',
  },
  {
    path: '/folder',
    component: () => import('layouts/FolderLayout.vue'),
    children: [
      {
        path: '',
        component: () => import('components/indexPage.vue'),
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

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'),
  },
];

export default routes;
