<template>
  <div
    class="add-article"
    v-loading="loading"
    element-loading-text="文章发布中..."
  >
    <el-form
      ref="publishForm"
      label-position="top"
      :rules="rules"
      :model="formData"
    >
      <el-form-item label="文章标题" prop="title">
        <el-input v-model="formData.title"></el-input>
      </el-form-item>
      <el-form-item label="上传图片" prop="img">
        <el-upload
          action="#"
          list-type="picture-card"
          :auto-upload="false"
          :multiple="false"
          :on-change="uploadImg"
          :file-list="fileList"
        >
          <template #default>
            <el-icon><plus /></el-icon>
          </template>
          <template #file="{ file }">
            <div>
              <img
                class="el-upload-list__item-thumbnail"
                :src="file.url"
                alt=""
              />
              <span class="el-upload-list__item-actions">
                <span
                  v-if="!disabled"
                  class="el-upload-list__item-delete"
                  @click="handleRemove(file)"
                >
                  <el-icon><delete /></el-icon>
                </span>
              </span>
            </div>
          </template>
        </el-upload>
      </el-form-item>
      <el-form-item label="文章描述" prop="explain">
        <el-input v-model="formData.explain"></el-input>
      </el-form-item>
      <el-form-item label="文章内容" prop="content">
        <editor
          id="tinymce"
          v-model="formData.content"
          :init="editorInit"
        ></editor>
      </el-form-item>
    </el-form>
    <el-dialog v-model="dialogVisible">
      <img width="100%" :src="formData.img" alt="" />
    </el-dialog>
    <el-button type="primary" @click="publishArticle(publishForm)" plain
      >发布文章</el-button
    >
  </div>
</template>
<script lang="ts" setup>
import { reactive, ref, onMounted, computed } from "vue";
import { Plus, Delete } from "@element-plus/icons-vue";
import type { ElForm } from "element-plus";

//vue3 中使用富文本插件 tinymce  https://blog.csdn.net/weixin_47180815/article/details/121748486    或者 vue3使用wangeditor富文本编辑器(简单些) https://blog.csdn.net/m0_46627407/article/details/126612738

import tinymce from "tinymce/tinymce";
import "tinymce/themes/silver/theme";
import Editor from "@tinymce/tinymce-vue";
import "tinymce/icons/default/icons";
import "tinymce/plugins/image";
import "tinymce/plugins/link";
import "tinymce/plugins/code";
import "tinymce/plugins/table";
import "tinymce/plugins/lists";
import "tinymce/plugins/contextmenu";
import "tinymce/plugins/wordcount";
import "tinymce/plugins/colorpicker";
import "tinymce/plugins/textcolor";
import { uploadFile, addArticle } from "../utils/api";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
const router = useRouter();
const store = useStore();
const userlist = computed(() => store.state.user);
// console.log(userlist);

type FormInstance = InstanceType<typeof ElForm>;
const publishForm = ref<FormInstance>();
const loading = ref(false);
const formData = reactive({
  title: "",
  img: "",
  explain: "",
  content: "",
  image: "",
});
const rules = {
  title: [{ required: true, message: "文章标题不能为空", trigger: "blur" }],
  explain: [{ required: true, message: "文章描述不能为空", trigger: "blur" }],
  content: [{ required: true, message: "文章内容不能为空", trigger: "blur" }],
};
const editorInit = reactive({
  skin_url: "tinymce/skins/ui/oxide",
  content_css: "tinymce/skins/content/default/content.css",
  height: 300,
  plugins: "link lists image code table wordcount",
  toolbar:
    "bold italic underline strikethrough | fontsizeselect | forecolor backcolor | alignleft aligncenter alignright alignjustify | bullist numlist | outdent indent blockquote | undo redo | link unlink image code | removeformat",
  branding: false,
  menubar: false,
  images_upload_handler: (blobInfo: any, success: any) => {
    const file = blobInfo.blob();

    const files = new window.File([file], file.name, { type: file.type });
    const formDataUp = new FormData();
    formDataUp.append("file", files);
    // console.log(files);

    upLoad.value = "none";
    let img = "";
    uploadFile(formDataUp).then((res) => {
      img = "http://8.141.145.150:3000" + res.data.url;
      success(img);
    });
  },
});
onMounted(() => {
  tinymce.init({});
});
const fileList = ref([]);
const dialogVisible = ref(false);
const disabled = ref(false);
const upLoad = ref("inline-block");
const handleRemove = () => {
  // console.log(fileList, file)
  fileList.value = [];
  upLoad.value = "inline-block";
  formData.img = "";
};
//图片上传
const uploadImg = (file: any) => {
  if (file) {
    let formDataUp = new FormData();
    formDataUp.append("file", file.raw);
    console.log(file.raw);
    upLoad.value = "none";
    uploadFile(formDataUp).then((res) => {
      formData.image = res.data._id;

      formData.img = "" + res.data.url;
    });
  }
};
const publishArticle = (form: FormInstance | undefined) => {
  if (form) {
    form.validate((valid) => {
      loading.value = true;
      if (valid) {
        let form = {};
        if (formData.image == "") {
          //  不这样写 上穿会出现   image:""    这样上传就不会成功
          form = {
            // 上传信息
            title: formData.title,
            content: formData.content,

            // // 照片ID 没有不行
            // image: formData.image,

            // 用户信息
            author: userlist.value._id,
            column: userlist.value.column,
          };
        } else {
          form = {
            // 上传信息
            title: formData.title,
            content: formData.content,
            // // 照片ID 没有不行
            image: formData.image,
            // 用户信息
            author: userlist.value._id,
            column: userlist.value.column,
          };
        }

        // console.log(form);

        addArticle(form).then((res) => {
          if (res.msg === "请求成功") {
            // fileList.value = [];
            formData.title = "";
            // formData.img = "";
            // formData.explain = "";
            formData.content = "";
            // upLoad.value = "inline-block";
            loading.value = false;
            setTimeout(() => {
              router.push(`/column?author=${userlist.value.column}`);
            }, 1000);
          }
        });
      }
    });
  }
};
</script>
<style lang="scss" scoped>
.add-article {
  width: 600px;
  margin: 0 auto;
}
:deep(.el-upload) {
  display: v-bind(upLoad);
}
</style>
