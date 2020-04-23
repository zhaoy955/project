import React from 'react';
import { Form, Avatar, Button } from 'antd';
import { GOODS_TYPE } from 'utils/constants';
import router from 'umi/router';
import noImg from 'assets/no-photo.jpg';
import { connect } from 'dva';
import Share from 'components/Share';
import Vedio from 'components/Vedio';
import CommentList from './components/CommentList';
import { getQueryString, timestampToTime } from 'utils';
import { mapStateToProps, mapDispatchToProps } from './MapProps';
import styles from './styles.less';

class Goods extends React.Component {
  state = { goodsId: '', goods: {}, isLoved: false, isSelf: false };

  componentDidMount() {
    const { getGoodByID } = this.props;
    const _id = getQueryString('id');
    getGoodByID({ _id }).then(resp => {
      if (resp) {
        const { data } = resp;
        const { goods, isLoved, goodsUid, uid } = data;
        this.setState({ goodsId: _id, goods, isSelf: uid === goodsUid, isLoved });
      }
    });
  }

  loveIt = () => {
    const { goodsId, isLoved } = this.state;
    const { addFavorite, updateFavorite } = this.props;

    if (!isLoved) {
      addFavorite({ goodsId }).then(resp => {
        if (resp) {
          this.setState({ isLoved: true });
        }
      });
    } else {
      updateFavorite({ goodsId, isLoved: false }).then(resp => {
        if (resp) {
          this.setState({ isLoved: false });
        }
      });
    }
  };

  render() {
    const { goods, isLoved, isSelf } = this.state;
    const {
      extra = '',
      image = '',
      number = '-',
      price = '-',
      sort = '',
      title = '',
      desc = '',
      updatedAt = '',
      user = {},
    } = goods;
    const { username, profile } = user;
    const findItem = GOODS_TYPE.find(item => item.value === sort);

    return (
      <div className={styles.root}>
        <h4 className={styles.frontTitle}>good detail</h4>

        <Button
          type="primary"
          icon="left"
          style={{ margin: '24px 10px' }}
          onClick={() => router.goBack()}
        >
          back
        </Button>
        <Button icon="like" style={{ margin: '24px 10px' }} onClick={() => this.loveIt()}>
          {isLoved ? 'already collect' : 'collect now'}
        </Button>

        <Share />

        <div className={styles.form}>
          <div className={styles.title}>good title : &nbsp;&nbsp;{title}</div>
          <div className={styles.number}>good number : &nbsp;&nbsp;{number}</div>
          <div className={styles.price}>price: &nbsp;&nbsp;{price}</div>
          <div className={styles.sort}>category: &nbsp;&nbsp;{findItem ? findItem.label : '-'}</div>
          <div className={styles.image}>
            good img:&nbsp;&nbsp;
            <img src={image || noImg} alt="" className={styles.img} />
          </div>
          <div className={styles.vedio}>video: &nbsp;&nbsp;{extra && <Vedio url={extra} />}</div>
          <div className={styles.sort}>description: &nbsp;&nbsp;{desc}</div>
          <div>
            author： &nbsp;&nbsp;
            {<Avatar src={profile} style={{ marginRight: '4px' }} />}
            &nbsp;&nbsp;
            {username}
          </div>
          <div>
            update：&nbsp;&nbsp;
            {timestampToTime(updatedAt)}
          </div>
        </div>

        <CommentList goodsId={goods} isSelf={isSelf} />
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Form.create()(Goods));
