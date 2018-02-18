import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import vueCookie from 'vue-cookie'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    goalStep: 3500000,
    currentStep: 0,
    currentTodayStep: 0,
    startDate: null,
    token:
      'ya29.GlxlBbndXjGAM-naNuDw1JXJyWTSKiYFzTRaxxlUoSeYw7fG_H6WruicY7c7wrt0qdWwxuWbngOu0uNbVBwkHqoma-Dt6qs0-LtxCrw4gkl8Vk4D3xR9v7sgqdz19Q'
  },
  getters: {
    remainingStep: state => state.goalStep - state.currentStep,
    startDateObject: state => new Date(state.startDate)
  },
  mutations: {
    setGoalStep(state, payload) {
      state.goalStep = payload
    },
    setCurrentStep(state, payload) {
      state.currentStep = payload
    },
    setCurrentTodayStep(state, payload) {
      state.currentTodayStep = payload
    },
    setStartDate(state, payload) {
      state.startDate = Number(payload)
    }
  },
  actions: {
    async fetchAllData({ commit, dispatch }) {
      const startDate = vueCookie.get('startDate')
      commit('setStartDate', startDate)
      await dispatch('fetchTodayStepData')
      await dispatch('fetchStepData')
    },
    async fetchTodayStepData({ commit, state }) {
      const date = new Date()
      const currentDate = date.getTime()
      const pastDate = currentDate - 86400000
      axios({
        method: 'post',
        url: 'https://www.googleapis.com/fitness/v1/users/me/dataset:aggregate',
        data: {
          aggregateBy: [
            {
              dataTypeName: 'com.google.step_count.delta',
              dataSourceId:
                'derived:com.google.step_count.delta:com.google.android.gms:estimated_steps'
            }
          ],
          bucketByTime: { durationMillis: 86400000 },
          startTimeMillis: pastDate,
          endTimeMillis: currentDate
        },
        headers: {
          'Content-Type': 'application/json;encoding=utf-8',
          Authorization: `Bearer ${state.token}`
        }
      }).then(res => {
        const todayStep = res.data.bucket[0].dataset[0].point[0].value[0].intVal
        commit('setCurrentTodayStep', todayStep)
      })
    },
    async fetchStepData({ commit, state }) {
      const date = new Date()
      const currentDate = date.getTime()
      const pastDate = Number(state.startDate)
      axios({
        method: 'post',
        url: 'https://www.googleapis.com/fitness/v1/users/me/dataset:aggregate',
        data: {
          aggregateBy: [
            {
              dataTypeName: 'com.google.step_count.delta',
              dataSourceId:
                'derived:com.google.step_count.delta:com.google.android.gms:estimated_steps'
            }
          ],
          bucketByTime: { durationMillis: 86400000 },
          startTimeMillis: pastDate,
          endTimeMillis: currentDate
        },
        headers: {
          'Content-Type': 'application/json;encoding=utf-8',
          Authorization: `Bearer ${state.token}`
        }
      }).then(res => {
        const step = res.data.bucket.reduce((p, c) => {
          return c.dataset[0].point.length === 0
            ? p
            : p + c.dataset[0].point[0].value[0].intVal
        }, 0)
        commit('setCurrentStep', step)
      })
    },
    getToken({ commit }, payload) {
      axios({
        method: 'post',
        url: 'https://accounts.google.com/v4/oauth2/token',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        data: {
          client_id:
            '877269797920-0bi9j8uoo3vkgg7saplohvvg07khke9v.apps.googleusercontent.com',
          client_secret: 'Q4brrElXPOcxo9Td1diJj2oI',
          redirect_url: 'http://localhost:8080',
          grant_type: 'authorization_code',
          code: payload
        }
      }).then(res => {
        console.log(res)
      })
    }
  }
})
