<script lang="ts" setup>
import {QCard, QCarousel} from 'quasar';
import {Ref, ref} from 'vue';
import { Character } from 'src/components/models';
import {getCharacterList} from 'src/boot/axios/requests';
const characters: Ref<Character[]> = ref([]);
import CharacterCard from 'components/CharacterCard.vue';
import { onMounted } from 'vue';
import { useGameStore } from 'src/stores/gameStore';
import { useRouter } from 'vue-router';
const router = useRouter();
const gameStore = useGameStore();
async function loadData() {
  characters.value = await getCharacterList();
  selectedCharacter.value = characters.value[0].id;
}
const selectedCharacter: Ref<number> = ref(0);
onMounted(async () => {
  await loadData();
});

async function choose() {
  await gameStore.setHero(selectedCharacter.value);
  router.push('/game/choose/enemy');
}
function nextCharacter() {
  carousel.value?.next();
}
function prevCharacter() {
  carousel.value?.previous();
}
const carousel = ref<QCarousel>();
</script>

<template>
  <q-page class="flex flex-center">
    <q-card class="rounded-3xl min-h-[80vh] flex items-start flex-col">
      <q-card-actions>
        <q-btn label="上一个" @click="prevCharacter" :disable="selectedCharacter === characters[0]?.id" />
        <q-btn label="下一个" @click="nextCharacter" :disable="selectedCharacter === characters[characters.length - 1]?.id" />
        <q-btn @click="choose" label="选择" />
      </q-card-actions>
      <q-card-section v-if="characters.length > 0">
        <q-carousel
        ref="carousel"
        v-model="selectedCharacter"
        transition-prev="scale"
        transition-next="scale"
        swipeable
        animated
        control-color="primary"
        control-size="2em"
      >
        <q-carousel-slide :name="character.id" v-for="character in characters" :key="character.id">
          <CharacterCard :id="character.id" />
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
