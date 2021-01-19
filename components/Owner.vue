<template>
    <div class=" justify-content-center ">
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
}
</script>

<style  scoped>

</style>