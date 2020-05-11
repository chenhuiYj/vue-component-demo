<template>
  <span>{{text}}</span>
</template>
<script>
import axios from "axios";
export default {
  name: "TmgText",
  props: {
    src: {
      type: String,
      default: ""
    }
  },
  data() {
    return {
      text: ""
    };
  },
  mounted() {
    axios.get(this.src).then(res => {
      this.text = res.data;
    });
  }
};
</script>
<style lang="scss" scoped>
</style>
