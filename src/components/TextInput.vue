<template>
  <div>
    <label class="label">{{ label}}</label>
    <v-text-field
      :value="value"
      @input="$emit('input', $event)"
      @keyup.enter="$emit('enter', $event)"
      :placeholder="placeholder"
      :type="inputType"
      v-on="on"
      outlined
      dense
      :disabled="disabled"
      class="input-text"
    >
      <template v-slot:append v-if="icon">
        <v-icon
          small 
          @click="$emit('click:icon')"
          class="mt-1"
        >
          {{ icon }}
        </v-icon>
      </template>
    </v-text-field>
    <span class="error-message">{{ error }}</span>
  </div>
   
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  props: {
    label: {
      type: String,
      default: 'label'
    },
    placeholder: {
      type: String,
      default: ''
    },
    value: {
      type: [Number, String, Boolean],
      default: ''
    },
    inputType: {
      default: 'text',
      type: String
    },
    icon: {
      type: String,
      default: ''
    },
    on: {
      type: Object,
      default: null
    },
    error: {
      type: String,
      default: null
    },
    disabled: {
      type: Boolean,
      default: false
    }
  }
})
</script>

<style scoped>
.label {
  font-size: 13px;
  color: black;/*var(--v-info-base);*/
  font-weight: bold;
}
.input-text {
  border-radius: 0;
  height: 42px;
}
.input-text >>> .v-text-field__slot input::placeholder {
  color: var(--v-info-base);
  font-size: 14px;
}
.v-text-field--outlined >>> fieldset {
  border-color: var(--v-info-base);
}
.error-message {
  color: var(--v-error-base);;
  font-size: 11px;
  text-transform: uppercase;
}
</style>