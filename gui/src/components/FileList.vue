<script setup lang="ts">
import { defineProps, onMounted,  ref } from 'vue';
import { FolderBase } from 'components/models';
import { getFileList } from 'src/boot/axios/requests';
import ArticleItem from './ArticleItem.vue';

const props = defineProps({
  id: {
    type: Number,
    required: true,
  },
});
const folder = ref<FolderBase>({} as FolderBase);
onMounted(async () => {
  folder.value = await getFileList(props.id);
});
const icon = ref('keyboard_arrow_right');
const isVisible = ref(false);
function toggleVisibility() {
  isVisible.value = !isVisible.value;
  if (isVisible.value) {
    icon.value = 'keyboard_arrow_down';
  } else {
    icon.value = 'keyboard_arrow_right';
  }
}
</script>

<template>
  <q-list>
    <q-item clickable v-ripple exact dense @click="toggleVisibility" class="q-pa-none">
      <q-item-section avatar class="q-pa-none">
        <div class="row items-center">
          <q-icon :name="icon" size="sm" />
          <q-icon name="folder" size="sm" />
        </div>
      </q-item-section>
      <q-item-section>
        <q-item-label>{{ folder.name }}</q-item-label>
      </q-item-section>
    </q-item>
    <q-item
      v-if="isVisible && folder.articles.length > 0"
      class="q-pa-none q-pl-lg"
      dense
    >
      <q-item-section>
        <ArticleItem
          v-for="child in folder.articles"
          :id="child.id"
          :key="child.id"
          :title="child.title"
        />
      </q-item-section>
    </q-item>
    <q-item
      v-if="isVisible && folder.folders.length > 0"
      class="q-pa-none q-pl-lg"
      dense
    >
      <q-item-section>
        <FileList
          v-for="child in folder.folders"
          :id="child.id"
          :key="child.id"
        />
      </q-item-section>
    </q-item>
  </q-list>
</template>
