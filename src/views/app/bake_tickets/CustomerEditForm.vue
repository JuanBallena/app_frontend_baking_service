<template>
  <div>
    <v-row>
      <v-col cols="12" lg="6" md="6" sm="6">
        <TextInputComponent
          label="Dni"
          v-model="customer.document"
          placeholder="8 dígitos"
          :error="errors.document"
        />
      </v-col>
      <v-col cols="12" lg="6" md="6" sm="6">
        <TextInputComponent
          label="Cliente"
          v-model="customer.name"
          placeholder="Escriba nombre y apellido"
          :error="errors.name"
        />
      </v-col>
      <v-col cols="12" lg="6" md="6" sm="6">
        <TextInputComponent
          label="Nro. celular"
          v-model="customer.phone"
          placeholder="9 dígitos"
          :error="errors.phone"
        />
      </v-col>
      <v-col cols="12">
        <SubmitButtonComponent @click="update()" />
      </v-col>
    </v-row>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { mapState, mapMutations, mapActions } from 'vuex';
import { Customer } from '@/models/Customer';

export default Vue.extend({
  
  props: {
    customer: {
      type: Object,
      default:  {} as Customer
    },
    idBakeTicket: {
      type: Number,
      default: 0
    }
  },

  data: () => {
    return {
      errorsDefault: {
        idCustomer: '',
        name: '',
        document: '',
        phone: ''
      },
      errors: {
        idCustomer: '',
        name: '',
        document: '',
        phone: ''
      }
    }
  },

  computed: {
    ...mapState('customerModule', ['successfulRegistration','errorsMessage'])
  },

  methods: {
    ...mapMutations('customerModule', ['SET_SUCCESSFUL_REGISTRATION','SET_ERRORS_MESSAGE']),
    ...mapActions('customerModule', ['updateCustomer']),

    async update(): Promise<void> {
      const dataPost = {
        idCustomer: this.customer.id,
        name: this.customer.name,
        document: this.customer.document,
        phone: this.customer.phone
      }
      await this.updateCustomer(dataPost);
      this.errors = Object.assign({}, this.errorsDefault);
      
      if (this.errorsMessage) {
        this.errorsMessage.forEach((error: { [x: string]: string }) => {
          if (error['name']) this.errors.name = error['name'];
          if (error['document']) this.errors.document = error['document'];
          if (error['documento']) this.errors.document = error['documento'];
          if (error['phone']) this.errors.phone = error['phone'];
        })
        this.SET_ERRORS_MESSAGE([]);
      }

      if (this.successfulRegistration) {
        this.SET_SUCCESSFUL_REGISTRATION(false);
        this.$emit('update', true);
      }
    },
  }
})
</script>