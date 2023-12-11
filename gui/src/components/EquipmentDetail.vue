<script setup lang="ts">
import {PropType, ref} from 'vue';
import { Equipment } from './models';
import TermDetail from './TermDetail.vue';
import { defineProps } from 'vue';
const props = defineProps(
  {
    equipment: {
      type: Object as PropType<Equipment>,
      required: true,
    },
    close: {
      type: Function as PropType<() => void>,
      required: true,
    },
    refreshEquipment: {
      type: Function as PropType<(id: number) => Promise<Equipment>>,
      required: true,
    },
    upgradeEquipment: {
      type: Function as PropType<(id: number) => Promise<Equipment>>,
      required: true,
    },
    refreshAttribute: {
      type: Function as PropType<(id: number, attribute: string) => Promise<Equipment>>,
      required: true,
    },
    removeAttribute: {
      type: Function as PropType<(id: number, attribute: string) => Promise<Equipment>>,
      required: true,
    },
    upgradeAttribute: {
      type: Function as PropType<(id: number, attribute: string) => Promise<Equipment>>,
      required: true,
    },
  }
)
const equipment = ref<Equipment>(props.equipment);

type EvaluationColor = {
  level: [number, number]
  color: string,
}

const evaluationColors: EvaluationColor[] = [
  {level: [0, 40], color: 'text-grey'},
  {level: [40, 60], color: 'text-green'},
  {level: [60, 80], color: 'text-blue'},
  {level: [80, 100], color: 'text-purple'},
  {level: [100, 120], color: 'text-orange'},
  {level: [120, 140], color: 'text-red'},
]

function getEvaluaitionColor(value: number): string {
  return evaluationColors.find((color) => value >= color.level[0] && value < color.level[1])?.color ?? 'text-grey';
}


function getTotalEvaluation(): number {
  return (
    equipment.value.attack.evaluation +
    equipment.value.attack_percent.evaluation +
    equipment.value.defense.evaluation +
    equipment.value.defense_percent.evaluation +
    equipment.value.health.evaluation +
    equipment.value.health_percent.evaluation +
    equipment.value.critical_rate.evaluation +
    equipment.value.critical_damage.evaluation
  ) / (
    (equipment.value.attack.value > 0 ? 1 : 0) +
    (equipment.value.attack_percent.value > 0 ? 1 : 0) +
    (equipment.value.defense.value > 0 ? 1 : 0) +
    (equipment.value.defense_percent.value > 0 ? 1 : 0) +
    (equipment.value.health.value > 0 ? 1 : 0) +
    (equipment.value.health_percent.value > 0 ? 1 : 0) +
    (equipment.value.critical_rate.value > 0 ? 1 : 0) +
    (equipment.value.critical_damage.value > 0 ? 1 : 0)
  )
}
async function refresh() {
  equipment.value = await props.refreshEquipment(equipment.value.id);
}
async function upgrade() {
  equipment.value = await props.upgradeEquipment(equipment.value.id);
}
async function _refreshAttribute(id: number, attribute: string) {
  equipment.value = await props.refreshAttribute(id, attribute);
}
async function _removeAttribute(id: number, attribute: string) {
  equipment.value = await props.removeAttribute(id, attribute);
}
async function _upgradeAttribute(id: number, attribute: string) {
  equipment.value = await props.upgradeAttribute(id, attribute);
}
</script>

<template>
<q-card class="w-full">
  <q-card-section>
    <q-item-label header>{{equipment.name}}</q-item-label>
  </q-card-section>
  <q-list bordered>
    <q-item>
      <q-item-section>等级</q-item-section>
      <q-item-section>{{equipment.level}}</q-item-section>
    </q-item>
    <q-item>
      <q-item-section>总评分</q-item-section>
      <q-item-section>
        <q-item-label :class="getEvaluaitionColor(getTotalEvaluation())">
          {{getTotalEvaluation()}}
        </q-item-label>
      </q-item-section>
    </q-item>
    <term-detail :term="equipment.attack" :label="'攻击'" :id="equipment.id" :attribute="'attack'" :refresh-attribute="_refreshAttribute" :remove-attribute="_removeAttribute" :upgrade-attribute="_upgradeAttribute" />
    <term-detail :term="equipment.attack_percent" :label="'攻击百分比'" :id="equipment.id" :attribute="'attack_percent'" :refresh-attribute="_refreshAttribute" :remove-attribute="_removeAttribute" :upgrade-attribute="_upgradeAttribute" />
    <term-detail :term="equipment.defense" :label="'防御'" :id="equipment.id" :attribute="'defense'" :refresh-attribute="_refreshAttribute" :remove-attribute="_removeAttribute" :upgrade-attribute="_upgradeAttribute" />
    <term-detail :term="equipment.defense_percent" :label="'防御百分比'" :id="equipment.id" :attribute="'defense_percent'" :refresh-attribute="_refreshAttribute" :remove-attribute="_removeAttribute" :upgrade-attribute="_upgradeAttribute" />
    <term-detail :term="equipment.health" :label="'生命值'" :id="equipment.id" :attribute="'health'" :refresh-attribute="_refreshAttribute" :remove-attribute="_removeAttribute" :upgrade-attribute="_upgradeAttribute" />
    <term-detail :term="equipment.health_percent" :label="'生命值百分比'" :id="equipment.id" :attribute="'health_percent'" :refresh-attribute="_refreshAttribute" :remove-attribute="_removeAttribute" :upgrade-attribute="_upgradeAttribute" />
    <term-detail :term="equipment.critical_rate" :label="'暴击率(%)'" :id="equipment.id" :attribute="'critical_rate'" :refresh-attribute="_refreshAttribute" :remove-attribute="_removeAttribute" :upgrade-attribute="_upgradeAttribute" />
    <term-detail :term="equipment.critical_damage" :label="'暴击伤害(%)'" :id="equipment.id" :attribute="'critical_damage'" :refresh-attribute="_refreshAttribute" :remove-attribute="_removeAttribute" :upgrade-attribute="_upgradeAttribute" />

  </q-list>
  <q-card-actions align="right">
    <q-btn label="升级" color="primary" @click="upgrade" />
    <q-btn label="重塑" color="primary" @click="refresh" />
    <q-btn label="关闭" color="primary" @click="close" />
  </q-card-actions>
</q-card>
</template>

<style scoped>

</style>
