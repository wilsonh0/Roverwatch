<template>
  <div v-show="!loading">
    <h1 class="display-1 font-weight-bold">News</h1>
    <news-card class="cards" v-for="(item, i) in news" :key="i" :data="item"></news-card>
  </div>
</template>

<script>
import newsCard from "../components/news";

export default {
  components: {
    newsCard
  },
  data: () => ({
    news: null
  }),
  created() {
    const key = this.$store.getters.getNewsKey;

    //Get Latest pictures available.
    this.loading = true;
    this.$axios
      .get(
        "https://newsapi.org/v2/everything?language=en&sortBy=publishedAt&q=nasa +space +mars +rover&apiKey=" +
          key
      )
      .then(res => {
        this.news = res.data.articles;
        this.loading = false;
      });
  }
};
</script>

<style>
.cards {
  margin: 15px 5px;
}
</style>
