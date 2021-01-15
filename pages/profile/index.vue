<template>
    <div class="container mt-4">
        <Master v-if="userAuth" :user="user"/>
        <Owner v-if="!userAuth" :user="user" :user_time="user_time"/>
    </div>
</template>

<script>
import Master from "@/components/Master";
import Owner from "@/components/Owner";
export default {
    layout: 'admin',
    middleware: 'authenticated',
     asyncData({ $axios,store, error }) {
    const headers = {
        "Content-Type": "application/json"
      };
      const user_id = Number(store.state.auth.user.id)
       return $axios
        .$get(`https://glebhleb.herokuapp.com/user/${user_id}`, {
          headers: headers
        })
        .then(
          user => {
            return {user}

          })

      },
      methods:{
        user_time(){
        const headers = {
        "Content-Type": "application/json"
      };
      const user_id = Number(this.$store.state.auth.user.id)
       this.$axios
        .$get(`http://127.0.0.1:8000/booking-data-user/${user_id}`, {
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