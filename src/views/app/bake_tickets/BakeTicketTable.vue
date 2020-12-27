<template>
  <div id="template">
    <v-data-table
      :headers="headers"
      :items="items"
      disable-sort
      :loading="loading"
      class="elevation-1"
      hide-default-footer
      no-data-text="Sin registros"
      no-results-text="Sin registros"
      disable-pagination
    >
      <template v-slot:[`item.number`]="{ item }">
        <span class="font-weight-bold primary--text">
          {{ item.numberAttention }}
        </span>
      </template>
      
      <template v-slot:[`item.bakingStatus`]="{ item }">
        <ChipComponent
          :text="item.bakingStatus.description"
          :color="item.getColorBakingStatus()"
        />
      </template>

      <template v-slot:[`item.numberBaked`]="{ item }">
        {{ item.numberBaked }}
        <v-icon small class="ml-2">fas fa-concierge-bell</v-icon>  
      </template>

      <template v-slot:[`item.actions`]="{ item }">
        <IconButtonComponent
          icon="fas fa-exchange-alt"
          @click="openDialogRadios(item)"
        />
        <IconButtonComponent 
          @click="edit(item)" 
          icon="fas fa-pen" 
        />
      </template>

    </v-data-table>

    <DialogFormComponent
      v-if="dialogRadios.visible"
      v-model="dialogRadios.visible"
      :title="dialogRadios.title"
      maxWidth="350"
      @click:close="dialogRadios.visible = false"
    >
      <h4 class="black--text">Estado de hornado</h4>
      <v-radio-group v-model="dialogRadios.radios">
        <v-radio
          class="py-1"
          v-for="(parameter, index) in bakingStatusParameters" 
          :value="parameter.id"
          :key="index" 
          @click="changeRadios()" 
          color="info"
        > 
          <template v-slot:label>
            <div>
              <strong 
                :class="parameter.getColorBakingStatus()+'--text'"
              >{{ parameter.description }}</strong>
            </div>
          </template>
        </v-radio>
      </v-radio-group>
    </DialogFormComponent>

    <DialogFormComponent
      v-if="dialogForm.visible"
      v-model="dialogForm.visible"
      :title="dialogForm.title"
      @click:close="dialogForm.visible = false"
    >
      <v-tabs
        slider-size="3"
        v-model="tab"
        slider-color="secondary"
        height="35px"
      >
        <v-tab
          v-for="item in itemsTab"
          :key="item.id"
        >
          {{ item.text }}
        </v-tab>
      </v-tabs>

      <v-tabs-items v-model="tab">
        <v-tab-item>
          <CustomerEditForm
            :customer="customerTemporary"
            :idBakeTicket="bakeTicketTemporary.id"
            @update="updateBakeTicket($event)"
          />
        </v-tab-item>
        <v-tab-item>
          <BakeTicketEditForm
            :bakeTicket="bakeTicketTemporary"
            :activities="activities"
            :placesAttention="placesAttention"
            :position="positionBakeTicketTemporary"
            @update="updateCustomer($event)"
          />
        </v-tab-item>
      </v-tabs-items>
    </DialogFormComponent>

    <SnackbarComponent
      v-if="snackbarCreated.visible"
      v-model="snackbarCreated.visible"
      :text="snackbarCreated.text"
      icon="fas fa-check-circle"
      @click:close="snackbarCreated.visible = false"
    />

    <!-- <div class="text-center">
      <v-overlay :value="overlay">
        <h3>Enviando...</h3>
        <v-progress-circular
          indeterminate
          size="32"
        ></v-progress-circular>
      </v-overlay>
    </div> -->
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { mapState, mapMutations, mapActions } from 'vuex';
import { BakeTicket } from '@/models/BakeTicket';
import { Parameter } from '@/models/Parameter';
import { Customer } from '@/models/Customer';
import { PlaceAttention } from '@/models/PlaceAttention';
import { Activity } from '@/models/Activity';
import CustomerEditForm from './CustomerEditForm.vue';
import BakeTicketEditForm from './BakeTicketEditForm.vue';

