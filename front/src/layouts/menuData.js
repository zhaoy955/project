export default [
  {
    key: '/home',
    text: '系统首页',
    icon: 'home',
    children: [],
  },
  {
    key: '/manager',
    text: '个人管理',
    icon: 'user',
    children: [
      {
        key: '/manager/goods',
        icon: '',
        text: '商品管理',
        roles: ['user', 'admin'],
        children: [],
      },
      {
        key: '/manager/favorite',
        icon: '',
        text: '收藏管理',
        roles: ['user', 'admin'],
        children: [],
      },
      {
        key: '/manager/comment',
        icon: '',
        text: '评论管理',
        roles: ['user', 'admin'],
        children: [],
      },
    ],
  },
  {
    key: '/users',
    text: '会员管理',
    icon: 'user',
    children: [
      {
        key: '/users/list',
        icon: '',
        text: '会员列表',
        roles: ['admin'],
        children: [],
      },
    ],
  },
];
