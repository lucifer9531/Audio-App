<template>
  <view class="normal-login-container">
    <view class="logo-content align-center justify-center flex">
      <image style="width: 100rpx;height: 100rpx;" :src="globalConfig.appInfo.logo" mode="widthFix">
      </image>
      <text class="title">登录</text>
    </view>
    <view class="login-form-content">
      <view class="input-item flex align-center">
        <view class="iconfont icon-user icon"></view>
        <input v-model="loginForm.account" class="input" type="text" placeholder="请输入账号" maxlength="30" />
      </view>
      <view class="input-item flex align-center">
        <view class="iconfont icon-password icon"></view>
        <input v-model="loginForm.password" type="password" class="input" placeholder="请输入密码" maxlength="20" />
      </view>
      <view class="action-btn">
        <button @click="handleLogin" :loading="loading" class="login-btn cu-btn block bg-blue lg round">{{ loading ? '登 录 中...' : '登 录' }}</button>
      </view>
    </view>
  </view>
</template>

<script>
  export default {
    data() {
      return {
        globalConfig: getApp().globalData.config,
        loading: false,
        loginForm: {
          account: "13333333333",
          password: "123456",
        }
      }
    },
    methods: {
      async handleLogin() {
        if (!this.loginForm.account) {
          this.$modal.msgError("请输入您的账号");
        } else if (!this.loginForm.password) {
          this.$modal.msgError("请输入您的密码");
        } else {
          await this.pwdLogin();
        }
      },
      async pwdLogin() {
        this.loading = true;
        this.$store.dispatch('Login', this.loginForm).then(() => {
          this.loginSuccess();
        }).catch(() => {
          this.$modal.msgError("账号或密码错误");
        }).finally(() => {
          this.loading = false;
        })
      },
      loginSuccess() {
        this.$store.dispatch('GetInfo').then(() => {
          this.$tab.reLaunch('/pages/index');
        })
      }
    }
  }
</script>

<style lang="scss">
  page {
    background-color: #ffffff;
  }

  .normal-login-container {
    width: 100%;

    .logo-content {
      width: 100%;
      font-size: 21px;
      text-align: center;
      padding-top: 15%;

      image {
        border-radius: 4px;
      }

      .title {
        margin-left: 10px;
      }
    }

    .login-form-content {
      text-align: center;
      margin: 20px auto;
      margin-top: 15%;
      width: 80%;

      .input-item {
        margin: 20px auto;
        background-color: #f5f6f7;
        height: 45px;
        border-radius: 20px;

        .icon {
          font-size: 38rpx;
          margin-left: 10px;
          color: #999;
        }

        .input {
          width: 100%;
          font-size: 14px;
          line-height: 20px;
          text-align: left;
          padding-left: 15px;
        }

      }

      .login-btn {
        margin-top: 40px;
        height: 45px;
      }
    }
  }

</style>
