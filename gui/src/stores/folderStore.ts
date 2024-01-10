import { defineStore } from 'pinia';
import { GetCatalogEvent, HeadList} from 'md-editor-v3';
import { reactive, ref } from 'vue';
import { useQuasar } from 'quasar';

export const useFolderStore = defineStore('folder',() => {
  const catalog = ref([] as HeadList[]);
  const setCatalog: GetCatalogEvent = (list) => {
    catalog.value = list;
  };
  const resetCatalog = () => {
    catalog.value = [];
  }
  const $q = useQuasar();
  const editorState = reactive({
    editorId: 'article-editor',
  });
  const isDrawerOpen = ref(true);
  const toggleDrawer = () => {
    isDrawerOpen.value = !isDrawerOpen.value;
  }
  const openDrawer = () => {
    isDrawerOpen.value = true;
  }
  const closeDrawer = () => {
    isDrawerOpen.value = false;
  }
  return {
    catalog,
    setCatalog,
    editorState,
    isDrawerOpen,
    toggleDrawer,
    openDrawer,
    closeDrawer,
    resetCatalog,
  }
})
