import React from 'react';
import { Form, Input, InputNumber, Select, Button, message } from 'antd';
import { GOODS_TYPE } from 'utils/constants';
import Uploader from 'components/Uploader';
import VedioUploader from 'components/VedioUploader';
import router from 'umi/router';
import { connect } from 'dva';
import { mapStateToProps, mapDispatchToProps } from '../MapProps';
import styles from './styles.less';

const { Option } = Select;
const formItemLayout = {
  labelCol: {
    xs: { span: 4 },
    sm: { span: 4 },
  },
  wrapperCol: {
    xs: { span: 8 },
    sm: { span: 8 },
  },
};

class Goods extends React.Component {
  state = { loading: false };

  hanldeSubmit = e => {
    const { form, addGoods } = this.props;
    e.preventDefault();
    form.validateFields((err, values) => {
      if (err) return;
      addGoods(values).then(resp => {
        if (resp) {
          message.success('success');
          router.goBack();
        } else {
          message.error('fail');
        }
      });
    });
  };

  render() {
    const { form } = this.props;
    const { loading } = this.state;
    const { getFieldDecorator } = form;

    return (
      <div className={styles.root}>
        <h4 className={styles.title}>add goods</h4>
        <div className={styles.form}>
          <Form onSubmit={this.hanldeSubmit} {...formItemLayout}>
            <Form.Item label="good title">
              {getFieldDecorator('title', {
                rules: [{ required: true, message: 'please input good title' }],
              })(<Input placeholder="good title" />)}
            </Form.Item>
            <Form.Item label="good number">
              {getFieldDecorator('number', {})(<Input placeholder="good number" />)}
            </Form.Item>

            <Form.Item label="price">
              {getFieldDecorator('price', {
                rules: [{ required: true, message: 'please input price' }],
              })(<InputNumber placeholder="price" />)}
            </Form.Item>

            <Form.Item label="category">
              {getFieldDecorator('sort', {
                initialValue: '',
                // rules: [{ required: true, message: 'please input category' }],
              })(
                <Select style={{ width: 120 }}>
                  <Option value="">other</Option>
                  {GOODS_TYPE.map(item => {
                    const { label, value } = item;
                    return (
                      <Option value={value} key={value}>
                        {label}
                      </Option>
                    );
                  })}
                </Select>,
              )}
            </Form.Item>

            <Form.Item label="good img">
              {getFieldDecorator('image')(
                <Uploader
                  tips="支持bmp, jpeg, jpg格式"
                  formats={['image/jpg', 'image/x-ms-bmp', 'image/png', 'image/jpeg']}
                />,
              )}
            </Form.Item>

            <Form.Item label="video">
              {getFieldDecorator('extra')(
                <VedioUploader
                  tips="支持mp4, f4v, ogv等格式"
                  formats={['application/octet-stream', 'video/mp4', 'video/ogg', 'video/webm']}
                />,
              )}
            </Form.Item>

            <Form.Item label="description">
              {getFieldDecorator('desc')(<Input.TextArea rows={5} placeholder="description" />)}
            </Form.Item>

            <div className={styles.btns}>
              <Button onClick={() => router.goBack()}>back</Button>
              <Button type="primary" htmlType="submit" loading={loading}>
                submit
              </Button>
            </div>
          </Form>
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Form.create()(Goods));
