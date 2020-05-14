<template>
  <div class="main">
    <handle-button
      v-model="sortData"
      @edit="editViewItem"
    >
      <div slot-scope="item" class="view-item" :class="{'cur':item.data.$select}">
        <ec-text v-if="item.data.fileType==='text'" :src="item.data.fileUrl"></ec-text>
        <a href="javascript:;" v-if="item.data.fileType==='link'">{{item.data.customer}}</a>
        <video :src="item.data.fileUrl" v-if="item.data.fileType==='video'"></video>
        <audio :src="item.data.fileUrl" controls="controls" v-if="item.data.fileType==='audio'"></audio>
        <ec-image :src="item.data.fileUrl" v-if="item.data.fileType==='image'" />
      </div>
    </handle-button>
    <p>
      <br />
    </p>
    <handle-button
      v-model="sortData"
      @edit="editViewItem"
      direction="vertical"
      right="6px"
      bottom="center"
      show
      :beforeDelete="test"
      :beforeUp="test"
      :beforeDown="test"
      :beforeEdit="test"
    >
      <div slot-scope="item" class="handle-item">
        <div class="message-item___box">
          <span class="message-item___icon iconfont" :class="iconByFileType[item.data.fileType]"></span>
        </div>
        <div class="message-item___info">
          <p v-if="item.data.fileType==='text'">
            <ec-text :src="item.data.fileUrl"></ec-text>
          </p>
          <p v-else>{{item.data.fileName}}</p>
          <span class="message-item___info_size">{{formatSize(item.data.size)}}</span>
        </div>
      </div>
    </handle-button>
    <p>
      <br />
    </p>
    <handle-button-old v-model="sortData" @edit="editViewItem" />
  </div>
</template>
<script>
import HandleButton from './components/HandleButton'
import HandleButtonOld from './components/HandleButtonOld'
export default {
  data () {
    return {
      iconByFileType: {
        text: 'icon-wenben',
        image: 'icon-tupian1',
        video: 'icon-shipin',
        audio: 'icon-yinpin',
        link: 'icon-duanlian'
      },
      sortData: [
        {
          fileType: 'text',
          fileUrl:
            'https://file-cdn-china.wechatify.net/marketing/sms/mms_material/lm9wf5m8j7.txt',
          index: 1,
          size: 12,
          fileName: 'lm9wf5m8j7.txt'
        },
        {
          fileType: 'text',
          fileUrl:
            'https://file-cdn-china.wechatify.net/marketing/sms/mms_material/gWp3COMYDA.txt',
          index: 2,
          size: 12,
          fileName: 'gWp3COMYDA.txt'
        },
        {
          fileNmae: '251bb6d882024b11a6051d604ac51fc3.jpeg',
          fileType: 'image',
          fileUrl:
            'https://file-cdn-china.wechatify.net/marketing/sms/mms_material/53ce422f14e516af0eb9a5c7251cc1ca.jpeg',
          index: 3,
          size: 101109,
          fileName: '53ce422f14e516af0eb9a5c7251cc1ca.jpeg'
        }
      ]
    }
  },
  components: { HandleButton, HandleButtonOld },
  mounted () {
    setTimeout(() => {
      this.sortData = [
        {
          fileType: 'text',
          fileUrl:
            'https://file-cdn-china.wechatify.net/marketing/sms/mms_material/gWp3COMYDA.txt',
          index: 2,
          size: 12,
          fileName: 'gWp3COMYDA.txt'
        },
        {
          fileType: 'text',
          fileUrl:
            'https://file-cdn-china.wechatify.net/marketing/sms/mms_material/lm9wf5m8j7.txt',
          index: 1,
          size: 12,
          fileName: 'lm9wf5m8j7.txt'
        },
        {
          fileNmae: '251bb6d882024b11a6051d604ac51fc3.jpeg',
          fileType: 'image',
          fileUrl:
            'https://file-cdn-china.wechatify.net/marketing/sms/mms_material/53ce422f14e516af0eb9a5c7251cc1ca.jpeg',
          index: 3,
          size: 101109,
          fileName: '53ce422f14e516af0eb9a5c7251cc1ca.jpeg'
        },
        {
          fileType: 'text',
          fileUrl:
            'https://file-cdn-china.wechatify.net/marketing/sms/mms_material/lm9wf5m8j7.txt',
          index: 5,
          size: 12,
          fileName: 'lm9wf5m8j7.txt'
        }
      ]
    }, 5000)
  },
  methods: {
    formatSize (val) {
      if (val === 0) {
        return '0B'
      }
      let sizeObj = {
        MB: 1048576,
        KB: 1024,
        B: 1
      }
      val = +val
      for (let key in sizeObj) {
        if (val >= sizeObj[key]) {
          return +(val / sizeObj[key]).toFixed(2) + key
        }
      }
    },
    editViewItem () {},
    test (done) {
      this.$confirm('确认进行操作？')
        .then(() => {
          done()
        })
        .catch(() => {})
    }
  }
}
</script>
<style lang="scss" scoped>
.main {
  width: 500px;
  margin: 0 auto;
  .view-item {
    padding: 10px;
    border:1px dashed transparent;
    &.cur{
      border:1px dashed #003453;
    }
  }
}
.handle-item {
  padding: 10px;
  background: #fff;
  display: flex;
  border: 1px solid #e4e4e4;
  border-radius: 4px;
  margin-bottom:10px;
  .message-item___box {
    width: 48px;
    height: 48px;
    line-height: 48px;
    text-align: center;
    border-radius: 4px;
    background: #ededed;
  }
  .message-item___icon {
    color: #333;
    font-size: 30px;
  }
  .message-item___info {
    margin-left: 12px;
    line-height: 24px;
    width: 55%;
    p {
      font-size: 14px;
      color: #333;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    .message-item___info_size {
      font-size: 12px;
      color: #999;
    }
  }
}
</style>
