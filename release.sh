#!/bin/sh

echo '
 ________  ________  ________
|\   __  \|\   ___ \|\   __  \
\ \  \|\  \ \  \_|\ \ \  \|\  \
 \ \   __  \ \  \ \\ \ \   __  \
  \ \  \ \  \ \  \_\\ \ \  \ \  \
   \ \__\ \__\ \_______\ \__\ \__\
    \|__|\|__|\|_______|\|__|\|__|

'
node -v
npm -v

sed -i '/ADD/i COPY build/index.html /usr/share/nginx/html/' Dockerfile
sed -i '/ADD/i RUN rm -rf build/index.html' Dockerfile
sed -i 's/ADD build \/usr\/share\/nginx\/html/ADD build \/usr\/share\/nginx\/html\/qyygmng/' Dockerfile


echo '前端项目构建 [[ start';

echo 'node_modules开始安装';
yarn
echo 'node_modules安装完毕';

echo '删除历史文件 [[ start';
rm -rf build
echo '删除历史文件 [[ end';

echo '前端项目构建 [[ start';

echo 'build 执行中 [';
yarn build
echo 'build 执行完毕]';

echo '前端项目构建结束 end ]]'
