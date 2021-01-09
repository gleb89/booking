<template>
    <div class="container m">
        <section class="filter">
            <h3>Мои записи</h3>
        <div class="list-time">

                 <div class="form-check">
                     <h5>Фильтры</h5>
                <input type="checkbox" id="checkbox" v-model="new_timi" @click="new_timi = !new_timi, nocomf = false,comf = false,all_time = false" switch/>
                <label class="form-check-label" for="exampleCheck1">Новые</label>
              </div>
                <div class="form-check">
                <input type="checkbox" id="checkbox" v-model="comf" @click="comf = !comf, nocomf = false,new_timi =false,all_time = false " />
                <label class="form-check-label" for="exampleCheck1">уже записаны</label>
              </div>
                <div class="form-check">
                <input type="checkbox" id="checkbox" v-model="nocomf" @click="nocomf = !nocomf,new_timi = false,comf = false,all_time = false"/>
                <label class="form-check-label" for="exampleCheck1">не записаны</label>
              </div>
                              <div class="form-check">
                <input type="checkbox" id="checkbox" v-model="all_time"  @click="nocomf = false,new_timi = false,comf = false" />
                <label class="form-check-label" for="exampleCheck1">Все</label>
              </div>
        </div>
        </section>

        <section id="section-time" class="mt-4 mb-4">
        <div class="row">
            
        <div class="col-lg-4 col-12 mt-4"  v-for=" (times,idx) in itemsTime" :key="times.id" >
          <CardZapis  :times="times" :active_el="active_el" :timing="timing" :idx="idx" :onMasterConf="onMasterConf"
           :onTimeDel="onTimeDel"
           :onChangeTime="onChangeTime"
            :error_mes="error_mes" :click_data="click_data"/>
            </div>
        
        </div>
        </section>
    </div>
</template>


<script>
import CardZapis from "@/components/CardZapis";
import CardCreateTime from "@/components/CardCreateTime";
export default {
    layout: 'admin',
        asyncData({ $axios,redirect,route, error }){
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
        .catch(function (error) {
            redirect('/profile/zapic')
        })


    },
    computed:{
        itemsTime(){
            if (this.comf){
            return this.time_for_date.filter(elem =>{
                return elem.master_confirm

           })

            }
            if (this.new_timi){
                return this.time_for_date.filter(elem =>{
                return elem.phone_owner && !elem.master_confirm

           })
            }
            if (this.nocomf){
                return this.time_for_date.filter(elem =>{
                    return !elem.master_confirm && !elem.phone_owner

           })
            }
            if (this.all_time){
                return this.time_for_date
            }

        }

    },
    data() {
        return {
            time_data:[],
            click_data:this.$route.query.data,
            comf:false,
            new_timi:false,
            nocomf:false,
            error_mes:false,
            all_time:true,
            timing:false,
            active_el:0
        }
    },
    methods: {
        onMasterConf(time_id,idx){
            this.active_el = time_id
            let data = {
                "id": Number(time_id),
                "master_confirm": true
            }

            const headers = {
                "Content-Type": "application/json"
            };

            this.$axios
            .$put("https://glebhleb.herokuapp.com/confirm-time/", data, {
              headers: headers
            })
            .then(resp =>{
                this.time_for_date.splice(idx, 1)
                this.onNewData()
                this.timing = false

            })
    },
    onNewData(){
        const headers = {
            "Content-Type": "application/json"
            };
        const date_id = this.$route.params.id
        return this.$axios
        .$get(`https://glebhleb.herokuapp.com/booking_time/${date_id}`, {
        headers: headers
        })
        .then(
        time_for_date => {
                return this.time_for_date = time_for_date
        })
        .catch(function (error) {
            redirect('/profile/zapic')
        })
    },
    onTimeDel(time_id,idx){
       
             this.active_el = time_id
            const headers = {
                "Content-Type": "application/json"
            };

            this.$axios
            .$delete(`https://glebhleb.herokuapp.com/booking_time/${Number(time_id)}`, {
              headers: headers
            })
            .then(resp =>{
                
                this.time_for_date.splice(idx, 1)
                this.onNewData()
                this.timing = false
            })

    },
    onChangeTime(time_id){
        console.log(time_id);

    }
    },
    components: {
    CardZapis,
    CardCreateTime
  },
}
</script>


<style >
.list-time {
    margin-top: 4rem;
    box-shadow: 4px 9px 9px 5px rgb(33 150 243 / 10%);
}
.filter{
    margin-top: 5rem;
}
</style>