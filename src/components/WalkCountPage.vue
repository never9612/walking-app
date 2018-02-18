<template>
  <div class="walk-count-page">
    <GoalStepCounter :remainingStep="remainingStep"/>
    <GoalImage :remainingStep="remainingStep"/>
    <TodayStepCounter/>
    <div class='button-section'>
      <router-link class='button' to="/goal">目標設定</router-link>
      <a class='button' :href="authUrl">認証</a>
    </div>
  </div>
</template>
<script>
import GoalStepCounter from './GoalStepCounter'
import GoalImage from './GoalImage'
import TodayStepCounter from './TodayStepCounter'
export default {
  name: 'WalkCountPage',
  components: {
    GoalStepCounter,
    GoalImage,
    TodayStepCounter
  },
  data: function() {
    return {
      goalStep: 1000,
      currentStep: 500
    }
  },
  computed: {
    remainingStep: function() {
      return this.goalStep - this.currentStep
    },
    authUrl: function() {
      const url = 'https://accounts.google.com/o/oauth2/auth'
      const clientId =
        '877269797920-0bi9j8uoo3vkgg7saplohvvg07khke9v.apps.googleusercontent.com'
      const redirectUri = 'http://localhost:8080'
      const scope = 'https://www.googleapis.com/auth/fitness.activity.read'
      const responseType = 'code'
      const approvalPrompt = 'force'
      const accessType = 'offline'
      return `${url}?client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scope}&response_type=${responseType}&approval_prompt=${approvalPrompt}&access_type=${accessType}`
    }
  },
  methods: {
    setGoalStep: function(step) {
      this.goalStep = step
    }
  }
}
</script>

<style scoped>
.walk-count-page {
  width: 100%;
  height: 100%;
}
.button-section {
  width: 100%;
  display: flex;
  flex-direction: column;
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

