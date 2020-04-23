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
    dispatch({
      type: 'user/register',
      payload,
    });
  },
  autoLogin(payload) {
    dispatch({
      type: 'user/autoLogin',
      payload,
    });
  },
  save(payload) {
    dispatch({
      type: 'user/save',
      payload,
    });
  },
  clearData(payload) {
    dispatch({
      type: 'user/clearData',
      payload,
    });
  },
});
