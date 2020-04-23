import React from 'react';
import BannerLayout from 'components/BannerLayout';
import { Form, Input, Icon, Button, Select } from 'antd';
import Uploader from 'components/Uploader';
import router from 'umi/router';
import { connect } from 'dva';
import { mapStateToProps, mapDispatchToProps } from './MapProps';
import styles from './Register.less';

const { Option } = Select;

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 8 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 16 },
  },
};

class Register extends React.Component {
  state = { loading: false };

  hanldeSubmit = e => {
    const { form } = this.props;
    e.preventDefault();
    form.validateFields((err, values) => {
      if (err) return;
      const { register } = this.props;
      register(values).then(resp => {
        if (resp) {
          router.push('/home');
        }
      });
    });
  };

  validateToNextPassword = (rule, value, callback) => {
    const { form } = this.props;
    if (value) {
      const { getFieldValue } = form;
      const password = getFieldValue('password');

      if (value === password) callback();
      else {
        callback('两次输入密码不一致');
      }
    }
    callback();
  };

  render() {
    const { form } = this.props;
    const { loading } = this.state;
    const { getFieldDecorator } = form;

    return (
      <BannerLayout>
        <div className={styles.root}>
          <h4 className={styles.title}>register</h4>
          <div className={styles.form}>
            <Form onSubmit={this.hanldeSubmit} {...formItemLayout}>
              <Form.Item label="photo">
                {getFieldDecorator('profile', {
                  rules: [{ required: true, message: '请上传用户头像' }],
                })(
                  <Uploader
                    tips="支持bmp, jpeg, jpg格式"
                    formats={['image/jpg', 'image/x-ms-bmp', 'image/png', 'image/jpeg']}
                  />,
                )}
              </Form.Item>
              <Form.Item label="phone number">
                {getFieldDecorator('phone', {
                  rules: [{ required: true, message: 'input phone number' }],
                })(
                  <Input
                    prefix={<Icon type="phone" style={{ color: 'rgba(0,0,0,.25)' }} />}
                    placeholder="请输入用户电话"
                  />,
                )}
              </Form.Item>
              <Form.Item label="account number">
                {getFieldDecorator('username', {
                  rules: [{ required: true, message: '请输入用户账号!' }],
                })(
                  <Input
                    prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                    placeholder="请输入用户账号"
                  />,
                )}
              </Form.Item>
              <Form.Item label="password">
                {getFieldDecorator('password', {
                  rules: [{ required: true, message: '请输入密码!' }],
                })(
                  <Input.Password
                    prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                    type="password"
                    placeholder="请输入密码"
                  />,
                )}
              </Form.Item>
              <Form.Item label="input password again">
                {getFieldDecorator('password1', {
                  rules: [
                    { required: true, message: '请输入再次确认密码!' },
                    {
                      validator: this.validateToNextPassword,
                    },
                  ],
                })(
                  <Input.Password
                    prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                    type="password"
                    placeholder="请输入再次确认密码"
                  />,
                )}
              </Form.Item>
              <Form.Item label="address">
                {getFieldDecorator('address', {
                  rules: [],
                })(<Input placeholder="用户地址(可选）" />)}
              </Form.Item>

              <Form.Item label="account type">
                {getFieldDecorator('role', {
                  initialValue: 'user',
                  rules: [{ required: true, message: '请输入账号类型' }],
                })(
                  <Select style={{ width: 120 }}>
                    <Option value="user">normal</Option>
                    <Option value="admin">admin</Option>
                  </Select>,
                )}
              </Form.Item>
              <div className={styles.btns}>
                <Button onClick={() => router.push('/login')}>back</Button>
                <Button type="primary" htmlType="submit" loading={loading}>
                  register
                </Button>
              </div>
            </Form>
          </div>
        </div>
      </BannerLayout>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Form.create()(Register));
