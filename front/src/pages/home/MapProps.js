export const mapStateToProps = ({ user, goods, loading }) => ({
  loading: loading.models.goods,
  username: user.username,
});

export const mapDispatchToProps = dispatch => ({
  getList(payload) {
    return dispatch({
      type: 'goods/getList',
      payload,
    });
  },
  addGoods(payload) {
    return dispatch({
      type: 'goods/addGoods',
      payload,
    });
  },
  save(payload) {
    return dispatch({
      type: 'goods/save',
      payload,
    });
  },
  clearData(payload) {
    return dispatch({
      type: 'goods/clearData',
      payload,
    });
  },
});
