<template>
  <v-layout text-xs-left>
    <v-flex xs12 sm6 offset-sm3>
      <v-card
        color="blue-grey darken-2"
        class="white--text"
        hover="true"
        raised="true"
        ripple="true"
        :href="data.url"
        target="_blank"
      >
        <v-card-title primary-title>
          <div>
            <span
              class="grey--text"
            >{{ new Date(data.publishedAt).toLocaleDateString("fr-CA", {timeZone: "America/New_York"}) }}</span>
            <br>
            <div class="title">{{ data.title }}</div><br>
            <span class="white--text caption height">{{ data.description }}</span>
          </div>
        </v-card-title>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
export default {
  props: ["data"]
};
</script>

<style>
height {
  line-height: 200%;
}
</style>