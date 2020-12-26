<template>
  <div>
    <v-card
      elevation="0"
      class="mx-auto mt-5"
      max-width="344"
    >
      <v-card-text>
        <h4 class="display-1 text-primary">
          El Padrino
        </h4>
        <v-row>
          <v-col cols="12">
            <v-alert
              v-if="errorMessage"
              prominent
              type="error"
              dense
            >
              <v-row align="center">
                <v-col class="grow">
                  {{ errorMessage }}
                </v-col>
              </v-row>
            </v-alert>

            <p class="primary--text font-weight-bold">Iniciar sesión</p>
            
            <TextInputComponent 
              label="Usuario"
              v-model="username"
              placeholder="Escriba nombre de usuario"
            />
          </v-col>
          <v-col cols="12">
            <TextInputComponent
              label="Contraseña"
              v-model="password"
              placeholder="Escriba contraseña"
              :icon="showPassword ? 'fa-eye' : 'fa-eye-slash'"
              :inputType="showPassword ? 'text' : 'password'"
              @click:icon="showPassword = !showPassword"
            />
          </v-col>
          <v-col cols="12">
            <v-btn
              depressed
              color="primary"
              block
              @click="signIn()"
            >
              Acceder
              <v-icon
                class="ml-3"
                x-small>
                fas fa-arrow-right
              </v-icon>
            </v-btn>
          </v-col>
        </v-row>
      </v-card-text>
    </v-card> 
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { mapState, mapMutations, mapActions } from 'vuex'; 

export default Vue.extend({
  data : () => {
    return {
      username: '',
      password: '',
      showPassword: false
    }
  },

  created() {
    this.username = '';
    this.password = '';
  },

  computed: {
    ...mapState('userModule', ['authenticatedUser','successfulAuthentication','errorMessage'])
  },

  methods: {
    ...mapMutations('userModule', ['SET_SUCCESSFUL_AUTHENTICATION','SET_ERROR_MESSAGE']),
    ...mapActions('userModule', ['login']),

    async signIn(): Promise<void> {

      const dataPost = {
        username: this.username,
        password: this.password
      }

      await this.login(dataPost);

      if (this.successfulAuthentication) {

        localStorage.setItem('username', this.authenticatedUser.username);
        localStorage.setItem('currentActivity', this.authenticatedUser.currentActivity);
        this.SET_SUCCESSFUL_AUTHENTICATION(false);
        this.SET_ERROR_MESSAGE('');
        this.$router.push({ name: 'BakeTicketList'})
      }
    }
  }
})
</script>