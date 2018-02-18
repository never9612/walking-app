<template>
  <div class="goal-step-counter">
    <div class="counter"> あと<span class='big'>{{remainingStep}}</span>歩</div>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
export default {
  name: 'GoalStepCounter',
  computed: {
    ...mapGetters(['remainingStep'])
  }
}
</script>
<style scoped>
.counter {
  text-align: center;
  font-size: 2rem;
}
.big {
  font-size: 2.8rem;
}
</style>

