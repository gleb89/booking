export const state = () => {
    return {
      users:[],



    }
  }

export const mutations = {
    setUsers (state,users) {
    state.users = users
    console.log('jjj');
    },


}

export const actions = {
    async fetch({commit,state}){
        const headers = {
            "Content-Type": "application/json"
          };
        const users = await this.$axios
        .$get(`https://glebhleb.herokuapp.com/users`,{
          headers: headers
        })
        commit('setUsers',users)

    }
}

export const getters = {
    users: s => s.users,

}
