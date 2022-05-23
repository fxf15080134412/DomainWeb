<template>
    <div>
      <input class="video-input" type="file" accept="video/*" multiple  name="file" ref="uploadFileVideo" id="uploadFileVideo" @change="changevideo">
      <div id="editor"></div>
    </div>
</template>

<script>
import { upload } from "@/api/user";
import Editor from "wangeditor";
export default {
  name: "Editor",
  props: {
    /* 编辑器的内容 */
    value: {
      type: String,
      default: "",
    },
    /* 高度 */
    height: {
      type: Number,
      default:300,
    }
  },
  data() {
    return {
      Editor:null
    };
  },
  watch: {
    value: {
      handler(val) {
        if(this.Editor){
          this.Editor.txt.html(val)
        }
      },
      immediate: true,
    },
  },
  mounted() {
    this.init();
  },
  methods: {
    init() {
      this.Editor = new Editor('#editor')
      this.Editor.config.height = this.height>200?this.height:200
      this.Editor.create()
      this.Editor.txt.html(this.value)
      this.Editor.config.customUploadImg = function (resultFiles, insertImgFn) {
        // resultFiles 是 input 中选中的文件列表
        // insertImgFn 是获取图片 url 后，插入到编辑器的方法
        // 上传图片，返回结果，将图片插入到编辑器中
        resultFiles.forEach(file => {
          let formData = new FormData()
          formData.append('file',file);
          upload(formData).then(response => {
            insertImgFn(response.data.oss_url)
          }).catch(err=>{});
        });
      }
      //上传视频事件
      document.querySelectorAll('.w-e-menu')[17].onclick=(e)=>{ //childNodes 跟随着菜单栏变化
        this.$refs.uploadFileVideo.click() //触发input的上传
      }
    },
    changevideo(e){//上传视频方法
		//拿到后端返回的视频地址
    //将上传成功的视频地址插入富文本
      let files = this.$refs.uploadFileVideo.files
      for(let i=0;i<files.length;i++){
        let loading = this.$loading({
          target:document.querySelector('.w-e-text-container'),
          text: '上传视频中(共'+files.length+'个视频)...',
          spinner: 'el-icon-loading',
          background: 'rgba(255, 255, 255,1)'
        });
        let formData = new FormData()
        formData.append('file',files[i]);
        upload(formData).then(response => {
          loading.close();
          this.Editor.cmd.do('insertHTML', `<video width="100%" style="max-height:250px;background:#000;" src="${response.data.oss_url}" controls="controls" disablePictureInPicture="true" controlslist="nodownload noremoteplayback"></video>`)
        }).catch(err=>{
          loading.close();
        });
      }
      this.$refs.uploadFileVideo.value = ''
    },
    //获取内容
    getContent(){
      return this.Editor.txt.html().replace(/^\s+|\s+$/g,"")?this.Editor.txt.html():''
    }
  },
};
</script>
<style lang="scss" scoped>
  .video-input{
    opacity: 0;
    width: 0; 
    height: 0;
    cursor: pointer;
    position: absolute;
  }
  //隐藏视频自带的弹出层
  /deep/.w-e-menu{
    &:nth-child(18){
      .w-e-panel-container{
        display: none;
      }
    }
  }
</style>