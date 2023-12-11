import json
import os

from django.http import JsonResponse

import ventus.settings as settings
from .core import create_character, INITIAL_CHARACTER_COUNT
from .model import CharacterInstance, CharacterPrototype, EquipmentInstance, EquipmentPrototype
from .serializer import CharacterInstanceSerializer, EquipmentInstanceSerializer, CharacterInstanceBaseSerializer


# Create your views here.
def init(request):
    CharacterInstance.objects.all().delete()
    CharacterPrototype.objects.all().delete()
    EquipmentInstance.objects.all().delete()
    EquipmentPrototype.objects.all().delete()
    # 初始化角色
    filename = os.path.join(settings.STATIC_URL, "equipments.json")
    with open(filename, "r", encoding="utf-8") as f:
        equipments = json.load(f)
        for equipment in equipments:
            EquipmentPrototype.objects.create(
                name=equipment.get("name")
            )
    # 初始化装备
    filename = os.path.join(settings.STATIC_URL, "characters.json")
    with open(filename, "r", encoding="utf-8") as f:
        characters = json.load(f)
        for character in characters:
            CharacterPrototype.objects.create(
                name=character.get("name")
            )
    for i in range(INITIAL_CHARACTER_COUNT):
        create_character()
    return JsonResponse(
        CharacterInstanceSerializer(CharacterInstance.objects.all(), many=True).data,
        safe=False
    )


def get_character_list(request):
    return JsonResponse(
        CharacterInstanceBaseSerializer(CharacterInstance.objects.all(), many=True).data,
        safe=False
    )


def get_character_random(request, count):
    return JsonResponse(
        CharacterInstanceSerializer(CharacterInstance.objects.order_by("?").all()[:count], many=True).data,
        safe=False
    )


def get_single_character(request, character_id):
    return JsonResponse(
        CharacterInstanceSerializer(CharacterInstance.objects.get(id=character_id)).data,
        safe=False
    )


# 刷新一件装备的属性
def refresh_equipment(request, equipment_id):
    equipment = EquipmentInstance.objects.get(id=equipment_id)
    equipment.refresh()
    return JsonResponse(
        EquipmentInstanceSerializer(equipment).data
    )


# 刷新一件装备的某个属性
def refresh_equipment_attribute(request, equipment_id, attribute):
    equipment = EquipmentInstance.objects.get(id=equipment_id)
    equipment.refresh_attribute(attribute)
    return JsonResponse(
        EquipmentInstanceSerializer(equipment).data
    )


# 移除一件装备的某个属性
def remove_equipment_attribute(request, equipment_id, attribute):
    equipment = EquipmentInstance.objects.get(id=equipment_id)
    equipment.remove_attribute(attribute)
    if equipment.get_level() == 0:
        equipment.level_up()
    return JsonResponse(
        EquipmentInstanceSerializer(equipment).data
    )


# 给一件装备升级
def upgrade_equipment(request, equipment_id):
    equipment = EquipmentInstance.objects.get(id=equipment_id)
    equipment.level_up()
    return JsonResponse(
        EquipmentInstanceSerializer(equipment).data
    )


# 给一件装备的某个属性升级

def upgrade_equipment_attribute(request, equipment_id, attribute):
    equipment = EquipmentInstance.objects.get(id=equipment_id)
    equipment.level_up_attribute(attribute)
    return JsonResponse(
        EquipmentInstanceSerializer(equipment).data
    )
