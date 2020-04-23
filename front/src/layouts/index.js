/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react';
import { Layout, ConfigProvider } from 'antd';
import zhCN from 'antd/lib/locale-provider/zh_CN';
import { connect } from 'dva';
import { mapStateToProps, mapDispatchToProps } from './MapProps';
import TopHeader from './TopHeader';
import SideMenu from './SideMenu';
import Breadcrumb from './Breadcrumb';
import menuData from './menuData';
import styles from './styles.less';

const { Content, Sider } = Layout;

const noLayoutUrls = ['/login', '/register'];

function BasicLayout(props) {
  const { location, children } = props;
  const { pathname } = location;

  const isNoLayout = noLayoutUrls.includes(pathname);

  useEffect(() => {
    if (!isNoLayout) {
      const { autoLogin } = props;
      autoLogin();
    }
  }, []);

  if (isNoLayout) return children;

  return (
    <ConfigProvider locale={zhCN}>
      <Layout className={styles.root}>
        <TopHeader />
        <Content>
          <Layout className={styles.layout}>
            <Sider style={{ width: 256 }}>
              <SideMenu {...props} data={menuData} />
            </Sider>
            <Content style={{ padding: '8px 24px', background: '#fff' }}>
              <Breadcrumb data={menuData} pathname={location.pathname} />
              {children}
            </Content>
          </Layout>
        </Content>
      </Layout>
    </ConfigProvider>
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(BasicLayout);
