<template>
  <div class="container ">
      <div class="row justify-content-center">
    <div v-for="user of users" :key="user.id" class="card col-12 col-lg-3 m-4" >
      <img class="card-img-top" src="/header.png" alt="Card image cap" />
      <div class="card-body">
        <h5 class="card-title">{{ user.name}}</h5>
        <hr>
        <p>Стоматолог</p>
        <p>Город:{{ user.city}}</p>
        <!-- <p
          class="card-text"> -->
          <!-- <div> -->
            <!-- <fa v-for="star in max_rating" :key="star" class="icons_rating" icon="star"></fa> -->
            <!-- <Rating/> -->
            <div v-if="alert" class="alert  alert-warning alert-dismissible fade show" role="alert">Нужна регистрация</div>
             <fa @click="onStar(star,user.id)" v-for="star in max_rating"
            :key="star"
            class="icons_rating"
            v-model="rating"
            icon="star" ></fa>
             <p>Рейтинг :{{user.rating}}</p>


        <!-- </div> -->


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
    authName(){
      let name_user = this.$store.state.auth
      if(name_user  === null){
        return null
      }
      else{
        return name_user.user.id
      }
    }
  },
    props:["users","openUser","items"],
    methods: {
      onStar(star,user_id) {
      if(this.authName != null){
          this.rating = star
          let data = {
          user_id: user_id,
          owner_id: this.authName,
          rating: this.rating
          }

          const headers = {
          "Content-Type": "application/json"
        };
        this.$axios
        .$post("https://glebhleb.herokuapp.com/rating", data, {
          headers: headers
        })
        .then(
          response => {
            console.log(response.rating_user.rating_user);

          }
        )
      }
      else{
        this.alert = true;
        setTimeout(() => {
            this.alert = false;

            }, 2000);
      }

      }
    },

    data() {
      return {
        max_rating:5,
        rating:0,
        alert:false
      }
    },


}
</script>

<style >
    .card {
    border-radius: 0% 20%;
    /* border: 1px solid #3cbfa6; */
    box-shadow: 5px 5px 5px 5px #00000042;
}
.alert{
  position: absolute;
  z-index: 1;
  width: max-content;
}
.icons_rating {
  color: blanchedalmond;
}
.card:hover{
    background-color: #f0f8f6;
}
.icons_rating {
  color: blanchedalmond;
}
.btn {
    background: #3cbfa7;
    box-shadow: 3px 3px 3px #0000007a;
}
</style>