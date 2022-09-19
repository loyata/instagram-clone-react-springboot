Instagram-Clone
=======

<img src="https://s3.us-east-1.amazonaws.com/loyata.images/instagram-clone-logo.png" alt="avatar" style="zoom:67%;" />

## Project description

**Create your own instagram app!**

This project is a clone of the Instagram web-side app.

The main tech stack includes **React.js + Redux + Axios + React Router v6** for the frontend, **Spring Boot + MyBatis** for the backend. Most UI components are 100% customized with CSS, only a few make use of **Material UI & Antd**. User images and avatars will be uploaded to **AWS S3 buckets.** 

The objectives of this project is to implement most native intagram web-app's functionalities, and to be as consistent as possible with the native site in terms of UI. With over **6 main modules**, over **30 react components**, this is one of the most authentic and comprehensive clones of instagram on github. Though some code snippets are currently not best practices and refactoring is needed, I'm sure this will improve with time and welcome to contribute!

This project is only for study purposes, materials, logos, and designs involved are facebook's properties.

## Preview & Functionalities

### Sign Up & Log in

- [x] Email address & password verification (frontend)
- [x] Password authenticatoin with JWT
- [x] Check is username or email is taken (backend)
- [x] Check if username or email is taken (backend)
- [ ] Facebook Login
- [ ] css animation when image switches

<img src="https://s3.us-east-1.amazonaws.com/loyata.images/signup_page.png" style="zoom:50%;" />

![log-in](https://github.com/loyata/instagram-clone/blob/main/images/log-in-page.gif?raw=true)

### Main Page

The main page is consisted of four major parts:

- A navbar 
- A card that displays current user's friends
- A main display area that shows random posts/ friends' posts/ saved posts(based on the selection on the navbar)
- Personal information and friend recommendations

![hippo](https://github.com/loyata/instagram-clone/blob/main/images/main-page-display.gif?raw=true)

### Search

- [x] search users in the database based on string comparision

![search](https://github.com/loyata/instagram-clone/blob/main/images/search-results.png?raw=true)

### Create a new post
- [x] The page could be called anywhere in the web-app
- [x] Crop image
- [x] Set Image Size(drag supported)
- [x] Add preset filters to the image with CSS (thanks to https://github.com/picturepan2/instagram.css)
- [x] Adjust Brightness, Contrast, Temperature, Fade, Saturation, Vignette with sliders
- [x] Add caption and alt
- [x] Location suggestion (with Mapbox API)
- [ ] Upload multiple images at same time
![hippo](https://github.com/loyata/instagram-clone/blob/main/images/make_new_posts.gif?raw=true)

### Explore
- [x] Images display as a quilted list
- [x] click to view details

![hippo](https://github.com/loyata/instagram-clone/blob/main/images/explore-images.gif?raw=true)

### Get recent reports

- [x] new followers along with event date will be arranged and displayed
- [x] users can follow back

![recent-posts](https://github.com/loyata/instagram-clone/blob/main/images/get-recent-reports.png?raw=true)

### Operations on a single post

- [x] unfollow/unfollow the post's author
- [x] copy the post's url to the clipboard
- [x] like the post
- [x] save the post
- [x] leave comments
- [x] go to the post page(open the post)
- [ ] send notifications when a post is liked

![single](https://github.com/loyata/instagram-clone/blob/main/images/single-post-ops.gif?raw=true)

### Personal Display Page

- [x] Display avatar, username, number of followers/followings
- [x] follow and unfollow, send messages(if this is someone else's homepage)
- [x] go to settings(if this is current user's homepage)
- [x] display all posts and saved posts
- [x] display a post's likes and comments when mouse hover above the image
- [x] click an image to view details
- [ ] tags part that stores all posts that hashtagged by others

![personal_page](https://github.com/loyata/instagram-clone/blob/main/images/personal-page.gif?raw=true)

### Chat

- [x] Create new chat sessions with search function
- [x] display session time and message digestion
- [x] Leave messages or real time chat
- [ ] Multi-person chat
- [ ] video/phone call

![chat](https://github.com/loyata/instagram-clone/blob/main/images/personal-page.gif?raw=true)



## How to run

After cloning or downloading the repo

### Frontend

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

### Backend

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

### Generate Fake Users

For better experience, it is recommended to generate some fake users in advance. We can use Unsplash API to get random photos we need.

To generate, please refer to the Python script under `/backend/python_scripts/user_generator.py`

1. install dependency

   ```shell
   pip install Faker
   ```

2. Create an unsplash developer account and get the clientId

3. configure `client_id`, `port_number` and `fake_users_to_generate` in `user_generator.py`

4. run the code

