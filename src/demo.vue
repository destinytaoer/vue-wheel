<template>
  <div class="demo">
    <div>
      <h2>Sticky</h2>
      <div>
        <p>1</p>
        <p>2</p>
        <p>3</p>
        <p>4</p>
        <p>5</p>
        <p>6</p>
        <p>7</p>
        <p>8</p>
        <p>9</p>
        <p>10</p>
      </div>
      <div>
        <d-sticky :distance="100">
          <div style="border: 1px solid red">粘连内容</div>
        </d-sticky>
      </div>
    </div>
    <div>
      <div>
        <h2>图片上传</h2>
        <div>只能上传 300kb 以内的 png、jpeg 文件</div>
        <d-upload
          accept="image/*"
          methods='POST'
          action="http://localhost:3000/upload"
          name="file"
          :parseResponse="parseResponse"
          :fileList.sync="fileList"
          :sizeLimit="2*1024*1024"
          @error="errorMsg"
        >
          <d-button icon="upload">上传</d-button>
        </d-upload>
      </div>
      <div>
        <h2>Table</h2>
        <h4>fixed header</h4>
        <d-table
          :columns='columns'
          :data-source="dataSource2"
          :checked-items="checkedItems"
          height="400px"
          ellipse
          bordered
          has-order
          has-checkbox
        ></d-table>
        <h4>fixed header</h4>
        <d-table
          :columns='columns'
          :data-source="dataSource2"
          :checked-items="checkedItems"
          height="400px"
          bordered
          has-order
          has-checkbox
        ></d-table>
        <h4>sort & loading</h4>
        <d-table
          :columns='columns'
          :data-source="dataSource2"
          has-checkbox
          :checked-items="checkedItems"
          :loading="loading"
          @sort="sort"
        ></d-table>
        <h4>hasCheckbox</h4>
        <d-table
          :columns='columns'
          :data-source="dataSource2"
          has-checkbox
          :checked-items="checkedItems"
        ></d-table>
        <h4>hasOrder</h4>
        <d-table
          :columns='columns'
          :data-source="dataSource2"
          has-order
        ></d-table>
        <h4>hovered</h4>
        <d-table
          :columns='columns'
          :data-source="dataSource2"
          hovered
        ></d-table>
        <h4>bordered</h4>
        <d-table
          :columns='columns'
          :data-source="dataSource2"
          bordered
        ></d-table>
        <h4>no striped</h4>
        <d-table
          :columns='columns'
          :data-source="dataSource2"
          :striped="false"
        ></d-table>
        <h3>normal</h3>
        <d-table
          :columns='columns'
          :data-source="dataSource2"
        ></d-table>
      </div>
      <div>
        <h2>Pagination</h2>
        <d-pagination
          :total-page='7'
          :current-page.sync="current"
        ></d-pagination>
        {{current}}
      </div>
      <div>
        <h2>Nav</h2>
        <d-nav
          :selected="selected4"
          vertical
        >
          <d-nav-item name="home">首页</d-nav-item>
          <d-nav-sub-item title="关于">
            <d-nav-item name="culture">企业文化</d-nav-item>
            <d-nav-item name="developers">开发团队</d-nav-item>
            <d-nav-sub-item title="联系电话">
              <d-nav-item name="wechat">微信</d-nav-item>
              <d-nav-item name="qq">qq</d-nav-item>
              <d-nav-sub-item title="手机">
                <d-nav-item name="cm">移动</d-nav-item>
                <d-nav-item name="cu">联通</d-nav-item>
                <d-nav-item name="cn"><a
                    href="www.baidu.com"
                    target="_blank"
                  >电信</a></d-nav-item>
              </d-nav-sub-item>
            </d-nav-sub-item>
          </d-nav-sub-item>
          <d-nav-sub-item title="开始">
            <d-nav-item name="components">组件</d-nav-item>
            <d-nav-sub-item title="安装">
              <d-nav-item name="Windows">Windows</d-nav-item>
              <d-nav-item name="Mac">Mac</d-nav-item>
            </d-nav-sub-item>
          </d-nav-sub-item>
        </d-nav>
        <d-nav>
          <d-nav-item name="home">首页</d-nav-item>
          <d-nav-sub-item title="关于">
            <d-nav-item name="culture">企业文化</d-nav-item>
            <d-nav-item name="developers">开发团队</d-nav-item>
            <d-nav-sub-item title="联系电话">
              <d-nav-item name="wechat">微信</d-nav-item>
              <d-nav-item name="qq">qq</d-nav-item>
              <d-nav-sub-item title="手机">
                <d-nav-item name="cm">移动</d-nav-item>
                <d-nav-item name="cu">联通</d-nav-item>
                <d-nav-item name="cn">电信</d-nav-item>
              </d-nav-sub-item>
            </d-nav-sub-item>
          </d-nav-sub-item>
          <d-nav-item name="start">开始</d-nav-item>
        </d-nav>
      </div>
      <div>
        <h2>Slides</h2>
        <d-slides
          :selected.sync="selected3"
          :auto-play="false"
        >
          <d-slides-item name="1">
            <div class="box">1</div>
          </d-slides-item>
          <d-slides-item name="2">
            <div class="box">2</div>
          </d-slides-item>
          <d-slides-item name="3">
            <div class="box">3</div>
          </d-slides-item>
        </d-slides>
      </div>
      <div>
        <h2>Cascader</h2>
        <d-cascader
          :source.sync="dataSource"
          :selected="[]"
          split="-"
          placeholder="请选择省市区"
        ></d-cascader>
        <d-cascader
          :source.sync="source"
          :selected.sync="selected2"
          :load-data="loadData"
          split="-"
        ></d-cascader>
      </div>
      <div>
        <h2>Collapse</h2>
        <d-collapse
          :selected="['1']"
          single
        >
          <d-collapse-item
            title="标题1"
            name="1"
          >内容1</d-collapse-item>
          <d-collapse-item
            title="标题2"
            name="2"
          >内容2</d-collapse-item>
          <d-collapse-item
            title="标题3"
            name="3"
          >内容3</d-collapse-item>
        </d-collapse>
        {{ selected }}
      </div>
      <div>
        <h2>Popover</h2>
        <h3>click</h3>
        <d-popover>
          <template slot="content">
            <div>
              popover 内容
            </div>
          </template>
          <d-button>上</d-button>
        </d-popover>
        <d-popover position="bottom">
          <template slot="content">
            <div>
              popover 内容
            </div>
          </template>
          <d-button>下</d-button>
        </d-popover>
        <d-popover position="left">
          <template slot="content">
            <div>
              popover 内容
            </div>
          </template>
          <d-button>左</d-button>
        </d-popover>
        <d-popover position="right">
          <template slot="content">
            <div>
              popover 内容内容内容内容popover 内容内容内容内容popover
              内容内容内容内容popover 内容内容内容内容popover
              内容内容内容内容popover 内容内容内容内容popover
              内容内容内容内容popover 内容内容内容内容
            </div>
          </template>
          <d-button>右</d-button>
        </d-popover>
        <h3>hover</h3>
        <d-popover trigger="hover">
          <template v-slot:content="{ hide }">
            <div>
              popover 内容
              <d-button @click="hide">关闭</d-button>
            </div>
          </template>
          <template v-slot:default>
            <d-button>上</d-button>
          </template>
        </d-popover>
        <d-popover
          position="bottom"
          trigger="hover"
        >
          <template slot="content">
            <div>
              popover 内容
            </div>
          </template>
          <d-button>下</d-button>
        </d-popover>
        <d-popover
          position="left"
          trigger="hover"
        >
          <template slot="content">
            <div>
              popover 内容
            </div>
          </template>
          <d-button>左</d-button>
        </d-popover>
        <d-popover
          position="right"
          trigger="hover"
        >
          <template slot="content">
            <div>
              popover 内容内容内容内容popover 内容内容内容内容popover
              内容内容内容内容popover 内容内容内容内容popover
              内容内容内容内容popover 内容内容内容内容popover
              内容内容内容内容popover 内容内容内容内容
            </div>
          </template>
          <d-button>右</d-button>
        </d-popover>
      </div>
      <div>
        <h2>Tabs</h2>
        <d-tabs :selected.sync="selectedTab">
          <d-tabs-head>
            <d-tabs-item name="woman">
              <d-icon name="settings"></d-icon>美女
            </d-tabs-item>
            <d-tabs-item name="sports">体育</d-tabs-item>
            <d-tabs-item name="it">IT</d-tabs-item>
            <template slot="actions">
              <d-button>extra button</d-button>
            </template>
          </d-tabs-head>
          <d-tabs-body>
            <d-tabs-content name="woman">美女</d-tabs-content>
            <d-tabs-content name="sports">体育</d-tabs-content>
            <d-tabs-content name="it">IT</d-tabs-content>
          </d-tabs-body>
        </d-tabs>
      </div>
      <div>
        <h2>Toast</h2>
        <d-button @click="showToast('top')">show toast top</d-button>
        <d-button @click="showToast('bottom')">show toast bottom</d-button>
        <d-button @click="showToast('middle')">show toast middle</d-button>
      </div>
      <div>
        <h2>Layout</h2>
        <d-layout style="height: 100vh">
          <d-header class="demo-box">header</d-header>
          <d-layout>
            <d-sider class="demo-box">sider</d-sider>
            <d-content class="demo-box">content</d-content>
          </d-layout>
          <d-footer class="demo-box">footer</d-footer>
        </d-layout>
      </div>
      <div>
        <h2>Response Grid</h2>
        <d-row>
          <d-col
            class="demo-box"
            span="2"
            :pc="{ span: 4 }"
          >1 </d-col>
          <d-col
            class="demo-box"
            span="22"
            :pc="{ span: 20 }"
          >2</d-col>
        </d-row>
        <d-row>
          <d-col
            class="demo-box"
            span="9"
          >
            <d-row align="left">
              <d-col span="3">1</d-col>
              <d-col span="3">2</d-col>
              <d-col span="3">3</d-col>
              <d-col span="3">4</d-col>
            </d-row>
          </d-col>
          <d-col
            class="demo-box"
            span="15"
          >
            <d-row align="right">
              <d-col span="3">1</d-col>
              <d-col span="3">2</d-col>
              <d-col span="3">3</d-col>
              <d-col span="3">4</d-col>
              <d-col span="3">5</d-col>
              <d-col span="3">6</d-col>
              <d-col span="3">7</d-col>
            </d-row>
          </d-col>
        </d-row>
        <d-row>
          <d-col
            class="demo-box"
            span="4"
          >
            <div class="logo-wrapper">
              <img
                src="//img.alicdn.com/tps/TB1YZkPLpXXXXbzXXXXXXXXXXXX-213-57.png"
                alt=""
              />
            </div>
          </d-col>
          <d-col
            class="demo-box"
            span="14"
          ></d-col>
          <d-col
            class="demo-box"
            span="6"
          ></d-col>
        </d-row>
      </div>
      <div>
        <h2>Grid</h2>
        <d-row>
          <d-col>1</d-col>
          <d-col>2</d-col>
          <d-col>3</d-col>
        </d-row>
        <d-row>
          <d-col span="2">1</d-col>
          <d-col span="10">2</d-col>
          <d-col span="10">3</d-col>
        </d-row>
        <d-row>
          <d-col span="2">1</d-col>
          <d-col
            span="8"
            offset="4"
          >2</d-col>
          <d-col
            span="8"
            offset="2"
          >3</d-col>
        </d-row>
        <d-row gutter="10">
          <d-col span="2">1</d-col>
          <d-col
            span="8"
            offset="4"
          >2</d-col>
          <d-col
            span="8"
            offset="2"
          >3</d-col>
        </d-row>
      </div>
      <div>
        <h2>Input</h2>
        <d-input></d-input>
        <d-input value="aaa"></d-input>
        <d-input
          value="aaa"
          disabled
        ></d-input>
        <d-input
          value="aaa"
          error="不能少于6个字"
        ></d-input>
        <d-input
          value="aaa"
          @change="inputChange"
        ></d-input>
        <d-input
          value="aaa"
          v-model="message"
        ></d-input>
        {{ message }}
      </div>
      <div>
        <h2>Button</h2>
        <d-button
          :loading="loading1"
          @click="loading1 = !loading1"
        >按钮</d-button>
        <d-button
          icon="settings"
          :loading="loading2"
          @click="loading2 = !loading2"
        >按钮</d-button>
        <d-button
          icon="settings"
          icon-pos="right"
          :loading="loading3"
          @click="loading3 = !loading3"
        >按钮</d-button>
        <d-button-group>
          <d-button icon="left">上一页</d-button>
          <d-button
            icon="right"
            icon-pos="right"
          >下一页</d-button>
        </d-button-group>
      </div>
    </div>
  </div>
