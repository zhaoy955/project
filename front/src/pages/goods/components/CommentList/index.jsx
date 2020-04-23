import React from 'react';
import { Input, Avatar, Button, Empty, Comment, message } from 'antd';
import noImg from 'assets/no-photo.jpg';
import { connect } from 'dva';
import { getQueryString, timestampToTime } from 'utils';
import { mapStateToProps, mapDispatchToProps } from '../../MapProps';
import styles from './styles.less';

class CommentList extends React.Component {
  state = { list: [], goodsId: '', content: '', reply: '', visible: {} };

  componentDidMount() {
    this.get();
  }

  get() {
    const { getCommentList } = this.props;
    const _id = getQueryString('id');
    getCommentList({ goodsId: _id }).then(resp => {
      if (resp) {
        const { data } = resp;
        this.setState({ list: data, goodsId: _id });
      }
    });
  }

  comment() {
    const { content, goodsId } = this.state;
    const { addComment } = this.props;

    if (!content) return;

    addComment({
      goodsId,
      content,
    }).then(resp => {
      if (resp) {
        message.success('success');
        this.get();
      } else {
        message.error('fail');
      }
    });
  }

  reply(item) {
    const { reply } = this.state;
    const { updateComment } = this.props;
    const { _id } = item;
    if (!reply) return;

    updateComment({
      _id,
      reply,
    }).then(resp => {
      if (resp) {
        message.success('success');
        this.get();
      } else {
        message.error('fail');
      }
    });
  }

  render() {
    const { isSelf } = this.props;
    const { list, visible } = this.state;

    return (
      <div className={styles.root}>
        <h4 className={styles.frontTitle}>comment list</h4>
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
                user: { username: _username, profile: _profile },
              },
              reply,
            } = i;

            return (
              <Comment
                style={{ marginBottom: '24' }}
                key={k}
                author={
                  <div>
                    {username} at {timestampToTime(createdAt)}
                    {isSelf && !reply && (
                      <Button
                        onClick={() =>
                          this.setState(prev => {
                            const { visible } = prev;
                            visible[k] = !visible[k];
                            return { visible, reply: '' };
                          })
                        }
                        type="link"
                      >
                        reply him(her)
                      </Button>
                    )}
                  </div>
                }
                avatar={<Avatar src={profile || noImg} alt="" />}
                content={<p>{content}</p>}
              >
                {isSelf && !reply && visible[k] && (
                  <div>
                    <Input.TextArea
                      rows={5}
                      onChange={e => this.setState({ reply: e.target.value })}
                    />
                    <Button onClick={() => this.reply(i)} style={{ marginTop: '24px' }}>
                      reply
                    </Button>
                  </div>
                )}
                {reply && (
                  <Comment
                    key={k}
                    avatar={<Avatar src={_profile || noImg} alt="" />}
                    author={`author  ${_username}  reply at ${timestampToTime(updatedAt)}`}
                    content={<p>{reply}</p>}
                  />
                )}
              </Comment>
            );
          })
        )}
        <h4 className={styles.frontTitle}>add comment</h4>

        <div>
          <Input.TextArea rows={5} onChange={e => this.setState({ content: e.target.value })} />
          <Button onClick={() => this.comment()} style={{ marginTop: '24px' }}>
            add
          </Button>
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CommentList);
