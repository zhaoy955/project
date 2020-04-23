import React from 'react';
import { Pagination, Empty, Avatar, message } from 'antd';
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
    const { getFavorite } = this.props;
    const { pageSize, pageNum } = this.state;

    getFavorite({
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
      router.push({ pathname: '/goods', query: { id: item.goods._id } });
    } else {
      message.warn('登录后查看商品的详情！');
    }
  };

  cancelLike = item => {
    const { deleteFavorite } = this.props;
    const { _id } = item;
    deleteFavorite({ _id, isLoved: false }).then(resp => {
      if (resp) {
        message.success('success');
        this.setState({ isLoved: false }, this.get);
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
          const {
            createdAt,
            goods: {
              image,
              title,
              sort,
              user: { username, profile },
            },
          } = item;
          const findItem = GOODS_TYPE.find(item => item.value === sort);

          return (
            <div className={styles.item} key={k}>
              <div className={styles.banner}>
                <div className={styles.hover} onClick={() => this.cancelLike(item)}>
                  not collect
                </div>
                <img src={image || noImg} alt="" className={styles.img} />
              </div>

              <p className={styles.title} onClick={() => this.handleItem(item)}>
                {title}
              </p>
              <div className={styles.meta}>
                <span>
                  {<Avatar src={profile} style={{ marginRight: '4px' }} />}
                  {username}
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
