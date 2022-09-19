Instagram-Clone
=======

<img src="https://s3.us-east-1.amazonaws.com/loyata.images/instagram-clone-logo.png" alt="avatar" style="zoom:67%;" />



## English

### Project description

#### **Create your own instagram app**

This project is a clone of the Instagram web-side app.

The main tech stack includes **React.js + Redux + Axios + React Router v6** for the frontend, **Spring Boot + MyBatis** for the backend. Most UI components are 100% customized with CSS, only a few make use of **Material UI & Antd**. User images and avatars will be uploaded to **AWS S3 buckets.** 

The objectives of this project is to implement most native intagram web-app's functionalities, and to be as consistent as possible with the native site in terms of UI. With over **6 main modules**, over **30 react components**, this is one of the most authentic and comprehensive clones of instagram on github. Though some code snippets are currently not best practices and refactoring is needed, I'm sure this will improve with time and welcome to contribute!

This project is only for study purposes, materials, logos, and designs involved are facebook's properties.

### Preview & Functionalities

#### Sign Up & Log in

- [x] Email address & password verification (frontend)
- [x] Password authenticatoin with JWT
- [x] Check is username or email is taken (backend)
- [x] Check if username or email is taken (backend)
- [ ] Facebook Login
- [ ] css animation when image switches

<img src="https://s3.us-east-1.amazonaws.com/loyata.images/signup_page.png" style="zoom:50%;" />

