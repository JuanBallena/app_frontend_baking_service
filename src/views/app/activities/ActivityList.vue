<template>
  <div>
    <v-row>
      <v-col cols="12" lg="6">
        <div class="d-flex">

          <h2>Actividades</h2>

          <AddButtonComponent
            @click="openDialogForm()"
          />

        </div>
      </v-col>
      <v-col cols="12" lg="12">
        <ActivityTable 
          :items="activities" 
          :pageApi="pageApi" 
          :size="size"
          :request="request"
        />
        <v-pagination
          class="text-center mt-4"
          v-model="page"
          color="paginateColor"
          :length="totalPages"
          :total-visible="totalVisible"
          @input="changePage()">
        </v-pagination>
      </v-col>
    </v-row>

    <DialogFormComponent
      v-model="dialogForm.visible"
      title="Registrar actividad"
      @click:close="dialogForm.visible = false"
    >
      <v-row>
        <v-col cols="12">
          <TextInputComponent
            label="Descripción"
            placeholder="Escriba una descripción"
            v-model="newActivity.description"
            :error="errors.description"
          />
        </v-col>
        <v-col cols="12">
          <v-dialog
            ref="dialogCalender"
            v-model="calendar.visible"
            :return-value.sync="newActivity.date"
            persistent
            width="290px">
            <template v-slot:activator="{ on }">
              <TextInputComponent
                label="Fecha"
                v-model="newActivity.date"
                placeholder="Fecha"
                :on="on"
                :error="errors.date"
              />
            </template>
            <DatePickerComponent
              v-model="newActivity.date"
              @close="calendar.visible = false"
              @save="$refs.dialogCalender.save(newActivity.date)"
            />
          </v-dialog>
        </v-col>
        <v-col cols="12" lg="12">
          <SubmitButtonComponent
            @click="save()"
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
import ActivityTable from './ActivityTable.vue';
import * as Util from '@/util/index';

export default Vue.extend({

  components: {
    ActivityTable
  },

  data: () => {
    return {
      size: 10,
      page: 1,
      totalVisible: 10,

      newActivity: {
        description: '',
        date: Util.getToday()
      },
      errors: {
        description: '',
        date: ''
      },
      errorsDefault: {
        description: '',
        date: ''
      },
      calendar: {
        visible: false
      },
      dialogForm: {
        visible: false
      },
      snackbar: {
        visible: false,
        text: ''
      },
    }
  },

  async created(): Promise<void> {
    await this.getActivities(`?page=${0}&size=${this.size}`)
  },

  computed: {
    ...mapState('activityModule', ['activities','totalPages','errorsMessage','successfulRegistration']),

    pageApi(): number {
      return this.page - 1;
    },

    request(): string {
      return `?page=${this.pageApi}&size=${this.size}`;
    }
  },

  methods: {
    ...mapMutations('activityModule', ['SET_ERRORS_MESSAGE','SET_SUCCESSFUL_REGISTRATION']),
    ...mapActions('activityModule', ['getActivities','saveActivity']),

    async changePage(): Promise<void> {
      await this.getActivities(this.request);
    },

    openDialogForm(): void {
      this.dialogForm.visible = true;
      this.errors = Object.assign({}, this.errorsDefault);
    },

    async save(): Promise<void> {
      
      await this.saveActivity(this.newActivity);
      this.errors = Object.assign({}, this.errorsDefault);

      if (this.errorsMessage) {
        this.errorsMessage.forEach((error: { [v: string]: string }) => {
          if (error['description']) this.errors.description = error['description'];
          if (error['descripcion']) this.errors.description = error['descripcion'];
          if (error['date']) this.errors.date = error['date'];
        });
        this.SET_ERRORS_MESSAGE([]);
      }

      if (this.successfulRegistration) {
        await this.getActivities(this.request);
        this.dialogForm.visible = false;
        this.snackbar.text = 'Se guardó correctamente';
        this.snackbar.visible = true;
        this.newActivity.description = '';
        this.newActivity.date = Util.getToday();
        this.SET_SUCCESSFUL_REGISTRATION(false);
      }
    },
  }
})
</script>