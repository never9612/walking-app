<template>
  <div class='today-step-counter'>
    <div class='counter'>今日の歩数:{{this.currentTodayStep}}歩</div>
  </div>
</template>
<script>
import { mapState } from 'vuex'
export default {
  name: 'TodayStepCounter',
  data: function() {
    return {}
  },
  computed: {
    ...mapState(['currentTodayStep'])
  }
}
</script>
<style scope>
.counter {
  text-align: center;
  font-size: 1.6rem;
}
.button {
  width: 100%;
  height: 60px;
  font-size: 1.6em;
  text-decoration: none;
  color: white;
  background-color: #62c4ff;
  text-align: center;
  line-height: 60px;
  margin: 0.1em;
}
</style>
