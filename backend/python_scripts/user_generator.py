from faker import Faker
import requests
import json
import random
import uuid
import datetime

faker = Faker()

def generate(num_user):
    r = requests.get("https://api.unsplash.com/photos/random?client_id=LewwQkA3HsCrfG-Ebo-8bvRoUkoCt-q_HCOkwieYwSs&orientation=portrait&count=" + str(num_user))
    obj = json.loads(r.text)

    for i in range(num_user):
        formData = {}
        name = faker.name()
        userName = name.split(' ')[0][0].lower() + '_' + name.split(' ')[1]
        formData['fullName'] = name
        formData['userName'] = userName
        formData['password'] = userName + '_password'
        formData['avatar'] = obj[i]['urls']['small_s3']
        formData['email'] = faker.email()

        requests.post('http://localhost:8080/accounts/signup', json.dumps(formData))


        user = requests.get('http://localhost:8080/users/username/' + userName)

        userId = json.loads(user.text)['userId']
        current_user_photo_num = random.randint(10, 30)
        r2 = requests.get("https://api.unsplash.com/photos/random?client_id=LewwQkA3HsCrfG-Ebo-8bvRoUkoCt-q_HCOkwieYwSs&orientation=landscape&count=" + str(current_user_photo_num))
        obj2 = json.loads(r2.text)

        for j in range(current_user_photo_num):
            postFormData = {}

            location = obj2[j]['location']['title']
            if location == 'None':
                location = ''

            postFormData['postIdentifier'] = uuid.uuid4().hex[-1:-13:-1]
            postFormData['imageUrl'] = obj2[j]['urls']['regular']
            postFormData['userId'] = userId
            postFormData['postDate'] = obj2[j]['created_at']
            postFormData['postLocation'] = location
            postFormData['postCaption'] = str(obj2[j]['description'])
            postFormData['postAlt'] = str(obj2[j]['alt_description'])
            postFormData['postComments'] = 0
            postFormData['postLikes'] = 0
            postFormData['allowComment'] = 0
            postFormData['allowLike'] = 0

            print(postFormData)

            requests.post('http://localhost:8080/posts/new', json.dumps(postFormData))
            break
        break

generate(10)



