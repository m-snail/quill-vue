<template>
  <div class="commonEditor">
    <el-dialog title="插入视频" :visible.sync="videoBox" width="700px" style="text-align: left">
       <ul class="addVideo">
         <li>
           <span>视频网址：</span>
           <div  style="color: #cc0001">tips:富文本插入视频需要各大网站视频链接，必须是各视频网站分享按钮下面的通用地址iframe标签（整个ifame标签粘贴即可）</div>
           <el-input v-model="videoUrl" size="small" style="width:100%" @blur="lookVideo(videoUrl)"></el-input>
         </li>
         <li>
           <span>视频宽度：</span>
           <el-input type="number"  v-model="videoWidth" size="small" style="width:100px;" @blur="valueChange(1)"></el-input> px
           <span style="font-size: 12px">(最大值为1920px，不输入默认420px)</span>
         </li>
         <li>
           <span>视频高度：</span>
           <el-input type="number" v-model="videoHeight" size="small" style="width:100px;"  @blur="valueChange(2)"></el-input> px
           <span style="font-size: 12px">(不输入默认280px)</span>
         </li>
         <li>
           <span> 视频预览：</span>
           <div class="lookBox">
             <span v-html="lookvideoUrl">{{lookvideoUrl}}</span>
           </div>
         </li>
       </ul>
      <span slot="footer" class="dialog-footer">
        <el-button type="danger" @click="saveVideo" size="small">确 定</el-button>
        <el-button size="small" @click="videoBox=false">取 消</el-button>
      </span>
    </el-dialog>
    <quill-editor ref="newEditor" :options="editorOption" :disabled="postsonDisabled"
                  style="min-height: 50px; max-width: 1000px;margin-bottom: 100px"
                  v-model="soncontent">
      <div id="toolbar" slot="toolbar">
        <span class="ql-formats"><button type="button" class="ql-bold" title="加粗"></button></span>
        <span class="ql-formats"><button type="button" class="ql-italic" title="斜体"></button></span>
        <span class="ql-formats"><button type="button" class="ql-underline" title="下划线"></button></span>
        <span class="ql-formats"><button type="button" class="ql-strike" title="删除线"></button></span>
        <span class="ql-formats"><button type="button" class="ql-script" value="sub"  title='下标'></button></span>
        <span class="ql-formats"><button type="button" class="ql-script" value="super" title='上标'></button></span>
        <span class="ql-formats"><button type="button" class="ql-header" value="1" title="标题1"></button></span>
        <span class="ql-formats"><button type="button" class="ql-header" value="2" title="标题2"></button></span>
        <span class="ql-formats"><button type="button" class="ql-list" value="ordered" title="有序列表"></button></span>
        <span class="ql-formats"><button type="button" class="ql-list" value="bullet" title="无序列表"></button></span>
        <span class="ql-formats"><button type="button" class="ql-indent" value="-1" title='向左缩进'></button></span>
        <span class="ql-formats"><button type="button" class="ql-indent" value="+1" title='向右缩进'></button></span>
        <!--<span class="ql-formats"><button type="button" class="ql-blockquote" title="引用"></button></span>-->
        <!--<span class="ql-formats"><button type="button" class="ql-code-block" title="代码"></button></span>-->
        <!--<span class="ql-formats"> <button type="button" class="ql-direction" value="rtl"></button></span>-->
        <span class="ql-formats">
          <select class="ql-size" title="字体大小">
            <option value="small"></option>
            <option selected value="Normal"></option>
            <option value="large"></option>
            <option value="huge"></option>
          </select>
        </span>
        <span class="ql-formats">
          <select class="ql-header" title="一级标题字体">
            <option value="1"></option>
            <option value="2"></option>
            <option value="3"></option>
            <option value="4"></option>
            <option value="5"></option>
            <option value="6"></option>
            <option selected="selected" value="Normal"></option>
          </select>
        </span>
        <span class="ql-formats">
          <select class="ql-color" title="字体颜色">
            <option selected="selected"></option>
            <option value="#e60000"></option>
            <option value="#ff9900"></option>
            <option value="#ffff00"></option>
            <option value="#008a00"></option>
            <option value="#0066cc"></option>
            <option value="#9933ff"></option>
            <option value="#ffffff"></option>
            <option value="#facccc"></option>
            <option value="#ffebcc"></option>
            <option value="#ffffcc"></option>
            <option value="#cce8cc"></option>
            <option value="#cce0f5"></option>
            <option value="#ebd6ff"></option>
            <option value="#bbbbbb"></option>
            <option value="#f06666"></option>
            <option value="#ffc266"></option>
            <option value="#ffff66"></option>
            <option value="#66b966"></option>
            <option value="#66a3e0"></option>
            <option value="#c285ff"></option>
            <option value="#888888"></option>
            <option value="#a10000"></option>
            <option value="#b26b00"></option>
            <option value="#b2b200"></option>
            <option value="#006100"></option>
            <option value="#0047b2"></option>
            <option value="#6b24b2"></option>
            <option value="#444444"></option>
            <option value="#5c0000"></option>
            <option value="#663d00"></option>
            <option value="#666600"></option>
            <option value="#003700"></option>
            <option value="#002966"></option>
            <option value="#3d1466"></option>
          </select>
        </span>
        <span class="ql-formats">
          <select class="ql-background" title="背景颜色">
                      <option value="#000000"></option>
                      <option value="#e60000"></option>
                      <option value="#ff9900"></option>
                      <option value="#ffff00"></option>
                      <option value="#008a00"></option>
                      <option value="#0066cc"></option>
                      <option value="#9933ff"></option>
                      <option selected="selected"></option>
                      <option value="#facccc"></option>
                      <option value="#ffebcc"></option>
                      <option value="#ffffcc"></option>
                      <option value="#cce8cc"></option>
                      <option value="#cce0f5"></option>
                      <option value="#ebd6ff"></option>
                      <option value="#bbbbbb"></option>
                      <option value="#f06666"></option>
                      <option value="#ffc266"></option>
                      <option value="#ffff66"></option>
                      <option value="#66b966"></option>
                      <option value="#66a3e0"></option>
                      <option value="#c285ff"></option>
                      <option value="#888888"></option>
                      <option value="#a10000"></option>
                      <option value="#b26b00"></option>
                      <option value="#b2b200"></option>
                      <option value="#006100"></option>
                      <option value="#0047b2"></option>
                      <option value="#6b24b2"></option>
                      <option value="#444444"></option>
                      <option value="#5c0000"></option>
                      <option value="#663d00"></option>
                      <option value="#666600"></option>
                      <option value="#003700"></option>
                      <option value="#002966"></option>
                      <option value="#3d1466"></option>
                    </select>
        </span>
        <span class="ql-formats">
          <select class="ql-font" title="字体">
                    <option selected="selected"></option>
                    <option value="serif"></option>
                    <option value="monospace"></option>
                  </select>
        </span>
        <span class="ql-formats">
          <select class="ql-align"  title="对齐">
                    <option selected="selected"></option>
                    <option value="center"></option>
                    <option value="right"></option>
                    <option value="justify"></option>
                  </select>
        </span>
        <!--<span class="ql-formats">-->
        <!--<button type="button" class="ql-clean"></button>-->
        <!--</span>-->
        <span class="ql-formats">
          <button type="button" class="ql-link"  title="超链接"></button>
        </span>
        <span class="ql-formats">
          <button type="button" @click="imgClick" title="上传图片" :disabled="postsonDisabled">
                    <svg viewBox="0 0 18 18">
                        <rect class="ql-stroke" height="10" width="12" x="3" y="4"></rect>
                        <circle class="ql-fill" cx="6" cy="7" r="1"></circle>
                        <polyline class="ql-even ql-fill" points="5 12 5 11 7 9 8 10 11 7 13 9 13 12 5 12"></polyline>
                    </svg>
           </button>
        </span>
        <span class="ql-formats" style="display: none;">
          <button type="button"  title="上传视频"  @click="videoClick" :disabled="postsonDisabled">
             <img src="./icon_video.png" width="15" height="15"/>
          </button>
        </span>
        <!--<span class="ql-formats">-->
          <!--<button type="button" class="ql-video" title="上传视频" ></button>-->
        <!--</span>-->
      </div>
    </quill-editor>
  </div>
