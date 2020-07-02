#!/bin/bash
host=$1
userName=$2
stage=$3
api='http://17xue-internal.17zuoye.net/api/internal/wechat-work/send-deployer-msg.vpage'
title="[Deployer] xue-teacher-frontend (Host:'${host}', Stage：'${stage}', User: '${userName}')"

curl -X POST -H "Content-Type: application/json" -d '{"title": '${title}', "text": "【主讲老师前端-更新完成】"}' ${api}
