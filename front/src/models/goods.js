import * as Api from '../services/index';

const initData = {};

export default {
  namespace: 'goods',
  state: {
    ...initData,
  },

  effects: {
    *getList({ payload }, { call, put }) {
      const result = yield call(Api.getGoods, payload);
      const { code } = result;
      if (code === 1) {
        return result;
      }
      return null;
    },
    *addGoods({ payload }, { call, put }) {
      const result = yield call(Api.addGoods, payload);
      const { code } = result;
      if (code === 1) {
        return result;
      }
      return null;
    },
    *updateGoods({ payload }, { call, put }) {
      const result = yield call(Api.updateGoods, payload);
      const { code } = result;
      if (code === 1) {
        return result;
      }
      return null;
    },
    *getGoodByID({ payload }, { call, put }) {
      const result = yield call(Api.getGoodByID, payload);
      const { code } = result;
      if (code === 1) {
        return result;
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
