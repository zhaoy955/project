import React from 'react';
import { Form, Input, Icon, Button } from 'antd';

class FilterBox extends React.Component {
  state = { loading: false };

  hanldeSubmit = e => {
    const { form, onChange } = this.props;
    e.preventDefault();
    form.validateFields((err, values) => {
      if (err) return;
      if (onChange instanceof Function) {
        onChange(values);
      }
    });
  };

  render() {
    const { form } = this.props;
    const { getFieldDecorator } = form;

    return (
      <Form onSubmit={this.hanldeSubmit} layout="inline">
        <Form.Item label="user name">
          {getFieldDecorator(
            'username',
            {},
          )(
            <Input
              prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
              placeholder="请输入会员名称"
            />,
          )}
        </Form.Item>
        <Form.Item label="phone number">
          {getFieldDecorator(
            'phone',
            {},
          )(
            <Input
              prefix={<Icon type="phone" style={{ color: 'rgba(0,0,0,.25)' }} />}
              placeholder="请输入用户电话"
            />,
          )}
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            search
          </Button>
        </Form.Item>
      </Form>
    );
  }
}

export default Form.create()(FilterBox);
