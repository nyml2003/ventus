<script setup lang="ts">
import {defineProps, PropType} from 'vue';
import {FolderBrief} from "components/models";

const props=defineProps(
  {
   folder: {
     type: Object as PropType<FolderBrief>,
     required: true
   }
  }
)
</script>

<template>
<q-card class="q-ma-md">
  <q-card-section>
      <q-item-label class="text-h6">
        {{folder.name}}
      </q-item-label>
  </q-card-section>
  <q-card-section>
    324
  </q-card-section>
</q-card>
</template>

<style scoped>

</style>
