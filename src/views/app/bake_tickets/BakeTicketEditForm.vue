<template>
  <div>
    <v-row>
      <v-col cols="12" lg="6" md="6" sm="6">
        <TextInputComponent
          label="Número de boleta"
          placeholder="Escriba número de boleta"
          v-model="bakeTicket.numberAttention"
          :error="errors.numberAttention"
        />
      </v-col>
       <v-col cols="12" lg="6" md="6" sm="6">
          <TextInputComponent
            label="Fuentes de hornado"
            placeholder="Escriba número de fuentes"
            v-model="bakeTicket.numberBaked"
            :error="errors.numberBaked"
          />
        </v-col>
      <v-col cols="12" lg="6" md="6" sm="6">
        <SelectInputComponent
          v-model="bakeTicket.activity.id"
          label="Actividad"
          :items="activities"
          itemText="description"
          itemValue="id"
          :error="errors.idActivity"
        />
      </v-col>
      <v-col cols="12" lg="6" md="6" sm="6">
        <SelectInputComponent
          v-model="bakeTicket.placeAttention.id"
          label="Local"
          :items="placesAttention"
          itemText="name"
          itemValue="id"
          :error="errors.idPlaceAttention"
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
import { BakeTicket } from '@/models/BakeTicket';
import { PlaceAttention } from '@/models/PlaceAttention';
import { Activity } from '@/models/Activity';
export default Vue.extend({
  
  props: {
    bakeTicket: {
      type: Object,
      default: {} as BakeTicket
    },
    activities: {
      type: Array as () => Array<Activity>,
      default: () => []
    },
    placesAttention: {
      type: Array as () => Array<PlaceAttention>,
      default: () => []
    },
    position: {
      type: Number,
      default: 0
    },
  },

  data: () => {
    return {
      errorsDefault: {
        idCustomer: '',
        idPlaceAttention: '',
        idActivity: '',
        numberAttention: '',
        numberBaked: ''
      },
      errors: {
        idCustomer: '',
        idPlaceAttention: '',
        idActivity: '',
        numberAttention: '',
        numberBaked: ''
      }
    }
  },

  computed: {
    ...mapState('bakeTicketModule', ['successfulRegistration','errorsMessage'])
  },

  methods: {
    ...mapMutations('bakeTicketModule', ['SET_SUCCESSFUL_REGISTRATION','SET_ERRORS_MESSAGE',
      'SET_BAKE_TICKET']),
    ...mapActions('bakeTicketModule', ['updateBakeTicket']),

    async update(): Promise<void> {

      const dataPost = {
        idBakeTicket: this.bakeTicket.id,
        idCustomer: this.bakeTicket.customer.id,
        idActivity: this.bakeTicket.activity.id,
        idPlaceAttention: this.bakeTicket.placeAttention.id,
        numberAttention: this.bakeTicket.numberAttention,
        numberBaked: String(this.bakeTicket.numberBaked)
      }

      await this.updateBakeTicket(dataPost);
      this.errors = Object.assign({}, this.errorsDefault)

      if (this.errorsMessage) {
        this.errorsMessage.forEach((error: { [x: string]: string }) => {
          if (error['idCustomer']) this.errors.idCustomer = error['idCustomer'];
          if (error['idPlaceAttention']) this.errors.idPlaceAttention = error['idPlaceAttention'];
          if (error['idActivity']) this.errors.idActivity = error['idActivity'];
          if (error['numberAttention']) this.errors.numberAttention = error['numberAttention'];
          if (error['numeroAtencion']) this.errors.numberAttention = error['numeroAtencion'];
          if (error['numberBaked']) this.errors.numberBaked = error['numberBaked'];
        })
        this.SET_ERRORS_MESSAGE([]);
      }

      if (this.successfulRegistration) {

        this.SET_SUCCESSFUL_REGISTRATION(false);
        this.SET_BAKE_TICKET({});
        this.$emit('update', true);
      }
    }
  }
})
</script>