import requests

data = {
    # dont need id it will increment in DB
    # "id": "1",
    "email": "jacob@1xp.fr",
    "username": "jacob",
    "password": "jacob123",
}

r = requests.post("http://127.0.0.1:8000/v1/register", json=data)
print(r.text)
