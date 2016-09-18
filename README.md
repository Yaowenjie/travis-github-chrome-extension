## Brief
This extension is to display __travis-ci__ status for repos in __github__. There is a visual chart which shows build status and  duration changes for recent 10 times.

## How to install it
You can click [this extension link](https://chrome.google.com/webstore/detail/github%2Btravis-v2/ekkfhiophiaakmeppcnkblpbbjlnlnmh) directly, or search "__github travis stat__" on __Chrome web store__. Then add it to your chrome.

## Introduction
This repo's reference is originally from [WereHamster's github repo](https://github.com/wereHamster/github-travis-chrome-extension), which is no longer working since github's layout changed. So I changed the code to fit the new layout of github and did some refactor. Additionally, I added a __visual chart__ to show the last 10 times __build time__ and __build status__ of travis-ci. There is travis-ci pipeline status icon beside your github repos title and an awesome travis build chart in your repo page. As follows:
![Travis Status](imgs/4.png)

Also, you can see the build time and message detail when you hover on the column you're care about. Click the column, and you will go to the specific build in travis-ci.
Below is what the repositories list looks like, you can find which repos has been launched in travis-ci only if the repo is public:
![Repo list](imgs/2-new.png)

On all pages, once you click the build icon, you will go to travis-ci page.

## How to install it in Developer mode
If you want to install it in Developer mode. First clone or fork this repo. Then, on your Chrome Extensions page, make sure "Developer mode" is checked. You can then click the "Load unpacked extension..." button and browse to the chrome directory of this repo.
![Repo Page](imgs/3.png)

#### Feedback
You can give me your feedback on this extension by [github issue](https://github.com/Yaowenjie/travis-github-chrome-extension/issues).
Besides, sending your pull request on this repo would be better to improve it.

--------

## 安装
安装该插件，你可以直接点击[该链接](https://chrome.google.com/webstore/detail/github%2Btravis-v2/ekkfhiophiaakmeppcnkblpbbjlnlnmh)，或者访问Chrome web store 并搜索“__github travis v2__”关键字，然后添加你的chrome浏览器即可。
如果你无法访问chrome web store，请下载[本repo最新的release版本](https://github.com/Yaowenjie/travis-github-chrome-extension/releases)，解压，然后在Chrome浏览器开发者模式下手动添加该插件（见上文"How to install it in Developer mode"）。

## 简介
该chrome插件为在github上的repo提供travis-ci运行状态和运行时间的图标（见上图1、2），你可以直观的了解到哪些repo（自己或者别人）开通了travis-ci的build，还可以看到特定repo近十次build的时间和状态变化，鼠标置于具体build上，还可查看具体build时间和message，点击还可以进入特定的travis-ci build页面。

## 反馈
欢迎在[github issue](https://github.com/Yaowenjie/travis-github-chrome-extension/issues)提出你的问题和建议。