</template>
<script>
import Vue from "vue";
import Icon from "./Common/Icon";
import Button from "./Button/Button";
import ButtonGroup from "./Button/ButtonGroup";
import Input from "./Input/Input";
import Row from "./Grid/Row";
import Col from "./Grid/Col";
import Layout from "./Layout/Layout";
import Header from "./Layout/Header";
import Content from "./Layout/Content";
import Sider from "./Layout/Sider";
import Footer from "./Layout/Footer";
import Toast from "./Toast/Toast";
import toast from "./Toast/plugin";
import Tabs from "./Tabs/Tabs.vue";
import TabsContent from "./Tabs/TabsContent";
import TabsBody from "./Tabs/TabsBody";
import TabsHead from "./Tabs/TabsHead";
import TabsItem from "./Tabs/TabsItem";
import Popover from "./Popover/Popover";
import Collapse from "./Collapse/Collapse";
import CollapseItem from "./Collapse/CollapseItem";
import Cascader from "./Cascader/Cascader";
import Slides from "./Slides/Slides";
import SlidesItem from "./Slides/SlidesItem";
import Nav from "./Nav/Nav";
import NavItem from "./Nav/NavItem";
import NavSubItem from "./Nav/NavSubItem";
import Pagination from "./Pagination/Pagination";
import Table from "./Table/Table";
import Upload from "./Upload/Upload";
import Sticky from "./Sticky/Sticky";

