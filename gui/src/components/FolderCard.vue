<script lang="ts" setup>
import { getFileList } from 'src/boot/axios/requests';
import { onUpdated, ref } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { Folder } from './models';
import { onMounted } from 'vue';
const route = useRoute();
const id = ref(parseInt(route.params.id as string));
const router = useRouter();
const folder = ref({} as Folder);
async function gotoParent() {
  // parent == {} means this folder is root folder
  if (folder.value.id === 0) {
    router.push('/folder/index');
    return;
  }
  router.push(`/folder/detail/${folder.value.parent?.id}`);
}
async function gotoFolder(id: number) {
  router.push(`/folder/detail/${id}`);
}
async function gotoArticle(id: number) {
  router.push(`/folder/article/${id}`);
}
onMounted(async () => {
  folder.value = await getFileList(id.value);
});
onUpdated(async() => {
  if (id.value !== parseInt(route.params.id as string)) {
    id.value = parseInt(route.params.id as string);
    folder.value =  await getFileList(id.value);
  }
});
function isFolderEmpty() {
  if (folder.value.hasOwnProperty('folders') && folder.value.folders.length > 0) {
    return false;
  }
  if (folder.value.hasOwnProperty('articles') && folder.value.articles.length > 0) {
    return false;
  }
  return true;
}
</script>

<template>
  <q-page class="flex items-start justify-center">
    <q-card class="q-ma-md w-[700px] rounded-3xl min-h-[95vh]">
      <q-card-section class="flex items-center justify-start">
        <q-btn :label="folder.parent?.name " class="q-mr-md" color="primary" flat icon="arrow_back" v-if="folder.parent" @click="gotoParent"/>
        <q-item-label class="text-h6">
          {{ folder.name }}
        </q-item-label>
      </q-card-section>
      <q-separator />
      <q-card-section>
        <q-list class="desktop-only">
          <q-item
            v-for="child in folder.folders"
            :key="child.id"
            clickable
            v-ripple
            @click="gotoFolder(child.id)"
          >
            <q-item-section avatar>
                <q-icon name="folder" size="xl" />
            </q-item-section>
            <q-item-section>
              <q-item-label>
                <div class="text-h6 text-weight-bolder">
                  {{ child.name }}
                </div>
              </q-item-label>
              <q-item-label caption>
                {{ child.articleCount }} 篇文章,
                {{ child.folderCount }} 个子文件夹

              </q-item-label>

            </q-item-section>
            <q-item-section side top>
              <q-item-label caption>
                更新时间：
                {{ new Date(child.updateTime).toLocaleString() }}
              </q-item-label>
            </q-item-section>
          </q-item>
          <q-item
            v-for="child in folder.articles"
            :key="child.id"
            clickable
            v-ripple
            @click="gotoArticle(child.id)"
          >
            <q-item-section avatar >
                <q-icon name="article" size="xl" />
            </q-item-section>
            <q-item-section>
              <q-item-label>
                <div class="text-h6 text-weight-bolder">
                  {{ child.title }}<q-chip v-for="(tag,id) in child.tags" :key="id" :label="tag.name" />
                </div>
              </q-item-label>
              <q-item-label caption lines="2">{{ child.brief }}</q-item-label>
            </q-item-section>
            <q-item-section side top>
              <q-item-label caption>
                作者：
                <q-avatar size="sm">
                  <img :src="child.author?.avatarUrl" />
                </q-avatar>
                {{ child.author?.name }}
              </q-item-label>
              <q-item-label caption>
                更新时间：
                {{ new Date(child.updateTime).toLocaleString() }}
              </q-item-label>
            </q-item-section>
          </q-item>
        </q-list>
        <q-list class="mobile-only">
          <q-item
            v-for="child in folder.folders"
            :key="child.id"
            clickable
            v-ripple
            @click="gotoFolder(child.id)"
          >
            <q-item-section avatar>
                <q-icon name="folder" size="xl" />
            </q-item-section>
            <q-item-section>
              <q-item-label>
                <div class="text-h6 text-weight-bolder">
                  {{ child.name }}
                </div>
              </q-item-label>
              <q-item-label caption>
                {{ child.articleCount }} 篇文章,
                {{ child.folderCount }} 个子文件夹
              </q-item-label>
            </q-item-section>
          </q-item>
          <q-item
            v-for="child in folder.articles"
            :key="child.id"
            clickable
            v-ripple
            @click="gotoArticle(child.id)"
          >
            <q-item-section avatar >
                <q-icon name="article" size="xl" />
            </q-item-section>
            <q-item-section>
              <q-item-label>
                <div class="text-caption text-weight-bolder">
                  {{ child.title }}<q-chip v-for="(tag,id) in child.tags" :key="id" :label="tag.name" size="sm" />
                </div>
              </q-item-label>
              <q-item-label caption lines="2">{{ child.brief }}</q-item-label>
              <q-item-label caption>
                作者：
                <q-avatar size="sm">
                  <img :src="child.author?.avatarUrl" />
                </q-avatar>
                {{ child.author?.name }}
              </q-item-label>
              <q-item-label caption>
                更新时间：
                {{ new Date(child.updateTime).toLocaleString() }}
              </q-item-label>
            </q-item-section>
          </q-item>
        </q-list>
        <div v-if="isFolderEmpty()" class="flex items-center justify-center">
          <q-item-label class="text-h6">空空如也</q-item-label>
        </div>
      </q-card-section>
    </q-card>
  </q-page>
</template>

<style scoped>
</style>
