#!/bin/bash

#Date
DATE=$(date "+%Y-%m-%d-%H-%M")

#ENV
APP_NAME="front-end-ship-server"
SCRIPT_NAME="deploy.sh"
BASE_DIR="/tmp"
SHELL_LOG="$BASE_DIR/$APP_NAME.log"
REMOTE="root@45.77.75.136"
SERVER_DIR_ON_REMOTE="/root/server/front-end-ship-server"

log(){
  LOG_INFO=$1
  echo "$DATE $SCRIPT_NAME : $LOG_INF" >> $SHELL_LOG
}

pushDBJsonOnRemote(){
  printGreen "Push db.json on remote..."
  log "Push db.json on remote"
  result=`ssh $REMOTE "cd $SERVER_DIR_ON_REMOTE && git add . && git commit -m 'update db.json' && git pull --rebase origin master && git push origin master"` 
  echo $result
}

pushDBJsonOnLocal(){
  printGreen "Push db.json on local..."
  log "Push db.json on local"
  git push origin master || exit 1
}

updateDBJson(){
  printGreen "Update db.json..."
  log "Update db.json"
  git pull --rebase || exit 1
}

deploy(){
  printGreen "Deploy Server..."
  log "Deploy Server"
  ssh $REMOTE "cd $SERVER_DIR_ON_REMOTE && git pull && pm2 stop all && yarn build && pm2 start server.js"
}

function printGreen(){
  echo -e "\033[32m[ $1 ]\033[0m"
}

function printRed(){
  echo -e "\033[31m\033[01m[ $1 ]\033[0m"
}

main(){
  #check files to be commited
  result=`git status --porcelain`
  if [[ $result ]];then
     printRed "There are files need to commit" && exit
  fi

  pushDBJsonOnRemote
  updateDBJson
  pushDBJsonOnLocal
  deploy
}

main