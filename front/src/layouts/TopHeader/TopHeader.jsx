import React, { useState, useEffect } from 'react';
import dayjs from 'dayjs';
import router from 'umi/router';
import { Menu, Dropdown, Icon, Avatar } from 'antd';
import logo from 'assets/logo.svg';
import { connect } from 'dva';
import { mapStateToProps, mapDispatchToProps } from '../MapProps';
import styles from './TopHeader.less';

let current = dayjs();

const TopHeader = props => {
  const { profile, username, clearData } = props;

  const isLogin = !!username;

  const menu = (
    <Menu className={styles.menu}>
      <Menu.Item
        key="logout"
        className={styles.logout}
        onClick={() => {
          clearData();
          router.push('/login');
        }}
      >
        <Icon type="logout" />
        退出登录
      </Menu.Item>
    </Menu>
  );

  const [time, setTime] = useState(current.format('YYYY-MM-DD HH:mm:ss'));

  useEffect(() => {
    const _t = setInterval(() => {
      setTime(current.format('YYYY-MM-DD HH:mm:ss'));
      current = current.add(1, 'second');
    }, 1000);
    return () => {
      clearInterval(_t);
    };
  }, []);

  return (
    <div className={styles.root}>
      <div className={styles.left}>
        <img className={styles.logo} alt="icon" src={logo} />
      </div>
      <div className={styles.right}>
        <div className={styles.userBox}>
          <span className={styles.name}>{time}</span>
          <span className={styles.line} />
          {isLogin ? (
            <>
              <Avatar
                style={{ backgroundColor: 'transparent' }}
                shape="square"
                className={styles.img}
                src={profile}
                icon="user"
                size="large"
              />
              <Dropdown overlay={menu} trigger={['click']}>
                <span className={styles.name}>
                  <span style={{ marginRight: 6 }}>{username}</span>
                  <Icon style={{ fontSize: 15 }} type="down" />
                </span>
              </Dropdown>
            </>
          ) : (
            <span className={styles.link} onClick={() => router.push('/login')}>
              立即去登录
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(TopHeader);
