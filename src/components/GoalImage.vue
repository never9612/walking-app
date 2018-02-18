<template>
  <div class="goal-image">
    <!-- <div class="image"/> -->
    <canvas id="canvas" />
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
import CanvasView from './CanvasView'
import japanImg from '../assets/japan.png'
export default {
  name: 'GoalImage',
  components: {
    CanvasView
  },
  data: function() {
    return { image: japanImg }
  },
  computed: {
    ...mapGetters(['remainingStep'])
  },
  mounted: function() {
    console.log('mounted')
    this.drawPicture()
  },
  methods: {
    drawPicture: function() {
      const canvas = document.querySelector('#canvas')
      canvas.width = 240
      canvas.height = 240

      const ctx = canvas.getContext('2d')

      const bgImg = new Image()
      bgImg.src = japanImg
      bgImg.onload = () => {
        ctx.globalCompositeOperation = 'source-over'
        ctx.drawImage(bgImg, 0, 0, canvas.width, canvas.height)
      }
    }
  }
}
</script>

<style scoped>
.goal-image {
  height: auto;
}

.image {
  width: 100%;
  height: 100vw;
  background: url("../assets/japan.png");
  background-repeat: no-repeat;
  background-size: 100%;
  margin: 0 auto;
}

.image::before {
  content: "";
  display: block;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.8);
}

canvas {
  display: block;
  width: 240px;
  height: 240px;
  margin: auto;
}
</style>


