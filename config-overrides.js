//配置按需打包并自定义主题
const {override, fixBabelImports, addLessLoader} = require('customize-cra');

module.exports = override(
    fixBabelImports('import',{
        libraryName: 'antd',
        libraryDirectory: 'es',
        style: true,
    }),
    addLessLoader({
        lessOptions: {
            javascriptEnabled: true,
            modifyVars: {
                '@primary-color': 'rgb(55, 133, 140)',
                '@border-radius-base' : '10px'
            },
        }
    }),
);