</template>

<script>
  import VueQuillEditor, { Quill } from 'vue-quill-editor'
  import ImageResize from './quill-image-resize/ImageResize.js'
  Quill.register('modules/imageResize', ImageResize)
  export default {
      name: "commonEditor",
      props:{
        postsonContent: {
          type: String,
          default: ''
        },
        postsonDisabled: {
          type: Boolean,
          default: false
        }
      },
      data() {
          return {
            //          富文本编辑器
//        content: undefined,
            editorOption: {
              modules: {
                toolbar: '#toolbar',
                imageResize: {
                  displayStyles: {
                    backgroundColor: 'black',
                    border: 'none',
                    color: 'white'
                  },
                  modules: [ 'Resize', 'DisplaySize' ]
                }
              }
            },
            soncontent:"",
            //插入视频
            videoBox:false,
            videoUrl:"",
            lookvideoUrl:"",
            videoWidth:"420",
            videoHeight:"280",
          }
      },
      methods: {
        //        富文本处理器
        imgClick() {
          /*创建input file 不裁切，自己控制*/
          var input = document.createElement('input');
          input.type = 'file';
          input.name = this.fileName;
          input.accept = 'image/jpeg,image/png,image/jpg,image/gif';
          input.onchange = this.onFileChange;
          input.click();
        },
        onFileChange(e) {
          var fileInput = e.target;
          if (fileInput.files.length === 0) {
            return;
          }
          // const isLt5M = fileInput.files[0].size / 1024 / 1024 < 5;
          // if (!isLt5M) {
          //   this.$message({
          //     showClose: true,
          //     type:'warning',
          //     message:'图片过大！'
          //   })
          if (fileInput.files[0].size > 1024 * 1024 * this.maxSize) {
            this.$message({
              showClose: true,
              type:'warning',
              message:'图片过大！'
            })
            return;
          }
          let vue = this;
          let value=e.target.files[0];
          let formdata = new FormData();
          formdata.append('file', value);
          // 上传图片
          this.$http.post('/common/putPublicImgWithMask', formdata)
            .then(res => {
              if(res.status === 'success'){
                // console.log(res);
                vue.eidtimg= res.data.domain + res.data.path; // 图片的网络路径
                vue.onUploadSuccess(vue, vue.eidtimg)
              }else{

              }
            });
          // todo oss处理
        },
        // 插入图片
        onUploadSuccess: function (vue, url) {
          vue.editor.focus();
          vue.editor.insertEmbed(this.editor.getSelection().index, 'image', url);
        },
        //点击上传视频
        videoClick(){
            this.videoBox=true;
            this.videoUrl="";
            this.lookvideoUrl="";
            this.videoWidth=420;
            this.videoHeight=280;
        },
        //宽高处理
        valueChange(num){
             if(num===1){
                 if(this.videoWidth<=0||this.videoWidth>1920){
                   this.videoWidth="";
                 }
             }else{
               if(this.videoHeight<=0){
                 this.videoHeight="";
               }
             }
        },
        //保存视频
        saveVideo(){
          this.editor.focus();
          let replaceStr='<iframe width='+this.videoWidth+" height="+this.videoHeight+" ";
          this.videoUrl=this.videoUrl.replace(/<iframe /g,replaceStr);
          this.editor.insertEmbed(this.editor.getSelection().index,"video",this.videoUrl);
          this.soncontent=this.insertAideo(this.soncontent);
          // console.log(this.soncontent);
          this.videoBox=false;
        },
        //上传视频---用iframe格式优化
        insertAideo(val) {
          let content = val;
          let regStart1=/src="&lt;iframe/g;
          let regStart2=/src="&lt;embed/g;
          let regStart3=/&quot;/g;
          let regStart4=/&gt;&lt;/g;
          let regStart5=/\/iframe&gt;/g;
          content = content.replace(regStart1, '').replace(regStart2, '').replace(regStart3, '"').replace(regStart4,"").replace(regStart5,"");
          return content;
        },
        lookVideo(val){
          let regStart1 = /<iframe/;
          let content = val;
          content = content.replace(regStart1, '<iframe width=420 height=280 ');
          this.lookvideoUrl=content;
        }
      },
      created: function () {
         this.soncontent=this.postsonContent;
      },
      computed: {
        editor() {
          return this.$refs.newEditor.quill;
        }
      },
      watch: {
        soncontent:function(){
          this.$emit('postfatherContent',this.soncontent)
        },
        postsonContent() {
          this.soncontent = this.postsonContent
        }
      },
      mounted() {

      }
    }
</script>
<style scoped>
  ul.addVideo li{
    margin:10px;
  }
  .lookBox{
    margin-left: 20px;
    width: 420px;
    height: 280px;
    overflow: hidden;
    border:1px solid #f2f2f2;
    background: #f2f2f2;
  }
</style>
