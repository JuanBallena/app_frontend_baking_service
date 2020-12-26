<template>
  <v-menu bottom right transition="scroll-y-transition">
    <template v-slot:activator="{ on }">
      <div v-on="on">
        <div class="dropdown-user__text">
          {{ username }}

          <v-icon small class="dropdown-user__icon">fa-caret-down</v-icon>
        </div>
      </div>
    </template>

    <v-card elevation="0">
      <v-list flat class="primary">
        <v-list-item>
          <v-list-item-content class="white--text">
            <v-list-item-title class="dropdown-user__card__user">
              {{ username }}
            </v-list-item-title>

            <v-list-item-subtitle class="dropdown-user__card__rol white--text">
              Administrador del sistema
            </v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
      </v-list>

      <v-divider></v-divider>

      <v-list flat  dense>
        <v-list-item-group>
          <v-list-item>
            <v-list-item-icon>
              <v-icon small>fas fa-sign-out-alt</v-icon>
            </v-list-item-icon>

            <v-list-item-content @click="logout()">
              <v-list-item-title>Cerrar sesión</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-card>
  </v-menu>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({

  data: () => {
    return { 
      username: localStorage.getItem('username')
    }
  },
  
  methods: {
    logout(): void {
      localStorage.clear();
      this.$router.push({ name: 'Login' });
    }
  }

});
</script>

<style scoped>

.dropdown-user__text {
  color: var(--v-primary-base);
  padding: 15px 0;
  font-size: 14px;
  text-transform: uppercase;
  cursor: pointer;
  font-weight: bold;
}

.dropdown-user__icon {
  color: var(--v-primary-base);
  padding: 0 0 0 10px;
}

.dropdown-user__card__user {
  text-transform: uppercase;
}

.dropdown-user__card__rol {
  padding: 2px 0 0 0;
  font-size: 12px;
}

</style>