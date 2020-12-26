<template>
  <v-row justify="center">
    <v-dialog
      @input="$emit('input', $event)"
      :value="value"
      max-width="450"
      class="pa-3">
      <v-card>
        <v-card-title class="white--text primary pb-4 mb-4">{{ title }}</v-card-title>
        <v-card-text>{{ body }}</v-card-text>

        <v-card-actions class="pa-5">
          <v-btn
            @click="$emit('click:cancel')"
            class="info--text"
            :color="colorButtonCancel"
            depressed
            small>
            {{ textButtonCancel }}
          </v-btn>
          
          <v-spacer></v-spacer>

          <v-btn
            @click="$emit('click:confirm')"
            :color="colorButtonConfirm"
            class="white--text"
            depressed
            small>
            {{ textButtonConfirm }}
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script lang="ts">
export default {
  props: {
    value: Boolean,
    title: {
      type: String,
      default: 'Confirmar'
    },
    body: {
      type: String,
      default: 'Desea continuar?'
    },
    colorButtonCancel: {
      type: String,
      default: 'accent'
    },
    textButtonCancel: {
      type: String,
      default: 'Cancelar'
    },
    colorButtonConfirm: {
      type: String,
      default: 'primary'
    },
    textButtonConfirm: {
      type: String,
      default: 'Aceptar'
    }
  }
}
</script>