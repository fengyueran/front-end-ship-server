#!/bin/bash


main(){
 #check files to be commited
  result=`git status --porcelain`
  if [[ !$result ]];then
     git add . && git commit -m 'update db.json' && git pull --rebase origin master && git push origin master
  fi
}

main