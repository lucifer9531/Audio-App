<template>
  <view class="container">
    <uni-list>
      <uni-list-item showExtraIcon="true" :extraIcon="{type: 'person-filled'}" title="用户名" :rightText="user.name" />
      <uni-list-item showExtraIcon="true" :extraIcon="{type: 'phone-filled'}" title="手机号码" :rightText="user.tel" />
      <uni-list-item showExtraIcon="true" :extraIcon="{type: 'email-filled'}" title="邮箱" :rightText="user.email" />
      <uni-list-item showExtraIcon="true" :extraIcon="{type: 'calendar-filled'}" title="创建日期" :rightText="user.createdTime" />
    </uni-list>
  </view>
</template>

<script>
  import {getInfo} from "../../../api/login";

  export default {
    data() {
      return {
        user: {},
      }
    },
    onLoad() {
      this.getUser()
    },
    methods: {
      getUser() {
        getInfo().then(response => {
          this.user = response.data;
        })
      }
    }
  }
</script>

<style lang="scss">
  page {
    background-color: #ffffff;
  }
</style>
