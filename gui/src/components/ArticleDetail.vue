<script setup lang="ts">
import { getArticleById } from 'src/boot/axios/requests';
import { onMounted, onUpdated, ref } from 'vue';
import { useRoute } from 'vue-router';
import { MdPreview } from 'md-editor-v3';
import { ArticleDetail } from './models';
import { useFolderStore } from 'src/stores/folderStore';
const foldeStore = useFolderStore();
import 'md-editor-v3/lib/preview.css';
const route = useRoute();
const article = ref<ArticleDetail>({} as ArticleDetail);
const id = ref(parseInt(route.params.id as string));
onMounted(async () => {
  article.value = await getArticleById(id.value);
});
onUpdated(async () => {
  if (id.value !== parseInt(route.params.id as string)) {
    id.value = parseInt(route.params.id as string);
    article.value = await getArticleById(id.value);
  }
});
</script>

<template>
  <q-page class="flex items-start justify-center relative">
    <q-card class="q-ma-md w-[700px]">
      <q-card-section>
        <q-item>
          <q-item-section>
            <q-item-label>{{ article.title }}</q-item-label>
            <q-item-label caption>
              作者：
              <q-avatar size="sm">
                <img :src="article.author?.avatarUrl" />
              </q-avatar>
              {{ article.author?.name }}
            </q-item-label>
          </q-item-section>
        </q-item>
      </q-card-section>
      <q-separator />
      <q-card-section>
        <q-item>
          <q-item-section>
            <MdPreview
              :editorId="foldeStore.editorState.editorId"
              :modelValue="article.content"
              :onGetCatalog="foldeStore.setCatalog"
              previewTheme="github"
            />
          </q-item-section>
        </q-item>
      </q-card-section>
    </q-card>
  </q-page>
</template>
