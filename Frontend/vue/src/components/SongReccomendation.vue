<template>
    <div :class="{ 'favorite': recommendation.favorite }">
      <p>{{ recommendation.title }} - {{ recommendation.artist }}</p>
      <button @click="toggleFavorite">Toggle Favorite</button>
      <button @click="deleteRecommendation">Delete</button>
    </div>
  </template>
  
  <script>
  export default {
    name: 'SongRecommendation',
    props: {
      recommendation: {
        type: Object,
        required: true,
      },
      index: {
        type: Number,
        required: true,
      },
    },
    methods: {
      toggleFavorite() {
        this.$emit('toggle-favorite', this.index);
      },
      deleteRecommendation() {
        this.$emit('delete-recommendation', this.index);
      },
    },
  };
  </script>
  
  <style>
  .favorite {
    color: green;
  }
  </style>
  