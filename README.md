# hyapp-template-v3

---

### 一、分支说明

* master 和 develop 分支是基于vue-cli3搭建。
* v1.1.4.2019.6.5分支是原有项目架构（暂停维护）。

二、命令

```json
"dev": "vue-cli-service serve --mode dev",
"build:pro": "vue-cli-service build --mode pro",
"cachebuild": "node ./cacheBuild/build.js", // 生成缓存配置文件
"build": "npm run build:pro && npm run cachebuild",
"report": "vue-cli-service build --report --mode pro",
"lint": "vue-cli-service lint --fix"
```


