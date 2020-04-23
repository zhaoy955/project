import React from 'react';
import { Pagination, Empty, Tag, message } from 'antd';
import { GOODS_TYPE } from 'utils/constants';
import { connect } from 'dva';
import noImg from 'assets/no-photo.jpg';
import router from 'umi/router';
import { timestampToTime } from 'utils/';
import { mapStateToProps, mapDispatchToProps } from '../MapProps';
import styles from './styles.less';

class Home extends React.Component {
  state = { list: [], pageNum: 1, pageSize: 10, count: 0 };

  componentDidMount() {
    this.get();
  }

  get = () => {
    const { getGoods } = this.props;
    const { pageSize, pageNum } = this.state;

    getGoods({
      pageNum,
      pageSize,
    }).then(resp => {
      if (resp) {
        const { data, count } = resp;
        this.setState({ list: data, count });
      }
    });
  };

  handleItem = item => {
    const { username } = this.props;
    if (username) {
      router.push({ pathname: '/goods', query: { id: item._id } });
    } else {
      message.warn('登录后查看商品的详情！');
    }
  };

  updateItem = (item, payload) => {
    const { _id } = item;

    const { updateGoods } = this.props;
    updateGoods({ _id, ...payload }).then(resp => {
      if (resp) {
        message.success('success');
        this.get();
      }
    });
  };

  onShowSizeChange = (pageNum, pageSize) => {
    this.setState({ pageNum, pageSize }, this.get);
  };

  renderList = list => {
    return (
      <div className={styles.list}>
        {list.map((item, k) => {
          const { createdAt, image, title, sort, isSale } = item;
          const findItem = GOODS_TYPE.find(item => item.value === sort);

          return (
            <div className={styles.item} key={k}>
              <div className={styles.banner}>
                <div
                  className={styles.hover}
                  onClick={() => this.updateItem(item, { isSale: !isSale })}
                >
                  {isSale ? 'sold out' : 'on sale'}
                </div>
                <img src={image || noImg} alt="" className={styles.img} />
              </div>

              <p className={styles.title} onClick={() => this.handleItem(item)}>
                {title}
              </p>
              <div className={styles.meta}>
                <span>
                  {isSale ? (
                    <Tag color="#87d068">
                      <span style={{ color: '#fff' }}>on sale</span>
                    </Tag>
                  ) : (
                    <Tag color="#f50">
                      <span style={{ color: '#fff' }}>sold out </span>
                    </Tag>
                  )}
                </span>
                <span>{findItem ? findItem.label : '-'}</span>
              </div>
              <p style={{ margin: '24px 0' }}>add： {timestampToTime(createdAt)}</p>
            </div>
          );
        })}
      </div>
    );
  };

  render() {
    const { pageNum, count, list } = this.state;

    return (
      <div className={styles.root}>
        <div className={styles.content}>
          {list.length === 0 ? <Empty /> : this.renderList(list)}
        </div>
        <Pagination
          showSizeChanger
          onShowSizeChange={this.onShowSizeChange}
          current={pageNum}
          total={count}
        />
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);
