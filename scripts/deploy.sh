
#!/bin/bash

# 필요한 작업을 수행하는 스크립트 내용을 작성합니다.

# 예시: 필드 파일을 S3에서 다운로드하여 애플리케이션 디렉토리로 이동합니다.
aws s3 cp s3://fitme-s3/practice-deploy.zip /home/ubuntu/action/ --recursive

cd /home/ubuntu/action/
unzip practice-deploy.zip -d /home/ubuntu/deploy
rm practice-deploy.zip

#
cd ~/FitMe/backend

if pgrep -f "npm start" >/dev/null; then
  # 실행 중인 경우 종료
  pkill -f "npm start"
  echo "Application stopped."
  npm start
else
  # 실행 중이지 않은 경우 시작
  npm start
  echo "Application started."
fi
echo "Deployment completed."

exit 0