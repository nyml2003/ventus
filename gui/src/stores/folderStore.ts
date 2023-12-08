import { defineStore } from 'pinia';
import { GetCatalogEvent, HeadList} from 'md-editor-v3';
import { reactive, ref } from 'vue';
export const useFolderStore = defineStore('folder', () => {
  const catalog = ref([] as HeadList[]);
  const setCatalog: GetCatalogEvent = (list) => {
    catalog.value = list;
  };
  const editorState = reactive({
    editorId: 'article-editor',
  });
  return {
    catalog,
    setCatalog,
    editorState,
  }
})
