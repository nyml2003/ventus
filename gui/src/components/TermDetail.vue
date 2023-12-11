<script setup lang="ts">
import { PropType,} from 'vue';
import { Term } from './models';
import { defineProps } from 'vue';
const props = defineProps({
  term : {
    type: Object as PropType<Term>,
    required: true,
  },
  label : {
    type: String,
    required: true,
  },
  id : {
    type: Number,
    required: true,
  },
  attribute: {
    type: String,
    required: true,
  },
  refreshAttribute: {
      type: Function as PropType<(id: number, attribute: string) => void>,
      required: true,
    },
    removeAttribute: {
      type: Function as PropType<(id: number, attribute: string) => void>,
      required: true,
    },
    upgradeAttribute: {
      type: Function as PropType<(id: number, attribute: string) => void>,
      required: true,
    },
});
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
function getEvaluaitionColor(value: number): string {
  return evaluationColors.find((color) => value >= color.level[0] && value < color.level[1])?.color ?? 'text-grey';
}
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
</script>

<template>
  <q-item>
      <q-item-section :class="levelColors[term.level].color">
        {{label}}
      </q-item-section>
      <q-item-section>
        <q-item-label :class="getEvaluaitionColor(term.evaluation)">
          {{term.value.toFixed(2)}}
          <q-btn flat dense round size="sm" icon="info" v-if="term.level>0" class="q-ml-sm">
            <q-menu class="non-selectable">
            <q-list class="w-full">
              <q-item>
                <q-item-section>等级</q-item-section>
                <q-item-section>{{term.level}}</q-item-section>
              </q-item>
              <q-item>
                <q-item-section>评分</q-item-section>
                <q-item-section>
                  <q-item-label :class="getEvaluaitionColor(
                    term.evaluation
                    )">
                    {{term.evaluation.toFixed(2)}}
                  </q-item-label>
                </q-item-section>
              </q-item>
              <q-item clickable v-ripple @click="refreshAttribute(props.id, props.attribute)" >
                <q-item-section>
                  <q-icon name="refresh" size="sm" />
                </q-item-section>
                <q-item-section >重塑</q-item-section>
              </q-item>
              <q-item clickable v-ripple @click="removeAttribute(props.id, props.attribute)">
                <q-item-section>
                  <q-icon name="delete" size="sm" />
                </q-item-section>
                <q-item-section>移除</q-item-section>
              </q-item>
              <q-item clickable v-ripple @click="upgradeAttribute(props.id, props.attribute)">
                <q-item-section>
                  <q-icon name="upgrade" size="sm" />
                </q-item-section>
                <q-item-section>升级</q-item-section>
              </q-item>
            </q-list>
          </q-menu>
          </q-btn>
        </q-item-label>
      </q-item-section>
    </q-item>
</template>
