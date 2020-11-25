<template>
    <div>
        <h2>about</h2>
        <p>token:{{ auth }}</p>
    </div>
</template>


<script>
const Cookie = process.client ? require('js-cookie') : undefined
export default {
    middleware: 'authenticated',
    data() {
        return {
            auth:this.$store.state.auth.access_token
        }
    },
}
</script>

<style>

</style>