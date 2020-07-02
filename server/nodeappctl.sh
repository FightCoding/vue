#!/bin/bash

echo "↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓ begin nodeappctl.sh ↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓"

# 当前脚本目录
currentDir=$(cd `dirname $0`; pwd)
# 导入依赖
source ${currentDir}/common.sh


project="xue-teacher-frontend"
stage=$1
action=$2
BUILD_ROOT=/data/svn-xue-teacher-frontend
NODE_SERVER_PATH=/data/nodeapp
svn_base_url=`getSvnURL ${stage} "/$project/build-$stage"`

# 从svn获取最新代码
update_svn ${BUILD_ROOT} ${svn_base_url}

# 如果更新代码失败，部署失败
if [[ "$?" != "0" ]]; then
    echo "svn checkout/update failed"
    exit 1
fi

cd ${BUILD_ROOT}
rsync -rtvlpgozDP --exclude .svn nodeapp/ ${NODE_SERVER_PATH}
echo "更新Logic"

cd ${NODE_SERVER_PATH}

if [[ "$action" = "start" ]]; then
    npm run server:${stage}
else
    pm2 reload all
fi

echo "↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑  上线完成 ↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑"
