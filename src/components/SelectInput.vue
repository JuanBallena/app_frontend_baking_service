<template>
  <div>
    <label class="label">{{ label }}</label>
    <v-select
      dense
      outlined
      :item-text="itemText"
      :item-value="itemValue"
      :placeholder="placeholder"
      class="select-input"
      :menu-props="{ bottom: true, offsetY: true }"
      :items="items"
      :value="value"
      @change="$emit('input', $event)"
      >
    </v-select>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  props: {
    label: {
      type: String,
      default: 'label'
    },
    value: {
      type: [Number, String, Boolean]
    },
    itemText: {
      type: String,
      default: ''
    },
    itemValue: {
      type: String,
      default: ''
    },
    placeholder: {
      type: String,
      default: ''
    },
    items: {
      type: Array as () => Array<any>,
      default: () => []
    },
  }
});
</script>

<style scoped>
.label {
  font-size: 13px;
  /* color: var(--v-secondaryColor-base); */
  color: black;
  font-weight: bold;
}

.select-input {
  border-radius: 0;
  height: 42px;
}

.v-text-field--outlined >>> fieldset {
  border-color: var(--v-info-base);
}

.select-input >>> .v-select__slot .v-input .v-select__selections {
  border-radius: 0;
}

.select-input >>> .v-select__slot .v-input__icon .v-icon::before,
.select-input >>> .v-select__slot .v-input__icon .v-icon::after {
  color: var(--v-info-base);
  font-size: 17px;
}

.select-input >>> .v-select__slot input::placeholder {
  font-size: 14px;
}

.v-menu__content {
    box-shadow: none;
}

.v-list {
  padding: 0;
  margin: 0;
}
</style>