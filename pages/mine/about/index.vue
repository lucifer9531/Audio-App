<template>
  <view class="about-container">
    <view class="header-section text-center">
      <image style="width: 150rpx;height: 150rpx;" src="/static/logo.jpg" mode="widthFix">
      </image>
      <uni-title type="h2" title="AI喇叭移动端"></uni-title>
    </view>

    <view class="content-section">
      <view class="menu-list">
        <view class="list-cell list-cell-arrow">
          <view class="menu-item-box">
            <view>版本信息</view>
            <view class="text-right">v{{version}}</view>
          </view>
        </view>
        <view class="list-cell list-cell-arrow">
          <view class="menu-item-box">
            <view>服务热线</view>
            <view class="text-right">189-5196-7707</view>
          </view>
        </view>
        <view class="list-cell list-cell-arrow">
          <view class="menu-item-box">
            <view>企业理念</view>
            <view class="text-right">让AI更接地气！</view>
          </view>
        </view>
        <!-- <view class="list-cell list-cell-arrow">
          <view class="menu-item-box">
            <view>公司网站</view>
            <view class="text-right">
              <uni-link :href="url" :text="url" showUnderLine="false"></uni-link>
            </view>
          </view>
        </view> -->
      </view>
    </view>

    <view class="copyright">
      <view>Copyright &copy; 2024 Mixr All Rights Reserved.</view>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      url: getApp().globalData.config.appInfo.site_url,
      version: getApp().globalData.config.appInfo.version
    }
  }
}
</script>

<style lang="scss">
page {
  background-color: #f8f8f8;
}

.copyright {
  margin-top: 50rpx;
  text-align: center;
  line-height: 60rpx;
  color: #999;
}

.header-section {
  display: flex;
  padding: 30rpx 0 0;
  flex-direction: column;
  align-items: center;
}
</style>
