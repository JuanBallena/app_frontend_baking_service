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

      <template v-slot:[`item.finished`]="{ item }">
        <ChipComponent
          :text="item.getFinished()"
          :color="item.getColorFinished()"
        />
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
      title="Editar actividad"
      @click:close="dialogForm.visible = false"
    >
      <v-row>
        <v-col cols="12">
          <TextInputComponent
            label="Descripción"
            v-model="activityTemporary.description"
            :error="errors.description"
          />
        </v-col>
        <v-col cols="12">
          <v-dialog
            ref="dialogCalender"
            v-model="calendar.visible"
            :return-value.sync="activityTemporary.date"
            persistent
            width="290px">
            <template v-slot:activator="{ on }">
              <TextInputComponent
                label="Fecha"
                v-model="activityTemporary.date"
                :on="on"
                :error="errors.date"
              />
            </template>
            <DatePickerComponent
              v-model="activityTemporary.date"
              @close="calendar.visible = false"
              @save="$refs.dialogCalender.save(activityTemporary.date)"
            />
          </v-dialog>
        </v-col>
        <v-col cols="12">
          <InputSwitchComponent
            label="Finalizado"
            v-model="activityTemporary.finished"
            :text="activityTemporary.finished == true ? 'SI' : 'NO'"
          />
        </v-col>
        <v-col cols="12">
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
import { Activity } from '@/models/Activity';
import { mapState, mapMutations, mapActions } from 'vuex';
export default Vue.extend({

  props: {
    items: {
      type: Array as () => Array<Activity>,
      default: () => []
    },
    pageApi: {
      type: Number
    },
    size: {
      type: Number
    },
    request: {
      type: String,
      default: ''
    }
  },
  
  data: () => {
    return {
      headers: [
        { text: '#', value: 'number' },
        { text: 'Descripción', value: 'description'},
        { text: 'Fecha', value: 'date'},
        { text: 'Estado', value: 'finished' },
        { text: 'Acciones', value: 'actions' },
      ],
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
      activityTemporary: {} as Activity,
      positionActivityTemporary: 0,
      errors: {
        description: '',
        date: '',
        finished: false
      },
      errorsDefault: {
        description: '',
        date: '',
        finished: false
      }
    }
  },

  computed: {
    ...mapState('activityModule', ['activity','errorsMessage','successfulRegistration'])
  },

  methods: {
    ...mapMutations('activityModule', ['SET_ACTIVITY',
      'SET_ERRORS_MESSAGE','SET_SUCCESSFUL_REGISTRATION','REPLACE_ACTIVITY']),
    ...mapActions('activityModule', ['updateActivity','getActivities']),

    async edit(activity: Activity): Promise<void> {
      this.errors = Object.assign({}, this.errorsDefault);
      this.activityTemporary = Object.assign({}, activity);
      this.positionActivityTemporary = this.items.indexOf(activity);
      this.dialogForm.visible = true;
    },

    async update(): Promise<void> {
      const dataPost = {
        idActivity: this.activityTemporary.id,
        description: this.activityTemporary.description,
        date: this.activityTemporary.date,
        finished: this.activityTemporary.finished
      }

      await this.updateActivity(dataPost);
      this.errors = Object.assign({}, this.errorsDefault);

      if (this.errorsMessage) {
        this.errorsMessage.forEach((error: { [x: string]: any }) => {
          if (error['description']) this.errors.description = error['description'];
          if (error['descripcion']) this.errors.description = error['descripcion'];
          if( error['date']) this.errors.date = error['date'];
          if (error['finished']) this.errors.finished = error['finished'];
        })
        this.SET_ERRORS_MESSAGE([]);
      }

      if (this.successfulRegistration) {
        // const dataToUpdate = {
        //   position: this.positionActivityTemporary,
        //   description: this.activity.description,
        //   date: this.activity.date,
        //   finished: this.activity.finished
        // }

        this.dialogForm.visible = false;
        this.snackbar.text = "Se guardó correctamente";
        this.snackbar.visible = true;
        // this.REPLACE_ACTIVITY(dataToUpdate);
        await this.getActivities(this.request);
        this.SET_SUCCESSFUL_REGISTRATION(false);
        this.SET_ACTIVITY({});
      }
    }
  }
});
</script>