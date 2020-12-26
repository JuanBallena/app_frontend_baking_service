<template>
  <div id="template">
    <v-data-table
      :headers="headers"
      :items="items"
      disable-sort
      class="elevation-1"
      hide-default-footer
      no-data-text="Sin registros"
      no-results-text="Sin registros"
      disable-pagination
    >
      <template v-slot:[`item.number`]="{ item }">
        <span class="font-weight-bold">{{ item.numberAttention }}</span>
      </template>
      <template v-slot:[`item.phone`]="{ item }">
        <div v-if="item.hasPhone()">

          {{ item.customer.phone }}
          
        </div>
        <div v-else>Sin número</div>
      </template>
      
      <template v-slot:[`item.bakingStatus`]="{ item }">
        <ChipComponent
          :text="item.bakingStatus.description"
          :color="item.getColorBakingStatus()"
        />
      </template>

      <template v-slot:[`item.actions`]="{ item }">
        <IconButtonComponent
          icon="fas fa-exchange-alt"
          @click="openDialogRadios(item)"
        />
        <!-- <IconButtonComponent
          icon="far fa-paper-plane"
          color="primar"
          @click="openConfirmDialog(item)"
        /> -->
        <IconButtonComponent 
          @click="edit(item)" 
          icon="fas fa-pen" 
        />
      </template>

    </v-data-table>

    <!-- <ConfirmDialogComponent
      v-if="confirmDialog.visible"
      v-model="confirmDialog.visible"
      :body="confirmDialog.body"
      :title="confirmDialog.title"
      :textButtonConfirm="confirmDialog.textButtonConfirm"
      @click:confirm="sendTextMessage()"
      @click:cancel="confirmDialog.visible = false"
    /> -->

    <DialogFormComponent
      v-if="dialogRadios.visible"
      v-model="dialogRadios.visible"
      :title="dialogRadios.title"
      maxWidth="350"
      @click:close="dialogRadios.visible = false"
    >
      <h4 class="black--text">Estado de horneado</h4>
      <v-radio-group v-model="dialogRadios.radios">
        <v-radio 
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
      v-model="snackbar.visible"
      :text="snackbar.text"
      icon="fas fa-paper-plane"
      color="dark"
      @click:close="snackbar.visible = false"
    />

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
      // overlay: false,
      dialogRadios: {
        title: '',
        visible: false,
        radios: 0
      },
      dialogForm: {
        title: '',
        visible: false
      },
      // confirmDialog: {
      //   title: 'Enviar SMS',
      //   body: '',
      //   textButtonConfirm: 'Enviar',
      //   visible: false
      // },
      headers: [
        { text: 'Local', value: 'placeAttention.name'},
        { text: 'Boleta', value: 'number'},
        { text: 'Cliente', value: 'customer.name'},
        { text: 'Contacto', value: 'phone'},
        { text: 'Estado horneado', value: 'bakingStatus' },
        { text: 'Acciones', value: 'actions' },
      ],
      snackbar: {
        visible: false,
        text: ''
      },
      snackbarCreated: {
        visible: false,
        text: ''
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
    ...mapState('bakeTicketModule', ['bakeTicket', 'successfulRegistration','bakeTickets']),
    ...mapState('smsModule', ['successfulSmsSending']),

    loading(): boolean {
      return this.bakeTickets.length == 0;
    },
  },

  methods: {
    ...mapMutations('bakeTicketModule', ['REPLACE_BAKING_STATUS','SET_BAKE_TICKET',
      'SET_SUCCESSFUL_REGISTRATION']),
    ...mapMutations('smsModule', ['SET_SUCCESSFUL_SMS_SENDING']),
    ...mapActions('bakeTicketModule', ['updateBakeTicketBakingStatus','getBakeTickets','searchBakeTickets']),
    ...mapActions('smsModule', ['sendSms']),

    // openConfirmDialog(bakeTicket: BakeTicket): void {
    //   this.bakeTicketTemporary = Object.assign({}, bakeTicket);
    //   this.confirmDialog.visible = true;
    //   this.confirmDialog.body = `Desea enviar un mensaje de texto a ${bakeTicket.customer.name}?`;
    // },

    // async sendTextMessage(): Promise<void> {
    //   const dataPost = {
    //     countryPrefix: '+51',
    //     phone: this.bakeTicketTemporary.customer.phone,
    //     message: `Saludos ${ this.bakeTicketTemporary.customer.name }, ya puedes recoger tu horneado en la Panadería El Padrino, no olvides llevar tu boleta.`
    //   }
      
    //   this.confirmDialog.visible = false;
    //   this.overlay = true;
    //   await this.sendSms(dataPost);
    //   this.overlay = false;

    //   if (this.successfulSmsSending) {
    //     this.snackbar.text = `Se envió un mensaje a ${ this.bakeTicketTemporary.customer.name }`;
    //     this.snackbar.visible = true;
    //     this.SET_SUCCESSFUL_SMS_SENDING(false);
    //   }
    // },

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
        // const dataToUpdate = {
        //   position: this.positionBakeTicketTemporary,
        //   bakingStatus: this.bakeTicket.bakingStatus
        // }

        this.dialogRadios.visible = false;
        this.getBakeTicketsBack();
        // this.REPLACE_BAKING_STATUS(dataToUpdate);
        this.SET_SUCCESSFUL_REGISTRATION(false);
        this.SET_BAKE_TICKET({});
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

    updateBakeTicket(event: any): void {
      if (event == true) {
        this.dialogForm.visible = false;
        this.getBakeTicketsBack();
        this.snackbarCreated.text = "Se guardó correctamente";
        this.snackbarCreated.visible = true;
      }
    },

    updateCustomer(event: any): void {
      if (event == true) {
        this.dialogForm.visible = false;
        this.getBakeTicketsBack();
        this.snackbarCreated.text = "Se guardó correctamente";
        this.snackbarCreated.visible = true;
      }
    }
  }

});
</script>