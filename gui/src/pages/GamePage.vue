<script lang="ts" setup>
import {QCard} from 'quasar';
import {Ref, ref} from 'vue';
import { Character } from 'src/components/models';
import {getCharacterList} from 'src/boot/axios/requests';
const characters: Ref<Character[]> = ref([]);
import CharacterCard from 'components/CharacterCard.vue';
import { onMounted } from 'vue';
async function loadData() {
  characters.value = await getCharacterList();
  selectedCharacter.value = characters.value[0].id;
}
const selectedCharacter: Ref<number> = ref(0);
onMounted(async () => {
  await loadData();
});

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
        <q-carousel-slide :name="character.id" v-for="character in characters" :key="character.id">
          <CharacterCard :id="character.id" />
        </q-carousel-slide>
      </q-carousel>
      </q-card-section>
    </q-card>
  </q-page>
</template>

<style scoped>

</style>
