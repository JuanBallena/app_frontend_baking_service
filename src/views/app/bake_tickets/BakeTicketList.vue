<template>
  <div>
    <v-row>
      <v-col cols="12" lg="6" md="6" sm="5">
        <div class="d-flex">

          <h2>Boletas</h2>

          <AddButtonComponent
            :disabled="idActivity == 0"
            @click="openDialogForm()"
          />

        </div>
      </v-col>
      <v-col cols="12" lg="6" md="6" sm="7">
        <v-select
          v-model="idActivity"
          :items="activities"
          item-text="description"
          item-value="id"
          no-data-text="Sin registros"
          item-color="primary"
          class="select-activities"
          @change="changeActivity()"
          dense
        >
          <template v-slot:prepend-inner>
            <v-icon
              class="py-2 mr-2"
              small
            >
              fas fa-filter
            </v-icon>
          </template>
        </v-select>

      </v-col>
      <v-col cols="12" lg="6" md="6">

        <v-btn
          v-for="(placeAttention, index) in placesAttention" 
          :key="index"
          :color="activeButtonPlaceAttention(placeAttention.id)"
          @click="changePlaceAttention(placeAttention)"
          class="mr-2"
          depressed
          rounded
          small
        >
          {{ placeAttention.name }}
        </v-btn>

      </v-col>
      <v-col cols="12" lg="6" md="6">

        <SearchInputComponent
          v-model="query.text"
          @enter="search()"
          @click:icon-search="search()"
          @click:icon-clear="deleteQueryText()"
          placeholder="Número de boleta o cliente" 
        />

      </v-col>
      <v-col cols="12" class="pt-0" id="visible-only-xs">
        <v-pagination
          class="text-center mt-4"
          v-model="page"
          color="paginateColor"
          :length="totalPages"
          :total-visible="totalVisible"
          @input="changePage()"
        >
        </v-pagination>
      </v-col>
    </v-row>

    <DialogFormComponent
      v-model="dialogForm.visible"
      :title="'Registrar boleta - ' + subTitleDialog"
      maxWidth="400"
      @click:close="dialogForm.visible = false"
    >
      <v-row>
        <v-col cols="12">
          <TextInputComponent
            label="Cliente"
            placeholder="Escriba nombre y apellido"
            v-model="newBakeTicket.name"
            :error="errors.name"
          />
        </v-col>
        <v-col cols="12">
          <TextInputComponent
            label="Número de boleta"
            placeholder="Escriba número de boleta"
            v-model="newBakeTicket.numberAttention"
            :error="errors.numberAttention"
          />
        </v-col>
        <v-col cols="12">
          <TextInputComponent
            label="Fuentes de hornado"
            placeholder="Escriba número de fuentes"
            v-model="newBakeTicket.numberBaked"
            :error="errors.numberBaked"
          />
        </v-col>
      
        <v-col cols="12">
          <SubmitButtonComponent @click="save()" />
        </v-col>
      </v-row>
    </DialogFormComponent>

    <BakeTicketTable 
      :items="bakeTickets"
      :bakingStatusParameters="parameters"
      :activities="activities"
      :placesAttention="placesAttention"
      :queryTextExist="queryTextExist"
      :request="request"
      :searchRequest="searchRequest"
    />

    <v-pagination
      class="text-center mt-4"
      v-model="page"
      color="paginateColor"
      :length="totalPages"
      :total-visible="totalVisible"
      @input="changePage()"
    >
    </v-pagination>

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
import BakeTicketTable from './BakeTicketTable.vue';
import * as ParameterTypeDefinition from '@/definitions/parameterTypeDefinition';

