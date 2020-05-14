<template>
  <div class="tmg-handle">
    <div
      class="tmg-handle--item"
      v-for="(item,index) in sortData"
      :key="item.$_key"
      :class="{'cur':nowClickIndex===item.$_key ||show}"
      @click="switchCur(item)"
    >
      <slot :data="getItem(item,index)"></slot>
      <ul
        class="customer-form-view-action-box"
        v-if="isSort"
        :style="ulPosition"
        :class="{'handle-vertical':direction==='vertical'}"
      >
        <li class="iconfont icon-icon-cus-edit" @click.stop="handleEvent('edit',item,index)"></li>
        <li
          class="iconfont icon-icon-cus-up"
          @click.stop="handleEvent('up',item,index)"
          v-if="index!==0"
        ></li>
        <li
          class="iconfont icon-icon-cus-down"
          @click.stop="handleEvent('down',item,index)"
          v-if="index!==value.length-1"
        ></li>
        <li class="iconfont icon-icon-cus-del" @click.stop="handleEvent('delete',item,index)"></li>
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
    isSort: {
      type: [Boolean],
      default: true
    },
    show: {
      type: [Boolean],
      default: false
    },
    direction: {
      type: String,
      default: 'horizontal'
    },
    beforeDelete: {
      type: Function
    },
    beforeUp: {
      type: Function
    },
    beforeDown: {
      type: Function
    },
    beforeEdit: {
      type: Function
    }
  },
  data () {
    return {
      curHandleIndex: '',
      type: '',
      nowClickIndex: ''
    }
  },
  computed: {
    sortData () {
      let arr = JSON.parse(JSON.stringify(this.value))
      for (let item of arr) {
        item.$_key = Symbol.for('$handle-key:' + JSON.stringify(item))
      }
      return arr
    },
    maginDirection () {
      return this.direction === 'horizontal' ? 'margin-right' : 'margin-bottom'
    },
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
  methods: {
    getItem (item, index) {
      return Object.assign({}, item, { $index: index, $select: this.nowClickIndex === item.$_key })
    },
    handle () {
      let _list = JSON.parse(JSON.stringify(this.value))
      let _nowItem = _list[this.curHandleIndex]
      switch (this.type) {
        case 'up':
          _list.splice(this.curHandleIndex, 1)
          _list.splice(this.curHandleIndex - 1, 0, _nowItem)
          break
        case 'down':
          _list.splice(this.curHandleIndex, 1)
          _list.splice(this.curHandleIndex + 1, 0, _nowItem)
          break
        case 'delete':
          _list.splice(this.curHandleIndex, 1)
      }
      this.$emit('input', _list)
      this.$forceUpdate()
      this.$emit(this.type, this.curHandleIndex)
    },
    handleEvent (type, item, index) {
      this.type = type
      this.curHandleIndex = index
      let _type = type.substr(0, 1).toUpperCase() + type.substr(1)
      if (typeof this[`before${_type}`] === 'function') {
        this[`before${_type}`](this.handle)
      } else {
        this.handle()
      }
    },
    switchCur (item) {
      this.nowClickIndex = item.$_key
    }
  }
}
</script>
<style lang="scss" scoped>
.tmg-handle {
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
.tmg-handle--item {
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
