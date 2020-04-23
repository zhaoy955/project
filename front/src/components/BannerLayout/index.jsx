import React from 'react';
import styles from './styles.less';

function BannerLayout(props) {
  const { children } = props;

  return <div className={styles.root}>{children}</div>;
}

export default BannerLayout;
