#!/bin/sh

echo '前端项目启动脚本'

echo '切换nodejs版本'
. /usr/local/opt/nvm/nvm.sh
nvm use 18.17.0

echo '当前node、npm版本信息'
node -v
npm -v

echo '前端项目启动'

echo '删除旧node_modules'
rm -rf node_modules

echo '删除旧.lock'
rm -rf yarn.lock
rm -rf package-lock.json

echo 'node_modules开始安装'
yarn

echo '启动前端工程'
yarn dev
