<template>
  <div>
    <fa @click="onStar(star)" v-for="star in max_rating"
    :key="star"
    class="icons_rating"
    v-model="rating"
    icon="star" ></fa>
  </div>
</template>

<script>
export default {
  data() {
    return {
      max_rating: 5,
      rating:0
    };
  },
  methods: {
    onStar(star) {
      this.rating = star
      console.log(this.rating);
    }
  }
};
</script>

<style >
.icons_rating {
  color: blanchedalmond;
}
.btn-rating {
  border: none;
  background-color: white;
}
</style>