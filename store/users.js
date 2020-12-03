export const state = () => {
    return {
      users:[],
      page:0


    }
  }

export const mutations = {
    setUsers (state,users) {
    state.users = users
    },
    setPage(state,page){
      state.page = page

    }

}

export const actions = {
    async fetch({commit,state}){
        const headers = {
            "Content-Type": "application/json"
          };
         const page = state.page
        // this.state.page
        const users = await this.$axios
        .$get(`https://glebhleb.herokuapp.com/users?page=${page}`,{
          headers: headers
        })
        commit('setUsers',users)
        commit('setPage',page)
    }
}

export const getters = {
    users: s => s.users,
    page: s => s.page
}