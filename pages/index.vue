<template>
  <view class="home-container" :style="{height: `${windowHeight}px`}">
    <view class="header-section">
      <view class="flex padding justify-between">
        <view class="flex align-center">
          <image :src="avatar" class="cu-avatar xl round" mode="widthFix"/>
          <view class="user-info">
            <view class="u_title">
              {{ name }}
            </view>
          </view>
        </view>
      </view>
    </view>
    <uni-section title="连接管理" type="line"></uni-section>
    <view class="content-section">
      <view class="menu-list">
        <view class="list-cell list-cell-arrow">
          <view class="menu-item-box">
            <view>连接状态</view>
            <view class="text-right">{{ connectionStatus }}</view>
          </view>
        </view>
        <view class="list-cell list-cell-arrow">
          <view class="menu-item-box">
            <view>连接控制</view>
            <view class="text-right">
              <switch :checked="connectionControl" @change="handleConnectionControlChange"></switch>
            </view>
          </view>
        </view>
      </view>
    </view>
    <uni-section title="播报管理" type="line"></uni-section>
    <view class="content-section">
      <view class="menu-list">
        <view class="list-cell list-cell-arrow">
          <view class="menu-item-box">
            <view>状态</view>
            <view class="text-right">{{ broadcastingStatus }}</view>
          </view>
        </view>
        <view class="list-cell list-cell-arrow">
          <view class="menu-item-box">
            <view style="width: 25%;">内容</view>
            <view class="text-right">{{ broadcastingContent }}</view>
          </view>
        </view>
        <view class="list-cell list-cell-arrow">
          <view class="menu-item-box">
            <view>已播报数</view>
            <view class="text-right">{{ broadcastingTotal }}条</view>
          </view>
        </view>
      </view>
    </view>
    <uni-section title="背景音乐管理" type="line"></uni-section>
    <view class="content-section">
      <view class="menu-list">
        <view class="list-cell list-cell-arrow">
          <view class="menu-item-box">
            <view>背景音乐控制</view>
            <view class="text-right">
              <switch :checked="backgroundMusicPaused" @change="handleBgmPausedChange"></switch>
            </view>
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<script>

import wsEnum from "../enums/wsEnum";
import videoEnum from "../enums/videoEnum";
import { wsUrl, baseUrl } from "../config";
export default {
  data() {
    return {
      name: this.$store.state.user.name,
      connectionControl: false,
      connectionStatus: wsEnum.NOT_CONNECTED,
      broadcastingStatus: "",
      broadcastingContent: "",
      broadcastingTotal: 0,
      backgroundMusicPaused: false,
      audioSrc: '',
      audio: null,
      bgAudio: null,
      websocket: null,
    }
  },
  computed: {
    avatar() {
      return this.$store.state.user.avatar;
    },
    customerId() {
      return this.$store.state.user.customerId;
    },
    windowHeight() {
      return uni.getSystemInfoSync().windowHeight - 50
    }
  },
  methods: {
    createWs() {
      this.websocket = uni.connectSocket({
        url: wsUrl + this.customerId,
        complete: ()=> {},
      });
      this.websocket.onOpen(() => {
        this.connectionStatus = wsEnum.CONNECTED;
        this.broadcastingStatus = videoEnum.WAITING;
      });
      this.websocket.onMessage((res) => {
        if (!res.data) return;
        const { soundPath, soundText } = JSON.parse(res.data);
        this.broadcastingStatus = videoEnum.PLAYING;
        this.playAudio(baseUrl + '/api/as' + soundPath);
        this.broadcastingContent = soundText;
      });
    },
    closeWs() {
      if (this.websocket) {
        this.websocket.close();
        this.connectionStatus = wsEnum.NOT_CONNECTED;
        this.broadcastingStatus = videoEnum.WAITING;
        this.broadcastingContent = '';
      }
    },
    destroyAllControllers() {
      this.closeWs();
      this.closeAudio();
      this.closeBgMusicPlayer();
    },
    handleConnectionControlChange(checked) {
      const isChecked = checked.target.value || checked.detail.value;
      this.connectionControl = isChecked;
      if (isChecked) this.createWs();
      else this.destroyAllControllers();
    },
    handleBgmPausedChange(checked) {
      this.backgroundMusicPaused = checked.target.value || checked.detail.value;
      if (this.backgroundMusicPaused) this.createBgMusicPlayer(baseUrl + '/api/as/static/file/bgm.mp3');
      else this.closeBgMusicPlayer();
    },
    createBgMusicPlayer(audioUrl) {
      if (!this.bgAudio) this.bgAudio = uni.createInnerAudioContext();
      this.bgAudio.src = audioUrl;
      this.bgAudio.loop = true;
      this.bgAudio.onPlay(() => {
        if (this.audio && !this.audio.paused) this.bgAudio.pause();
      })
      this.bgAudio.play();
    },
    closeBgMusicPlayer() {
      if (this.bgAudio) {
        this.bgAudio.stop();
        this.bgAudio.destroy();
      }
    },
    playAudio(audioUrl) {
      if (!this.audio) this.audio = uni.createInnerAudioContext();
      this.audio.src = audioUrl;
      this.audio.onPlay(() => {
        if (this.bgAudio && !this.bgAudio.paused) this.bgAudio.pause();
      })
      this.audio.onEnded(() => {
        this.broadcastingStatus = videoEnum.WAITING;
        this.closeAudio();
        this.broadcastingTotal += 1;
        if (this.bgAudio && this.bgAudio.paused) this.bgAudio.play();
        this.websocket.send({
          data: 'playFinish'
        });
      });
      this.audio.play();
    },
    closeAudio() {
      if (this.audio) {
        this.audio.stop();
        this.audio.destroy();
        this.audio = null;
      }
    }
  },
  //
  beforeDestroy() {
    this.destroyAllControllers();
  }
}
</script>

<style lang="scss">
page {
  background-color: #f5f6f7;
}

.home-container {
  width: 100%;
  height: 100%;


  .header-section {
    background-color: #0090ff;
    color: white;
    margin-bottom: 40rpx;

    .cu-avatar {
      border: 2px solid #eaeaea;
    }

    .user-info {
      margin-left: 15px;

      .u_title {
        font-size: 18px;
        line-height: 30px;
      }
    }
  }
}
</style>
