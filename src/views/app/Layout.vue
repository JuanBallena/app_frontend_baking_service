<template>
  <div>
    <v-navigation-drawer
      v-model="drawer"
      class="navigator-drawer"
      left
      dark
      app
      overflow
    >
      <MenuComponent />
      <template v-slot:append>
        <!-- <ContactSupportComponent color="white" /> -->
      </template>
    </v-navigation-drawer>

    <v-container fluid class="pa-0">
      <HeaderComponent 
        @click-icon-bars="drawer = !drawer"
      />
      <div class="router-view__container">
        <transition 
          name="slide-fade" 
          mode="out-in"
        >
          <router-view></router-view>
        </transition>
      </div>
    </v-container>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import MenuComponent from '@/views/app/Menu.vue';
import HeaderComponent from '@/views/app/Header.vue';

export default Vue.extend({
  data () {
    return {
      drawer: true,
    }
  },

  components: {
    MenuComponent,
    HeaderComponent
  }
})
</script>

<style scoped>

.navigator-drawer {
  background: var(--v-primary-base);
}

.router-view__container {
  padding: 10px 25px;
}

.slide-fade-enter-active {
  transition: all .2s ease;
}

.slide-fade-leave-active {
  transition: all .2s cubic-bezier(1.0, 0.5, 0.8, 1.0);
}

.slide-fade-enter, .slide-fade-leave-to {
  transform: translateX(0px);
  opacity: 0;
}
</style>