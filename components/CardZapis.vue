<template>
  <div>

      <div class="conf" >
        <p>Время: {{times.time}}</p>
        <p>Имя клиента: {{times.owner_id}}</p>
        <p>
          Номер
          <br />телефона
          <br />
          клиента : {{times.phone_owner}}
        </p>
        <div v-if="times.phone_owner && !times.master_confirm">
          <button @click="onMasterConf(times.id)">подтвердить</button>
        </div>
      </div>
      <br>


    <div>

    </div>
  </div>
</template>

<script>
export default {
  props: ["times","onMasterConf"],
  data() {
    return {

    };
  }
};
</script>

<style >
.non-conf {
  background: turquoise;
}
.conf {
  background: gold;
}
.new-conf{
    background: wheat;
}
</style>