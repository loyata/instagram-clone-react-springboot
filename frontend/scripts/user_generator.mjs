import {v4 as uuidv4} from "uuid";
import axios from "axios";


const imageList = []

axios.get("https://api.unsplash.com/photos/random?" +
    "client_id=LewwQkA3HsCrfG-Ebo-8bvRoUkoCt-q_HCOkwieYwSs&orientation=landscape&count=30")
    .then((res) => {
        console.log(res.data.map(img => img.urls.small))
        imageList.concat(res.data.map(img => img.urls.small))
    })

// setInterval(() => {
//     axios.get("https://api.unsplash.com/photos/random?" +
//         "client_id=LewwQkA3HsCrfG-Ebo-8bvRoUkoCt-q_HCOkwieYwSs&orientation=landscape&count=30")
//         .then((res) => {
//             imageList.concat(res.data.map(img => img.urls.small))
//         })
// }, 5000)

console.log(imageList)


// const postData = {
//     postIdentifier:uuidv4().split('-')[uuidv4().split('-').length - 1],
//     imageUrl:'',
//     userId:1,
//     postDate:new Date().toISOString(),
//     postLocation:'',
//     postCaption:'',
//     postAlt:'',
//     postComments:0,
//     postLikes:0,
//     allowComment:true,
//     allowLike:true,
// }