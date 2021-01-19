<template>
    <div class="container">
        <CabinetMaster :user_id="user_id" :user="user" :nonrating="nonrating" :usRating="usRating" :clickRating="clickRating" :rating_click="rating_click" :authrating="authrating" :ratingChange="ratingChange"/>
    </div>
</template>


<script>
const Cookie = process.client ? require('js-cookie') : undefined
import CabinetMaster from "@/components/CabinetMaster";
;
export default {
    asyncData({ $axios,route, error }) {
    const headers = {
        "Content-Type": "application/json"
      };
      const user_id = Number(route.params.id)

       return $axios
        .$get(`https://api-booking.ru/user/${user_id}`, {
          headers: headers
        })
        .then(
          user => {
            return {user}

          })

      },
      computed:{
      authName() {
      let name_user = this.$store.state.auth;
      if (name_user === null) {
        return null;
      } else {
        return name_user.user.id;
      }
    }
      },
     component: {
    CabinetMaster
  },

    data() {
        return {
            user_id: this.$route.params.id,
            uu:[],
            rating_click:false,
            authrating:0,
            ratingChange:false,
            nonrating:false
        }
    },
    methods: {
      usRating(rating){
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
      clickRating(star,user_id){
        if (this.authName != null) {
        let data = {
          user_id: user_id,
          owner_id: this.authName,
          rating: star
        };

        const headers = {
          "Content-Type": "application/json"
        };
        this.$axios
          .$post("https://api-booking.ru/rating", data, {
            headers: headers
          })
          .then(response => {
            this.rating_click = true
            this.authrating = response.rating_user.rating_user
            this.ratingChange = true,
            setTimeout(() => {
              this.rating_click = false
          }, 2000);
          });
      } else {
        this.nonrating = true
        setTimeout(() => {
          this.nonrating = false
        }, 2000);
      }

      }
    },

}
</script>

<style>
</style>
