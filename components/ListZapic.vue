<template>
  <div>
    <div class="row">
      <div class="col-lg-3 box-date-time" v-for="date in date_time" :key="date.id">
        <p>Дата: {{date.date}}</p>
        <div class="d-flex justify-content-end">
          <button @click="openTime(date.id)" class="btn-open rounded-pill">смотреть</button>
        </div>
      </div>

    </div>
  </div>
</template>

<script>
import CardZapis from "@/components/CardZapis";
import CardCreateTime from "@/components/CardCreateTime";
export default {
  props: ["date_time", "openTime", "time_data",],
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
  methods: {}
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
}
.btn-open {
  width: max-content;
  padding: 5px;
  background: #3cbfa7;
  box-shadow: 3px 3px 3px #0000007a;
  border: none;
}
</style>