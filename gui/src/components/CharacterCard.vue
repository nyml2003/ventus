<script lang="ts" setup>
import {QCard} from 'quasar';
import EquipmentDetail from 'components/EquipmentDetail.vue';
import {defineProps, onMounted, ref, Ref} from 'vue';
import {
  refreshAttribute,
  removeAttribute,
  upgradeAttribute,
  refreshEquipment,
  upgradeEquipment
} from 'src/boot/axios/requests';
import { useGameStore } from 'src/stores/gameStore';
import { ExpectedDamageResult } from './models';
const gameStore = useGameStore();
const props = defineProps(
  {
    id: {
      type: Number,
      required: true,
    },
    isHeroExist: {
      type: Boolean,
      required: false,
      default: false,
    },
  }
)
const character = ref<CharacterDetail>({} as CharacterDetail);
type Term = {
  value: number,
  evaluation: number,
  level: number,
}

type Equipment = {
  id: number,
  level: number,
  name: string,
  attack: Term,
  attack_percent: Term,
  defense: Term,
  defense_percent: Term,
  health: Term,
  health_percent: Term,
  critical_rate: Term,
  critical_damage: Term
}

type Character = {
  id: number,
  name: string,
  level: number,
  birth: Date,
  attack: number,
  defense: number,
  health: number,
  critical_rate: number,
  critical_damage: number,
  card: QCard | null,
  equipments: Equipment[],
}
type CharacterDetail = Character & {
  extra_attack: number,
  base_attack_color: string,
  attack_color: string,
  extra_attack_color: string,
  extra_defense: number,
  base_defense_color: string,
  defense_color: string,
  extra_defense_color: string,
  extra_health: number,
  base_health_color: string,
  health_color: string,
  extra_health_color: string,
}


type EquipmentDetailConfig = {
  equipment: Equipment,
  close: () => void,
  open: (equipment: Equipment) => void,
  show: boolean,
  refreshEquipment: (id: number) => Promise<Equipment>,
  upgradeEquipment: (id: number) => Promise<Equipment>,
  refreshAttribute: (id: number, attribute: string) => Promise<Equipment>,
  removeAttribute: (id: number, attribute: string) => Promise<Equipment>,
  upgradeAttribute: (id: number, attribute: string) => Promise<Equipment>,
}
const equipmentDetailConfig: Ref<EquipmentDetailConfig> = ref({
  equipment: {} as Equipment,
  close: async() => {
    equipmentDetailConfig.value.show = false;
    character.value=await gameStore.getCharacterDetail(props.id);
  },
  open: async (equipment: Equipment) => {
    equipmentDetailConfig.value.equipment = equipment;
    equipmentDetailConfig.value.show = true;
  },
  show: false,
  refreshEquipment: async (id: number) => {
    const newEquipment=await refreshEquipment(id);
    await update();
    return newEquipment;
  },
  upgradeEquipment: async (id: number) => {
    const newEquipment=await upgradeEquipment(id);
    await update();
    return newEquipment
  },
  refreshAttribute: async (id: number, attribute: string) => {
    const newEquipment=await refreshAttribute(id, attribute);
    await update();
    return newEquipment;
  },
  removeAttribute: async (id: number, attribute: string) => {
    const newEquipment=await removeAttribute(id, attribute);
    await update();
    return newEquipment;
  },
  upgradeAttribute: async (id: number, attribute: string) => {
    const newEquipment=await upgradeAttribute(id, attribute);
    await update();
    return newEquipment;
  },
})
type LevelColor = {
  level: number
  color: string,
}
const levelColors: LevelColor[] = [
  {level: 0, color: 'text-grey'},
  {level: 1, color: 'text-grey-8'},
  {level: 2, color: 'text-green'},
  {level: 3, color: 'text-green-8'},
  {level: 4, color: 'text-blue'},
  {level: 5, color: 'text-blue-8'},
  {level: 6, color: 'text-purple'},
  {level: 7, color: 'text-purple-8'},
  {level: 8, color: 'text-orange'},
  {level: 9, color: 'text-orange-8'},
  {level: 10, color: 'text-red'},
]
const defenderDamage: Ref<ExpectedDamageResult> = ref({} as ExpectedDamageResult);
const attackerDamage: Ref<ExpectedDamageResult> = ref({} as ExpectedDamageResult);
onMounted(
  async () => {
    await update();
  }
)
async function update() {
  character.value=await gameStore.getCharacterDetail(props.id)
  if (props.isHeroExist) {
    defenderDamage.value = gameStore.calculateExpectedDamage(gameStore.hero, character.value);
    attackerDamage.value = gameStore.calculateExpectedDamage(character.value, gameStore.hero);
  }
}
</script>

