<template>
  <div class='canvas-view'>
    <canvas id='canvas'/>
  </div>
</template>
<script>
// import img from this.img
export default {
  name: 'CanvasView',
  props: ['img'],
  data: function() {
    return {
      canvas: null,
      ctx: null
    }
  },
  mounted: function() {
    this.canvas = document.querySelector('#canvas')
    this.canvas.width = 200
    this.canvas.height = 200

    this.ctx = this.canvas.getContext('2d')
    const bgImg = new Image()
    bgImg.onload = () => {
      this.ctx.globalCompositeOperation = 'source-over'
      this.ctx.drawImage(bgImg, 0, 0, this.canvas.width, this.canvas.height)
    }
  }
}
</script>
<style scoped>

</style>

