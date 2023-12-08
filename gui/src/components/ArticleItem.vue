<script lang="ts" setup>
import {defineProps, ref} from 'vue';
import { useRouter } from 'vue-router';
const router = useRouter();
const props = defineProps({
  id: {
    type: Number,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
});
const title = ref(props.title);
const id = ref(props.id);
const showArticle = () => {
  router.push(`/folder/article/${id.value}`);
}
</script>

<template>
  <q-list>
    <q-item clickable v-ripple exact dense @click="showArticle" class="q-pa-none">
      <q-item-section avatar class="q-pa-none min-w-[32px]">
        <q-icon name="article" size="sm" />
      </q-item-section>
      <q-item-section>
        <q-item-label>{{ title }}</q-item-label>
      </q-item-section>
    </q-item>
  </q-list>
</template>

<style scoped>
</style>
