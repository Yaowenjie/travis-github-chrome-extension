## How to install it
You can click [this link](https://chrome.google.com/webstore/detail/github%2Btravis-v2/ekkfhiophiaakmeppcnkblpbbjlnlnmh), or search "__github travis v2__" on __chrome web store__. Then add it to your chrome.

## Brief
This repo's reference is from [WereHamster's github repo](https://github.com/wereHamster/github-travis-chrome-extension) originally, which is no longer working since github's layout changed.

So I changed the code to fit the new layout of github. Additionally, I added a more __visual chart__ to show the last 10 times __build time__ and __build status__ of travis-ci. For now, you can see many __travis-ci__ pipelines status beside your github repos title and an awesome travis build chart. As follows:
![Travis Status](imgs/111.jpg)

Also, you can see the build time detail when you hover the column you care about, chick the tooltip, you will go to the exact build in travis-ci.
Below is what the repositories list looks like, you can find which repos has been launched in travis-ci if only the repo is public:
![Repo list](imgs/2.png)

In all page, once you click the build icon, you will go to travis page.

## How to install it in Developer mode
For now, if you want to install it. First clone or fork this repo. Then, on your Chrome Extensions page, make sure "Developer mode" is checked. You can then click the "Load unpacked extension..." button and browse to the chrome directory of this repo.
![Repo Page](imgs/3.png)

#### Feedback
You can give me your feedback on this extension on [github issue](https://github.com/Yaowenjie/travis-github-chrome-extension/issues).
Of course, you can send your pull request on this repo as well.

--------

## 安装
安装该插件，你可以直接点击[该链接](https://chrome.google.com/webstore/detail/github%2Btravis-v2/ekkfhiophiaakmeppcnkblpbbjlnlnmh)，或者访问chrome web store 并搜索“__github travis v2__”关键字，然后添加你的chrome浏览器即可。
如果你无法访问chrome web store，请下载[本repo最新的release版本](https://github.com/Yaowenjie/travis-github-chrome-extension/releases)，解压，然后在Chrome浏览器开发者模式下手动添加该插件（见上文"How to install it in Developer mode"）。

## 简介
该chrome插件为在github上的repo提供travis-ci运行状态和运行时间的图标（见上图1、2），你可以直观的了解到哪些repo（自己或者别人）开通了travis-ci的build，还可以看到特定repo近十次build的时间和状态变化，并且点击tooltip还可以进入特定的travis build页面。

## 反馈
欢迎在[github issue](https://github.com/Yaowenjie/travis-github-chrome-extension/issues)提出你的问题和建议。
