<template>
  <div class="container">
    <div id="files" class="file">
      <div class="text-left">
        <div class="text-top">
          <div class="title">一 关于本手册</div>
          <div class="text">
            据统计，在所有的信息安全事件中，70%－80%是由于内部员工造成的，同时大
            部分是由员工的不规范操作引起的。为保证公司信息资产的安全，防止信息资产
            被恶意破坏、窃取或遭到无意损坏，从而给公司带来损失，集团信息安全与内控
            部编写了该《员工信息安全手册》。
            手册围绕员工日常办公中最可能遇到的信息安全风险，采用通俗易懂的语言来传
            递信息安全基础知识。手册内容包括手册导读、办公环境安全、信息保密、病毒
            防范、账号密码安全、软件安装使用、互联网访问安全、电子邮件安全、移动存
            储介质安全、手提电脑安全和公司的态度及要求共十一章内容，通过这十一章内
            容普及员工应掌握的信息安全基础知识，规范员工基本信息安全行为。
          </div>
        </div>
        <div class="text-bottom">
          <div class="title">
            二 作为一名普通员工，应该如何做才能满足公司
            信息安全要求
          </div>
          <div class="text">
            <ul>
              <li>
                1) 积极学习和遵守公司各类信息安全管理规定和安全措施，将遵守安全规定融入
                自己的日常工作行为中。
              </li>
              <li>2) 在工作中，要有强烈的信息安全和保密意识。</li>
              <li>
                3) 有义务制止他人违规行为或积极举报可能造成的泄密、窃密或其他安全隐
                患。
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div class="title-right">
        <div class="content">
          <p>第一章 信息保密</p>
          <ul>
            <li>一、哪些信息属于保密信息</li>
            <li>二、哪些情况可能导致保密信息泄露</li>
            <li>三、如何恰当使用保密信息</li>
          </ul>
          <div class="div-img">
            <!-- <img src="../assets/images/tttimg.jpg" alt /> -->
          </div>
        </div>
      </div>
    </div>
    <div class="btn" @click="toImage()">下载PDF</div>
  </div>
</template>
<script>
import html2File from '../../components/Mine/html2File/html2File.js' // 图片转PDF
export default {
  data() {
    return {}
  },
  methods: {
    toImage() {
      html2File.toPdf('files', 'test')
    }
  }
}
</script>

<style scoped>
div.container {
  width: 100%;
  height: 100%;
}
div.container .file {
  width: 80%;
  height: 100%;
  padding: 30px 0;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
div.container .file .text-left {
  flex: 1;
}
div.container .file .text-left .text-top .title {
  height: 40px;
  line-height: 40px;
  border-top: 1px solid #999;
  border-bottom: 1px solid #999;
  text-align: left;
  color: #ed5565;
  font-weight: 900;
  font-size: 20px;
}
div.container .file .text-left .text-top .text {
  padding: 35px 0 70px 0;
  font-size: 14px;
  line-height: 25px;
  text-align: left;
  font-weight: 400;
}
div.container .file .text-left .text-bottom .title {
  line-height: 40px;
  border-top: 1px solid #999;
  border-bottom: 1px solid #999;
  text-align: left;
  color: #ed5565;
  font-weight: 900;
  font-size: 20px;
}
div.container .file .text-left .text-bottom .text {
  padding: 20px 0;
  font-size: 14px;
  line-height: 25px;
  text-align: left;
  font-weight: 400;
}
div.container .file .text-left .text-bottom .text ul {
  list-style: none;
  padding: 0;
}
div.container .file .text-left .text-bottom .text ul li {
  line-height: 30px;
}
div.container .file .title-right {
  flex: 1;
  text-align: left;
}
div.container .file .title-right .content {
  padding-left: 120px;
}
div.container .file .title-right .content p {
  line-height: 40px;
  border-bottom: 4px solid #1c84c6;
  text-align: left;
  color: #1c84c6;
  font-weight: 900;
  font-size: 20px;
  padding-bottom: 10px;
}
div.container .file .title-right .content ul {
  list-style: none;
  padding: 0;
  color: #1c84c6;
  font-size: 14px;
  line-height: 25px;
  text-align: left;
  font-weight: 400;
}
div.container .file .title-right .content .div-img img {
  width: 50%;
  height: 50%;
}
div.container .btn {
  cursor: pointer;
  width: 100px;
  height: 40px;
  line-height: 40px;
  background-color: #eee;
  margin: 0 auto;
  margin-top: 20px;
}
</style>
