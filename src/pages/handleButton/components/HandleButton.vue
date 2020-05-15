<template>
  <div class="ec-handle">
    <div
      class="ec-handle--item"
      v-for="(item,index) in value"
      :key="index"
      :class="{'cur':nowClickIndex===index ||display==='visible'}"
      @click="switchCur(item,index)"
    >
      <slot :data="getItem(item,index)"></slot>
      <ul
        class="customer-form-view-action-box"
        v-if="display!=='none'"
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
    display: {
      type: [String],
      default: 'default'
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
      eventType: '',
      nowClickIndex: '',
      keyMap: new Map()
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
  methods: {
    getItem (item, index) {
      return Object.assign({}, item, { $index: index, $select: this.nowClickIndex === index })
    },
    handle () {
      let _list = this.value
      let _nowItem = _list[this.curHandleIndex]
      switch (this.eventType) {
        case 'up':
          this.nowClickIndex--
          _list.splice(this.curHandleIndex, 1)
          _list.splice(this.curHandleIndex - 1, 0, _nowItem)
          break
        case 'down':
          this.nowClickIndex++
          _list.splice(this.curHandleIndex, 1)
          _list.splice(this.curHandleIndex + 1, 0, _nowItem)
          break
        case 'delete':
          _list.splice(this.curHandleIndex, 1)
      }
      this.$emit('input', _list)
      this.$forceUpdate()
      this.$emit(this.eventType, _nowItem, this.curHandleIndex)
    },
    handleEvent (eventType, item, index) {
      this.eventType = eventType
      this.curHandleIndex = index
      let _type = eventType.substr(0, 1).toUpperCase() + eventType.substr(1)
      if (typeof this[`before${_type}`] === 'function') {
        this[`before${_type}`](this.handle, item, index)
      } else {
        this.handle()
      }
    },
    switchCur (item, index) {
      if (this.display === 'visible') {
        return
      }
      this.nowClickIndex = this.nowClickIndex !== index ? index : ''
      this.$emit('change', item, index)
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
