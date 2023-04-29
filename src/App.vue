<template>
  <div id="app">
    <!-- 遮罩 -->
    <div
      class="mack"
      v-show="mack"
      @click="(mack = false), (optionsShow = false), (production = false)"
    ></div>
    <!-- 密码界面 -->
    <div class="open" v-show="open.showP">
      <img src="./assets/huama.png" alt="" />
      <div class="titlePassword">提示：请输入密码</div>
      <!-- 密码输入框 -->
      <van-password-input
        class="password"
        :value="value"
        :focused="showKeyboard"
        @focus="showKeyboard = true"
      />
      <!-- 带右侧栏的键盘 -->
      <van-number-keyboard
        class="keyboard"
        v-model="value"
        :show="showKeyboard"
        theme="custom"
        extra-key="."
        close-button-text="完成"
        @blur="showKeyboard = false"
        @input="onInput"
      />
    </div>
    <div class="content">
      <!-- 头部 -->
      <div class="top">
        <p>
          <img src="./assets/huama.png" alt="" />
          <!-- 图片上传 -->
          <input
            type="file"
            class="photoFime"
            name="upload_file"
            id="uploadFile"
            ref="foreheadCir"
            mutiple="mutiple"
            accept="image/*"
            @change="uploadImg()"
          />
        </p>
        <p><span @click="confirm($event)">专业的人用专业的软件</span></p>
        <p><span @click="addMachine($event)">癞蛤蟆你兄弟超专业</span></p>
        <!-- 右上角点击 -->
        <div class="showOptions" @click="(mack = true), (optionsShow = true)">
          <span v-show="nowTime"></span>
        </div>
        <!-- 显示日期 --- 显示记录时间 -->
        <div class="timeShow" @click="timeShow($event)"></div>
        <div class="options" v-show="optionsShow">
          <div class="reset" @click="showReset = !showReset">
            重置机台<i class="iconfont icon-zhiwu"></i>
          </div>
          <div class="clearAllf" @click="clearAllf($event)">
            删除非收藏<i class="iconfont icon-yongyan"></i>
          </div>
          <div
            class="other"
            @click="(production = !production), (optionsShow = false)"
          >
            其他<i class="iconfont icon-remai"></i>
          </div>
          <div class="back" @click="back">
            退出
            <i class="iconfont icon-a-Group427318885"></i>
          </div>
        </div>
        <!-- 清除所有机台数据弹窗 -->
        <div class="confirm" v-show="showReset">
          <p>确定清除所有机<br />台数据吗?</p>
          <div class="left" @click="clear($event)">取消</div>
          <div class="right" @click="determine($event)">确定</div>
        </div>
      </div>
      <!-- 全部机台 -->
      <div class="por02">
        <div class="por">
          <div
            v-for="(item, index) in indexData.length"
            :key="index"
            class="machine"
            style="--display: none"
            :id="index"
          >
            <input
              type="text"
              placeholder="0 #"
              :class="ipt_one ? 'clearIpt iptOne' : 'clearIpt'"
              @input="ipt($event)"
              :value="indexData[index].code"
            />
            <input
              type="text"
              placeholder="0000"
              class="clearIpt"
              @input="ipt($event)"
              :value="indexData[index].coding"
            />
            <input
              type="text"
              placeholder="产品"
              class="clearIpt"
              @input="ipt($event)"
              :value="indexData[index].product"
            />
            <input
              type="text"
              placeholder="9999"
              class="clearIpt"
              @input="ipt($event)"
              :value="indexData[index].target"
            />
            <!-- 计算 -->
            <input
              class="countIpt clearIpt"
              type="text"
              @input="ipt($event)"
              :value="indexData[index].count"
            />
            <!-- 结果 -->
            <input
              type="button"
              class="countResult"
              :value="indexData[index].result"
              disabled
            />
            <!-- 清除 -->
            <input
              type="button"
              @click="clearIpts($event)"
              :style="{
                background: indexData[index].clear,
                color: indexData[index].color,
              }"
              class="clearBtn"
              value="开始"
            />
            <!-- 输入数据显示时间 -->
            <ul class="time">
              <li
                v-for="(item, i) in 7"
                :key="i"
                v-html="indexData[index].liData[i]"
                v-show="nowTime"
              ></li>
            </ul>
            <div class="slide" @click="slide($event)"></div>
            <p class="jiShuan"></p>
            <!-- 清除弹窗提示 -->
            <div class="confirm">
              <p>确定清除这个机 <br />台数据吗?</p>
              <div class="left" @click="clear($event)">取消</div>
              <div class="right" @click="cancel($event)">确定</div>
            </div>
            <div class="rightBtn">
              <div class="collection" @click="clickCollection($event)">
                收藏
              </div>
              <div class="delete" @click="clickDelete($event)">删除</div>
            </div>
          </div>
        </div>
      </div>
      <!-- 其他选项中的排产 -->
      <div class="production" v-show="production">
        <p>{{ dataTime() }}</p>
        <p v-for="(item, index) in ccc[0]" :key="index" :id="index">
          {{ ccc[index] }}
        </p>
      </div>
    </div>

    <!-- 退出按钮 -->
    <div class="back02" v-show="back02Flag"></div>
  </div>