export default Vue.extend({
  props: {
    items: {
      type: Array as () => Array<BakeTicket>,
      default: () => []
    },
    bakingStatusParameters: {
      type: Array as () => Array<Parameter>,
      default: () => []
    },
    activities: {
      type: Array as () => Array<Activity>,
      default: () => []
    },
    placesAttention: {
      type: Array as () => Array<PlaceAttention>,
      default: () => []
    },
    request: {
      type: String,
      default: ''
    },
    searchRequest: {
      type: String,
      default: ''
    },
    queryTextExist: {
      type: Boolean,
      default: false
    }
  },

  components: {
    CustomerEditForm,
    BakeTicketEditForm
  },

  data: () => {
    return {
      dialogRadios: {
        title: '',
        visible: false,
        radios: 0
      },
      dialogForm: {
        title: '',
        visible: false
      },
      headers: [
        { text: 'Boleta', value: 'number'},
        { text: 'Cliente', value: 'customer.name'},
        { text: 'Fuentes de hornado', value: 'numberBaked'},
        { text: 'Estado hornado', value: 'bakingStatus' },
        { text: 'Acciones', value: 'actions' },
      ],
      snackbarCreated: {
        visible: false,
        text: 'Se guardó correctamente'
      },

      bakeTicketTemporary: {} as BakeTicket,
      customerTemporary: {} as Customer,

      positionBakeTicketTemporary: 0,
      tab: 0,
      itemsTab: [
        { id: 1, text: 'Cliente', icon: 'fa fa-user'},
        { id: 2, text: 'Boleta', icon: 'fa-sticky-note'}
      ]
    }
  },

  computed: {
    ...mapState('bakeTicketModule', ['bakeTicket', 'successfulRegistration','totalPages']),

    loading(): boolean {
      return this.totalPages == -1;
    },
  },

  methods: {
    ...mapMutations('bakeTicketModule', ['SET_SUCCESSFUL_REGISTRATION']),
    ...mapActions('bakeTicketModule', ['updateBakeTicketBakingStatus','getBakeTickets','searchBakeTickets']),

    openDialogRadios(bakeTicket: BakeTicket): void {
      this.bakeTicketTemporary = Object.assign({}, bakeTicket);
      this.positionBakeTicketTemporary = this.items.indexOf(bakeTicket);
      this.dialogRadios.radios = bakeTicket.bakingStatus.id;
      this.dialogRadios.title = `Boleta ${ bakeTicket.numberAttention} - ${bakeTicket.placeAttention.name}`;
      this.dialogRadios.visible = true;
    },

    async changeRadios(): Promise<void> {
      const dataPost = {
        idBakeTicket: this.bakeTicketTemporary.id,
        idBakingStatus: this.dialogRadios.radios
      }

      await this.updateBakeTicketBakingStatus(dataPost);

      if (this.successfulRegistration) {

        this.dialogRadios.visible = false;
        this.getBakeTicketsBack();
        this.SET_SUCCESSFUL_REGISTRATION(false);
      }
    },

    edit(bakeTicket: BakeTicket): void {
      this.positionBakeTicketTemporary = this.items.indexOf(bakeTicket);
      this.bakeTicketTemporary = Object.assign({}, bakeTicket);
      this.customerTemporary = Object.assign({}, bakeTicket.customer);
      this.tab = 0;
      this.dialogForm.title = `Editar boleta ${bakeTicket.numberAttention} - ${bakeTicket.placeAttention.name}`;
      this.dialogForm.visible = true;
    },

    async getBakeTicketsBack(): Promise<void> {
      if (this.queryTextExist) {
        await this.searchBakeTickets(this.searchRequest);
        return;
      } 
      await this.getBakeTickets(this.request);
    },

    updateBakeTicket(event: boolean): void {
      if (event == true) {
        this.dialogForm.visible = false;
        this.getBakeTicketsBack();
        this.snackbarCreated.visible = true;
      }
    },

    updateCustomer(event: boolean): void {
      if (event == true) {
        this.dialogForm.visible = false;
        this.getBakeTicketsBack();
        this.snackbarCreated.visible = true;
      }
    }
  }

});
</script>