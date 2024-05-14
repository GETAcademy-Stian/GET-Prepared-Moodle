<template>
  <div>
    <h1>Musikkanbefalinger</h1>
    <div>
      <button @click="getRecommendation">Få anbefaling</button>
    </div>
    <div v-for="(recommendation, index) in recommendations" :key="index">
      <song-recommendation
        :recommendation="recommendation"
        :index="index"
        @toggle-favorite="toggleFavorite(index)"
        @delete-recommendation="deleteRecommendation(index)"
      ></song-recommendation>
    </div>
  </div>
</template>

<script>
import { getRecommendation } from './api';
import SongRecommendation from './components/SongReccomendation';

export default {
  name: 'App',
  components: {
    SongRecommendation,
  },
  data() {
    return {
      recommendations: [],
    };
  },
  methods: {
    getRecommendation() {
      const newRecommendation = getRecommendation();
      this.recommendations.push({ ...newRecommendation, favorite: false });
    },
    toggleFavorite(index) {
      this.recommendations[index].favorite = !this.recommendations[index].favorite;
    },
    deleteRecommendation(index) {
      this.recommendations.splice(index, 1);
    },
  },
};
</script>
