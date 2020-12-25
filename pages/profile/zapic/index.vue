<template>
    <div>
        <h1>Созданное время {{user_id}}</h1>
        <div class="row">
            <div class="col-12">

            </div>
        </div>
    </div>
</template>

<script>
export default {
    layout: 'admin',
    data() {
        return {
            user_id:this.$store.state.auth.user.id
        }
    },
    asyncData({ $axios, error }) {
    const headers = {
        "Content-Type": "application/json"
    };


    return $axios
        .$get(`https://glebhleb.herokuapp.com/user/${user_id}`, {
        headers: headers
        })
        .then(
        user => {
            return {user}

        })

    },

}
</script>