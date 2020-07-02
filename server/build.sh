#!/bin/bash
echo "↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓ begin build.sh ↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓"

echo $PATH
node -v

# 当前脚本目录
currentDir=$(cd `dirname $0`; pwd)
# 导入依赖
source ${currentDir}/common.sh

project="xue-teacher-frontend"
stage=$1
app_name="主讲老师CI-${stage}"
project_ci_workspace=/data/jenkins/workspace/${project}-${stage}
build_repo="build-repo"
output_dirname="build-$stage"
BUILD_ROOT=${project_ci_workspace}/${build_repo}/${output_dirname}
svn_base_url=`getSvnURL ${stage} "/$project/$output_dirname"`
svn_node_path=${build_repo}/${output_dirname}/nodeapp
svn_static_path=${build_repo}/${output_dirname}/xuelecturer


# 进入工程目录，开始构建
cd ${project_ci_workspace}

gitCommitId=`cat .git/HEAD | cut -c 1-7`
gitBranch=`git branch -r -v | awk '$2=="'${gitCommitId}'"{print $1}' | awk -F '/' '{print $NF}'`
buildId="`date +%Y%m%d-%H%M%S`-${gitCommitId}-${gitBranch}"

# 通知构建开始
notify_deployer ${project_ci_workspace} ${project} ${app_name} ${stage} ${buildId} "building"

# 安装 package
cnpm install
npm run build:${stage}

# 从svn获取最新代码
update_svn ${BUILD_ROOT} ${svn_base_url}

# 如果获取代码失败，通知deployer构建失败
if [[ "$?" != "0" ]]; then
    echo "svn checkout/update failed"
    notify_deployer ${project_ci_workspace} ${project} ${app_name} ${stage} ${buildId} "build-failed"
    exit 1
fi

cd ${project_ci_workspace}
mkdir -p ${svn_node_path}
mkdir -p ${svn_static_path}

# 同步到svn 文件夹
cd ${project_ci_workspace}
rsync -rtvlpgozDP --exclude .git ${project_ci_workspace}/dist/ ${svn_static_path}
rsync -rtvlpgozDP --delete --exclude .git --exclude node_modules/.cache ${project_ci_workspace}/{dist,server,package.json,processes.json} ${svn_node_path}

# server dependencies
cd ${svn_node_path}
cnpm install --production

#  $output_dirname/version.txt
cd ${BUILD_ROOT}
rm -rf 000-build-*.txt
echo "$buildId" > 000-${output_dirname}.txt

svn_status_do "grep '^\!' | sed 's/^\! *//g'" rm  # 使用svn rm移除已被删除的文件
svn_status_do "grep '^\?' | sed 's/^\? *//g'" add # 添加新增文件

svn ci -m "BUILD_STAGE:$stage BUILD_ID:$buildId"

# 构建成功
notify_deployer ${project_ci_workspace} ${project} ${app_name} ${stage} ${buildId} "build-done"

echo "↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑  build.sh end ↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑"
