<template>
    <div class="container">
        <CabinetMaster :user_id="user_id"/>
    </div>
</template>


<script>
const Cookie = process.client ? require('js-cookie') : undefined
import CabinetMaster from "@/components/CabinetMaster";
;
export default {


     component: {
    CabinetMaster
  },
    data() {
        return {
            user_id: this.$route.params.id,
        }
    },
}
</script>

<style>

</style>
