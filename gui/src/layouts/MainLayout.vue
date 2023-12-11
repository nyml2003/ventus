<script setup lang="ts">
function toGithub() {
  window.open('https://github.com/nyml2003');
}
</script>
<template>
  <q-layout view="hHh LpR fff" class="bg-grey-2">
    <q-header
      elevated
      class="header-container bg-transparent"
      style="backdrop-filter: blur(10px)"
    >
      <q-toolbar class="text-black justify-center">
        <q-tabs inline-label class="w-2/3" mobile-arrows outside-arrows>
          <q-route-tab exact icon="home" label="首页" to="/index" dense/>
          <q-route-tab exact icon="group" label="友链" to="/friend" dense/>
          <q-route-tab exact icon="menu_book" label="文章" to="/folder" dense/>
          <q-route-tab exact icon="videogame_asset" label="游戏" to="/game" dense/>
          <q-btn flat label="github" @click="toGithub" class="q-ml-md" dense/>
        </q-tabs>
      </q-toolbar>
    </q-header>
    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>
