<template>
  <div>
    <v-list-item class="item-menu" :to="{ name: routeName }">
      <v-list-item-icon id="item-menu__icon-container">
        <v-icon class="item-menu__icon">{{ icon }}</v-icon>
      </v-list-item-icon>

      <v-list-item-title>
        {{ text }}
      </v-list-item-title>
    </v-list-item>
    
    <v-divider></v-divider> 
  </div>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  props: {
    icon: {
      default: 'fa-home',
      type: String
    },
    text: {
      default: 'Item',
      type: String,
    },
    routeName: {
      default: '',
      type: String,
    }
  }
});
</script>

<style lang="sass" scoped>

.item-menu
  margin: 12px 0 0 0

#item-menu__icon-container
  margin: 7px 15px 0 0

.item-menu__icon
  font-size: 15px

</style>