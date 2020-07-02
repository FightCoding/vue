#!/bin/bash

# 通知 deployer 构建状态
notify_deployer() {
    local app_base_dir=$1
    local app_project=$2
    local app_name=$3
    local stage=$4
    local app_build_version=$5
    local app_status=$6
    local host_name=`hostname`
    local app_type=autobuild
    local app_instance="$app_project:$stage:$app_name:$host_name"
    local app_datetime=`date +"%Y-%m-%d%%20%H:%M:%S"`
    local app_uptime=0

    local notify_url="http://deployer.office.17zuoye.net/collector/app.php"
    if [[ "$stage" = "production" || "$stage" = "staging" ]]; then
        notify_url="http://deployer.dc.17zuoye.net/collector/app.php"
    fi

    local url="$notify_url?stage=$stage&app_name=$app_name&app_instance=$app_instance&app_type=$app_type&app_base_dir=$app_base_dir&app_build_version=$app_build_version&app_datetime=$app_datetime&app_uptime=$app_uptime&app_status=$app_status&host_name=$host_name&app_project=$app_project"
    curl -s ${url}
    echo ""
}

# 获取svn地址
getSvnURL() {
    local stage=$1
    local path=$2
    if [[ "$stage" = "production" || "$stage" = "staging" ]]; then
        echo "http://svn.dc.17zuoye.net${path}"
    else
        echo "http://192.168.100.8:8088${path}"
    fi
}

# svn操作
svn_status_do() {
   local filter=$1
   local svn_cmd=$2
   local cmdline="svn status | $filter"
   files=`eval ${cmdline}`
   for file in ${files}; do
       svn ${svn_cmd} ${file}@    # 避免 abc@2x.png 这样的图片格式
   done
}

# 将svn仓库更新到最新
update_svn() {
    local work_dir=$1
    local svn_repo=$2

    if [[ -e ${work_dir}/.svn ]]; then
        cd ${work_dir}
        svn_status_do "grep '^M' | sed 's/^M *//g'" revert # 仓库中如果有文件变更，把变更文件还原
        svn up
    else
        mkdir -p ${work_dir}
        cd ${work_dir}
        svn co ${svn_repo} .
    fi
}
