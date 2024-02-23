import config from '@/config';
import storage from '@/utils/storage';
import constant from '@/utils/constant';
import { login, logout, getInfo } from '@/api/login';
import { getToken, setToken, removeToken } from '@/utils/auth';

const baseUrl = config.baseUrl;

const user = {
  state: {
    token: getToken(),
    name: storage.get(constant.name),
    avatar: storage.get(constant.avatar),
    customerId: storage.get(constant.customerId),
  },

  mutations: {
    SET_TOKEN: (state, token) => {
      state.token = token;
    },
    SET_NAME: (state, name) => {
      state.name = name;
      storage.set(constant.name, name);
    },
    SET_AVATAR: (state, avatar) => {
      state.avatar = avatar;
      storage.set(constant.avatar, avatar);
    },
    SET_CUSTOMER_ID: (state, customerId) => {
      state.customerId = customerId;
      storage.set(constant.customerId, customerId);
    }
  },

  actions: {
    // 登录
    Login({ commit }, userInfo) {
      const account = userInfo.account.trim();
      const password = userInfo.password;
      return new Promise((resolve, reject) => {
        login(account, password).then(res => {
          setToken(res.data);
          commit('SET_TOKEN', res.data);
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },
    // 获取用户信息
    GetInfo({ commit, state }) {
      return new Promise((resolve, reject) => {
        getInfo().then(res => {
          const { name, headers } = res.data;
          commit('SET_NAME', name || '');
          commit('SET_AVATAR', require("@/static/images/avatar.jpg"));
          if (!headers) return;
          const customerId = JSON.parse(headers)[0].tenantId;
          // TODO：调整接口
          commit('SET_CUSTOMER_ID', customerId);
          resolve(res)
        }).catch(error => {
          reject(error)
        })
      })
    },

    // 退出系统
    LogOut({ commit, state }) {
      return new Promise((resolve, reject) => {
        logout(state.token).then(() => {
          commit('SET_TOKEN', '')
          removeToken()
          storage.clean()
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    }
  }
}

export default user
