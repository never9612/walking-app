<template>
  <div id="app">
    <!-- <img class="pref" src="./assets/japan.png"> -->
    <router-view />
  </div>
</template>

<script>
import { mapMutations, mapActions } from 'vuex'

export default {
  name: 'App',
  methods: {
    ...mapActions([
      'fetchAllData',
      'fetchStepData',
      'fetchTodayStepData',
      'getToken'
    ]),
    ...mapMutations(['setStartDate'])
  },
  created: function() {
    this.fetchAllData()
    if (this.$route.query.code) {
      this.getToken(this.$route.query.code)
    }
  }
}
</script>

<style>
#app {
  font-family: "YuGothic", "Yu Gothic", sans-serif;
  -webkit-font-smoothing: antialiased;
  color: #2c2c2c;
  background-color: #fdfdfd;
  /* height: 100vh; */
}
</style>
