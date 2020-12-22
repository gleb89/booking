<template>
    <div class="container mt-4">
        <Master v-if="userAuth" :user="user"/>
        <Owner v-if="!userAuth" :user="user"/>
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
    data() {
        return {
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