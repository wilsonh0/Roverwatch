<template>
  <v-app>
    <v-navigation-drawer
      v-model="drawer"
      stateless
      app
      :width="250"
    >
      <v-list>
        <v-list-tile :to="'/'">
          <v-list-tile-action>
            <v-icon>home</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>Home</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>

        <v-list-group
          no-action
          prepend-icon="waves"
        >
          <v-list-tile slot="activator">
            <v-list-tile-title>Rovers</v-list-tile-title>
          </v-list-tile>

          <v-list-tile
            v-for="(rover, i) in roverList"
            :key="i"
            :to="rover"
          >
            <v-list-tile-title v-text="rover"></v-list-tile-title>
          </v-list-tile>
        </v-list-group>
      </v-list> 
    </v-navigation-drawer>
    <v-toolbar color="deep-orange darken-4" dark fixed app>
      <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
      <v-toolbar-title>Roverwatch</v-toolbar-title>
    </v-toolbar>
    <v-content>
      <v-container fluid fill-height>
        <v-layout
        >
          <v-flex text-xs-center>
	    <keep-alive>
            <router-view :key="$route.fullPath">
            </router-view>
	    </keep-alive>
          </v-flex>
        </v-layout>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
import Cards from './components/Cards'
  export default {
    name: 'App',
    data: () => ({
        drawer: null,
    }),
    computed: {
      curDate() {
        return this.$store.getters.getDate;
      },
      roverList() {
        return this.$store.getters.getRovers;
      }
    },
  }
</script>
