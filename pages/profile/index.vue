<template>
    <div class="container mt-4">
        <fa @click="onPage" class="mt-4 icon-nazad" icon="angle-left"></fa>
        <Master v-if="userAuth" :user="user"/>
        <Owner v-if="!userAuth" :user="user" :user_time="user_time"/>
    </div>
</template>

<script>
import Master from "@/components/Master";
import Owner from "@/components/Owner";
export default {
          head:{
    title:'Личный кабинет'
  },
    layout: 'admin',
    middleware: 'authenticated',
     asyncData({ $axios,store, error }) {
    const headers = {
        "Content-Type": "application/json"
      };
      const user_id = Number(store.state.auth.user.id)
       return $axios
        .$get(`https://api-booking.ru/user/${user_id}`, {
          headers: headers
        })
        .then(
          user => {
            return {user}

          })

      },
      methods:{
      onPage(){
        this.$router.go(-1);
      },
        user_time(){
        const headers = {
        "Content-Type": "application/json"
      };
      const user_id = Number(this.$store.state.auth.user.id)
       this.$axios
        .$get(`https://api-booking.ru/booking-data-user/${user_id}`, {
          headers: headers
        })
        .then(
          user_time => {
            this.len_time = user_time.length

          })
        return this.len_time

      },
      },

    data() {
        return {
            len_time:0
        }
    },
    component:{
        Master,
        Owner
    },
    computed: {
        userAuth(){
            if (this.$store.state.auth === null){
                this.$router.push('/')
            }
            else{
                const user = this.$store.state.auth.user.master
                return user
            }
        }
    },
}
</script>

<style >
.icon-nazad{
  font-size: 3rem;
  color: cornflowerblue;
  cursor: pointer;
}
</style>
