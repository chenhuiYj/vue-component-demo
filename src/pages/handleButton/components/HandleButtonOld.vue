<template>
  <div class="ec-handle">
    <div
      class="ec-handle--item"
      v-for="(item,index) in sortData"
      :key="index"
      :class="{'cur':nowClickIndex===index}"
      @click="switchCur(item,index)"
    >
      <span v-if="item.fileType==='text'">{{item.content}}</span>
      <video :src="item.fileUrl" v-if="item.fileType==='video'"></video>
      <audio :src="item.fileUrl" controls="controls" v-if="item.fileType==='audio'"></audio>
      <img :src="item.fileUrl" v-if="item.fileType==='image'" />
      <ul class="customer-form-view-action-box">
        <li class="iconfont icon-icon-cus-edit" @click.stop="handleEvent('edit',index)"></li>
        <li
          class="iconfont icon-icon-cus-up"
          @click.stop="handleEvent('up',index)"
          v-if="index!==0"
        ></li>
        <li
          class="iconfont icon-icon-cus-down"
          @click.stop="handleEvent('down',index)"
          v-if="index!==value.length-1"
        ></li>
        <li class="iconfont icon-icon-cus-del" @click.stop="handleEvent('delete',index)"></li>
      </ul>
    </div>
  </div>
</template>
<script>
export default {
  name: 'HandleButton',
  componentName: 'HandleButton',
  props: {
    value: {
      type: Array,
      default () {
        return []
      }
    }
  },
  data () {
    return {
      nowClickIndex: ''
    }
  },
  mounted () {},
  computed: {
    sortData () {
      let arr = JSON.parse(JSON.stringify(this.value))
      for (let i = 0; i < arr.length; i++) {
        arr[i].$_key = i
      }
      return arr
    }
  },
  methods: {
    handleEvent (type, index) {
      let _list = JSON.parse(JSON.stringify(this.value))
      let _nowItem = _list[index]
      switch (type) {
        case 'up':
          this.nowClickIndex--
          _list.splice(index, 1)
          _list.splice(index - 1, 0, _nowItem)
          break
        case 'down':
          this.nowClickIndex++
          _list.splice(index, 1)
          _list.splice(index + 1, 0, _nowItem)
          break
        case 'delete':
          _list.splice(index, 1)
      }
      this.$emit('input', _list)
      this.$emit(type, _nowItem, index)
    },
    switchCur (item, index) {
      this.nowClickIndex = index
    }
  }
}
</script>
<style lang="scss" scoped>
.ec-handle {
  video,
  audio,
  img {
    max-width: 100%;
  }
  video,
  audio {
    outline: none;
  }
}
.ec-handle--item {
  position: relative;
  border: 1px dashed transparent;
  padding: 10px;
  ul {
    position: absolute;
    right: -26px;
    top: 0;
    display: none;
    line-height: 24px;
    &.handle-vertical {
      li {
        display: inline-block;
        vertical-align: top;
      }
    }
  }
  &.cur {
    border: 1px dashed #003453;
    ul {
      display: inline-block;
    }
  }
  li {
    list-style-type: none;
    width: 24px;
    height: 24px;
    margin: 0 2px 2px 0;
    background: #0b5873;
    color: #fff;
    text-align: center;
    line-height: 24px;
    font-size: 12px;
    cursor: pointer;
    &:hover {
      background: #127192;
    }
  }
}
</style>
