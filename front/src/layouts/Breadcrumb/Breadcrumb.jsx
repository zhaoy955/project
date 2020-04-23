import React from 'react';
import { Breadcrumb } from 'antd';
import { router } from 'umi';
import styles from './Breadcrumb.less';

const menuData2BreadcrumbData = (menuData = [], path = window.location.pathname) => {
  for (let i = 0; i < menuData.length; i += 1) {
    const menuDatum = menuData[i];
    const { children, key } = menuDatum;
    if (key === path) {
      return [menuDatum];
    }

    // 过滤出不为空、不为数字的url(以支持详情动态路由)
    if (
      key.includes('/:') &&
      key.slice(0, key.lastIndexOf('/')) === path.slice(0, path.lastIndexOf('/')) &&
      /^\d*$/.test(Number(path.slice(path.lastIndexOf('/') + 1)))
    ) {
      return [menuDatum];
    }

    if (children instanceof Array) {
      const subArr = menuData2BreadcrumbData(children, path);
      if (subArr.length) {
        return [menuDatum].concat(subArr);
      }
    }
  }
  return [];
};

const BaseBreadcrumb = ({ data = [], pathname }) => {
  function renderMenu() {
    const newData = menuData2BreadcrumbData(data, pathname);
    const lastIndex = newData.length - 1;

    const toPath = (item, index) => {
      const { key, isUseGoback } = item;
      if (isUseGoback) {
        const deep = index - lastIndex;
        router.goBack(deep);
      } else {
        router.push(key);
      }
    };

    return newData.map((item, index) => {
      const { key, text } = item;
      return (
        <Breadcrumb.Item key={key}>
          <span to={key} onClick={() => toPath(item, index)} style={{ cursor: 'pointer' }}>
            {text}
          </span>
        </Breadcrumb.Item>
      );
    });
  }

  return (
    <div className={styles.root}>
      <Breadcrumb>{renderMenu()}</Breadcrumb>
    </div>
  );
};

export default BaseBreadcrumb;
