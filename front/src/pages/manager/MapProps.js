export const mapStateToProps = ({ user, goods, loading }) => ({
  loading: loading.models.goods,
  username: user.username,
});

export const mapDispatchToProps = dispatch => ({
  getGoods(payload) {
    return dispatch({
      type: 'goods/getList',
      payload,
    });
  },
  getFavorite(payload) {
    return dispatch({
      type: 'favorite/getFavorite',
      payload,
    });
  },
  updateFavorite(payload) {
    return dispatch({
      type: 'favorite/updateFavorite',
      payload,
    });
  },
  updateGoods(payload) {
    return dispatch({
      type: 'goods/updateGoods',
      payload,
    });
  },
  deleteFavorite(payload) {
    return dispatch({
      type: 'favorite/deleteFavorite',
      payload,
    });
  },
  getCommentList(payload) {
    return dispatch({
      type: 'comment/getList',
      payload,
    });
  },
  delComment(payload) {
    return dispatch({
      type: 'comment/delComment',
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
