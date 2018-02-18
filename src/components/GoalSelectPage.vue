<template>
  <div class="goal-select-page">
    <div class="date">はじめた日:{{displayDate}}</div>
    <div class="goal-item lv1" @click="onClickGoalItem(3500000)"/>
    <div class="goal-item lv2" @click="onClickGoalItem(18000000)"/>
    <div class="goal-item lv3" @click="onClickGoalItem(550000000)"/>
    <router-link class="button" to="/">戻る</router-link>
    <div class='modal' v-if="this.isModalOpen">
      <p>開始日がリセットされますがよろしいですか?</p>
      <div>はい</div>
      <div>いいえ</div>
    </div>
    <div class='modal-bg' v-if="this.isModalOpen"/>
  </div>
</template>
<script>
import { mapState, mapGetters, mapMutations } from 'vuex'
export default {
  namt: 'GoalSelectPage',
  data: function() {
    return {
      isModalOpen: false,
      date: null
    }
  },
  computed: {
    ...mapState(['startDate']),
    ...mapGetters(['startDateObject']),
    displayDate: function() {
      const d = this.startDateObject
      return `${d.getFullYear()}年${d.getMonth() + 1}月${d.getDate()}日`
    }
  },
  // mounted: function() {
  //   this.date = new Date(this.startDate)
  //   console.log(this.startDateObject)
  // },
  methods: {
    ...mapMutations(['setGoalStep']),
    onClickGoalItem: function(step) {
      this.setGoalStep(step)
      this.$router.push('/')
      const date = new Date()
      this.$cookie.set('startDate', date.getTime(), 356)
    }
  }
}
</script>
<style scoped>
.goal-select-page {
  display: flex;
  flex-direction: column;
}
.date {
  height: 60px;
  font-size: 1.6em;
  text-align: center;
  line-height: 60px;
}
.goal-item {
  height: 160px;
  text-align: center;
  text-decoration: none;
  background-size: 100%;
  background-repeat: no-repeat;
}

.lv1 {
  background-image: url("../assets/lv1.png");
}

.lv2 {
  background-image: url("../assets/lv2.png");
}

.lv3 {
  background-image: url("../assets/lv3.png");
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

.modal {
  position: fixed;
  width: 60vw;
  height: 60vw;
  margin: auto;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: white;
  border: solid gray 1px;
  border-radius: 4px;
  z-index: 2;
}

.modal-bg {
}

.modal-button {
}
</style>

