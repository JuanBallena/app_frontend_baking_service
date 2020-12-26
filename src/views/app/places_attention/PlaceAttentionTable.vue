<template>
  <div id="template">
    <v-data-table
      :headers="headers"
      :items="items"
      disable-sort
      class="elevation-1"
      :items-per-page="size"
      hide-default-footer
      no-data-text="Sin resultados"
      no-results-text="Sin resultados"
      disable-pagination
    >
      <template v-slot:[`item.number`]="{ item }">
        {{ size * pageApi + (items.indexOf(item) + 1) }}
      </template>
      <template v-slot:[`item.abbrev`]="{ item }">
        {{ item.hasAbbreviation() ? item.abbreviation : '(sin registro)' }}
      </template>

      <template v-slot:[`item.actions`]="{ item }">
        <IconButtonComponent
          icon="fas fa-pen"
          @click="edit(item)"
        />
      </template>
    </v-data-table>

    <DialogFormComponent
      v-model="dialogForm.visible"
      title="Editar local"
      maxWidth="600"
      @click:close="dialogForm.visible = false"
    >
      <v-row>
        <v-col cols="12" lg="6" md="6" sm="6">
          <TextInputComponent
            label="Nombre"
            v-model="placeAttentionTemporary.name"
            placeholder="Escriba nombre de su local"
            :error="errors.name"
          />
        </v-col>
        <v-col cols="12" lg="6" md="6" sm="6">
          <TextInputComponent
            label="Abreviación"
            v-model="placeAttentionTemporary.abbreviation"
            placeholder="Escriba una abreviación de su local"
            :error="errors.abbreviation"
          />
        </v-col>
        <v-col cols="12" lg="12">
          <SubmitButtonComponent
            @click="update()"
          />
        </v-col>
      </v-row>
    </DialogFormComponent>

    <SnackbarComponent
      v-model="snackbar.visible"
      :text="snackbar.text"
      icon="fas fa-check-circle"
      @click:close="snackbar.visible = false"
    />
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { mapState, mapMutations, mapActions } from 'vuex';
import { PlaceAttention } from '@/models/PlaceAttention';

export default Vue.extend({

  props: {
    items: {
      type: Array as () => Array<PlaceAttention>,
      default: () => []
    },
    pageApi: {
      type: Number
    },
    size: {
      type: Number
    }
  },
  
  data: () => {
    return {
      headers: [
        { text: '#', value: 'number' },
        { text: 'Nombre', value: 'name'},
        { text: 'Abreviatura', value: 'abbrev'},
        { text: 'Acciones', value: 'actions' },
      ],
      dialogForm: {
        visible: false
      },
      snackbar: {
        visible: false,
        text: ''
      },
      placeAttentionTemporary: {} as PlaceAttention,
      positionPlaceAttentionTemporary: 0,
      errors: {
        name: '',
        abbreviation: '',
      },
      errorsDefault: {
        name: '',
        abbreviation: ''
      }
    }
  },

  computed: {
    ...mapState('placeAttentionModule', ['placeAttention','successfulRegistration','errorsMessage'])
  },

  methods: {
    ...mapMutations('placeAttentionModule', ['SET_SUCCESSFUL_REGISTRATION',
      'SET_PLACE_ATTENTION','SET_ERRORS_MESSAGE','REPLACE_PLACE_ATTENTION']),
    ...mapActions('placeAttentionModule', ['updatePlaceAttention','getPlacesAttention']),

    async edit(placeAttention: PlaceAttention): Promise<void> {
      this.positionPlaceAttentionTemporary = this.items.indexOf(placeAttention);
      this.placeAttentionTemporary = Object.assign({}, placeAttention);
      this.dialogForm.visible = true;
    },

    async update(): Promise<void> {
      const dataPost = {
        idPlaceAttention: this.placeAttentionTemporary.id,
        name: this.placeAttentionTemporary.name,
        abbreviation: this.placeAttentionTemporary.abbreviation
      }

      await this.updatePlaceAttention(dataPost);
      this.errors = Object.assign({}, this.errorsDefault);

      if (this.errorsMessage) {
        this.errorsMessage.forEach((error: { [x: string]: string }) => {
          if (error['name']) this.errors.name = error['name'];
          if (error['abbreviation']) this.errors.abbreviation = error['abbreviation'];
        })
        this.SET_ERRORS_MESSAGE([]);
      }

      if (this.successfulRegistration) {
        // const dataToUpdate = {
        //   position: this.positionPlaceAttentionTemporary,
        //   name: this.placeAttention.name,
        //   abbreviation: this.placeAttention.abbreviation
        // }
        this.dialogForm.visible = false;
        this.snackbar.text = "Se guardó correctamente";
        this.snackbar.visible = true;
        // this.REPLACE_PLACE_ATTENTION(dataToUpdate);
        await this.getPlacesAttention();
        this.SET_SUCCESSFUL_REGISTRATION(false);
        this.SET_PLACE_ATTENTION({});
      }
    }
  }
})
</script>