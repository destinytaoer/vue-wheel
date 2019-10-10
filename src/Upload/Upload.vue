<template>
  <div class="upload">
    <div
      @click="onClickUpload"
      ref="trigger"
    >
      <slot></slot>
    </div>
    <ul>
      <li
        v-for="file in fileList"
        :key="file.url"
      >
        <img
          :src="file.url"
          width="100"
          height="100"
          alt=""
        >
        {{file.name}}
        <d-icon
          name="close"
          @click="onRemoveFile(file)"
        ></d-icon>
      </li>
    </ul>
  </div>
</template>
<script>
import DIcon from "../Common/Icon";
export default {
  name: "DUpload",
  components: {
    DIcon
  },
  props: {
    name: {
      type: String,
      required: true
    },
    action: {
      type: String,
      required: true
    },
    methods: {
      type: String,
      default: "POST"
    },
    parseResponse: {
      type: Function,
      required: true
    },
    fileList: {
      type: Array,
      default() {
        return [];
      }
    }
  },
  data() {
    return {
      url: "about:blank"
    };
  },
  methods: {
    onClickUpload() {
      // 生成一个 input 进行点击
      let input = document.createElement("input");
      input.type = "file";
      input.addEventListener("change", () => {
        // 通过 change 事件获取到文件
        let file = input.files[0];
        this.uploadFile(file);
      });
      input.click();
    },
    uploadFile(file) {
      let { name, size, type } = file;
      while (this.fileList.filter(f => f.name === name).length > 0) {
        let dotIndex = name.lastIndexOf(".");
        if (dotIndex > 0) {
          let filename = name.slice(0, dotIndex);
          let ext = name.slice(dotIndex);
          name = filename + "(1)" + ext;
        }
      }
      // 封装成 FormData 形式
      let formData = new FormData();
      formData.append(this.name, file);
      // 通过 ajax 发送到服务器
      this.ajax(formData, res => {
        // 通过传入的函数解析返回的数据
        let url = this.parseResponse(res);
        this.$emit("update:fileList", [
          ...this.fileList,
          { name, size, type, url }
        ]);
      });
    },
    ajax(data, callback) {
      let xhr = new XMLHttpRequest();
      xhr.open(this.methods, this.action);
      xhr.onload = () => {
        callback(xhr.response);
      };
      xhr.send(data);
    },
    onRemoveFile(file) {
      let answer = window.confirm("是否删除这个文件");
      if (answer) {
        let copy = [...this.fileList];
        let index = copy.indexOf(file);
        copy.splice(index, 1);
        this.$emit("update:fileList", copy);
      }
    }
  }
};
</script>
<style lang="scss" scoped>
ul {
  list-style: none;
  padding: 0;
  margin: 0;
}
</style>