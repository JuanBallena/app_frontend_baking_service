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
      <v-col cols="" lg="12">
        <h2>Ajustes</h2>
      </v-col>
      <v-col cols="12" lg="12">
        <v-row>
          <v-col cols="12" lg="6" md="6" sm="6" class="py-0">
            <div class="primary--text font-weight-normal">{{ settingCurrentActivity.name }}</div>
            <div class="info--text font-weight-normal">{{ settingCurrentActivity.description }}</div>
            <br>
          </v-col>
          <v-col cols="12" lg="6" md="6" sm="6" class="py-0">
            <v-select
              v-model="activity"
              :items="activities"
              item-text="description"
              return-object
              class="select-activities"
              no-data-text="Sin registros"
              dense
              outlined
              item-color="primary"
              @change="changeSelectActivities()"
            >
            </v-select>
          </v-col>
        </v-row>
        <v-divider></v-divider>
      </v-col>
    </v-row>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { mapState, mapMutations, mapActions } from 'vuex';

export default Vue.extend({
  data: () => {
    return {
      settingCurrentActivity: {
        id: 0,
        name: '',
        description: ''
      },
      activity: JSON.parse(String(localStorage.getItem('currentActivity'))),
      positionCurrentActivity: 0
    }
  },

  async created(): Promise<void> {
    await this.getSettings();
    this.settingCurrentActivity.id = this.settings[this.positionCurrentActivity].id;
    this.settingCurrentActivity.name = this.settings[this.positionCurrentActivity].name;
    this.settingCurrentActivity.description = this.settings[this.positionCurrentActivity].description;
    await this.getActivities();
  },

  computed: {
    ...mapState('settingModule', ['settings','successfulRegistration']),
    ...mapState('activityModule', ['activities']),

    noData(): boolean {
      return this.settings.length == 0;
    }
  },

  methods: {
    ...mapMutations('settingModule', ['SET_SUCCESSFUL_REGISTRATION','SET_SETTINGS']),
    ...mapActions('settingModule', ['getSettings','updateSettingValue']),
    ...mapActions('activityModule', ['getActivities']),

    async changeSelectActivities(): Promise<void> {

      const dataPost = {
        idSetting: this.settingCurrentActivity.id,
        value: this.activity.id
      }

      await this.updateSettingValue(dataPost);

      if (this.successfulRegistration) {
        this.SET_SUCCESSFUL_REGISTRATION(false);
        localStorage.setItem('idCurrentActivity', String(this.activity.id));
        localStorage.setItem('currentActivityDescription', String(this.activity.description));
        localStorage.setItem('currentActivity', JSON.stringify(this.activity));
      }
    }
  },

  beforeDestroy(): void {
    this.SET_SETTINGS([]);
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