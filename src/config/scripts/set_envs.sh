#!/usr/bin/env bash

if [ "$1" == "develop" ]
then
  echo "Switching to Develop environment"
  yes | cp -rf "./src/config/environments/develop/env.ts" "src/constants"
  echo "Done."
  
  
elif [ "$1" == "qa" ]
then
  echo "Switching to QA environment"
  yes | cp -rf "./src/config/environments/qa/env.ts" "src/constants"
  echo "Done."
  
  
elif [ "$1" == "release" ]
then
  echo "Switching to RELEASE environment"
  yes | cp -rf "./src/config/environments/release/env.ts" "src/constants"
  echo "Done."
  
elif [ "$1" == "-h" ]
then
  echo "environments"
  echo "- develop"
  echo "- qa"
  echo "- release"
else
  echo "Run -h to list available environments"
fi