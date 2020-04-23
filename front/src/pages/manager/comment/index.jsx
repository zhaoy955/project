import React from 'react';
import { Avatar, Button, Empty, Pagination, Comment, message } from 'antd';
import noImg from 'assets/no-photo.jpg';
import { connect } from 'dva';
import { timestampToTime } from 'utils';
import router from 'umi/router';
import { mapStateToProps, mapDispatchToProps } from '../MapProps';
import styles from './styles.less';

class CommentList extends React.Component {
  state = { list: [], pageNum: 1, count: 0, pageSize: 10 };

  componentDidMount() {
    this.get();
  }

  get() {
    const { pageNum, pageSize } = this.state;
    const { getCommentList } = this.props;
    getCommentList({ pageNum, pageSize }).then(resp => {
      if (resp) {
        const { data, count } = resp;
        this.setState({ list: data, count });
      }
    });
  }

  delComment(item) {
    const { delComment } = this.props;
    const { _id } = item;

    delComment({
      _id,
    }).then(resp => {
      if (resp) {
        message.success('success');
        this.get();
      } else {
        message.error('fail');
      }
    });
  }

  onShowSizeChange = (pageNum, pageSize) => {
    this.setState({ pageNum, pageSize }, this.get);
  };

  render() {
    const { list, pageNum, count } = this.state;

    return (
      <div className={styles.root}>
        <h4 className={styles.frontTitle}>my comment</h4>
        {list.length === 0 ? (
          <Empty />
        ) : (
          list.map((i, k) => {
            const {
              content,
              createdAt,
              updatedAt,
              user: { username, profile },
              goods: {
                _id: goodsId,
                title,
                image,
                user: { username: _username, profile: _profile },
              },
              reply,
            } = i;

            return (
              <div className={styles.item}>
                <div className={styles.goods}>
                  <div className={styles.title}>
                    good title : &nbsp;&nbsp;
                    <Button
                      type="link"
                      onClick={() => router.push({ pathname: '/goods', query: { id: goodsId } })}
                    >
                      {title}
                    </Button>
                  </div>
                  <br />
                  <div className={styles.image}>
                    good img:&nbsp;&nbsp;
                    <img src={image || noImg} alt="" className={styles.img} />
                  </div>
                </div>
                <Comment
                  style={{ marginBottom: '24' }}
                  key={k}
                  author={
                    <div>
                      {username} at {timestampToTime(createdAt)}
                    </div>
                  }
                  avatar={<Avatar src={profile || noImg} alt="" />}
                  content={
                    <div>
                      <p>{content}</p>
                    </div>
                  }
                >
                  {reply ? (
                    <Comment
                      key={k}
                      avatar={<Avatar src={_profile || noImg} alt="" />}
                      author={`author  ${_username}  reply at ${timestampToTime(updatedAt)}`}
                      content={<p>{reply}</p>}
                    />
                  ) : (
                    <Comment
                      key={k}
                      avatar={<Avatar src={_profile || noImg} alt="" />}
                      author={`author  ${_username}`}
                      content={`not reply`}
                    />
                  )}
                  <Button type="danger" onClick={() => this.delComment(i)}>
                    delete the comment
                  </Button>
                </Comment>
              </div>
            );
          })
        )}
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

export default connect(mapStateToProps, mapDispatchToProps)(CommentList);
