
#!/bin/bash

aws s3 cp s3://fitme-s3/practice-deploy.zip /home/ubuntu/action/ --recursive

# cd /home/ubuntu/action/
# unzip practice-deploy.zip -d /home/ubuntu/deploy
# rm practice-deploy.zip

# cd ~/home/ubuntu/deploy/FitMe/backend

# if pgrep -f "npm start" >/dev/null; then
#   # 실행 중인 경우 종료
#   pkill -f "npm start"
#   echo "Application stopped."
#   npm start
# else
#   # 실행 중이지 않은 경우 시작
#   npm start
#   echo "Application started."
# fi
# echo "Deployment completed."

# exit 0