<template>
  <div>
    <v-row>
      <v-col cols="12" lg="6">
        <h2>Locales</h2>
      </v-col>
      <v-col cols="12" lg="12">
        <PlaceAttentionTable 
          :items="placesAttention" 
          :pageApi="pageApi" 
          :size="size"
        />
      </v-col>
    </v-row>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { mapState, mapActions } from 'vuex';
import PlaceAttentionTable from './PlaceAttentionTable.vue';

export default Vue.extend({
  data: () => {
    return {
      size: 10,
      page: 1,
      totalVisible: 10
    }
  },

  components: {
    PlaceAttentionTable
  },

  async created(): Promise<void> {
    await this.getPlacesAttention();
  },

  computed: {
    ...mapState('placeAttentionModule', ['placesAttention','totalPages']),

    pageApi(): number {
      return this.page - 1;
    }
  },

  methods: {
    ...mapActions('placeAttentionModule', ['getPlacesAttention'])
  }
})
</script>