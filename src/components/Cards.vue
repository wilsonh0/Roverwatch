<template>
  <v-layout text-xs-left>
    <v-flex xs12 sm6 offset-sm3>
      <v-card>
        <v-img class="white--text" :src="photo.img_src">
          <v-container fill-height fluid>
            <v-layout fill-height>
              <v-flex xs12 align-end flexbox>
                <v-chip color="grey darken-4" :class="textSize" text-color="white" :small="!show">
                  <v-icon v-show="show">camera</v-icon>
                  {{ photo.camera.full_name }}
                </v-chip>
              </v-flex>
            </v-layout>
          </v-container>
        </v-img>
        <v-card-title>
          <div>
            <span class="title">{{ photo.rover.name }}</span>
            <br>
            <span class="subheading">Sol {{ photo.sol }}</span>
            <br>
            <span>{{ photo.earth_date }}</span>
          </div>
        </v-card-title>
        <v-card-actions>
          <v-btn flat color="orange">Explore</v-btn>
        </v-card-actions>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
export default {
  props: ["photo"],
  computed: {
    textSize() {
      switch (this.$vuetify.breakpoint.name) {
        case "sm":
          return "caption truncate width='50px'";
        case "xs":
          return "caption truncate";
        default:
          return "subheading";
      }
    },
    show() {
      switch (this.$vuetify.breakpoint.name) {
        default:
          return true;
        case "xs":
          return false;
      }
    }
  }
};
</script>
