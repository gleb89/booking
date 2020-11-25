<template>
    <div>
        <div>
            {{users}}

        </div>
    </div>
</template>


<script>


export default {
    middleware: 'authenticated',
    asyncData({ $axios, error,store }) {
        let token = store.state.auth.access_token;
        const headers = {
            'Content-Type': 'application/json',
            'Authorization':token
        };

    return $axios
      .$get("https://glebhleb.herokuapp.com/users/me/items/",{
          headers:headers
      })
      .then(users => {
        return { users };
      })
      .catch(err => {
        error(err);
      });
  },
    data() {
        return {
            token:''
        }
    },
    methods: {

    },
}
</script>

<style>

</style>