<template>
  <span>{{text}}</span>
</template>
<script>
export default {
  name: 'EcText',
  props: {
    src: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      text: ''
    }
  },
  watch: {
    src (val) {
      this.$axios.get(val).then(res => {
        this.text = res.data
      })
    }
  },
  mounted () {
    this.$axios.get(this.src).then(res => {
      this.text = res.data
    })
  }
}
</script>
<style lang="scss" scoped>
</style>