![log-in](https://github.com/loyata/instagram-clone/blob/main/images/log-in-page.gif?raw=true)

#### Main Page

The main page is consisted of four major parts:

- A navbar 
- A card that displays current user's friends
- A main display area that shows random posts/ friends' posts/ saved posts(based on the selection on the navbar)
- Personal information and friend recommendations

![hippo](https://github.com/loyata/instagram-clone/blob/main/images/main-page-display.gif?raw=true)

#### Search

- [x] search users in the database based on string comparision

![search](https://github.com/loyata/instagram-clone/blob/main/images/search-results.png?raw=true)

#### Create a new post

- [x] The page could be called anywhere in the web-app
- [x] Crop image
- [x] Set Image Size(drag supported)
- [x] Add preset filters to the image with CSS (thanks to https://github.com/picturepan2/instagram.css)
- [x] Adjust Brightness, Contrast, Temperature, Fade, Saturation, Vignette with sliders
- [x] Add caption and alt
- [x] Location suggestion (with Mapbox API)
- [ ] Upload multiple images at same time
![hippo](https://github.com/loyata/instagram-clone/blob/main/images/make_new_posts.gif?raw=true)

#### Explore

- [x] Images display as a quilted list
- [x] click to view details

![hippo](https://github.com/loyata/instagram-clone/blob/main/images/explore-images.gif?raw=true)

#### Get recent reports

- [x] new followers along with event date will be arranged and displayed
- [x] users can follow back

![recent-posts](https://github.com/loyata/instagram-clone/blob/main/images/get-recent-reports.png?raw=true)

#### Operations on a single post

- [x] unfollow/unfollow the post's author
- [x] copy the post's url to the clipboard
- [x] like the post
- [x] save the post
- [x] leave comments
- [x] go to the post page(open the post)
- [ ] send notifications when a post is liked

![single](https://github.com/loyata/instagram-clone/blob/main/images/single-post-ops.gif?raw=true)

#### Personal Display Page

- [x] Display avatar, username, number of followers/followings
- [x] follow and unfollow, send messages(if this is someone else's homepage)
- [x] go to settings(if this is current user's homepage)
- [x] display all posts and saved posts
- [x] display a post's likes and comments when mouse hover above the image
- [x] click an image to view details
- [ ] tags part that stores all posts that hashtagged by others

![personal_page](https://github.com/loyata/instagram-clone/blob/main/images/personal-page.gif?raw=true)

#### Chat

- [x] Create new chat sessions with search function
- [x] display session time and message digestion
- [x] Leave messages or real time chat
- [ ] Multi-person chat
- [ ] video/phone call

![chat](https://github.com/loyata/instagram-clone/blob/main/images/personal-page.gif?raw=true)



### How to run

After cloning or downloading the repo

#### Frontend

1. change directory to instagram-clone/frontend/

2. install all dependencies

   ```bash
   # with npm
   npm install
   ```

3. create a S3 bucket follow the instructions of https://blog.devgenius.io/upload-files-to-amazon-s3-from-a-react-frontend-fbd8f0b26f5

4. create a `.env` file under frontend root

   ```js
   REACT_APP_baseURL="Tomcat backend URL"  =>  e.g. "http://localhost:8080"
   
   //see https://www.mapbox.com/
   REACT_APP_geoAPIToken="Mapbox API Access Token"
   
   REACT_APP_S3_BUCKET="S3 Bucket Name"
   REACT_APP_REGION="AWS Region"
   REACT_APP_ACCESS_KEY="AWS access key"
   REACT_APP_SECRET_ACCESS_KEY="AWS secret key"
   ```

4. start the code

   ```bash
   npm run start
   ```

#### Backend

1. change directory to instagram-clone/backend/

2. create the database

   ```sql
   CREATE DATABASE `instagramDB`;
   USE `instagramDB`;
   ```

3. use .sql file provided in backend/sql to generate tables

4. configure backend dependencies using `pom.xml`

5. configure `/backend/src/main/resources/application.properties` change the values if your configs are different

   ```code
   # DB Username
   spring.datasource.username=root
   # DB Password
   spring.datasource.password=123456
   # JDBC Driver
   spring.datasource.driver-class-name=com.mysql.cj.jdbc.Driver
   # JDBC URL
   spring.datasource.url=jdbc:mysql://localhost:3306/instagramDB?serverTimezone=UTC
   
   mybatis.typeAliasesPackage=ca.uottawa.ins.model
   mybatis.mapperLocations=classpath:mapper/*.xml
   mybatis.configuration.map-underscore-to-camel-case=true
   ```

6. run `backendApplication.java`

#### Generate Fake Users

For better experience, it is recommended to generate some fake users in advance. We can use Unsplash API to get random photos we need.

To generate, please refer to the Python script under `/backend/python_scripts/user_generator.py`

1. install dependency

   ```shell
   pip install Faker
   ```

2. Create an unsplash developer account and get the clientId

3. configure `client_id`, `port_number` and `fake_users_to_generate` in `user_generator.py`

4. run the code







## 中文

### 项目描述

这是一个高仿的instagram网页端程序, 按照原生的ins界面尽可能实现了大多数的功能, 在UI方面也尽量定制到与原生的一致.

**技术栈:**

前端: React.js + Redux + Axios + React Router v6

后端: SpringBoot + MyBatis

UI: Material UI

### 预览/功能

#### 登陆/注册

- [x] 邮箱地址&密码验证 (前端)
- [x] JWT
- [x] 检查邮箱&用户名是否重复 (后端)
- [ ] 使用Facebook账号登陆
- [ ] 录播图动画

<img src="https://s3.us-east-1.amazonaws.com/loyata.images/signup_page.png" style="zoom:50%;" />

![log-in](https://github.com/loyata/instagram-clone/blob/main/images/log-in-page.gif?raw=true)

#### 主页

主页主要由四大部分组成:

- 导航栏
- 左上区域: 展示朋友头像
- 主要区域, 有三种信息流, 使用instagram logo右边的下拉箭头切换, 分别为数据库中的随机post, 朋友的post和用户保存的post
- 右边: 个人信息和推荐

![hippo](https://github.com/loyata/instagram-clone/blob/main/images/main-page-display.gif?raw=true)

#### 搜索

- [x] 搜索写得比较简单, 就是mysql字符串匹配

![search](https://github.com/loyata/instagram-clone/blob/main/images/search-results.png?raw=true)

#### 创建post

- [x] 可以在任意页面调出
- [x] 支持裁剪图片
- [x] 四种比例
- [x] 为图片添加滤镜 (滤镜库来自 https://github.com/picturepan2/instagram.css)
- [x] 迷你ps: 调整明亮度, 对比度, 色温, 透明度, 饱和度和暗角
- [x] 添加图片描述
- [x] 定位 (Mapbox API)
- [ ] 一个post上传多张图片
  ![hippo](https://github.com/loyata/instagram-clone/blob/main/images/make_new_posts.gif?raw=true)

#### 探索

- [x] 使用随机大小展示图片信息流
- [x] 点击显示post详情

![hippo](https://github.com/loyata/instagram-clone/blob/main/images/explore-images.gif?raw=true)

#### 通知

- [x] 当一个用户被关注时会收到通知
- [x] 用户可以互关

![recent-posts](https://github.com/loyata/instagram-clone/blob/main/images/get-recent-reports.png?raw=true)

#### 单个post的操作

- [x] 对post的作者关注/取关
- [x] 拷贝post的url到剪切板
- [x] 点赞
- [x] 收藏
- [x] 评论
- [x] 跳转到详情页
- [ ] 点赞时发出通知

![single](https://github.com/loyata/instagram-clone/blob/main/images/single-post-ops.gif?raw=true)

#### 个人页

- [x] 展示头像, 用户名, 粉丝人数, 关注人数等
- [x] 关注/取关, 发送消息(在陌生人主页)
- [x] 前往设置页(在自己的主页)
- [x] 展示post和收藏
- [x] 鼠标悬停在图片上时显示点赞数和评论数
- [x] 
- [x] 点击图片显示细节
- [ ] tags

![personal_page](https://github.com/loyata/instagram-clone/blob/main/images/personal-page.gif?raw=true)

#### 聊天

- [x] 创建新的聊天会话
- [x] 搜索功能
- [x] 显示会话创建时间和消息摘要
- [x] 留言和实时聊天
- [x] Leave messages or real time chat
- [ ] 多人聊天
- [ ] 视频/语音通话

![chat](https://github.com/loyata/instagram-clone/blob/main/images/personal-page.gif?raw=true)



### 如何运行

下载打本地

#### 前端

1. cd instagram-clone/frontend/

2. 依赖

   ```bash
   # with npm
   npm install
   ```

3. 创建S3存储桶 https://blog.devgenius.io/upload-files-to-amazon-s3-from-a-react-frontend-fbd8f0b26f5

4.  `.env`

   ```js
   REACT_APP_baseURL="Tomcat backend URL"  =>  e.g. "http://localhost:8080"
   
   //see https://www.mapbox.com/
   REACT_APP_geoAPIToken="Mapbox API Access Token"
   
   REACT_APP_S3_BUCKET="S3 Bucket Name"
   REACT_APP_REGION="AWS Region"
   REACT_APP_ACCESS_KEY="AWS access key"
   REACT_APP_SECRET_ACCESS_KEY="AWS secret key"
   ```

4. 运行

   ```bash
   npm run start
   ```

#### 后端

1. cd instagram-clone/backend/

2. 创建数据库

   ```sql
   CREATE DATABASE `instagramDB`;
   USE `instagramDB`;
   ```

3. 使用backend/sql 的.sql 生成表

4.  `pom.xml`依赖

5. 配置 `/backend/src/main/resources/application.properties` 

   ```code
   # DB Username
   spring.datasource.username=root
   # DB Password
   spring.datasource.password=123456
   # JDBC Driver
   spring.datasource.driver-class-name=com.mysql.cj.jdbc.Driver
   # JDBC URL
   spring.datasource.url=jdbc:mysql://localhost:3306/instagramDB?serverTimezone=UTC
   
   mybatis.typeAliasesPackage=ca.uottawa.ins.model
   mybatis.mapperLocations=classpath:mapper/*.xml
   mybatis.configuration.map-underscore-to-camel-case=true
   ```

6.  `backendApplication.java`

#### 批量创建模拟用户(Unsplash API)

 `/backend/python_scripts/user_generator.py`

1. 依赖

   ```shell
   pip install Faker
   ```

2. 创建Unsplash开发者账号拿到API Key

3. 自定义 `client_id`, `port_number` 和 `fake_users_to_generate` 

4. 运行