Vue.use(toast);

import db from "../tests/fixtures/db";

function ajax(parentId = 0) {
  return new Promise((success, fail) => {
    let result = db.filter(item => item.parent_id === parentId);
    result.map(node => {
      node.isLeaf = db.filter(item => item.parent_id === node.id).length === 0;
    });
    success(result);
  });
}

export default {
  components: {
    "d-icon": Icon,
    "d-button": Button,
    "d-button-group": ButtonGroup,
    "d-input": Input,
    "d-row": Row,
    "d-col": Col,
    "d-layout": Layout,
    "d-header": Header,
    "d-content": Content,
    "d-sider": Sider,
    "d-footer": Footer,
    "d-toast": Toast,
    "d-tabs": Tabs,
    "d-tabs-head": TabsHead,
    "d-tabs-body": TabsBody,
    "d-tabs-item": TabsItem,
    "d-tabs-content": TabsContent,
    "d-popover": Popover,
    "d-collapse": Collapse,
    "d-collapse-item": CollapseItem,
    "d-cascader": Cascader,
    "d-slides": Slides,
    "d-slides-item": SlidesItem,
    "d-nav": Nav,
    "d-nav-item": NavItem,
    "d-nav-sub-item": NavSubItem,
    "d-pagination": Pagination,
    "d-table": Table,
    "d-upload": Upload,
    "d-sticky": Sticky
  },
  data() {
    return {
      loading1: false,
      loading2: false,
      loading3: false,
      message: "",
      selectedTab: "sports",
      selected: ["2", "1"],
      selected1: [],
      selected2: [],
      selected3: "2",
      selected4: "home",
      current: 2,
      source: [],
      dataSource: [
        {
          name: "广东",
          children: [
            {
              name: "广州",
              children: [
                { name: "天河" },
                { name: "越秀" },
                { name: "黄埔" },
                { name: "花都" },
                { name: "白云" },
                { name: "番禺" }
              ]
            },
            {
              name: "深圳",
              children: [
                { name: "南山" },
                { name: "罗湖" },
                { name: "福田" },
                { name: "龙华" },
                { name: "龙岗" },
                { name: "光明" },
                { name: "大鹏" },
                { name: "宝安" }
              ]
            },
            {
              name: "梅州",
              children: [
                { name: "兴宁" },
                { name: "梅县" },
                { name: "平远" },
                { name: "五华" },
                { name: "大浦" }
              ]
            }
          ]
        },
        {
          name: "安徽",
          children: [
            {
              name: "合肥",
              children: [
                { name: "天河" },
                { name: "越秀" },
                { name: "黄埔" },
                { name: "花都" },
                { name: "白云" },
                { name: "番禺" }
              ]
            },
            {
              name: "芜湖",
              children: [
                { name: "南山" },
                { name: "罗湖" },
                { name: "福田" },
                { name: "龙华" },
                { name: "龙岗" },
                { name: "光明" },
                { name: "大鹏" },
                { name: "宝安" }
              ]
            }
          ]
        }
      ],
      columns: [
        { text: "姓名", field: "name", sort: true },
        { text: "分数", field: "score", sort: true }
      ],
      dataSource2: [
        { id: 1, name: "xxsdfgsdgsdfgdg", score: 40 },
        { id: 2, name: "xx", score: 20 },
        { id: 3, name: "xx", score: 15 },
        { id: 4, name: "xx", score: 30 },
        { id: 5, name: "xx", score: 40 },
        { id: 6, name: "xx", score: 20 },
        { id: 7, name: "xx", score: 15 },
        { id: 8, name: "xx", score: 30 },
        { id: 9, name: "xx", score: 40 },
        { id: 10, name: "xx", score: 20 },
        { id: 11, name: "xx", score: 15 },
        { id: 12, name: "xx", score: 30 }
      ],
      loading: false,
      checkedItems: [],
      fileList: []
    };
  },
  methods: {
    errorMsg(msg) {
      alert(msg);
    },
    parseResponse(res) {
      let obj = JSON.parse(res);
      let url = `http://localhost:3000/preview/${obj.id}`;
      return url;
    },
    inputChange() {},
    showToast(position) {
      this.$toast(`随机数：${Math.random()}`, {
        autoClose: 1,
        position,
        enableButton: true
      });
    },
    loadData(item, updateSource) {
      ajax(item.id).then(result => {
        setTimeout(() => {
          updateSource(result);
        }, 2000);
      });
    },
    sort(key, direction) {
      this.loading = true;
      setTimeout(() => {
        switch (direction) {
          case null:
            break;
          case "asc":
            this.dataSource2.sort((a, b) => a.score - b.score);
            break;
          case "desc":
            this.dataSource2.sort((a, b) => b.score - a.score);
            break;
        }
        this.loading = false;
      }, 1000);
    }
  },
  created() {
    ajax(0).then(result => {
      this.source = result;
    });
  },
  mounted() {}
};
</script>
<style lang="scss">
*,
*::after,
*::before {
  box-sizing: border-box;
}

body {
  margin: 20px;
}

.demo-box {
  min-height: 100px;
  background: grey;
  border: 1px solid red;
}

img {
  max-width: 100%;
}

.logo-wrapper {
  padding: 10px;
}
.box {
  // width: 300px;
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 300px;
  background: #ddd;
}
</style>
