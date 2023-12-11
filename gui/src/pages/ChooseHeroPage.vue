<script lang="ts" setup>
import {QCard} from 'quasar';
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
</script>

<template>
  <q-page class="flex flex-center">
    <q-card class="rounded-3xl min-h-[80vh] flex flex-center flex-col">
      <q-card-actions>
        <q-btn @click="choose" label="选择" />
      </q-card-actions>
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
