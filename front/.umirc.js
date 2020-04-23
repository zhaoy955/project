const { join } = require('path');

export default {
  hash: true,
  proxy: {
    '/api': {
      target: 'http://localhost:8001',
      changeOrigin: true,
      secure: false,
      // bypass: req => {
      // if (req.headers["x-requested-with"] !== "XMLHttpRequest") {
      //   return req.originalUrl;
      // }
      // return false;
      // },
    },
    '/upload': {
      target: 'http://localhost:8001',
      changeOrigin: true,
      secure: false,
    },
  },
  plugins: [
    [
      'umi-plugin-react',
      {
        antd: true,
        dva: true,
        routes: {
          exclude: [
            /models|services|components\//,
            o => /[A-Z]/.test(o.component),
            o => !/[\\/]((index)|(404)|(_layout))[\\.]js$/.test(o.component),
          ],
        },
      },
    ],
  ],
  alias: {
    components: join(process.cwd(), 'src', 'components'),
    utils: join(process.cwd(), 'src', 'utils'),
    assets: join(process.cwd(), 'src', 'assets'),
    themes: join(process.cwd(), 'src', 'themes'),
    services: join(process.cwd(), 'src', 'services'),
    config: join(process.cwd(), 'src', 'config'),
    public: join(process.cwd(), 'public'),
  },
  treeShaking: true,
  plugins: [
    [
      'umi-plugin-react',
      {
        antd: true,
        dva: true,
        dynamicImport: { webpackChunkName: true },
        title: 'fe',
        dll: false,

        routes: {
          exclude: [
            /models\//,
            /services\//,
            /model\.(t|j)sx?$/,
            /service\.(t|j)sx?$/,
            /components\//,
          ],
        },
      },
    ],
  ],
};
