<template>
  <div class="container">
    <div class="row justify-content-center">
      <div v-for="user of users" :key="user.id" class="card col-12 col-lg-3 m-4">
        <img class="card-img-top" src="/header.png" alt="Card image cap" />
        <div class="card-body">
          <h5 class="card-title">{{ user.name}}</h5>
          <hr />
          <p >{{user.category.title}}</p>
          <p>Город:{{ user.city}}</p>
          <div
            v-if="alert"
            class="alert alert-warning alert-dismissible fade show"
            role="alert"
          >Нужна регистрация</div>
          <fa
            v-for="star in nn(user.rating)"
            :key="

          star.id"
            :class="{active : active_el == star }"
            class="icons_rating"
            icon="star"
          ></fa>

          <p>Рейтинг:{{user.rating}}</p>

          <button @click="openUser(user.id)" class="btn rounded-pill">Смотреть</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Rating from "@/components/Rating";
export default {
  computed: {
    authName() {
      let name_user = this.$store.state.auth;
      if (name_user === null) {
        return null;
      } else {
        return name_user.user.id;
      }
    }
  },
  props: ["users", "openUser", "items"],
  methods: {
    ratt(use) {
      for (let i in use) {
        return i;
      }

      return true;
    },

    nn(rating) {
      let arrRating = [];
      for (var i = 0; i < rating; i++) {
        arrRating.push(1);
      }
      if (arrRating.length != 5) {
        let nonactive = 5 - arrRating.length;
        for (var i = 0; i < nonactive; i++) {
          arrRating.push(0);
        }
      }
      return arrRating;
    },

  },

  data() {
    return {
      max_rating: 5,
      rating: 0,
      alert: false,
      active_el: false,
      rating_us: 0
    };
  }
};
</script>

<style scoped>
.card {
  border-radius: 0% 20%;
  /* border: 1px solid #3cbfa6; */
  box-shadow: 5px 5px 5px 5px #00000042;
}
.alert {
  position: absolute;
  z-index: 1;
  width: max-content;
}

.card:hover {
  background-color: #f0f8f6;
}
.icons_rating {
  color: blanchedalmond;
}
.active {
  color: aliceblue;
}

.btn {
  background: #3cbfa7;
  box-shadow: 3px 3px 3px #0000007a;
}
</style>