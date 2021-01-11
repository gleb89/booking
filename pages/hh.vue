<template>
    <div>
        {{autTime}}
    </div>
</template>

<script>
import { mapState } from "vuex";
export default {
     async fetch({ store }) {
    if (store.getters["time/time"].length === 0) {
      await store.dispatch("time/fetch");
    }
  },
  computed:{
    autTime(){
      return this.$store.getters["time/time"]
    }
    
  },
}
</script>