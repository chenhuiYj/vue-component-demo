<template>
  <div class="ec-handle">
    <div
      class="ec-handle--item"
      v-for="(item,index) in value"
      :key="index"
      :class="{'cur':nowClickIndex===index || display==='visible'}"
      @click="switchCur(item,index)"
    >
      <slot :data="getItem(item,index)"></slot>
      <ul class="customer-form-view-action-box"
          :style="ulPosition"
          v-if="display!=='none'"
          :class="{'handle-vertical':direction==='vertical'}"
      >
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
    },
    top: {
      type: [String, Number],
      default: '0'
    },
    bottom: {
      type: [String, Number],
      default: 'auto'
    },
    left: {
      type: [String, Number],
      default: 'auto'
    },
    right: {
      type: [String, Number],
      default: '-26px'
    },
    direction: {
      type: String,
      default: 'horizontal'
    },
    display: {
      type: [String],
      default: 'default'
    }
  },
  data () {
    return {
      nowClickIndex: ''
    }
  },
  computed: {
    ulPosition () {
      let obj = {
        left: this.left,
        right: this.right,
        top: this.top,
        bottom: this.bottom
      }
      let _x = '0'
      let _y = '0'
      if (this.top === 'center' || this.bottom === 'center') {
        obj.top = '50%'
        obj.bottom = 'auto'
        _y = '-50%'
        obj.transform = `translate(${_x},${_y})`
      }
      if (this.left === 'center' || this.right === 'center') {
        obj.left = '50%'
        obj.right = 'auto'
        _x = '-50%'
        obj.transform = `translate(${_x},${_y})`
      }
      return obj
    }
  },
  mounted () {},
  methods: {
    getItem (item, index) {
      return Object.assign({}, item, { $index: index, $select: this.nowClickIndex === index })
    },
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
