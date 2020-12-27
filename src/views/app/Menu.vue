<template>
  <v-list dense class="menu">
    <v-list-item two-line>
      <v-list-item-content>
        <v-list-item-title class="menu__title">
          El Padrino
        </v-list-item-title>
        <v-list-item-subtitle>
          Menú
        </v-list-item-subtitle>
      </v-list-item-content>
    </v-list-item>

    <v-list-item-group active-class="">

      <ItemMenuComponent icon="far fa-sticky-note" text="Boletas" routeName="BakeTicketList" />

      <ItemMenuComponent icon="fas fa-people-carry" text="Actividades" routeName="ActivityList" />
      
      <ItemMenuComponent icon="fas fa-store-alt" text="Locales" routeName="PlacesAttentionList" />

      <ItemMenuComponent icon="fas fa-chart-bar" text="Reportes" routeName="Reports" />

      <ItemMenuComponent icon="fas fa-wrench" text="Ajustes" routeName="SettingList" />
    </v-list-item-group>
  </v-list>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  data () {
    return {
      drawer: false,
    }
  },

});
</script>

<style scoped>

.menu {
  padding: 0 10px;
  background: red;
}


.menu__title {
  color: white;
  text-transform: uppercase;
}
</style>

