<template>
  <v-app-bar fixed app dense dark id="header">
    <v-icon class="header__icon-bars" @click="$emit('click-icon-bars')">
      fa-bars
    </v-icon>
    
    <v-spacer></v-spacer>

    <v-toolbar-title>
      <template>
        <DropdownUserComponent />
      </template>
    </v-toolbar-title> 
  </v-app-bar>
</template>

<script lang="ts">
import Vue from 'vue';
import DropdownUserComponent from '@/views/app/DropdownUser.vue';

export default Vue.extend({
  data () {
    return {
      //
    }
  },

  components: {
    DropdownUserComponent
  }
});
</script>

<style scoped>

#header {
  background: white;
}
.header__icon-bars {
  color: var(--v-primary-base);
}
</style>