<template>
  <div class="upload">
    <div
      @click="onClickUpload"
      ref="trigger"
    >
      <slot></slot>
    </div>
    <ul class="upload-filelist">
      <li
        v-for="file in fileList"
        :key="file.url"
      >
        <template v-if="file.status === 'uploading'">
          <d-icon
            class="upload-loading"
            name="loading"
          ></d-icon>
        </template>
        <template v-if="file.type.includes('image')">
          <img
            v-if="file.status === 'success'"
            :src="file.url"
            alt=""
            class="upload-img"
          >
        </template>
        <template v-else>
          <div class="upload-img"></div>
        </template>
        <span
          class="upload-filename"
          :class="{[file.status]:file.status}"
        >{{file.name}}</span>
        <d-icon
          v-if="file.status === 'success'"
          class="upload-close"
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
    },
    sizeLimit: {
      type: Number
    },
    multiple: {
      type: Boolean,
      default: false
    },
    accept: {
      type: String
    }
  },
  methods: {
    onClickUpload() {
      // 生成一个 input 进行点击
      let input = document.createElement("input");
      input.type = "file";
      if (this.accept) {
        input.accept = this.accept;
      }
      if (this.multiple) {
        input.multiple = true;
      }
      input.addEventListener("change", () => {
        // 通过 change 事件获取到文件
        let files = input.files;
        this.uploadFiles(files);
        // 删掉这个 input
        input.remove();
      });
      input.click();
    },
    beforeUpload(files, newNames) {
      // 在上传之前, 先将所有初始文件信息保存在 fileList 中
      // 先判断是否有文件超过大小限制
      for (let i = 0; i < files.length; i++) {
        let { size } = files[i];
        console.log(size);
        if (this.sizeLimit && size > this.sizeLimit) {
          this.$emit("error", `oversize`);
          return false;
        }
      }
      // 前面判断成功后, 再进行保存
      let newFiles = files.map((file, index) => {
        let { size, type } = file;
        return { name: newNames[index], type, size, status: "uploading" };
      });
      // 需要一次性 emit, 而不是分开多次
      this.$emit("update:fileList", [...this.fileList, ...newFiles]);
      return true;
    },
    afterUpload(file, newName, url) {
      let copy = [...this.fileList];
      let index = copy.findIndex(function(item) {
        return item.name === newName;
      });
      if (index > -1) {
        copy[index].status = "success";
        copy[index].url = url;
        this.$emit("update:fileList", copy);
      }
    },
    generateName(name) {
      // 对文件名进行处理
      let newName = name;
      while (this.fileList.filter(f => f.name === name).length > 0) {
        let dotIndex = name.lastIndexOf(".");
        if (dotIndex > -1) {
          let filename = name.slice(0, dotIndex);
          let ext = name.slice(dotIndex);
          newName = filename + "(1)" + ext;
        }
      }
      return newName;
    },
    uploadFiles(files) {
      console.log("uploadfiles");
      // 多文件上传, 将文件逐个发送请求进行上传
      // 处理名称的重复
      files = Array.from(files);
      let newNames = files.map(file => this.generateName(file.name));

      // 在上传之前可以判断是否允许上传, 并且全部保存文件的信息
      let isAllow = this.beforeUpload(files, newNames);
      if (!isAllow) return;

      // 逐个发送请求
      files.forEach((file, index) => {
        let newName = newNames[index];
        // 封装成 FormData 形式
        let formData = new FormData();
        formData.append(this.name, file);
        // 通过 ajax 发送到服务器
        this.ajax(
          formData,
          res => {
            // 通过传入的函数解析返回的数据
            let url = this.parseResponse(res);
            // 上传成功之后，根据 name 找到文件，再次修改其状态
            this.afterUpload(file, newName, url);
          },
          xhr => {
            this.uploadErr(xhr, newName);
          }
        );
      });
    },
    uploadErr(xhr, name) {
      let copy = [...this.fileList];
      let index = copy.findIndex(function(item) {
        return item.name === name;
      });
      if (index > -1) {
        copy[index].status = "fail";
        this.$emit("update:fileList", copy);

        // 触发一个失败事件, 传递 xhr
        this.$emit("error", xhr);
      }
    },
    ajax(data, success, fail) {
      let xhr = new XMLHttpRequest();
      xhr.open(this.methods, this.action);
      xhr.onload = () => {
        if (
          xhr.readyState === 4 &&
          (xhr.status === 200 || xhr.status === 304)
        ) {
          success(xhr.response);
        } else {
          fail(xhr);
        }
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
@import "_var";
@import "animate";
$img-size: 32px;
.upload {
  &-filelist {
    list-style: none;
    padding: 0;
    margin: 0;
    > li {
      display: flex;
      align-items: center;
      margin: 8px 0;
      border: 1px solid $border-color;
      > .upload-loading {
        font-size: $img-size;
        animation: spin 1s linear infinite;
      }
      > .upload-filename {
        margin-left: 8px;
        margin-right: auto;
        &.success {
          color: green;
        }
        &.fail {
          color: red;
        }
      }
      > .upload-close {
        font-size: 12px;
        cursor: pointer;
        margin-right: 8px;
        &:hover {
          fill: $border-color-hover;
        }
      }
    }
  }
  &-img {
    width: $img-size;
    height: $img-size;
  }
}
</style>