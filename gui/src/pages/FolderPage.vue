<script setup lang="ts">
import { ref } from 'vue';
import FolderList from 'src/components/FolderList.vue';
import { TouchPanValue, useQuasar } from 'quasar';
import MdCatalog from 'src/components/MdCatalog.vue';
const $q = useQuasar();
const splitter = ref(200);
//目录宽度最小值为200，最大值为min(400,window.innerWidth / 3),可以监控窗口大小变化，动态调整
const drawerWidthInterval = ref(
    [
        200,
        Math.min(400, window.innerWidth / 2),
    ],
);
window.addEventListener('resize', () => {
    drawerWidthInterval.value = [
        200,
        Math.min(400, window.innerWidth / 2),
    ];
});
const handleTouchPan: TouchPanValue = async (details) => {
    if (details?.position?.left) {
        if (details.position.left < drawerWidthInterval.value[0]) {
            splitter.value = drawerWidthInterval.value[0];
        }
        else if (details.position.left > drawerWidthInterval.value[1]) {
          splitter.value = drawerWidthInterval.value[1];
        } else {
            splitter.value = details.position.left;
        }
    }
};
function toggleDrawer() {
    foldeStore.isDrawerOpen = !foldeStore.isDrawerOpen;
    splitter.value = foldeStore.isDrawerOpen ? 200 : 0;
}
const tab = ref<Tab>({ label: '文件', name: 'file' });
const spiltterIcon = ref('chevron_right');
interface Tab {
    label: '文件' | '大纲';
    name: 'file' | 'catalog';
}
const foldeStore = useFolderStore();
import { useFolderStore } from 'src/stores/folderStore';
const onMobileClick = () => {
    if ($q.platform.is.mobile) {
        foldeStore.isDrawerOpen = true;
        splitter.value = 200;
    }
};
const closeDrawer = async () => {
    foldeStore.isDrawerOpen = false;
    splitter.value = 0;
};
</script>

<template>
    <q-page>
        <q-drawer class="bg-blue-grey-2" :width="splitter" v-model="foldeStore.isDrawerOpen" elevated overlay persistent>
            <q-tabs v-model="tab.name" class="bg-blue-grey-2" active-color="primary" indicator-color="primary" align="left"
                vertical-panes>
                <q-tab name="file" icon="folder" label="文件"> </q-tab>
                <q-tab name="catalog" icon="list" label="大纲" :disable="foldeStore.catalog.length === 0"> </q-tab>
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
        <q-page-sticky class="z-top" position="left" :offset="[-20, 0]">
            <q-btn dense round color="primary" :icon="foldeStore.isDrawerOpen ? 'chevron_left' : 'chevron_right'" v-if="!foldeStore.isDrawerOpen"
            class="desktop-only" size="lg"
                v-touch-pan.horizontal.prevent.mouse="handleTouchPan" @click="toggleDrawer" />
        </q-page-sticky>
        <q-page-sticky class="z-top" position="left" :offset="[splitter-20, 0]">
              <q-btn dense round color="primary" :icon="foldeStore.isDrawerOpen ? 'chevron_left' : 'chevron_right'" v-if="foldeStore.isDrawerOpen"
              class="desktop-only" size="lg"
                  v-touch-pan.horizontal.prevent.mouse="handleTouchPan" @click="toggleDrawer" />
          </q-page-sticky>
        <router-view >

        </router-view>
    </q-page>
</template>
