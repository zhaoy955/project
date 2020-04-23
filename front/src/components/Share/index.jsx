import React from 'react';
import cn from 'classnames';
import qq from 'assets/social/qq.svg';
import weibo from 'assets/social/weibo.svg';
import facebook from 'assets/social/facebook.svg';
import twitter from 'assets/social/twitter.svg';
import google from 'assets/social/google.svg';
import styles from './styles.less';

const types = [
  {
    key: 'qq',
    icon: qq,
    template:
      'http://connect.qq.com/widget/shareqq/index.html?url={{URL}}&title={{TITLE}}&source={{SOURCE}}&desc={{DESCRIPTION}}&pics={{IMAGE}}&summary="{{SUMMARY}}"',
  },
  {
    key: 'weibo',
    icon: weibo,
    template:
      'https://service.weibo.com/share/share.php?url={{URL}}&title={{TITLE}}&pic={{IMAGE}}&appkey=2640728995',
  },
  {
    key: 'facebook',
    icon: facebook,
    template: 'https://www.facebook.com/sharer/sharer.php?u={{URL}}',
  },
  {
    key: 'twitter',
    icon: twitter,
    template: 'https://twitter.com/intent/tweet?text={{TITLE}}&url={{URL}}&via={{ORIGIN}}',
  },
  {
    key: 'google',
    icon: google,
    template: 'https://plus.google.com/share?url={{URL}}',
  },
];

function Share() {
  const toSharePage = item => {
    const { template } = item;
    const TITLE = document.title;
    // eslint-disable-next-line no-restricted-globals
    const URL = location.href;
    const SOURCE = TITLE;
    const DESCRIPTION = URL;
    const SUMMARY = 'MyStuff WebSite';
    const ORIGIN = URL;

    window.open(
      template
        .replace('{{TITLE}}', TITLE)
        .replace('{{URL}}', URL)
        .replace('{{SOURCE}}', SOURCE)
        .replace('{{ORIGIN}}', ORIGIN)
        .replace('{{DESCRIPTION}}', DESCRIPTION)
        .replace('{{SUMMARY}}', SUMMARY),
    );
  };

  return (
    <ul className={cn('-mob-share-list', styles.root)}>
      分享至：
      {types.map(item => {
        const { key, icon } = item;
        return (
          <li key={key} onClick={() => toSharePage(item)}>
            <img className={styles.icon} src={icon} alt="" />
          </li>
        );
      })}
    </ul>
  );
}
export default Share;
