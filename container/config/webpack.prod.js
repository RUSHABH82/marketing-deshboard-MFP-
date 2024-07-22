const {merge} = require('webpack-merge')
const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin');
const commonConfig = require('./webpack.common')
const {dependencies} = require('../package.json')

const prodConfig = {
    mode: 'production',
    output: {
        filename: '[name].[contenthash].js',
    },
    plugins: [
        new ModuleFederationPlugin({
            name: 'container',
            remotes: {
                "marketing": `marketing@${process.env.PRODUCTION_DOMAIN}/remoteEntry.js`,
            },
            shared: dependencies,
        }),
    ]
}

module.exports = merge(commonConfig, prodConfig);