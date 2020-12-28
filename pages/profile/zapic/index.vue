<template>
    <div class="container">
        <h1>Мои записи</h1>
        <ListZapic :Datetime="Datetime" :openTime="openTime" :time_data="time_data" :new_time="new_time" />
    </div>
</template>

<script>
import ListZapic from "@/components/ListZapic";
export default {
    layout: 'admin',
    data() {
        return {
            time_data:[],
            new_time:false,

        }
    },
    components:{
        ListZapic
    },
    asyncData({ $axios,store, error }) {
    const headers = {
        "Content-Type": "application/json"
    };
    let user_id = store.state.auth.user.id
    return $axios
        .$get(`https://glebhleb.herokuapp.com/booking-data/${Number(user_id)}`, {
        headers: headers
        })
        .then(
        date_time => {
            return {date_time}
        })

    },
    computed:{
        Datetime(){
            return this.date_time.filter(elem =>{
                return elem.time.length
            })


        }
    },
    methods: {
        openTime(date_id,date){
          this.$router.push(`/profile/zapic/${date_id}?data=${date}`)

      }
    },

}
</script>

<style >
.navbar-master{
    background: wheat;
}
</style>