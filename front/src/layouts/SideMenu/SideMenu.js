import React from 'react';
import { Menu, Icon } from 'antd';
import router from 'umi/router';
import { connect } from 'dva';
import { mapStateToProps, mapDispatchToProps } from '../MapProps';
import styles from './SideMenu.less';

const { SubMenu } = Menu;

const renderMenuList = (menuList, role) => {
  return menuList.map(item => {
    const { key, icon, text, children = [], roles = [], render } = item;
    const childrenMenu = children.filter(child => !child.banbasemenu);

    const toPath = () => {
      router.push(key);
    };

    const renderItem = () =>
      typeof render === 'function' ? (
        render()
      ) : (
        <span>
          {icon && <Icon type={icon} />}
          <span>{text}</span>
        </span>
      );

    if (childrenMenu.length > 0) {
      return (
        <SubMenu key={key} popupClassName={'popup'} title={renderItem()}>
          {renderMenuList(children, role)}
        </SubMenu>
      );
    }

    return (
      <Menu.Item key={key} onClick={toPath} disabled={roles.length !== 0 && !roles.includes(role)}>
        {renderItem()}
      </Menu.Item>
    );
  });
};

const SideMenu = props => {
  const { data, location, role } = props;
  const { pathname } = location;
  return (
    <Menu
      defaultSelectedKeys={[pathname]}
      mode="inline"
      theme="dark"
      className={styles.root}
    >
      {renderMenuList(data, role)}
    </Menu>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(SideMenu);
