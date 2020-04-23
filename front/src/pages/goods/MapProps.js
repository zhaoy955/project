export const mapStateToProps = ({ user, goods, loading }) => ({
  loading: loading.models.goods,
  username: user.username,
});

export const mapDispatchToProps = dispatch => ({
  getGoodByID(payload) {
    return dispatch({
      type: 'goods/getGoodByID',
      payload,
    });
  },
  addFavorite(payload) {
    return dispatch({
      type: 'favorite/addFavorite',
      payload,
    });
  },
  updateFavorite(payload) {
    return dispatch({
      type: 'favorite/updateFavorite',
      payload,
    });
  },
  getCommentList(payload) {
    return dispatch({
      type: 'comment/getList',
      payload,
    });
  },
  addComment(payload) {
    return dispatch({
      type: 'comment/addComment',
      payload,
    });
  },
  updateComment(payload) {
    return dispatch({
      type: 'comment/updateComment',
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
