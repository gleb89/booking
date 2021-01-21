// export const state = () => {
//     return {
//       time:[],
//     }
//   }

// export const mutations = {
//     setTime (state,time) {
//     state.time = time
//     console.log('this.state.auth.user.id');
//     },


// }

// export const actions = {
//     async fetch({commit,state}){
//         const headers = {
//             "Content-Type": "application/json"
//           };
//         let user_id = this.state.auth.user.id
//         const time = await this.$axios
//         .$get(`https://api-booking.ru/booking-data/${user_id}`,{
//           headers: headers
//         })
//         commit('setTime',time)

//     }
// }

// export const getters = {
//     time: s => s.time,

// }
