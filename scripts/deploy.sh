#!/bin/bash

aws s3 cp s3://fitme-s3/practice-deploy.zip /home/ubuntu/action/ —recursive

cp -r /home/ubuntu/action/* /home/ubuntu/FitMe
cd /home/ubuntu/FitMe/backend
npm install 

if pgrep -f "nohup node server.js &" >/dev/null; then
  # 실행 중인 경우 종료 후 다시 시작
  pkill -f "nohup node server.js &"
  echo "Application stopped."
  nohup node server.js &
else
  # 실행 중이지 않은 경우 시작
  nohup node server.js &
  echo "Application started."
fi
echo "Deployment completed."

exit 0