<template>
  <div>
      <h2>Мною созданы</h2>
      <button @click="user_time = !user_time"><span v-if="!user_time">смотреть</span> <span v-if="user_time">свернуть</span> </button>
      <div v-if="user_time">
          <p>Время: {{times.time}}</p>
          </div>

    <hr />
  </div>
</template>


<script>
export default {
    props:['times'],
    data() {
        return {
            user_time:false
        }
    },
    methods: {
        openUsertime(){

        }
    },

}
</script>