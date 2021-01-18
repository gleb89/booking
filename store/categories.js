export const state = () => {
  return {
    categories:[],



  }
}

export const mutations = {
  setCategories (state,categories) {
  state.categories = categories
  },


}

export const actions = {
  async fetch({commit,state}){
      const headers = {
          "Content-Type": "application/json"
        };
      const categories = await this.$axios
      .$get(`http://api-booking.rucategories`,{
        headers: headers
      })
      commit('setCategories',categories)

  }
}

export const getters = {
  categories: s => s.categories,

}
