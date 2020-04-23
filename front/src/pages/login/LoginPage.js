import React from 'react';
import BannerLayout from 'components/BannerLayout';
import { Form, Input, Icon, Button } from 'antd';
import router from 'umi/router';
import { connect } from 'dva';
import { mapStateToProps, mapDispatchToProps } from './MapProps';
import styles from './LoginPage.less';

class LoginPage extends React.Component {
  state = { loading: false };

  hanldeSubmit = e => {
    const { form } = this.props;
    e.preventDefault();
    form.validateFields((err, values) => {
      if (err) return;
      const { login } = this.props;

      login(values).then(resp => {
        if (resp) {
          router.push('/home');
        }
      });
    });
  };

  toRegister = () => {
    router.push('/register');
  };

  toHomePage = () => {
    router.push('/home');
  };

  render() {
    const { form } = this.props;
    const { loading } = this.state;
    const { getFieldDecorator } = form;

    return (
      <BannerLayout>
        <div className={styles.root}>
          <h4 className={styles.title}>Welcome to MyStuff.</h4>
          <div className={styles.form}>
            <Form onSubmit={this.hanldeSubmit}>
              <Form.Item>
                {getFieldDecorator('username', {
                  rules: [{ required: true, message: 'input account number!' }],
                })(
                  <Input
                    prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                    placeholder="input account number"
                  />,
                )}
              </Form.Item>
              <Form.Item>
                {getFieldDecorator('password', {
                  rules: [{ required: true, message: 'input password!' }],
                })(
                  <Input.Password
                    prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                    type="password"
                    placeholder="input password"
                  />,
                )}
              </Form.Item>
              {/* <Button type="link">forget password？</Button> */}
              <Form.Item>
                <Button type="primary" htmlType="submit" loading={loading} block>
                  login
                </Button>
                <Button block onClick={this.toRegister}>
                  register
                </Button>
                <Button type="link" block onClick={this.toHomePage}>
                  tourists mode
                </Button>
              </Form.Item>
            </Form>
          </div>
        </div>
      </BannerLayout>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Form.create()(LoginPage));
