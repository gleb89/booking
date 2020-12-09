<template>
    <div class="container">
        <CabinetMaster :user_id="user_id" :user="user"/>
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
        .$get(`http://127.0.0.1:8000/user/${user_id}`, {
          headers: headers
        })
        .then(
          user => {
            return {user}

          })

      },
     component: {
    CabinetMaster
  },

    data() {
        return {
            user_id: this.$route.params.id,
            uu:[]


        }
    },
}
</script>

<style>
</style>
