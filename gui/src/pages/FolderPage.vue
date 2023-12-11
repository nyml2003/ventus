<script setup lang="ts">
import { ref } from 'vue';
import FolderList from 'src/components/FolderList.vue';
import { TouchPanValue, useQuasar } from 'quasar';
import MdCatalog from 'src/components/MdCatalog.vue';
const $q = useQuasar();
const splitter = ref(200);
const handleTouchPan: TouchPanValue = async (details) => {
  if (details.isFinal && (
    details.direction === 'left' || (
      details.direction === 'right' &&
      details?.position?.left &&
      details.position.left < 200)
    )){
    splitter.value = 0;
    foldeStore.isDrawerOpen = false;
  }
  if (details.isFinal && details.direction === 'right' && details?.position?.left && details.position.left < 200) {
    splitter.value = 200;
    foldeStore.isDrawerOpen = true;
  }
  if (
    $q.platform.is.desktop &&
    details?.position?.left &&
    details.position.left >= 200 &&
    details.position.left <= window.innerWidth /3
  ) {
    foldeStore.isDrawerOpen = true;
    splitter.value = details?.position?.left || 0;
  }
};
function toggleDrawer() {
  foldeStore.isDrawerOpen = !foldeStore.isDrawerOpen;
  splitter.value = foldeStore.isDrawerOpen ? 200 : 0;
}
const tab = ref<Tab>({ label: '文件', name: 'file' });
interface Tab {
  label: '文件' | '大纲';
  name: 'file' | 'catalog';
}
const foldeStore = useFolderStore();
import { useFolderStore } from 'src/stores/folderStore';
</script>

<template>
  <q-page>
  <q-drawer class="bg-blue-grey-2" :width="splitter" v-model="foldeStore.isDrawerOpen" persistent>
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
      <q-tab-panels v-model="tab.name" class="bg-blue-grey-2" keep-alive>
        <q-tab-panel name="file">
          <FolderList :id="0" />
        </q-tab-panel>
        <q-tab-panel name="catalog">
          <MdCatalog :catalog="foldeStore.catalog" />
        </q-tab-panel>
      </q-tab-panels>
    </q-drawer>
      <q-page-sticky class="z-top" position="left" :offset="[-16.8, 0]">
        <q-btn
          dense
          round
          color="primary"
          icon="menu"
          class="desktop-only"
          v-touch-pan.horizontal.prevent.mouse="handleTouchPan"
          @click="toggleDrawer"
        />
      </q-page-sticky>
      <router-view />
      </q-page>
</template>
