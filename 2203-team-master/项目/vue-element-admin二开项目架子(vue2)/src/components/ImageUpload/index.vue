<template>
  <div>
    <el-upload
      list-type="picture-card"
      :file-list="fileList"
      :on-preview="preview"
      :on-remove="handleRemove"
      :on-change="handleChange"
      :before-upload="beforeUpload"
      :http-request="upload"
      action="#"
      :class="{ disabled: fileCompleted}"
    >
      <i class="el-icon-picture-outline" />
    </el-upload>
    <el-progress v-show="showPercent" :percentage="percent" style="width:200px" />
    <el-dialog title="预览图片" :visible.sync="showDialog">
      <img
        style="width:100%"
        :src="imgUrl"
        alt=""
      >
    </el-dialog>
  </div>
</template>

<script>
import COS from 'cos-js-sdk-v5'
export default {
  props: {
    limit: {
      type: Number,
      default: 1
    }
  },
  data() {
    return {
      fileList: [],
      showDialog: false,
      imgUrl: '', // 用来记录 弹层中的图片地址
      showPercent: false,
      percent: 0
    }
  },
  computed: {
    // 一个变量 判断是否已经传到最大了 判断还能不能继续上传图片
    // true 表示不能再传
    // false 还可以再传
    fileCompleted() {
      return this.fileList.length >= this.limit
    }
  },
  methods: {
    preview(file) {
      this.imgUrl = file.url // 点哪个图片就赋值哪个图片的地址
      this.showDialog = true
    },
    handleRemove(file) {
      // file.uid 是唯一的标识
      // splice
      // filter
      // const index = this.fileList.findIndex(item => item.uid === file.uid)
      // this.fileList.splice(index, 1)
      this.fileList = this.fileList.filter(item => item.uid !== file.uid)
    },
    // 上传成功 上传失败 添加文件
    handleChange(file, fileList) {
      // 传进来的fileList 和this.fileList没有关系
      // this.fileList = fileList.map(item => item)
      this.fileList = [...fileList]
    },
    beforeUpload(file) {
      // 检查文件类型和大小
      const types = ['image/png', 'image/jpg', 'image/jpeg', 'image/gif']
      if (!types.includes(file.type)) {
        this.$message.error('文件格式仅限于png、jpeg 、jpg 、gif')
        return false
      }
      const maxSize = 5 * 1024 * 1024
      if (file.size >= maxSize) {
        this.$message.error('图片的大小上限为5M')
        return false
      }
      return true
    },
    upload(params) {
      if (params.file) {
        this.showPercent = true // 显示进度条
        var cos = new COS({
          SecretId: 'AKIDPbaaPzKPGrDKCpCJCpDMK3WjgOq2yg8L', // 身份识别 ID
          SecretKey: 'yiDSSChxxiEVWHn45qLceQxEG4cvznLe' // 身份密钥
        })
        // cos就可以实现上传操作了
        cos.putObject({
          Bucket: 'shuiruohanyu2-1302806742', // 存储桶
          Region: 'ap-chengdu', // 地域
          Key: params.file.name, // 文件名
          Body: params.file, // 要上传的文件对象
          StorageClass: 'STANDARD', // 上传的模式类型 直接默认 标准模式即可
          onProgress: (params) => {
            this.percent = params.percent * 100
          }
        }, (err, data) => {
          // err 有错误 就有值
          console.log(data.Location)
          if (!err && data.statusCode === 200) {
            // 认为上传成功
            // params.file.uid 是唯一的
            this.fileList = this.fileList.map(item => {
              if (item.uid === params.file.uid) {
                return { ...item, url: 'http://' + data.Location, status: 'success' }
              }
              return item
            })
            setTimeout(() => {
              this.showPercent = false
              this.percent = 0
            }, 1000)

            // data.Location // 一个值
            // FileList是个数组
          }
        })
      }
    }
  }

}
</script>

<style>
.disabled .el-upload--picture-card {
  display: none
}
</style>
