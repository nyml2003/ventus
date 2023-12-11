from django.urls import path

import game.views

urlpatterns = [
    path("init/", game.views.init, name="init"),
    path("character/list", game.views.get_character_list, name="character_list"),
    path("character/random/<int:count>", game.views.get_character_random, name="character_random"),
    path("character/<int:character_id>", game.views.get_single_character, name="single_character"),
    path("equipment/<int:equipment_id>/refresh", game.views.refresh_equipment, name="refresh_equipment"),
    path("equipment/<int:equipment_id>/refresh/<str:attribute>", game.views.refresh_equipment_attribute,
         name="refresh_equipment_attribute"),
    path("equipment/<int:equipment_id>/remove/<str:attribute>", game.views.remove_equipment_attribute,
         name="remove_equipment_attribute"),
    path("equipment/<int:equipment_id>/upgrade", game.views.upgrade_equipment, name="upgrade_equipment"),
    path("equipment/<int:equipment_id>/upgrade/<str:attribute>", game.views.upgrade_equipment_attribute,
         name="upgrade_equipment_attribute"),

]
