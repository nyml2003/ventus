<script lang="ts" setup>
import {QCard} from 'quasar';
import {Ref, ref} from 'vue';
import { Character } from 'src/components/models';
import {getCharacterList} from 'src/boot/axios/requests';
const characters: Ref<Character[]> = ref([]);
import CharacterCard from 'components/CharacterCard.vue';
import { onMounted } from 'vue';
import { useGameStore } from 'src/stores/gameStore';
const gameStore = useGameStore();
import { useRouter } from 'vue-router';
const router = useRouter();
async function loadData() {
  characters.value = await getCharacterList();
  characters.value = characters.value.filter(
    (character) => character.id !== gameStore.hero.id
  );
  selectedCharacter.value = characters.value[0].id;
}
const selectedCharacter: Ref<number> = ref(0);
onMounted(async () => {
  await loadData();
});
if (gameStore.hero.id == undefined) {
  router.replace('/game');
}
</script>

<template>
  <q-page class="flex flex-center">
    <q-card class=" rounded-3xl min-h-[80vh] flex items-start justify-center">
      <q-card-section v-if="characters.length > 0">
        <q-carousel
        v-model="selectedCharacter"
        transition-prev="scale"
        transition-next="scale"
        swipeable
        animated
        class="full-height"
        arrows
        vertical
        infinite
        control-color="primary"
        control-size="2em"
      >
        <q-carousel-slide :name="character.id" v-for="character in characters" :key="character.id" >
          <CharacterCard :id="character.id" :isHeroExist="true" />
        </q-carousel-slide>
      </q-carousel>
      </q-card-section>
    </q-card>
    <div class="text-caption q-ma-md absolute-bottom text-center">
      本页面仅供演示，所有涉及的名字均由随机生成，与现实人物无关。
      所有数据均为符合正态分布的随机数, 无任何实际意义
    </div>
  </q-page>
</template>

<style scoped>

</style>
