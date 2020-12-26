<template>
  <div>
    <div class="row">
        <div class="col-lg-3" v-for="date in date_time" :key="date.id">
          <p>Дата: {{date.date}} {{date.id}}</p>
          <button @click="openTime(date.id)" class=" ">смотреть записи</button>
        </div>
        <div class="col-12 mt-4">
            <div v-for=" times in Autj" :key="times.id">
              <h2>Предстоящие записи</h2>
              <CardZapis :times="times" />
            </div>
            <!-- <div v-if="!time_data.owner_id">
              <h2>Мною созданы</h2>
              <CardCreateTime :time_data="time_data" />
        </div> -->

        </div>

          <!-- <div class="col-12">
            <div v-if="time_data.owner_id">
              <h2>Предстоящие записи</h2>
              <CardZapis :time_data="time_data" />
            </div>
            <div v-if="!time_data.owner_id">
              <h2>Мною созданы</h2>
              <CardCreateTime :time_data="time_data" />
        </div> -->
  </div>
  </div>
</template>

<script>
import CardZapis from "@/components/CardZapis";
import CardCreateTime from "@/components/CardCreateTime";
export default {
  props: ["date_time","openTime","time_data","new_time"],
  computed:{
      Autj(){
          return this.time_data
      }
  },
  components: {
    CardZapis,
    CardCreateTime
  },
  methods: {

  },
};
</script>

<style >
.date-box{
    cursor: pointer;
}
</style>