export default Vue.extend({

  components: {
    BakeTicketTable
  },

  data: () => {
    return {
      size: 10,
      page: 1,
      totalVisible: 10,
      idActivity: Number(localStorage.getItem('idCurrentActivity')),
      idPlaceAttention: 1,
      query: {
        text: '',
        temporaryText: ''
      },
      dialogForm: {
        visible: false
      },
      newBakeTicketDefault: {
        numberAttention: '',
        name: '',
        numberBaked: '1'
      },
      newBakeTicket: {
        numberAttention: '',
        name: '',
        numberBaked: '1'
      },
      errorsDefault: {
        numberAttention: '',
        name: '',
        numberBaked: ''
      },
      errors: {
        numberAttention: '',
        name: '',
        numberBaked: ''
      },
      snackbar: {
        text: '',
        visible: false
      },
      subTitleDialog: 'El Padrino',
      sort: 'numberAttention',
      direction: 'asc'
    }
  },

  async created(): Promise<void> {
      await this.getBakeTickets(`?idActivity=${this.idActivity}&idPlaceAttention=${this.idPlaceAttention}&page=${0}&size=${this.size}&sort=${this.sort}&direction=${this.direction}`);
      await this.getPlacesAttention();
      await this.getParameters(`?idParameterType=${ParameterTypeDefinition.PARAMETER_TYPE_BAKING_STATUS}`);
      await this.getActivities();
  },

  computed: {
    ...mapState('bakeTicketModule', ['bakeTickets','totalPages','errorsMessage','successfulRegistration']),
    ...mapState('placeAttentionModule', ['placesAttention']),
    ...mapState('activityModule', ['activities']),
    ...mapState('parameterModule', ['parameters']),

    pageApi(): number {
      return this.page - 1;
    },

    request(): string {
      return `?idActivity=${this.idActivity}&idPlaceAttention=${this.idPlaceAttention}&page=${this.pageApi}&size=${this.size}&sort=${this.sort}&direction=${this.direction}`;
    },

    searchRequest(): string {
      return `?q=${this.query.temporaryText}&idActivity=${this.idActivity}&idPlaceAttention=${this.idPlaceAttention}&page=${this.pageApi}&size=${this.size}&sort=${this.sort}&direction=${this.direction}`;
    },

    queryTextExist(): boolean {
      return this.query.temporaryText != '';
    }
  },

  methods: {
    ...mapMutations('bakeTicketModule', ['SET_ERRORS_MESSAGE','SET_SUCCESSFUL_REGISTRATION','SET_BAKE_TICKETS']),
    ...mapActions('bakeTicketModule', ['getBakeTickets','searchBakeTickets','saveBakeTickeAndCustomer']),
    ...mapActions('placeAttentionModule', ['getPlacesAttention']),
    ...mapActions('activityModule', ['getActivities']),
    ...mapActions('parameterModule', ['getParameters']),

    activeButtonPlaceAttention(idPlaceAttention: number): string {
      return this.idPlaceAttention == idPlaceAttention ? 'primary' : 'white';
    },

    borderButtonPlaceAttention(idPlaceAttention: number): string {
      return this.idPlaceAttention == idPlaceAttention ? 'primary' : 'white';
    },

    openDialogForm(): void {
      this.errors = Object.assign({}, this.errorsDefault);
      this.dialogForm.visible = true;
    },

    async deleteQueryText(): Promise<void> {
      this.query.text = '';
      this.query.temporaryText = '';
      await this.getBakeTickets(this.request);
    },

    async getBakeTicketsBack(): Promise<void> {
      if (this.queryTextExist) {
        await this.searchBakeTickets(this.searchRequest);
        return;
      } 
      await this.getBakeTickets(this.request);
    },

    changeActivity(): void {
      this.page = 1;
      this.getBakeTicketsBack();
    },

    changePlaceAttention(placeAttention: PlaceAttention): void {
      this.page = 1;
      this.idPlaceAttention = placeAttention.id;
      this.subTitleDialog = placeAttention.name;
      this.getBakeTicketsBack();
    },

    changePage(): void {
      this.getBakeTicketsBack();
    },

    async search(): Promise<void> {
      this.page = 1;
      this.query.temporaryText = this.query.text || '';
      await this.searchBakeTickets(this.searchRequest);
    },

    async save(): Promise<void> {
      const dataPost = {
        name: this.newBakeTicket.name,
        numberAttention: this.newBakeTicket.numberAttention,
        numberBaked: this.newBakeTicket.numberBaked,
        idActivity: this.idActivity,
        idPlaceAttention: this.idPlaceAttention
      }

      await this.saveBakeTickeAndCustomer(dataPost);
      this.errors = Object.assign({}, this.errorsDefault);

      if (this.errorsMessage) {
        this.errorsMessage.forEach((error: { [v: string]: string }) => {
          if (error['name']) this.errors.name = error['name'];
          if (error['numberAttention']) this.errors.numberAttention = error['numberAttention'];
          if (error['numeroAtencion']) this.errors.numberAttention = error['numeroAtencion'];
          if (error['numberBaked']) this.errors.numberBaked = error['numberBaked'];
        });
        this.SET_ERRORS_MESSAGE([]);
      }

      if (this.successfulRegistration) {
        this.getBakeTicketsBack();
        this.dialogForm.visible = false;
        this.snackbar.text = 'Se guardó correctamente';
        this.snackbar.visible = true;
        this.newBakeTicket = Object.assign({}, this.newBakeTicketDefault);
        this.SET_SUCCESSFUL_REGISTRATION(false);
      }
    },

    beforeDestroy(): void {
      this.SET_BAKE_TICKETS([]);
    }
  }
})
</script>

<style scoped>

.select-activities >>> .v-select__slot .v-input__icon .v-icon::before,
.select-activities >>> .v-select__slot .v-input__icon .v-icon::after {
  color: var(--v-info-base);
  font-size: 18px;
}
</style>