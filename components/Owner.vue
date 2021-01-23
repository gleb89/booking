<template>
    <div class=" justify-content-center ">
        <button @click="onPage" class="mt-4">назад</button>
        <p class="text-center mt-5">У вас {{user_time()}} записи</p>
        <br>

        <div class="text-center">
            <nuxt-link  to="/profile/datetime-user">Смотреть</nuxt-link>
        </div>

    </div>
</template>

<script>
export default {


      props:['user','user_time'],
      methods: {
        onPage(){
        this.$router.go(-1);
      },
      },
}
</script>

<style  scoped>

</style>