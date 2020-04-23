export const mapStateToProps = ({ manager, loading }) => ({
  loading: loading.models.manager,
  list: manager.list,
  totalCount: manager.totalCount,
});

export const mapDispatchToProps = dispatch => ({
  getList(payload) {
    return dispatch({
      type: 'manager/getList',
      payload,
    });
  },
  deleteUser(payload) {
    return dispatch({
      type: 'manager/deleteUser',
      payload,
    });
  },
  save(payload) {
    return dispatch({
      type: 'manager/save',
      payload,
    });
  },
  clearData(payload) {
    return dispatch({
      type: 'manager/clearData',
      payload,
    });
  },
});
