<template>
  <div id="app">
    <ul class="sider-bar">
      <li @click="switchPath('/handleButton')" :class="{'cur':curpath==='/handleButton'}">handleButton</li>
    </ul>
    <div class="content">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
export default {
  name: 'App',
  components: {},
  data () {
    return {
      curpath: ''
    }
  },
  mounted () {
    this.curpath = this.$route.path
  },
  methods: {
    switchPath (path) {
      if (this.curpath === path) {
        return
      }
      this.curpath = path
      this.$router.push({ path })
    }
  }
}
</script>

<style lang="scss">
#app {
  display: flex;
  .sider-bar{
    width: 200px;
    text-align: center;
    li{
      line-height: 40px;
      background: #ccc;
      cursor: pointer;
      &.cur,&:hover{
        background: #09f;
        color:#fff;
      }
    }
  }
  .content{
    flex: 1;
    height: 100vh;
    overflow-y: auto;
  }
}
</style>
