<template>
    <div class="container">
        <div class="list-time">
            <div class="mt-4">
                <button @click="new_timi = !new_timi, nocomf = false,comf = false">новые</button>
                <br>
            </div >
            <div class="mt-4">
                <button @click="comf = !comf, nocomf = false,new_timi =false ">уже записаны</button>
            </div>
            <div class="mt-4">
                <button @click="nocomf = !nocomf,new_timi = false,comf = false">не записаны</button>
                <br>
            </div>




        </div>
        <div v-for=" times in itemsTime" :key="times.id" >
          <CardZapis  :times="times" :onMasterConf="onMasterConf" />
        </div>
    </div>
</template>


<script>
import CardZapis from "@/components/CardZapis";
import CardCreateTime from "@/components/CardCreateTime";
export default {
    layout: 'admin',
        asyncData({ $axios,route, error }){
            let date_id = route.params.id
            const headers = {
            "Content-Type": "application/json"
            };
        return $axios
        .$get(`https://glebhleb.herokuapp.com/booking_time/${date_id}`, {
        headers: headers
        })
        .then(
        time_for_date => {
            return {time_for_date}
        })

    },
    computed:{
        itemsTime(){
            if (this.comf){
                console.log('comf');
            return this.time_for_date.filter(elem =>{
                return elem.master_confirm

           })

            }
            if (this.new_timi){
                console.log('new_timi');
                return this.time_for_date.filter(elem =>{
                return elem.phone_owner && !elem.master_confirm

           })
            }
            if (this.nocomf){
                console.log('nocomf');
                return this.time_for_date.filter(elem =>{
                    return !elem.master_confirm && !elem.phone_owner

           })
            }


            return this.time_for_date
        }

    },
    data() {
        return {
            time_data:[],
            comf:false,
            new_timi:false,
            nocomf:false
        }
    },
    methods: {
        onMasterConf(time_id){
            let data = {
                "id": Number(time_id),
                "master_confirm": true
            }

            const headers = {
                "Content-Type": "application/json"
            };

            this.$axios
            .$put("http://localhost:8000/confirm-time/", data, {
              headers: headers
            })
            .then(resp =>{
                console.log(resp);

            })
    }
    },
    components: {
    CardZapis,
    CardCreateTime
  },
}
</script>


<style >
.list-time{
    margin-top: 4rem;
}
</style>