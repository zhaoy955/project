import React, { Component } from 'react';
import { Upload, Icon, message } from 'antd';
import Vedio from 'components/Vedio';
import styles from './Uploader.less';

class Uploader extends Component {
  constructor(props) {
    super(props);

    const { value } = props;
    this.state = {
      uploading: false,
      value,
    };
  }

  // 适配接口
  onChange = info => {
    const { onChange } = this.props;

    if (info.file.status === 'uploading') {
      this.setState({ value: '', uploading: true });
      return;
    }
    if (info.file.status === 'done') {
      const { response } = info.file;
      const { data: value, code } = response;
      if (value && code === 1) {
        onChange(value);
        this.setState({ value, uploading: false }, () => {
          message.success('上传成功!');
        });
      } else {
        const { value: pv } = this.props;
        this.setState({ value: pv, uploading: false });
        message.error('上传失败!');
      }
    }
  };

  beforeUpload = file => {
    const { formats = [] } = this.props;
    if (formats.length > 0) {
      const isFormat = formats.includes(file.type);
      if (!isFormat) {
        message.warn('上传的文件不符合格式要求！');
        return false;
      }
    }

    return true;
  };

  render() {
    const { action = '/api/file', video, tips } = this.props;
    const { uploading, value } = this.state;
    const isUpload = Boolean(value);

    return (
      <div className={styles.root}>
        <Upload
          name="file"
          listType="picture-card"
          showUploadList={false}
          action={action}
          beforeUpload={this.beforeUpload}
          onChange={this.onChange}
        >
          {isUpload ? (
            <div className={styles.placeholder}>
              {video ? (
                <Vedio url={value} style={{ width: '520px', height: '400px' }} />
              ) : (
                <img className={styles.placeImg} src={value} alt="" />
              )}

              <div className={styles.replace}>
                <Icon type="sync" />
                <span style={{ marginLeft: '5px' }}>替换</span>
              </div>
            </div>
          ) : (
            <div>
              <Icon type={uploading ? 'loading' : 'plus'} />
              <div className="ant-upload-text">{uploading ? '正在上传...' : '上传图片'}</div>
            </div>
          )}
        </Upload>
        {tips ? <p className={styles.tips}>{tips}</p> : null}
      </div>
    );
  }
}

export default Uploader;
