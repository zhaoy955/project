import React from 'react';
// import BannerLayout from 'components/BannerLayout';
import { Form, Icon } from 'antd';
import TableList from 'components/TableList';
import { connect } from 'dva';
import FilterBox from './components/FilterBox';
import { mapStateToProps, mapDispatchToProps } from './MapProps';
import { timestampToTime } from 'utils';
import styles from './ListPage.less';

class ListPage extends React.Component {
  state = {
    query: {},
    pageNum: 1,
    pageSize: 10,
  };

  componentDidMount() {
    this.get();
  }

  changePage = pageNum => {
    this.setState({ pageNum }, () => this.get());
  };

  changePageSize = (_, pageSize) => {
    this.setState({ pageNum: 1, pageSize }, () => this.get());
  };

  get = async () => {
    const { query, pageNum, pageSize } = this.state;
    const { getList } = this.props;
    getList({
      ...query,
      pageNum,
      pageSize,
    });
  };

  delete = ({ _id }) => {
    const { deleteUser } = this.props;
    deleteUser({ _id }).then(resp => {
      if (resp) {
        this.get();
      }
    });
  };

  render() {
    const { list, totalCount, loading } = this.props;
    const { pageNum, pageSize } = this.state;

    const column = [
      {
        title: 'ID',
        render: (text, record, index) => `${(pageNum - 1) * pageSize + index + 1}`,
        align: 'center',
        ellipsis: true,
      },
      {
        title: 'user name',
        dataIndex: 'username',
        key: 'username',
        align: 'center',
        ellipsis: true,
      },
      {
        title: 'phone number',
        dataIndex: 'phone',
        key: 'phone',
        align: 'center',
        ellipsis: true,
      },
      {
        title: 'address',
        dataIndex: 'address',
        key: 'address',
        align: 'center',
        ellipsis: true,
        render: (text, { address }) => {
          return address || '-';
        },
      },
      {
        title: 'add date',
        dataIndex: 'createdAt',
        key: 'createdAt',
        align: 'center',
        ellipsis: true,
        render: (text, { createdAt }) => {
          return timestampToTime(createdAt);
        },
      },
      {
        title: 'operation',
        dataIndex: 'actions',
        ellipsis: true,
        render: (text, record) => {
          return (
            <Icon
              type="delete"
              style={{ color: 'red', cursor: 'pointer', fontSize: '16' }}
              onClick={() => this.delete(record)}
            />
          );
        },
      },
    ];

    return (
      <div className={styles.root}>
        <FilterBox
          onChange={values => {
            this.setState({ query: values, pageNum: 1 }, this.get);
          }}
        />

        <TableList
          column={column}
          dataSource={list}
          rowKey="id"
          totalCount={totalCount}
          changePage={this.changePage}
          changePageSize={this.changePageSize}
          pageNum={pageNum}
          pageSize={pageSize}
          loading={loading}
        />
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Form.create()(ListPage));
