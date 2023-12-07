<script lang="ts" setup>
import { useFolderStore } from 'stores/folderStore';
import { FolderBase } from 'components/models';
import { onMounted, ref } from 'vue';
import FileList from 'src/components/FileList.vue';
const folderStore = useFolderStore();
const spilitter = ref(200);
</script>
<template>
  <q-layout class="shadow-2 rounded-borders" view="lHh lpr lFf">
    <q-splitter
      v-model="spilitter"
      side="left"
      unit="px"
    >
    <template #before>
      <q-scroll-area style="height: 100vh" class="bg-blue-grey-1">
        <FileList :id="0"/>
      </q-scroll-area>
    </template>
    <template #after>
      123
    </template>
    <template #separator>
      <q-avatar color="primary" text-color="white" size="40px" icon="drag_indicator" />
    </template>
    </q-splitter>
  </q-layout>
</template>
