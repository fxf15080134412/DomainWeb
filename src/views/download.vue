<template>
  <div class="downLoad">
    <div class="downLoad-content">
      <img class="img" src="@/assets/download/downloading.png" alt="">
      <div class="tips" v-if="status==='pending'">正在导出数据文件，时间稍长，请耐心等待...</div>
      <div class="tips" v-if="status==='done'">导出数据文件成功，先下载导出文件</div>
      <div class="tips" v-if="status==='fail'">导出数据文件失败，请重新导出</div>
      <div class="done" v-loading="status==='pending'"  element-loading-text="正在导出" element-loading-background="rgba(255, 255, 255, 1)">
        <el-button v-if="status==='done'" type="primary" icon="el-icon-download" ><a :href="fileUrl">下 载 文 件</a></el-button>
        <el-button v-if="status==='fail'" type="primary" @click="close">返回上一页</el-button>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'Download',
    data() {
      return {
        status:'pending',
        fileUrl:''
      }
    },
    created(){
      this.getFile()
      this.interval=setInterval(()=>{
        this.getFile()
      },1000)
    },
    methods: {
      close(){
        this.$router.push({path:this.$route.query.path})
      },
      getFile(){
        exportAccount({file_key:this.$route.query.file_key}).then(response => {
          if(response.data.status==='done' || response.data.status==='fail'){
            clearInterval(this.interval)
            this.fileUrl = response.data.uri
            this.status = response.data.status
          }
        }).catch(err=>{
          clearInterval(this.interval)
          this.status = 'fail'
        });
      }
    }
  }
</script>

<style lang="scss" scoped>
  .downLoad {
    .downLoad-content{
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translateX(-50%) translateY(-50%);
      text-align: center;
      .img{
        margin: 50px auto;
      }
      .tips{
        font-weight: bold;
        font-size: 16px;
        margin-top: 20px;
      }
      .done{
        padding: 50px 0;
        .el-button{
          width: 300px;
        }
      }
      
    }
    
  }
</style>
