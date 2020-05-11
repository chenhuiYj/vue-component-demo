<template>
  <img
    v-bind="$attrs"
    :src="resultSrc"
    @error="imageError"
    @load="imageLoad"
    :width="width"
    :height="height"
    :fail="visible ? '' : src"
  />
</template>

<script>
const cdnInfo = {};
function checkWebp() {
  try {
    return (
      document
        .createElement("canvas")
        .toDataURL("image/webp")
        .indexOf("data:image/webp") === 0
    );
  } catch (err) {
    return false;
  }
}

let format = checkWebp() ? ".webp" : "";
// getImageFormat()
export default {
  name: "TmgImage",
  props: {
    src: {
      type: String,
      default: ""
    },
    width: {
      type: [String, Number],
      default: null
    },
    height: {
      type: [String, Number],
      default: null
    }
  },
  data: function() {
    return {
      visible: true
    };
  },
  watch: {
    src() {
      this.visible = true;
    }
  },
  computed: {
    resultSrc() {
      const { visible, height, width } = this;
      const defaultImage = "https://staticresource.blob.core.chinacloudapi.cn/marketing/common/picture.jpg".replace(
        cdnInfo.base,
        cdnInfo.img
      );
      let src = this.src || "";
      if (!visible) return defaultImage;
      let resultSrc;
      if (src.indexOf(";base64,") >= 0) {
        resultSrc = src;
      } else {
        src = src.replace(/^http:\/\//, "https://");
        const imageSplit = src.split(".");
        const imageType = imageSplit[imageSplit.length - 1];
        // azure 那边出问题了，gif文件不支持 参数优化 ，所以gif暂时不处理
        if (imageType === "gif") {
          resultSrc = src.replace(cdnInfo.base, cdnInfo.img);
        } else {
          resultSrc = `${src.replace(cdnInfo.base, cdnInfo.img)}?basic=${
            height ? height + "h_" : ""
          }${width ? width + "w_" : ""}1e${format}&p=acceptraw`;
        }
      }
      return resultSrc;
    }
  },
  methods: {
    imageError(e) {
      this.visible = false;
      this.$emit("error", e);
    },
    imageLoad(e) {
      this.$emit("load", e);
    }
  },
  created() {}
};
</script>
