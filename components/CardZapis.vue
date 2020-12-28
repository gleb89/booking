<template>
  <div>
    <div v-if="!error_mes" class="conf">
      <p><fa icon="calendar-alt"></fa> <span>Дата:</span>  {{click_data}}</p>
      <p><fa icon="clock"></fa> <span>Время:</span>  {{times.time.slice(0,5)}}</p>
      <p v-if="times.owner_id"><fa icon="user-clock"></fa> <span>Имя клиента:</span>  {{times.owner_id}}</p>
      <p v-if="times.phone_owner">
        <fa icon="mobile-alt"></fa>
        <span>Номер
        клиента :</span>
         {{times.phone_owner}}
      </p>
      <div v-if="times.phone_owner && !times.master_confirm">
        <button @click="onMasterConf(times.id)">подтвердить</button>
      </div>
      <div v-if="!times.phone_owner && !times.master_confirm">
        <button @click="onTimeDel(times.id)">удалить</button>
        <button @click="onChangeTime(times.id)">изменить</button>
      </div>
    </div>
    <br />

    <div></div>
  </div>
</template>

<script>
export default {
  props: [
    "times",
    "onMasterConf",
    "onTimeDel",
    "del",
    "error_mes",
    "onChangeTime",
    "click_data"
  ],
  data() {
    return {};
  }
};
</script>

<style >
.non-conf {
  background: turquoise;
}
.conf {
  padding: 1rem;
    background: white;
    box-shadow: -3px 5px 10px 3px #3f51b542;
}
.new-conf {
  background: wheat;
}
span{
  color: rgb(0 150 136 / 65%);
  font-weight: 900;
}
</style>