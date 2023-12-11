import { defineStore } from 'pinia';
import { getCharacterById } from 'src/boot/axios/requests';
import { CharacterDetail, ExpectedDamageResult } from 'src/components/models';
import { ref } from 'vue';


export const useGameStore = defineStore('game', () => {
  const hero = ref({} as CharacterDetail);
  async function setHero(id: number) {
    hero.value = await getCharacterDetail(id);
  }
  function calculateExpectedDamage(
    attacker: CharacterDetail,
    defender: CharacterDetail
  ): ExpectedDamageResult {
    const attack = attacker.attack + attacker.extra_attack;
    const defense = defender.defense + defender.extra_defense;
    const hp = defender.health + defender.extra_health;
    const reduction_multiplier = attack / (attack + defense);
    const expected_critical_multiplier =
      (attacker.critical_rate * attacker.critical_damage) / 10000 + 1;
    const expected_damage =
      attack * reduction_multiplier * expected_critical_multiplier;
    const expected_damage_rate = expected_damage / hp * 100;
    const description = `伤害=${attack.toFixed(2)}*${reduction_multiplier.toFixed(2)}*${expected_critical_multiplier.toFixed(2)}=${expected_damage.toFixed(2)}，期望伤害率=${expected_damage_rate.toFixed(2)}%`;
    return {
      expectedDamageRate: expected_damage_rate.toFixed(2),
      description,
    };
  }

  async function getCharacterDetail(id: number) {
    const characterDetail = await getCharacterById(id);
    characterDetail.extra_attack = 0;
    characterDetail.attack_color = 'text-white';
    characterDetail.extra_attack_color = 'text-orange';
    characterDetail.extra_defense = 0;
    characterDetail.defense_color = 'text-white';
    characterDetail.extra_defense_color = 'text-orange';
    characterDetail.extra_health = 0;
    characterDetail.health_color = 'text-white';
    characterDetail.extra_health_color = 'text-orange';
    for (const equipment of characterDetail.equipments) {
      characterDetail.attack += equipment.attack.value;
      characterDetail.defense += equipment.defense.value;
      characterDetail.health += equipment.health.value;
      characterDetail.critical_rate += equipment.critical_rate.value;
      characterDetail.critical_damage += equipment.critical_damage.value;
    }
    for (const equipment of characterDetail.equipments) {
      characterDetail.extra_attack +=
        (equipment.attack_percent.value * characterDetail.attack) / 100;
      characterDetail.extra_defense +=
        (equipment.defense_percent.value * characterDetail.defense) / 100;
      characterDetail.extra_health +=
        (equipment.health_percent.value * characterDetail.health) / 100;
    }
    return characterDetail;
  }
  return {
    hero,
    setHero,
    calculateExpectedDamage,
    getCharacterDetail,
  };
});