</template>

<script>
import axios from "axios";
import Vue from "vue";
import Vant from "vant";
import "vant/lib/index.css";
Vue.use(Vant);
export default {
  name: "App",
  data() {
    return {
      // 存储的数据
      indexData: [],
      // 记录的时间显示/隐藏 ul
      nowTime: true,
      // 日期显示隐藏
      time: false,
      // 显示重置弹窗
      showReset: false,
      // 右上角选项弹窗
      optionsShow: false,
      // 遮罩
      mack: false,
      // 排产
      production: false,
      // 排产
      ccc: "",
      // 点击收藏后为true
      collection: false,
      // 触发滑动事件true
      move: false,
      // vant 组件数据 ------------
      value: "",
      showKeyboard: true,
      // 密码通行证
      open: {
        showP: false,
        t: "",
      },
      // 机台滑动时机台号#跟着滑动
      ipt_one: false,
      // 点击右滑
      slideFlag: true,
      // 点击开始计数
      countFlag: true,
      dataCount: [
        {
          flag: true,
          id: 0,
          start: 0,
        },
        {
          flag: true,
          start: 0,
          id: 1,
        },
        {
          flag: true,
          id: 2,
          start: 0,
        },
        {
          flag: true,
          start: 0,
          id: 3,
        },
        {
          flag: true,
          start: 0,
          id: 4,
        },
        {
          flag: true,
          start: 0,
          id: 5,
        },
        {
          flag: true,
          start: 0,
          id: 6,
        },
        {
          flag: true,
          start: 0,
          id: 7,
        },
        {
          flag: true,
          id: 8,
          start: 0,
        },
        {
          flag: true,
          id: 9,
          start: 0,
        },
        {
          flag: true,
          id: 10,
          start: 0,
        },
      ],
      // 始计数定时器
      timerId: null,
      // 开始计数的 秒 数
      start_i: 0,
      // 退出按钮
      back02Flag: false,
      // keyboardFlag id
      keyboardFlagId: 0,
    };
  },
  methods: {
    back() {
      this.mack = false;
      this.optionsShow = false;
      this.production = false;
      location.reload();
    },
    timeShow() {
      this.nowTime = !this.nowTime;
      let e = document.querySelector(".timeShow");
      let t = new Date();
      let n = t.getMonth() + 1;
      let o = t.getDate();
      n < 10 && (n = "0" + n);
      let a = n + "月" + o + "日";
      this.nowTime
        ? ((e.innerText = a), (e.style.color = "#fff"))
        : (e.innerText = "");
    },
    clearIpts(e) {
      var id = e.currentTarget.parentNode.id;
      // -----------
      // 根据第几个flag变动的来运行
      if (!!this.dataCount[id].flag) {
        e.currentTarget.style.opacity = "0.4";
        e.currentTarget.style.background = "orangered";
        e.currentTarget.parentNode.children[9].innerHTML = "";
        // ---------------
        this.dataCount[id].start_i = 0;
        // ---------------
        e.currentTarget.value = "结束";
        var _this = this;
        this.timerId = setInterval(function () {
          _this.dataCount[id].start_i++;
        }, 1000);
      } else {
        clearInterval(this.timerId);
        e.currentTarget.value = "开始";
        e.currentTarget.style.background = "green";
        e.currentTarget.style.opacity = "0.2";
        // ---------------
        this.jiShuan(e.currentTarget, this.dataCount[id].start_i);
        this.setStorage(e.currentTarget.parentNode);
      }
      this.dataCount[id].flag = !this.dataCount[id].flag;
    },
    jiShuan(e, num) {
      if (num == null) return (e.parentNode.children[9].innerHTML = "");
      var day = Math.round(43200 / Number(num));
      e.parentNode.children[9].innerHTML = num + "秒" + day;
      this.setStorage(e, d);
    },
    cancel(e) {
      let t = e.currentTarget.parentNode,
        n = t.parentNode,
        o = n.querySelectorAll("input"),
        a = o.length,
        r = n.children[6],
        i = n.children[6],
        l = n.querySelectorAll("li"),
        miaoShun = n.children[9],
        s = l.length;
      for (let c = 0; c < a - 2; c++) o[c].value = "";
      for (let c = 0; c < s; c++) l[c].innerHTML = "";
      (r.style.background = ""),
        (i.value = "= 0"),
        (t.style.display = "none"),
        (this.indexData[n.id] = {
          code: "",
          color: "#000",
          coding: "",
          product: "",
          target: "",
          clear: "",
          count: "",
          result: "= 0",
          liData: "",
          miaoShun: "",
        }),
        localStorage.setItem("indexData", JSON.stringify(this.indexData));
    },
    determine() {
      (this.mack = false),
        (this.optionsShow = false),
        (this.showReset = false),
        (this.production = false);
      let e = document.querySelectorAll(".machine"),
        t = e.length;
      for (let n = 0; n < t; n++) {
        let t = e[n].children,
          o = t.length;
        for (let e = 0; e < o - 4; e++) t[e].value = "";
      }
      (this.indexData = new Array(4).fill({
        code: "",
        color: "#000",
        coding: "",
        product: "",
        target: "",
        clear: "",
        count: "",
        result: "= 0",
        liData: "",
        miaoShun: "",
      })),
        localStorage.setItem("indexData", JSON.stringify(this.indexData));
    },
    clear(e) {
      (this.mack = false),
        (this.optionsShow = false),
        (this.showReset = false),
        (this.production = false);
      let t = e.currentTarget.parentElement;
      t.style.display = "none";
    },
    addMachine(e) {
      let t = e.currentTarget.parentNode.parentNode.parentNode,
        n = t.querySelectorAll(".machine"),
        o = n.length,
        a = {
          code: "",
          color: "#000",
          coding: "",
          product: "",
          target: "",
          clear: "",
          count: "",
          result: "= 0",
          liData: "",
          miaoShun: "",
        };
      (this.indexData[o] = a),
        this.indexData.machineLen++,
        localStorage.setItem("indexData", JSON.stringify(this.indexData));
    },
    confirm(e) {
      let t = e.currentTarget.parentNode.parentNode.parentNode,
        n = t.querySelectorAll(".machine"),
        o = n.length,
        a = n[o - 1].querySelectorAll("input"),
        r = true;
      for (let i = 0; i < a.length - 2; i++)
        if ("" != a[i].value) {
          alert("存在数据不能删除机台"), (r = false);
          break;
        }
      r &&
        (this.indexData.machineLen--,
        localStorage.setItem("indexData", JSON.stringify(this.indexData)));
    },
    reset(e) {
      this.showReset = true;
    },
    ipt(e) {
      let t = this;
      e = e.currentTarget;
      let n = e.parentNode,
        o = n.children[6],
        a = n.querySelectorAll("input"),
        r = a.length;
      for (let i = 0; i < r - 2; i++) {
        if ("" != a[i].value) {
          o.style.background = "green";
          break;
        }
        o.style.background = "";
      }

      t.countOrResult(n);
    },
    countOrResult(e) {
      let n,
        a = this,
        r = e.children[5],
        li = e.querySelectorAll("li"),
        s = e.children[4],
        u = s.value.split("+"),
        d = u.length,
        c = s.value;

      // 如果包括 x 号
      if (s.value.includes("x")) {
        // 包含 +x 分割 有 x 转换 * 运算
        if (s.value.includes("+x")) {
          count = eval(
            eval(c.split("+x")[0].replace("x", "*")) *
              eval(c.split("+x")[1].replace("x", "*"))
          );
          if (count == 0) {
            r.value = "= " + eval(c.split("*")[0]);
          } else {
            r.value = "= " + count;
          }
        }
        // 如果 splite以 x 分割后前一位是数字
        if (
          Number(c.split("x")[0][c.split("x")[0].length - 1]) ||
          Number(c.split("x")[0][c.split("x")[0].length - 1]) == 0
        ) {
          r.value = "= " + eval(s.value.replace("x", "*"));
        }
      } else {
        r.value = "= " + eval(s.value);
      }
      //   ----------
      if (s.value.includes(".")) {
        a.jiShuan(s, s.value.split(".")[0]);
      } else {
        a.jiShuan(s, null);
      }
      // ------------
      if (s.value == "") r.value = "= 0";
      console.log(s.value);
      //   ----------
      for (let i = 0; i < 5; i++)
        e.children[i].onblur = () => {
          let h = e.children[0].value.split(""),
            h2 = s.value.split(""),
            f = h.length,
            f2 = h2.length;
          if (s.value != "") {
            "+" != h2[f2 - 1] &&
              (e.children[4].value = e.children[4].value + "+");
          }
          "#" != h[f - 1] && (e.children[0].value = e.children[0].value + "#"),
            (li[d - 1].innerHTML = a.getNowTime());
          console.log(s.value);
          a.setStorage(e, d);
        };
    },
    getNowTime() {
      var e = "",
        t = new Date(),
        n = ":",
        o = t.getHours(),
        a = t.getMinutes();
      return (
        o >= 0 && o <= 9 && (o = "0" + o),
        a >= 0 && a <= 9 && (a = "0" + a),
        (e = o + n + a),
        e
      );
    },
    setStorage(e, t) {
      t = t || 0;
      let n = e.id,
        o = e.children[0].value,
        a = e.children[1].value,
        r = e.children[2].value,
        i = e.children[3].value,
        l = e.children[4].value,
        s = e.children[6].style.background,
        c = e.children[5].value,
        u = e.children[7].children,
        d = u.length,
        miaoShun = e.children[9].innerText,
        p = new Array(d);
      for (let f = 0; f < t; f++) p[f] = u[f].innerHTML;
      let h = e.parentNode.querySelectorAll(".machine").length;
      this.indexData.machineLen = h;
      for (let f = 0; f < h; f++)
        n == f &&
          (this.indexData[f] = {
            code: o,
            coding: a,
            product: r,
            target: i,
            clear: s,
            color: s,
            count: l,
            result: c,
            liData: p,
            miaoShun: miaoShun,
          });
      localStorage.setItem("indexData", JSON.stringify(this.indexData));
    },
    setToken() {},
    uploadImg() {
      let e = document.getElementById("uploadFile").files[0],
        t = new FileReader();
      t.readAsDataURL(e);
      let n = document.querySelector(".showOptions span"),
        o = new Date(),
        a = o.getMonth() + 1,
        r = o.getDate();
      a < 10 && (a = "0" + a);
      let i = a + "月" + r + "日";
      (n.innerText = "正在识别 " + i + " 排产  ! ! "), (n.style.color = "#fff");
      let s = "";
      t.onload = function (e) {
        (s = e.target.result), (s = s.split(",")[1]);
        let t = new FormData();
        t.append("image", s);
        axios({
          method: "post",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
          url: "https://aip.baidubce.com/rest/2.0/ocr/v1/doc_analysis_office?access_token=24.18a2476ea388f0789a389319a126fb72.2592000.1682742490.282335-27736960",
          data: t,
        })
          .then((e) => {
            let t = e.data.results;
            // console.log(t);
            let n = t.length,
              o = [],
              a = [],
              r = "";
            for (let s = 0; s < 50; s++)
              if (
                ("A" == t[s].words.word || "B" == t[s].words.word) &&
                t[s].words
              ) {
                r = t[s + 1].words.words_location.left;
                break;
              }
            for (let s = 0; s < n; s++)
              r == t[s].words.words_location.left && t[s].words
                ? o.push("aaaaa" + t[s].words.word)
                : o.push(t[s].words.word);
            (a = o.join().split("aaaaa")), a.splice(0, 1);
            let i = a.length;
            let paic = [];
            for (let s = 0; s < i; s++)
              (a[s] = a[s].split(",")),
                paic.push({
                  code: a[s][0] + "#",
                  coding: a[s][2].slice(-5),
                  product: a[s][4].slice(0, 3),
                  target: a[s][10],
                  clear: "green",
                  count: "",
                  result: "= 0",
                  liData: "",
                  miaoShun: "",
                });
            localStorage.setItem("indexData", JSON.stringify(paic)),
              localStorage.setItem("p", JSON.stringify(a));
            location.reload();
          })
          .catch((e) => {
            console.log(e), (n.innerText = "识别出错！！");
          });
      };
    },
    slide(e) {
      (e = e.currentTarget.parentNode.parentNode),
        this.slideFlag
          ? ((e.style.transition = "margin-left 0.1s"),
            (e.style.marginLeft = "-2.6667rem"),
            (this.ipt_one = true))
          : ((e.style.transition = "margin-left 0.1s"),
            (e.style.marginLeft = "0.266rem"),
            (this.ipt_one = false)),
        (this.slideFlag = !this.slideFlag);
    },
    clickCollection(e) {
      e = e.currentTarget;
      let t = e.parentNode.parentNode.children[6],
        n = e.parentNode.parentNode.id;
      var o = localStorage.getItem("indexData");
      o &&
        ((o = JSON.parse(o)),
        "rgb(255, 255, 255)" != t.style.color
          ? ((t.style.color = "rgb(255, 255, 255)"),
            (o[n].color = "rgb(255, 255, 255)"))
          : ((t.style.color = ""), (o[n].color = "")),
        localStorage.setItem("indexData", JSON.stringify(o)));
      localStorage.getItem("indexData");
    },
    clickDelete(e) {
      e = e.currentTarget;
      let t = e.parentNode.parentNode.children[6];
      "rgb(255, 255, 255)" != t.style.color && this.removeM(t);
    },
    removeM(e) {
      let t = e.parentNode,
        n = t.id;
      t.remove();
      var o = localStorage.getItem("indexData");
      if (o) {
        (o = JSON.parse(o)),
          this.$delete(o, n),
          localStorage.setItem("indexData", JSON.stringify(o));
        var a = localStorage.getItem("p");
        if (a) {
          a = JSON.parse(a);
          let e = document.querySelectorAll(".production p");
          e[n] && e[n].remove(), this.$delete(a, n);
        }
        localStorage.setItem("p", JSON.stringify(a)), location.reload();
      }
    },
    clearAllf() {
      (this.mack = false),
        (this.optionsShow = false),
        (this.showReset = false),
        (this.production = false);
      var e = localStorage.getItem("indexData"),
        t = localStorage.getItem("p");
      if (!e) return;
      if (!t) return;
      (e = JSON.parse(e)), (t = JSON.parse(t));
      let n = e.length,
        o = [],
        a = [];
      for (let r = 0; r < n; r++) e[r].color && (o.push(e[r]), a.push(t[r]));
      localStorage.setItem("indexData", JSON.stringify(o)),
        localStorage.setItem("p", JSON.stringify(a)),
        location.reload();
    },
    onInput() {
      if ("88888" == this.value) {
        this.open.showP = false;
        let e = [],
          t = new Date(),
          n = t.setDate(t.getDate() + 3);
        (e.t = new Date(n)),
          (e.showP = false),
          localStorage.setItem("timePasswords", JSON.stringify(e));
      }
    },
    dataTime() {
      let e = new Date(),
        t = e.getFullYear(),
        n = e.getMonth() + 1,
        o = e.getDate(),
        a = e.getHours(),
        r = e.getMinutes(),
        i = e.getSeconds();
      n < 10 && (n = "0" + n);
      let l = a >= 12 ? "下午" : "上午";
      a >= 12 && (a -= 12), r < 10 && (r = "0" + r), i < 10 && (i = "0" + i);
      let s = t + "年" + n + "月" + o + "日  " + l + a + ":" + r + ":" + i;
      return s;
    },
  },
  mounted() {},
  created() {
    //获取localStroage值
    var str = localStorage.getItem("indexData");
    var str2 = localStorage.getItem("p");
    var obj = [];
    var obj2 = [];
    // 存在转换一下，不存在直接生成
    if (str) {
      obj = JSON.parse(str);
      //   console.log(obj);
      obj2 = JSON.parse(str2);
      this.ccc = obj2;

      if (obj.machineLen < 0 || obj.machineLen == 0) {
        // 默认生成机台对应对象健值
        obj = new Array(4).fill({
          code: "",
          color: "#000",
          coding: "",
          product: "",
          target: "",
          clear: "",
          color: "",
          count: "",
          result: "= 0",
          liData: "",
          miaoShun: "",
        });
      }
    } else {
      // 默认生成机台对应对象健值
      obj = new Array(4).fill({
        code: "",
        color: "#000",
        coding: "",
        product: "",
        target: "",
        clear: "",
        count: "",
        result: "= 0",
        liData: "",
        miaoShun: "",
      });
    }
    this.indexData = obj;
    // --------------------------
    // --------------------------
    // --------------------------
    var timePasswords = localStorage.getItem("timePasswords");
    let obj3 = {};
    if (timePasswords) {
      timePasswords = JSON.parse(timePasswords);
      this.open.showP = timePasswords.showP;
      // 如果现在的时间毫秒数 > 解锁后的时间毫秒数 + 3天的时间
      if (new Date().getTime() > new Date(timePasswords.t).getTime()) {
        this.open.showP = true;
        // 状态储存起来
        obj3.showP = this.open.showP;
        localStorage.setItem("timePasswords", JSON.stringify(obj3));
      }
    } else {
      // 如果现在的时间毫秒数 > 设置的时间毫秒数
      if (new Date().getTime() > new Date("2022/11/14/6:30").getTime()) {
        this.open.showP = true;
        // 状态储存起来
        obj3.showP = this.open.showP;
        localStorage.setItem("timePasswords", JSON.stringify(obj3));
      }
    }
  },
  beforeCreate() {},
};
</script>
<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
// 遮罩
.mack {
  position: absolute;
  z-index: 100;
  height: 100%;
  width: 100%;
}
// 输入密码验证通行
.open {
  position: absolute;
  z-index: 1000000;
  background: #9fb8c1;
  text-align: center;
  font-size: 0.6133rem;
  width: 100%;
  height: 100%;
  img {
    width: 5.3333rem;
    height: 4.5333rem;
    margin: 1.3333rem auto 0.5333rem;
    border-radius: 0.2667rem;
  }
  .titlePassword {
    margin-bottom: 0.5333rem;
    color: #fff;
  }
  .password {
    width: 6.6667rem;
    margin: 0 auto;
  }
}
.content {
  min-height: 100vh;
  max-height: 100%;
  box-sizing: border-box;
  border: 0.0267rem solid #999;
  box-shadow: 0 0 0.5333rem #ccc;
  background-color: rgb(159, 184, 193);
  // 去除长按出现的文字复制影响
  -webkit-touch-callout: none;
  -webkit-user-select: none;
  -khtml-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  position: relative;
  // 头部
  .top {
    margin-top: 0.37rem;
    margin-left: 2.2rem;
    padding-top: 0.009rem;
    height: 2.1333rem;
    p {
      font-size: 0.8rem;
      line-height: 0.5067rem;
      span {
        color: #848492;
        font-size: 0.4rem;
        margin-right: 1.4667rem;
      }
      img {
        position: absolute;
        top: 0.72rem;
        left: 0.4533rem;
        height: 1.3333rem;
        width: 1.3333rem;
        border-radius: 0.1867rem;
      }
    }
    p:nth-child(3) {
      margin-right: 0.2667rem;
      margin-top: 0;
    }
    p:nth-child(1) {
      margin-right: 0.2667rem;
      margin-top: 0.23rem;
    }
    // 重置 显示隐藏 其他 退出 选项
    .options {
      width: 4.4rem;
      height: 3.7333rem;
      padding-left: 0.24rem;
      position: absolute;
      background: #fefefe;
      border-radius: 0.1867rem;
      top: 2.2rem;
      left: 4.8rem;
      cursor: pointer;
      box-shadow: 0.0533rem 0 3.4667rem 0.0533rem #888;
      z-index: 130;
      div {
        border-bottom: 0.0267rem #dee3e3 solid;
        text-align: left;

        height: 25%;
        line-height: 0.8267rem;
        font-size: 0.4267rem;
        box-sizing: border-box;
        color: #0b0f0e;
        border-radius: 0.1067rem;
        position: relative;
        i {
          color: #7fad9a;
          color: #0b0f0e;
          position: absolute;
          right: 0.5333rem;
        }
      }
      div:nth-child(4) {
        border: 0;
      }
    }
    // 上传文件
    .photoFime {
      position: absolute;
      top: 0.72rem;
      left: 0.4533rem;
      height: 1.3333rem;
      width: 1.3333rem;
      border-radius: 0.1867rem;
      color: none;
      background: none;
      outline: none;
      border: none;
      cursor: pointer;
      opacity: 0;
    }
    // 右上角选项点击
    .showOptions {
      // 去除苹果默认背景色
      -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
      position: absolute;
      top: 0.1rem;
      left: 6.4533rem;
      height: 2.5rem;
      width: 3.4333rem;
      box-sizing: border-box;
      z-index: 200;
      span {
        color: #fff;
        opacity: 0.5;
        font-size: 0.4267rem;
        position: absolute;
        top: 1.7333rem;
        left: -4.1867rem;
      }
      p {
        color: #f7f8fa;
        opacity: 0.5;
        font-size: 0.4267rem;
        width: 160%;
        height: 20%;
        position: absolute;
        top: 1.84rem;
        left: -1.6rem;
        z-index: 2100;
      }
    }
    .timeShow {
      color: #fff;
      width: 4.8rem;
      height: 0.5333rem;
      opacity: 0.5;
      font-size: 0.4267rem;
      margin-top: -0.0267rem;
    }
    // 删除单个机台所有数据弹窗
    .confirm {
      width: 5.3333rem;
      height: 2.8933rem;
      background: #fff;
      font-size: 0.4267rem;
      position: fixed;
      left: 25%;
      top: 35%;
      color: #7f939a;
      border-radius: 0.2667rem;
      overflow: hidden;
      z-index: 100;
      text-align: center;
      p {
        height: 1.8133rem;
        padding-top: 0.2667rem;
        box-sizing: border-box;
        line-height: 0.6rem;
        margin: 0;
        font-size: 0.4533rem;
        color: hsl(0, 0%, 100%, 90%);
        background: #7fad9a;
      }
      div {
        width: 50%;
        box-sizing: border-box;
        height: 1.28rem;
        line-height: 0.98rem;
        display: inline-block;
        color: hsl(0, 0%, 100%, 90%);
      }
      .left {
        background: #9fb8c1;
      }
      .right {
        background: #7fad9a;
        background: #b2c69a;
      }
    }
  }
  // 其他中的排产
  .production {
    width: 85%;
    height: 75vh;
    background: #fff;
    border-radius: 0.2667rem;
    padding: 0.1333rem;
    padding-top: 0.4rem;
    color: rgb(165, 161, 161);
    font-size: 0.4533rem;
    overflow: auto;
    position: absolute;
    top: 8%;
    left: 7%;
    z-index: 120;
    box-shadow: 0.0533rem 0.0533rem 5.3333rem 5.3333rem rgb(0 0 0 / 70%);
    p {
      margin-bottom: 0.32rem;
    }
  }
  .por02 {
    overflow: auto;
    .por {
      box-sizing: border-box;
      margin-left: 0.2667rem;
      // 机台
      .machine {
        display: flex;
        flex-wrap: wrap;
        position: relative;
        margin: 0 0 0.1867rem 0;
        box-sizing: border-box;
        width: 9.9rem;
        &::before {
          content: "|";
          position: absolute;
          transform: translateY(-50%);
          display: var(--display);
          top: 41px;
          left: 7px;
          width: 1px;
          height: 0px;
          z-index: 100;
          animation: blink 1s step-end infinite;
          font-size: 17px;
          @keyframes blink {
            from,
            to {
              opacity: 0;
            }
            50% {
              opacity: 1;
            }
          }
        }
        input {
          width: 1.2rem;
          height: 0.8rem;
          margin-left: 0.1333rem;
          padding-left: 0.1933rem;
          border-radius: 0.16rem;
          color: #757575;
          border: 0.0267rem solid #ccc;
          font-size: 0.4533rem;
        }
        input:nth-child(1) {
          width: 1.22rem;
        }
        input:nth-child(2) {
          width: 1.6rem;
        }
        input:nth-child(3) {
          width: 1.48rem;
        }
        input:nth-child(4) {
          width: 1.05rem;
        }
        .iptOne {
          position: absolute;
          top: 0;
          left: 4.9333rem;
          z-index: 110;
        }
        .clearBtn {
          color: #000;
          position: absolute;
          top: 0rem;
          left: 6.8267rem;
          width: 1.2533rem;
          text-align: center;
          line-height: 0.8rem;
          height: 0.84rem;
          font-size: 0.4267rem;
          -webkit-appearance: none;
          appearance: none;
          border-radius: 0.1333rem;
          background: yellow;
          opacity: 0.2;
        }
        .countIpt {
          margin-bottom: 0.5rem;
          margin-top: 0.1333rem;
          position: relative;
          width: 8.4rem;
        }

        // 结果
        .countResult {
          position: absolute;
          top: 1rem;
          left: 6.6133rem;
          background: none;
          width: 1.8133rem;
          text-align: right;
          border: none;
          color: #848492;
          font-size: 0.5333rem;
        }
        // 点击又滑
        .slide {
          width: 1.6rem;
          height: 1.4667rem;
          position: absolute;
          font-size: 0.4533rem;
          color: #f1f1f1;
          top: -0.6133rem;
          left: 7.9733rem;
          padding-left: 0.2667rem;
          padding-top: 0.6933rem;
          opacity: 1;
        }
        // 时间
        ul.time {
          margin-left: 0.16rem;
          font-size: 0.3733rem;
          height: 0.5333rem;
          line-height: 0.5333rem;

          position: absolute;
          top: 1.9467rem;
          left: 0;
          z-index: 10;
          margin-bottom: 0.2667rem;
          li {
            float: left;
            width: 1.36rem;

            color: rgb(252, 252, 252, 0.8);
          }
        }
        // 清除弹窗
        .confirm {
          width: 5.3333rem;
          text-align: center;
          height: 2.8933rem;
          background: #fff;
          font-size: 0.4267rem;
          position: fixed;
          left: 25%;
          top: 35%;
          color: #7f939a;
          display: none;

          border-radius: 0.2667rem;
          overflow: hidden;
          z-index: 100;
          p {
            height: 1.8133rem;
            padding-top: 0.2667rem;
            box-sizing: border-box;
            line-height: 0.6rem;
            margin: 0;
            font-size: 0.4533rem;
            color: hsl(0, 0%, 100%, 90%);
            background: #7fad9a;
          }
          div {
            width: 50%;
            box-sizing: border-box;
            height: 1.28rem;
            line-height: 0.98rem;
            display: inline-block;
            color: hsl(0, 0%, 100%, 90%);
          }
          .left {
            background: #9fb8c1;
          }
          .right {
            background: #7fad9a;
            background: #b2c69a;
          }
        }
        .rightBtn {
          width: 2.6667rem;
          height: 1.2533rem;
          position: absolute;
          font-size: 0.4267rem;
          top: 0.9333rem;
          right: -2.4267rem;
          // 滑动删除按钮
          .delete,
          .collection {
            //
            margin: 0 0.1067rem 0 0;
            border-radius: 0.2133rem;
            width: 0.9333rem;
            padding: 0.1067rem;
            display: inline-block;
            height: 0.6133rem;
          }
          .delete {
            border: 0.0267rem hsl(33, 100%, 50%) solid;
            background: rgba(255, 136, 0, 0.7);
            color: #fff;
          }
          .collection {
            background: #6bae92;
            border: 0.0267rem rgb(1, 169, 1) solid;
            color: #fff;
          }
        }
        .jiShuan {
          position: absolute;
          top: 1.84rem;
          left: 6.6933rem;
          color: #f1f1f1;
          font-size: 0.4267rem;
        }
      }
    }
  }
  // 数字键盘
  .keyboard {
    background: #ccc;
    font-size: 28px;
    position: fixed;
    border-radius: 10px;
    top: 61vh;
    width: 100vw;
    border: 1px solid #524e4e;
    z-index: 10000;
    height: 39vh;
    .jianpan {
      position: absolute;
      top: 0;
      padding: 4vw 0 0 23vw;
      width: 77vw;
      text-align: center;
      -webkit-text-align: center;
      button {
        background: white;
        border-radius: 0.2667rem;
        text-align: center;
        -webkit-text-align: center;
        -webkit-line-height: 1.3333rem;
        line-height: 1.3333rem;
        color: #747479;
        border: 1px solid #aaa9a9;
        width: 1.60333rem;
        height: 1.3333rem;
        margin: 0 0.12rem 0.12rem 0;
      }
      .operator {
        background: #eaeaea;
      }
      button:active {
        background: rgb(177, 132, 50);
      }
      .delete {
        // -webkit-color: orange;
        // color: orange;
        i {
          opacity: 0.6;
          //   -webkit-opacity: 0.6;
        }
      }
      .complete {
        background: #7fad9a;
        color: #fff;
        font-size: 0.533rem;
        line-height: 0.5333rem;
        margin-top: -0rem;
        vertical-align: middle;
      }
    }
    .zhuangshiDiv {
      position: absolute;
      left: 5vw;
      top: 4vw;
      width: 1.60333rem;
      button {
        background: white;
        border-radius: 0.2667rem;
        text-align: center;
        -webkit-text-align: center;
        -webkit-line-height: 1.3333rem;
        line-height: 1.3333rem;
        color: #747479;
        border: 1px solid #aaa9a9;
        width: 1.60333rem;
        height: 1.3333rem;
        margin-bottom: 0.12rem;
      }
    }
  }
}
.back02 {
  position: fixed;
  top: 70%;
  left: 70%;
  width: 80px;
  height: 70px;
  background: #000;
  border-radius: 10px;
  opacity: 0.5;
}
</style>
