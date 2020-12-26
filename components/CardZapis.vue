<template>
  <div>

    <div v-if="times.master_confirm">
      <h2>Подтвержденные</h2>
      <p>Время: {{times.time}}</p>
      <p>Имя клиента: {{times.owner_id}}</p>
      <p>Номер <br> телефона <br>клиента : {{times.phone_owner}}</p>
    </div> -->
    <div v-if="!times.master_confirm">
      <h2>Новые</h2>
      <p>Время: {{times.time}}</p>
      <p>Имя клиента: {{times.owner_id}}</p>
      <p>Номер <br> телефона <br>клиента: {{times.phone_owner}}</p>
    </div>
    <div>
      <h2>клиент предложил свое время</h2>
    </div>
</div>

</template>

<script>
export default {
  props: ["times"]
};
</script>