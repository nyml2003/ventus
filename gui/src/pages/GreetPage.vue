<script setup lang="ts">
import { useRouter } from 'vue-router';
const router = useRouter();
function toChoose() {
  router.push('/game/choose/hero');
}
</script>
<template>
  <q-page class="flex flex-center">
    <q-btn @click="toChoose" label="请选择你的英雄" size="lg" />
  </q-page>
</template>
