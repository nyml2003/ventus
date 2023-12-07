<script lang="ts" setup>

import {Folder} from 'components/models';
import {onMounted, ref} from 'vue';
import ArticleCard from 'components/ArticleItem.vue';
import {getFolderDetail} from 'boot/axios/requests';
import {useRoute} from 'vue-router';

const route = useRoute();
const folderId = parseInt(route.params.id as string);
const folder = ref<Folder>({} as Folder);
onMounted(async () => {
  folder.value = await getFolderDetail(folderId);
  console.log(folder.value);
});

function gotoParent() {
  console.log('gotoParent');
}
</script>

<template>
  <q-page class="flex items-start justify-center">
    <q-card class="q-ma-md max-w-[1000px] overflow-auto rounded-3xl">
      <q-card-section class="flex items-center justify-start">
        <q-btn :label="folder.parent.name" class="q-mr-md" color="primary" flat icon="arrow_back" v-if="folder.parent" @click="gotoParent"/>
        <q-item-label class="text-h6">
          {{ folder.name }}
        </q-item-label>
      </q-card-section>
      <div>
        <ArticleCard v-for="article in folder.articles" :key="article.id" :article="article"/>
      </div>
    </q-card>
  </q-page>
</template>

<style scoped>
</style>
