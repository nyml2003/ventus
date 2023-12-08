<script setup lang="ts">
import { ref } from 'vue';
import FileList from 'src/components/FileList.vue';
import { TouchPanValue, useQuasar } from 'quasar';
import { useFolderStore } from 'src/stores/folderStore';
import { MdCatalog } from 'md-editor-v3';
const foldeStore = useFolderStore();
const $q = useQuasar();
const splitter = ref(200);
const handleTouchPan: TouchPanValue = async (details) => {
  if (
    $q.platform.is.desktop &&
    details?.position?.left &&
    details.position.left >= 0 &&
    details.position.left <= window.innerWidth - 700
  ) {
    splitter.value = details?.position?.left || 0;
  }
};
const isDrawerOpen = ref($q.platform.is.desktop);
interface Tab {
  label: '文件' | '大纲';
  name: 'file' | 'catalog';
}
const tab = ref<Tab>({ label: '文件', name: 'file' });
const scrollElement = ref<HTMLElement>(document.documentElement);
const beginScroll = () => {
  document.body.classList.remove('q-body--prevent-scroll');
};
</script>
<template>
  <q-layout class="shadow-2 rounded-borders" view="hHh LpR fff" >
    <q-header>
      <q-toolbar>
        <q-btn
          dense
          round
          color="primary"
          icon="menu"
          class="mobile-show desktop-hide"
          v-touch-pan.horizontal.prevent.mouse="handleTouchPan"
        />
        <q-toolbar-title>Folder</q-toolbar-title>
        <q-space />
        <q-btn
          dense
          round
          color="primary"
          icon="menu"
          class="desktop-show mobile-hide"
          v-touch-pan.horizontal.prevent.mouse="handleTouchPan"
        />
      </q-toolbar>
    </q-header>
    <q-drawer class="bg-blue-grey-2" :width="splitter" v-model="isDrawerOpen">
      <q-tabs
        v-model="tab.name"
        class="bg-blue-grey-2"
        active-color="primary"
        indicator-color="primary"
        align="left"
        vertical-panes
      >
        <q-tab name="file" icon="folder" label="文件"> </q-tab>
        <q-tab name="catalog" icon="list" label="大纲" />
      </q-tabs>
      <q-separator />
      <q-tab-panels
      v-model="tab.name"
      class="bg-blue-grey-2"
      keep-alive
      >
        <q-tab-panel name="file">
          <FileList :id="0" />
        </q-tab-panel>
        <q-tab-panel name="catalog">
          <MdCatalog :catalog="foldeStore.catalog" :editorId="foldeStore.editorState.editorId" :scrollElement="scrollElement" @click="beginScroll" />
        </q-tab-panel>
      </q-tab-panels>
    </q-drawer>
    <q-page-container>
      <q-page-sticky class="z-top" position="left" :offset="[-16.8, 0]">
        <q-btn
          dense
          round
          color="primary"
          icon="menu"
          class="desktop-show mobile-hide"
          v-touch-pan.horizontal.prevent.mouse="handleTouchPan"
        />
      </q-page-sticky>
      <router-view />
    </q-page-container>
  </q-layout>
</template>
