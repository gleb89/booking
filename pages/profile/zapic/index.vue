<template>
    <div class="container">
        <h1 class="my_zapic">Мои записи</h1>
        <ListZapic v-if="!al_data" :Datetime="Datetime" :openTime="openTime" :time_data="time_data" :new_time="new_time" />
        <p v-if="al_data">У вас пока нет записей</p>
        <button v-if="al_data" @click="appendtime" class="btn-append rounded-pill">Добавить время</button>
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
            al_data:false

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
        .$get(`http://api-booking.ru/booking-data/${Number(user_id)}`, {
        headers: headers
        })
        .then(
        date_time => {
            return {date_time}
        })
        .catch(function (error) {
            console.log(error);

        })


    },
    computed:{
        Datetime(){
            try {
            return this.date_time.filter(elem =>{
                    return elem.time.length
                })
            }
        catch (e) {
                this.al_data = true
            }


        }

    },
    methods: {
        openTime(date_id,date){
          this.$router.push(`/profile/zapic/${date_id}?data=${date}`)

      },
      appendtime(){
          this.$router.push('/profile/datetime')
      }
    },

}
</script>

<style >
.navbar-master{
    background: wheat;
}
.btn-append{
    background: cornflowerblue;
    color: white;
    box-shadow: 7px 3px 7px 3px #00000082;
    border: none;
    padding: .4rem;
}
.my_zapic{
    margin-top: 10rem;
}
</style>