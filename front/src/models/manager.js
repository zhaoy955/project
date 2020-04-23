import { message } from 'antd';
import * as Api from '../services/index';

const initData = {
  list: [], // 数据
  pageNum: 1,
  pageSize: 10,
};

export default {
  namespace: 'manager',
  state: {
    ...initData,
  },

  effects: {
    *getList({ payload }, { call, put }) {
      const result = yield call(Api.getUsers, payload);
      const { data, code, count } = result;
      if (code === 1) {
        yield put({
          type: 'update',
          payload: {
            list: data || [],
            totalCount: count,
          },
        });
      }
      return result;
    },
    *deleteUser({ payload }, { call, put }) {
      const resp = yield call(Api.deleteUser, payload);
      const { code, message: msg } = resp;
      if (code === 1) {
        message.success(msg);
        return resp;
      }
      return null;
    },
  },
  reducers: {
    update: (state, { payload }) => ({
      ...state,
      ...payload,
    }),
    clearData: () => ({ ...initData }),
  },
};
