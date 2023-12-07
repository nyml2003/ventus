import { defineStore } from 'pinia';
import {ref} from 'vue';

export const useFolderStore = defineStore('folder', ()=>{
  const isMini = ref<boolean>(true);
  function toggleMini(){
    isMini.value = !isMini.value;
  }
  function setMini(){
    isMini.value = true;
  }
  function setFull(){
    isMini.value = false;
  }
  return {
    isMini,
    toggleMini,
    setMini,
    setFull,
  }
})
