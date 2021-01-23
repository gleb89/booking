<template>
<div><button @click="onPage" class="mt-4">назад</button>

    <div v-if="!error_mes" class="conf">
      <!-- <p><fa icon="calendar-alt"></fa> <span>Дата:</span> {{ click_data }}</p> -->
      <p>дата {{onsdata(click_data)}}</p>
      <p>
        <fa icon="clock"></fa> <span>Время:</span> {{ times.time.slice(0,5) }}
      </p>
      <p v-if="times.owner_id">
        <fa icon="user-clock"></fa> <span>Имя клиента:</span>
        {{ times.owner_id }}
      </p>
      <p v-if="times.phone_owner">
        <fa icon="mobile-alt"></fa>
        <span>Номер клиента :</span>
        {{ times.phone_owner }}
      </p>

      <div v-if="times.phone_owner && !times.master_confirm">
        <button class="btn-cal rounded-pill btn"
          :class="{ noactive: active_el == times.id }"
          @click="onMasterConf(times.id, idx)"
        >
          подтвердить
        </button>
        <b-spinner
          class="noactive btn-con"
          :class="{ actives: active_el == times.id }"
          label="Spinning"
        ></b-spinner>
      </div>
      <div v-if="!times.phone_owner && !times.master_confirm">
        <button
          class="btn-del  rounded-pill btn"
          :class="{ noactive: active_el == times.id }"
          @click="onTimeDel(times.id, idx,$event)"
        >
          удалить
        </button>
        <b-spinner
          class="noactive"
          :class="{ actived: active_el == times.id }"
          label="Spinning"
        ></b-spinner>
      </div>
    </div>
</div>
</template>
times.time
<script>
export default {
  props: [
    "times",
    "idx",
    "onMasterConf",
    "onTimeDel",
    "error_mes",
    "onChangeTime",
    "click_data",
    "active_el",
    "dels"
  ],
  data() {
    return {};
  },
  methods:{
          onPage(){
        this.$router.go(-1);
      },
    onsdata(click_data){
      let god = Number(click_data.slice(0,4))

      let mes = Number(click_data.slice(5,7)) -1
      let day = Number(click_data.slice(8,11))
      let vv = new Date(god,mes,day).toLocaleString('ru', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });
      return vv
    }
  }
};
</script>

<style scoped>
.non-conf {
  background: turquoise;
}
.conf {
  min-height: 16rem;
  padding: 1rem;
  background: white;
  box-shadow: -3px 5px 10px 3px #3f51b542;
}
.new-conf {
  background: wheat;
}
span {
  color: rgb(0 150 136 / 65%);
  font-weight: 900;
}
.noactive {
  display: none;
}
.active {
  display: block;
}
.actives{
  display: block;
  bottom: 0;
  margin-bottom: 2rem;
}
.actived{
  display: block;
  position: absolute;
  bottom: 0;
  right: 2rem;
  margin-bottom: 2rem;
}
.noactivebutton {
  display: none;
}
.noactivebutton {
  display: block;
}
.btn-cal {
  border: none;
  background: lightblue;
  color: aliceblue;
  box-shadow: 2px 2px 2px #d6d8db;
  height: 2.3rem;
  box-shadow: 3px 3px 3px rgba(0, 0, 0, 0.47843);
  position: absolute;
  bottom: 0;
  margin-bottom: 2rem;
}
.btn-del {
  border: none;
  background: #d43535bd;
  color: aliceblue;
  box-shadow: 2px 2px 2px #d6d8db;
  height: 2.3rem;
  box-shadow: 3px 3px 3px rgba(0, 0, 0, 0.47843);
  position: absolute;
  bottom: 0;
  right: 2rem;
  margin-bottom: 2rem;
}
</style>