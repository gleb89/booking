<template>
  <div>
    <div class="row">
      <div class="col-lg-3 box-date-time" v-for="date in Datetime" :key="date.id">
        <p><fa icon="calendar-alt"></fa> Дата: {{onsdata(date.date)}}</p>
        <p class="calculater"><fa icon="calculator"></fa> Всего записей :{{date.time.length}}</p>
        <p class="new"><fa icon="circle"></fa> новых :{{CountNewTime(date.time)}}</p>
        <p class="pred"><fa icon="check"></fa> Предстоящие :{{CountComfTime(date.time)}}</p>
        <div class="d-flex justify-content-end">
          <button @click="openTime(date.id,date.date)" class="btn-open "><fa icon="arrow-right"></fa></button>
        </div>
      </div>

    </div>
  </div>
</template>

<script>
import CardZapis from "@/components/CardZapis";
import CardCreateTime from "@/components/CardCreateTime";
export default {
  props: ["Datetime", "openTime", "time_data",],
  computed: {
    Autj() {
      return this.time_data;
    }
  },
  data() {
      return {
        user_time: false,
        new_time:false,
        non_conf :false
      }
  },
  components: {
    CardZapis,
    CardCreateTime
  },

  methods: {
    CountNewTime(times){
     let count_new =  times.filter(elem =>{
                return elem.phone_owner && !elem.master_confirm
            })
      return count_new.length

    },
      onsdata(click_data){
      let god = Number(click_data.slice(0,4))

      let mes = Number(click_data.slice(5,6))
      let day = Number(click_data.slice(8,11))
      let vv = new Date(god,mes,day).toLocaleString('ru', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });
      return vv
    },
      CountComfTime(times){
     let count_comf =  times.filter(elem =>{
                return elem.master_confirm
            })
      return count_comf.length

    }
  }
};
</script>

<style >
.date-box {
  cursor: pointer;
}
.box-date-time {
  display: flex;
  flex-direction: column;
  background: white;
  box-shadow: -1px 3px 8px 3px #b3c5d8;
  margin: 2rem;
  padding: 5px;
  border-radius: 7%;
}
.btn-open {
  /* width: max-content; */
  box-shadow: 0px 7px 5px 3px rgba(49,76,123,0.38824);
  margin: 1rem;
  padding: 5px;
  /* background: #3cbfa7;
  box-shadow: 3px 3px 3px #0000007a; */
  background: none;
  border: none;
  width: 3rem;
  border-radius: 15%;
}
.new path{
  color: #2196F3;
}
.calculater path{
  color: black;
}
.pred path{
  color: floralwhite;
}
.btn-open path{
  color: #3396f3;


}
</style>