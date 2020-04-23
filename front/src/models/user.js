import { message } from 'antd';
import cookie from 'react-cookies';
import * as Api from 'services/index';

const initData = {
  profile: '',
  phone: '',
  address: '',
  username: '',
  role: '',
};

export default {
  namespace: 'user',
  state: initData,
  effects: {
    *login({ payload }, { call, put }) {
      const resp = yield call(Api.login, payload);
      const { data, code, message: msg } = resp;
      if (code === 1) {
        const { profile, phone, address, username, role } = data;
        yield put({
          type: 'save',
          payload: {
            profile,
            phone,
            address,
            username,
            role,
          },
        });
        return resp;
      } else {
        message.error(msg);
        return null;
      }
    },
    *autoLogin({ payload }, { call, put }) {
      const resp = yield call(Api.autoLogin, payload);
      const { data, code } = resp;
      if (code === 1) {
        const { profile, phone, address, username, role } = data;
        yield put({
          type: 'save',
          payload: {
            profile,
            phone,
            address,
            username,
            role,
          },
        });
      }
    },   
    *register({ payload }, { call, put }) {
      const resp = yield call(Api.register, payload);
      const { data, code, message: msg } = resp;
      if (code === 1) {
        const { profile, phone, address, username, role } = data;
        yield put({
          type: 'save',
          payload: {
            profile,
            phone,
            address,
            username,
            role,
          },
        });
        return resp;
      } else {
        message.error(msg);
        return null;
      }
    },
  },
  reducers: {
    save: (state, { payload }) => ({
      ...state,
      ...payload,
    }),
    clearData: () => {
      cookie.remove('uid');
      return { ...initData };
    },
  },
};
