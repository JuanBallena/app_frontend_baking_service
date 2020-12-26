<template>
  <v-text-field
    :value="value"
    @input="$emit('input', $event)"
    @keyup.enter="$emit('enter', $event)"
    @click:append="$emit('click:icon-search', $event)"
    @click:clear="$emit('click:icon-clear', $event)"
    rounded
    class="search-input"
    color="primary"
    :placeholder="placeholder"
    clear-icon="fas fa-times"
    clearable
  >
  </v-text-field>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  props: {
    value: {
      default: '',
      type: String
    },
    placeholder: {
      default: 'Buscar',
      type: String
    }
  }
});
</script>

<style scoped>

.search-input {
  background: var(--v-accent-base);
  padding: 2px 0 0 0;
  margin: 0;
  height: 36px;
  font-size: 14px;
}
.search-input >>> .v-text-field__slot::before {
  color: var(--v-info-base);
  font-family: "Font Awesome 5 Free";
  content: "\f002";
  padding: 3px 8px 0 0;
  font-size: 16px;
  font-weight: 1000;
}

</style>