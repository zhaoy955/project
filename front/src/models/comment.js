import * as Api from '../services/index';

const initData = {};

export default {
  namespace: 'comment',
  state: {
    ...initData,
  },

  effects: {
    *getList({ payload }, { call, put }) {
      const result = yield call(Api.getCommentList, payload);
      const { code } = result;
      if (code === 1) {
        return result;
      }
      return null;
    },
    *addComment({ payload }, { call, put }) {
      const result = yield call(Api.addComment, payload);
      const { code } = result;
      if (code === 1) {
        return result;
      }
      return null;
    },
    *delComment({ payload }, { call, put }) {
      const result = yield call(Api.delComment, payload);
      const { code } = result;
      if (code === 1) {
        return result;
      }
      return null;
    },
    *updateComment({ payload }, { call, put }) {
      const result = yield call(Api.updateComment, payload);
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
