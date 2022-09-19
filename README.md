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

#### Sign Up & Log in

- [x] Email address & password verification (frontend)
- [x] Password authenticatoin with JWT
- [x] Check is username or email is taken (backend)
- [x] Check if username or email is taken (backend)
- [ ] Facebook Login
- [ ] css animation when image switches

<img src="https://s3.us-east-1.amazonaws.com/loyata.images/signup_page.png" style="zoom:50%;" />

![](https://s3.amazonaws.com/loyata.images/log-in-page.gif)

### Main Page

The main page is consisted of four major parts:

- A navbar 
- A card that displays current user's friends
- A main display area that shows random posts/ friends' posts/ saved posts(based on the selection on the navbar)
- Personal information and friend recommendations

![hippo](https://github.com/loyata/instagram-clone/blob/main/images/main-page-display.gif?raw=true)



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
