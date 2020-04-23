import * as Api from '../services/index';

const initData = {};

export default {
  namespace: 'favorite',
  state: {
    ...initData,
  },

  effects: {
    *addFavorite({ payload }, { call, put }) {
      const result = yield call(Api.addFavorite, payload);
      const { code } = result;
      if (code === 1) {
        return result;
      }
      return null;
    },
    *getFavorite({ payload }, { call, put }) {
      const result = yield call(Api.getFavorite, payload);
      const { code } = result;
      if (code === 1) {
        return result;
      }
      return null;
    },
    *updateFavorite({ payload }, { call, put }) {
      const result = yield call(Api.updateFavorite, payload);
      const { code } = result;
      if (code === 1) {
        return result;
      }
      return null;
    },
    *deleteFavorite({ payload }, { call, put }) {
      const result = yield call(Api.deleteFavorite, payload);
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
