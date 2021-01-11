const cookieparser = process.server ? require('cookieparser') : undefined

export const state = () => {
  return {
    new_time: 0,
    
  }
}
export const mutations = {
    setNew (state,time) {
    state.new_time = time
    console.log('hh',state.new_time);
  }

}

export const actions = {
    login({commit,dispatch},time){
        const new_time = time
        commit('setNew',Number(new_time))
    }
    
}