<template>
  <q-dialog v-model="equipmentDetailConfig.show"  persistent class="non-selectable">
    <EquipmentDetail :close="equipmentDetailConfig.close" :equipment="equipmentDetailConfig.equipment"
    :refresh-equipment="equipmentDetailConfig.refreshEquipment"
    :upgrade-equipment="equipmentDetailConfig.upgradeEquipment"
    :refresh-attribute="equipmentDetailConfig.refreshAttribute"
    :remove-attribute="equipmentDetailConfig.removeAttribute"
    :upgrade-attribute="equipmentDetailConfig.upgradeAttribute"
    />
  </q-dialog>
  <q-card flat class="non-selectable">
    <q-card-section>
      <q-item>
        <q-item-section>
          <q-item-label>{{ character.name }}</q-item-label>
        </q-item-section>
      </q-item>
    </q-card-section>
    <q-card-section>
      <q-item>
        <q-item-section>
          <q-item-label>等级</q-item-label>
        </q-item-section>
        <q-item-section side>
          <q-item-label>{{ character.level }}</q-item-label>
        </q-item-section>
      </q-item>
      <q-item>
        <q-item-section>
          <q-item-label>生命值</q-item-label>
        </q-item-section>
        <q-item-section side>
          <q-item-label>
            {{ (character.health + character.extra_health).toFixed(2) }}
            <q-tooltip>
              <span :class="character.health_color">{{ character.health }}</span>
              +
              <span :class="character.extra_health_color">
                {{ character.extra_health }}
              </span>
            </q-tooltip>
          </q-item-label>
        </q-item-section>
      </q-item>
      <q-item>
        <q-item-section>
          <q-item-label>攻击力</q-item-label>
        </q-item-section>
        <q-item-section side>
          <q-item-label>
            {{ (character.attack + character.extra_attack).toFixed(2) }}
            <q-tooltip>
              <span :class="character.attack_color">{{ character.attack }}</span>
              +
              <span :class="character.extra_attack_color">
                {{ character.extra_attack }}
              </span>
            </q-tooltip>
          </q-item-label>
        </q-item-section>
      </q-item>
      <q-item>
        <q-item-section>
          <q-item-label>防御力</q-item-label>
        </q-item-section>
        <q-item-section side>
          <q-item-label>
            {{ (character.defense + character.extra_defense).toFixed(2) }}
            <q-tooltip>
              <span :class="character.defense_color">{{ character.defense }}</span>
              +
              <span :class="character.extra_defense_color">
                {{ character.extra_defense }}
              </span>
            </q-tooltip>
          </q-item-label>
        </q-item-section>
      </q-item>
      <q-item>
        <q-item-section>
          <q-item-label>暴击率</q-item-label>
        </q-item-section>
        <q-item-section side>
          <q-item-label>{{ character.critical_rate?.toFixed(2)}}%</q-item-label>
        </q-item-section>
      </q-item>
      <q-item>
        <q-item-section>
          <q-item-label>暴击伤害</q-item-label>
        </q-item-section>
        <q-item-section side>
          <q-item-label>{{ character.critical_damage?.toFixed(2)}}%</q-item-label>
        </q-item-section>
      </q-item>
      <q-item>
        <q-item-section>
          <q-item-label>装备</q-item-label>
        </q-item-section>
        <q-item-section side>
          <q-list >
            <q-item v-for="equipment in character.equipments" :key="equipment.id" clickable v-ripple
            @click="equipmentDetailConfig.open(equipment)" :class="levelColors[equipment.level].color ">
              {{ equipment.name }}
            </q-item>
          </q-list>
        </q-item-section>
      </q-item>
      <q-item v-if="props.isHeroExist">
        <q-item-section>
          <q-item-label> 作为防守方，预计受到的期望伤害</q-item-label>
        </q-item-section>
        <q-item-section side>
          <q-item-label>
            <q-tooltip>
              {{ defenderDamage.description}}
            </q-tooltip>
            {{ defenderDamage.expectedDamageRate}}%
          </q-item-label>
        </q-item-section>

      </q-item>
      <q-item v-if="props.isHeroExist">
          <q-item-section>
            <q-item-label> 作为进攻方，对于你的期望伤害</q-item-label>
          </q-item-section>
          <q-item-section side>
            <q-item-label>
              <q-tooltip>
                {{ attackerDamage.description}}
              </q-tooltip>
              {{ attackerDamage.expectedDamageRate}}%
            </q-item-label>
          </q-item-section>
          </q-item>
    </q-card-section>
  </q-card>
</template>

<style scoped>

</style>
