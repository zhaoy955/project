import React from 'react';
import { Pagination, Input, Empty, Button, Avatar, message, Select } from 'antd';
import { GOODS_TYPE } from 'utils/constants';
import { connect } from 'dva';
import noImg from 'assets/no-photo.jpg';
import router from 'umi/router';
// import { timestampToTime } from 'utils/';
import { mapStateToProps, mapDispatchToProps } from './MapProps';
import styles from './styles.less';

const InputGroup = Input.Group;
const { Search } = Input;
const { Option } = Select;

class Home extends React.Component {
  state = { list: [], title: '', sort: '', pageNum: 1, pageSize: 10, count: 0 };

  componentDidMount() {
    this.get();
  }

  get = () => {
    const { getList } = this.props;
    const { title, sort, pageSize, pageNum } = this.state;

    getList({
      title,
      sort,
      pageNum,
      pageSize,
      public: 1,
    }).then(resp => {
      if (resp) {
        const { data, count } = resp;
        this.setState({ list: data, count });
      }
    });
  };

  onShowSizeChange = (pageNum, pageSize) => {
    this.setState({ pageNum, pageSize }, this.get);
  };

  handleItem = item => {
    const { username } = this.props;
    if (username) {
      router.push({ pathname: '/goods', query: { id: item._id } });
    } else {
      message.warn('登录后查看商品的详情！');
    }
  };

  renderList = list => {
    return (
      <div className={styles.list}>
        {list.map((item, k) => {
          const {
            image,
            title,
            sort,
            // createdAt,
            user: { username, profile },
          } = item;
          const findItem = GOODS_TYPE.find(item => item.value === sort);

          return (
            <div className={styles.item} key={k} onClick={() => this.handleItem(item)}>
              <img src={image || noImg} alt="" className={styles.img} />
              <p className={styles.title}>{title}</p>
              <div className={styles.meta}>
                <span>
                  {<Avatar src={profile} style={{ marginRight: '4px' }} />}
                  {username}
                </span>
                <span>{findItem ? findItem.label : '-'}</span>
              </div>
            </div>
          );
        })}
      </div>
    );
  };

  render() {
    const { pageNum, count, list } = this.state;
    const { username } = this.props;

    return (
      <div className={styles.root}>
        <div className={styles.search}>
          <InputGroup compact>
            <Select
              defaultValue=""
              onChange={value => this.setState({ sort: value, pageNum: 1, pageSize: 10 })}
              style={{ width: 120 }}
            >
              <Option value="">all</Option>
              {GOODS_TYPE.map(item => {
                const { label, value } = item;
                return (
                  <Option value={value} key={value}>
                    {label}
                  </Option>
                );
              })}
            </Select>
            <Search
              enterButton="search"
              placeholder="please input the good title"
              onSearch={value =>
                this.setState({ title: value, pageNum: 1, pageSize: 10 }, this.get)
              }
              style={{ width: 400 }}
            />
          </InputGroup>
        </div>
        <Button
          type="primary"
          size="large"
          icon="plus"
          style={{ margin: '24px 0' }}
          disabled={!username}
          onClick={() => router.push('/home/goods')}
        >
          add good
        </Button>

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
