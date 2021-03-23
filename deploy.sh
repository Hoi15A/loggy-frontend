#!/usr/bin/env bash

DEPLOY_BRANCH=dev

if [ "$DEPLOY_BRANCH" = "$APPVEYOR_REPO_BRANCH" ]; then
  echo "    ____             __           "
  echo "   / __ \___  ____  / /___  __  __"
  echo "  / / / / _ \/ __ \/ / __ \/ / / /"
  echo " / /_/ /  __/ /_/ / / /_/ / /_/ / "
  echo "/_____/\___/ .___/_/\____/\__, /  "
  echo "          /_/            /____/   "

  curl -sflL 'https://raw.githubusercontent.com/appveyor/secure-file/master/install.sh' | bash -e -
  ./appveyor-tools/secure-file -decrypt ./id_loganalyzer.enc -secret $my_secret -salt $my_salt -out id_loganalyzer
  chmod 0600 id_loganalyzer
  echo -e "Host *\n\tStrictHostKeyChecking no\n\n" > ~/.ssh/config
  rsync -rvz --delete -e "ssh -i id_loganalyzer" dist/ psituser@direct.zhaw.neat.moe:/home/psituser/config/nginx/html/
  ssh -i id_loganalyzer psituser@direct.zhaw.neat.moe "docker exec -t web nginx -s reload"
else
  echo Deploy skipped because we are not on the $DEPLOY_BRANCH branch.
fi

