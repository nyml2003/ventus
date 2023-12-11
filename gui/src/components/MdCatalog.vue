<script setup lang="ts">
import { defineProps} from 'vue';
import { HeadList } from 'md-editor-v3';
const props = defineProps({
  catalog : {
    type: Array as () => HeadList[],
    required: true,
  },
});
async function gotoItem(item: HeadList) {
  document.body.classList.remove('q-body--prevent-scroll');
  document.body.classList.remove('q-body--force-scrollbar-y');
  const element = document.getElementById(item.text);
  if (element) {
    element.scrollIntoView({ behavior: 'smooth' });
  }
}
</script>

<template>
<q-list class="q-pa-none">
  <q-item
    v-for="item in props.catalog"
    :key="item.text"
    clickable
    active-class="bg-primary text-white"
    v-ripple
    @click="gotoItem(item)"
  >
    <q-item-section>
      <q-item-label :class="
      {
        'pl-0': item.level === 1,
        'pl-4': item.level === 2,
        'pl-8': item.level === 3,
        'pl-12': item.level === 4,
        'pl-16': item.level === 5,
        'pl-20': item.level === 6,
      }
      ">
        {{ item.text }}</q-item-label>
    </q-item-section>
  </q-item>
  <q-item v-if="props.catalog.length === 0" class="text-center">
    <q-icon name="hourglass_empty" size="16px" />
    <q-item-label>暂无大纲</q-item-label>
  </q-item>
</q-list>
</template>
