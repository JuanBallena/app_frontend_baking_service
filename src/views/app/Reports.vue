<template>
 <div>
    <v-row v-if="noData">
       <v-col cols="12" lg="12" >

        <div class="text-center mt-12">
          <v-progress-circular
            indeterminate
            color="primary"
          >
          </v-progress-circular>
        </div>

      </v-col>
    </v-row>
    <v-row v-else>
      <v-col cols="12">
        <div>
          <h2>Reportes</h2>
        </div>
      </v-col>
      <v-col cols="12" class="py-0">
        <div class="font-weight-normal">
          <span>Actividad</span> 
            <i class="fas fa-caret-right px-3"></i>
          <span class="primary--text">{{ titleReport }}</span>
        </div>
      </v-col>
      <v-col cols="12" lg="4" md="4" sm="6"
        v-for="(report, index) in reports"
        :key="report.description">
        <v-list
            one-line
            dense
            elevation="1"
          >
          <v-list-item
          >
            <v-list-item-avatar right>
              <v-icon
                small
                :class="report.getColor(index)+'--text'"
              >
                {{ report.getIcon(index) }}
              </v-icon>
            </v-list-item-avatar>

            <v-list-item-content>
              <v-list-item-title
                class="text-uppercase"
              >
              {{ report.description }}
              </v-list-item-title>
            </v-list-item-content>

            <v-list-item-action>
              <v-btn
                fab
                x-small
                dark
                :color="report.getColor(index) + ' white--text'"
                depressed
                rounded
              >
                <h2>{{ report.quantity }}</h2>
              </v-btn>
            </v-list-item-action>
          </v-list-item>
        </v-list>
      </v-col>
    </v-row>
 </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { mapState, mapActions } from 'vuex';

export default Vue.extend({

  data: () => {
    return {
      titleReport: localStorage.getItem('currentActivityDescription')
    }
  },

  async created(): Promise<void> {
    await this.getReports();
  },

  computed: {
    ...mapState('reportModule', ['reports']),

    noData(): boolean {
      return this.reports.length == 0;
    }
  },

  methods: {
    ...mapActions('reportModule', ['getReports'])
  }

});
</script>

<style scoped>
.report {
  background: var(--v-accent-base);
  height: 5rem;
  padding: 10px;
  display: flex;
}
</style>

