<template>
    <div>
        <p v-if="userAuth === false">мастер</p>
        <p v-if="userAuth === true">юсер</p>
    </div>
</template>

<script>
export default {
    data() {
        return {

        }
    },
    computed: {
        userAuth(){
            if (this.$store.state.auth === null){
                return null
            }
            else{
                const user = this.$store.state.auth.user.master
                return user
            }


        }
    },
}
</script>