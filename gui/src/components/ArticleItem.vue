<script lang="ts" setup>
import {ArticleBase} from 'components/models';
import { getArticleById } from 'src/boot/axios/requests';
import {defineProps, onMounted, ref} from 'vue';

const props = defineProps({
  id: {
    type: Number,
    required: true,
  },
});
const article = ref<ArticleBase>({} as ArticleBase);
const getArticle = async () => {
  article.value = await getArticleById(props.id);
}
onMounted(async() => {
  await getArticle();
});
const showArticle = () => {
  console.log(article.value);
  isShow.value = !isShow.value;
}
const isShow = ref(false);
</script>

<template>
  <q-list>
    <q-item clickable v-ripple exact dense @click="showArticle" class="q-pa-none">
      <q-item-section avatar class="q-pa-none">
        <div class="row items-center">
          <q-icon name="null" size="sm" />
          <q-icon name="article" size="sm" />
        </div>
      </q-item-section>
      <q-item-section>
        <q-item-label>{{ article.title }}</q-item-label>
      </q-item-section>
    </q-item>
  </q-list>
</template>

<style scoped>
</style>
