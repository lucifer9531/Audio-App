<template>
  <view class="container">
    <view class="example">
      <uni-forms ref="form" :model="user" labelWidth="80px">
        <uni-forms-item label="用户名" name="name">
          <uni-easyinput v-model="user.name" placeholder="请输入昵称" />
        </uni-forms-item>
        <uni-forms-item label="手机号码" name="tel">
          <uni-easyinput v-model="user.tel" placeholder="请输入手机号码" />
        </uni-forms-item>
        <uni-forms-item label="邮箱" name="email">
          <uni-easyinput v-model="user.email" placeholder="请输入邮箱" />
        </uni-forms-item>
      </uni-forms>
      <button type="primary" @click="submit">提交</button>
    </view>
  </view>
</template>

<script>
  import { getUserProfile } from "@/api/system/user"
  import { updateUserProfile } from "@/api/system/user"
  import {getInfo} from "../../../api/login";

  export default {
    data() {
      return {
        user: {
          name: "",
          tel: "",
          email: "",
        },
        rules: {
          name: {
            rules: [{
              required: true,
              errorMessage: '用户名不能为空'
            }]
          },
          tel: {
            rules: [{
              required: true,
              errorMessage: '手机号码不能为空'
            }, {
              pattern: /^1[3|4|5|6|7|8|9][0-9]\d{8}$/,
              errorMessage: '请输入正确的手机号码'
            }]
          },
          email: {
            rules: [{
              required: true,
              errorMessage: '邮箱地址不能为空'
            }, {
              format: 'email',
              errorMessage: '请输入正确的邮箱地址'
            }]
          }
        }
      }
    },

    onLoad() {
      this.getUser();
    },
    onReady() {
      this.$refs.form.setRules(this.rules);
    },
    methods: {
      getUser() {
        getInfo().then(response => {
          this.user = response.data;
        })
      },
      submit() {
        this.$refs.form.validate().then(() => {
          updateUserProfile(this.user).then(() => {
            this.$modal.msgSuccess("修改成功")
          })
        })
      }
    }
  }
</script>

<style lang="scss">
  page {
    background-color: #ffffff;
  }

  .example {
    padding: 15px;
    background-color: #fff;
  }

  .segmented-control {
    margin-bottom: 15px;
  }

  .button-group {
    margin-top: 15px;
    display: flex;
    justify-content: space-around;
  }

  .form-item {
    display: flex;
    align-items: center;
    flex: 1;
  }

  .button {
    display: flex;
    align-items: center;
    height: 35px;
    line-height: 35px;
    margin-left: 10px;
  }
</style>
