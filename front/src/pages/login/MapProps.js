export const mapStateToProps = ({ user, loading }) => ({
  loading: loading.models.user,
  profile: user.profile,
  phone: user.phone,
  address: user.address,
  username: user.username,
  role: user.role,
});

export const mapDispatchToProps = dispatch => ({
  register(payload) {
    return dispatch({
      type: 'user/register',
      payload,
    });
  },
  login(payload) {
    return dispatch({
      type: 'user/login',
      payload,
    });
  },
  save(payload) {
    return dispatch({
      type: 'user/save',
      payload,
    });
  },
  clearData(payload) {
    return dispatch({
      type: 'user/clearData',
      payload,
    });
  },
});
