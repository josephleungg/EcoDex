import base64
import requests

def imgurUpload(imagePath):
    
    # Set API endpoint and headers
    url = "https://api.imgur.com/3/image"
    headers = {"Authorization": "Client-ID d492ddb0e18eea5"}

    print("hello")

    # Read image file and encode as base64
    with open(imagePath, "rb") as file:
        data = file.read()
        base64_data = base64.b64encode(data)

    # Upload image to Imgur and get URL
    response = requests.post(url, headers=headers, data={"image": base64_data})
    url = response.json()["data"]["link"]
    print(url)

    return url