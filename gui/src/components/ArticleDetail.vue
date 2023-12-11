<script setup lang="ts">
import { getArticleById} from 'src/boot/axios/requests';
import { onMounted, onUpdated, ref } from 'vue';
import { useRoute } from 'vue-router';
import { MdPreview } from 'md-editor-v3';
import { ArticleDetail } from './models';
import { useFolderStore } from 'src/stores/folderStore';
import { useRouter } from 'vue-router';
const router = useRouter();
const folderStore = useFolderStore();
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
async function gotoParent() {
  router.push(`/folder/detail/${article.value.folder.id}`);
}
</script>

<template>
  <q-page class="flex items-start justify-center">
    <q-card class="q-ma-md w-[700px] rounded-3xl min-h-[90vh] desktop-only">
      <q-card-actions align="left">
        <q-btn
          flat
          color="primary"
          icon="arrow_back"
          label="返回"
          @click="gotoParent"
        />
      </q-card-actions>
      <q-card-section>
        <q-item>
          <q-item-section>
              <q-item-label class="text-h6 text-weight-bolder">
                  {{ article.title }}<q-chip v-for="(tag,id) in article.tags" :key="id" :label="tag.name" />
              </q-item-label>
            </q-item-section>
            <q-item-section side>
              <q-item-label caption>
                作者：
                <q-avatar size="sm">
                  <img :src="article.author?.avatarUrl" />
                </q-avatar>
                {{ article.author?.name }}
              </q-item-label>
              <q-item-label caption>
                更新时间：
                {{ new Date(article.updateTime).toLocaleString() }}
              </q-item-label>
            </q-item-section>
        </q-item>
      </q-card-section>
      <q-separator />
      <q-card-section>
        <q-item>
          <q-item-section>


            <MdPreview
              :editorId="folderStore.editorState.editorId"
              :modelValue="article.content"
              :onGetCatalog="folderStore.setCatalog"
              previewTheme="github"
            />
          </q-item-section>
        </q-item>
      </q-card-section>
    </q-card>
    <q-card class="mobile-only w-full overflow-auto" flat>
      <q-card-actions align="left">
        <q-btn
          flat
          color="primary"
          icon="arrow_back"
          label="返回"
          @click="gotoParent"
        />
      </q-card-actions>
      <q-card-section>
        <q-item class="q-pa-none">
          <q-item-section>
              <q-item-label class="text-h6 text-weight-bolder">
                  {{ article.title }}
              </q-item-label>
            </q-item-section>
            <q-item-section side>
              <q-item-label caption>
                作者：
                <q-avatar size="sm">
                  <img :src="article.author?.avatarUrl" />
                </q-avatar>
                {{ article.author?.name }}
              </q-item-label>
              <q-item-label caption>
                更新时间：
                {{ new Date(article.updateTime).toLocaleDateString() }}
              </q-item-label>
            </q-item-section>
        </q-item>
      </q-card-section>
      <q-separator />
      <q-card-section>
        <q-item class="q-pa-none">
          <q-item-section>
            <MdPreview
              :editorId="folderStore.editorState.editorId"
              :modelValue="article.content"
              :onGetCatalog="folderStore.setCatalog"
              previewTheme="github"
            />
          </q-item-section>
        </q-item>
      </q-card-section>
    </q-card>
  </q-page>
</template>
