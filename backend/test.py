import requests
import time

data = {
    "email": "jacob@1xp.fr",
    "username": "jacob",
    "password": "jacob123",
}

url = "http://127.0.0.1:8000/v1/register"

while True:
    try:
        r = requests.post(url, json=data)
        print(r.text)

        # Check if the response is successful (status code 200)
        if r.status_code == 200:
            print("Registration successful!")
            break
        else:
            print(f"Failed to register: {r.status_code}. Retrying...")
            time.sleep(2)  # Wait before retrying
    except requests.exceptions.RequestException as e:
        print(f"An error occurred: {e}. Retrying...")
        time.sleep(2)  # Wait before retrying

