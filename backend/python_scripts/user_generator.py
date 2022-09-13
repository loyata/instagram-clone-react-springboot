from faker import Faker
import requests
import json


faker = Faker()

def generate(num = 15):
    r = requests.get("https://api.unsplash.com/photos/random?client_id=LewwQkA3HsCrfG-Ebo-8bvRoUkoCt-q_HCOkwieYwSs&orientation=portrait&count=" + str(num))
    obj = json.loads(r.text)

    for i in range(num):
        formData = {}
        name = faker.name()
        userName = name.split(' ')[0][0].lower() + '_' + name.split(' ')[1]
        formData['fullName'] = name
        formData['userName'] = userName
        formData['password'] = userName + '_password'
        formData['avatar'] = obj[i]['urls']['small_s3']
        formData['email'] = faker.email()

        requests.post('http://localhost:8080/accounts/signup', json.dumps(formData))
        print(formData)
        break

generate()



