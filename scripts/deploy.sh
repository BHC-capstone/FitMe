
#!/bin/bash

aws s3 cp s3://fitme-s3/practice-deploy.zip /home/ubuntu/action/ --recursive

cp -r /home/ubuntu/action/* /home/ubuntu/FitMe
cd /home/ubuntu/deploy/FitMe/backend

if pgrep -f "nohup npm start &" >/dev/null; then
  # 실행 중인 경우 종료 후 다시 시작
  pkill -f "nohup npm start &"
  echo "Application stopped."
  npm nohup npm start &
else
  # 실행 중이지 않은 경우 시작
  nohup npm start &
  echo "Application started."
fi
echo "Deployment completed."

exit 0