<template>
  <div class="app-container" >
    <el-form ref="form" :model="form" label-width="120px" v-loading="isLoading">
      <el-form-item label="Document Hash">
        <el-input v-model="form.doc_hash" />
      </el-form-item>
      <el-form-item label="Private Key">
        <el-input v-model="form.private_key" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">Sign</el-button>
        <el-button @click="onCancel">Cancel</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>

import {signDoc} from "@/api/sign";
import {Message} from "element-ui";

export default {
  data() {
    return {
      isLoading: false,
      form: {
        private_key: "",
        doc_hash: "" || this.$route.query.doc_hash
      }
    }
  },
  //  mounted() {
  //   UploadService.getFiles().then(response => {
  //     this.fileInfos = response.data;
  //   });
  // },
  methods: {
    onSubmit() {
      this.isLoading = true
      console.log(this.form)
      signDoc(this.form).then(response => {
        this.resp = response.data
        console.log(this.resp)
        Message({
            message: 'Document ' + response.doc_name + " signed!",
            type: 'success',
            duration: 5 * 500
          })
        this.form.private_key = ""
        this.form.doc_hash = ""
        this.isLoading = false
      })
    },
    onCancel() {
      this.$message({
        message: 'cancel!',
        type: 'warning'
      })
    }
  }
}
</script>

<style>
.line{
  text-align: center;
}
</style>
<style lang="scss" scoped>
$bg:#2d3a4b;
$dark_gray:#889aa4;
$light_gray:#eee;

.login-container {
  min-height: 100%;
  width: 100%;
  background-color: $bg;
  overflow: hidden;

  .login-form {
    position: relative;
    width: 520px;
    max-width: 100%;
    padding: 160px 35px 0;
    margin: 0 auto;
    overflow: hidden;
  }

  .tips {
    font-size: 14px;
    color: #fff;
    margin-bottom: 10px;

    span {
      &:first-of-type {
        margin-right: 16px;
      }
    }
  }

  .svg-container {
    padding: 6px 5px 6px 15px;
    color: $dark_gray;
    vertical-align: middle;
    width: 30px;
    display: inline-block;
  }

  .title-container {
    position: relative;

    .title {
      font-size: 26px;
      color: $light_gray;
      margin: 0px auto 40px auto;
      text-align: center;
      font-weight: bold;
    }
  }

  .show-pwd {
    position: absolute;
    right: 10px;
    top: 7px;
    font-size: 16px;
    color: $dark_gray;
    cursor: pointer;
    user-select: none;
  }
}
</style>


