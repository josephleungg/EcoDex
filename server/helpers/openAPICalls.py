import os
from openai import OpenAI

def openApiCall(key, url):

    client = OpenAI(api_key=key)
    response = client.chat.completions.create(
    
        model="gpt-4o-mini",
    
        messages=[
            {
                "role": "user",
                "content": [
                    {"type": "text", "text": """Using the image provided, could you give us a response in this format: 
                                                Title:
                                                Description:
                                                Type of Waste: (Garbage/Recycling/Green Bin/Yard Waste/Battery Disposal) 
                                                Biodegradable: (Yes/No)
                                                Decompose Time:
                                                Approximate Weight:
                                                Approximate Dimensions:
                                                Amount of Liters of Water to Produce: 

                                                Try and give exact answers. For anything that youre unsure of, put N/A. Do not use any * and do not make any text bold.
                                                This is meant to be a way to get the enviromental information of a product. 
                                                If the image is not clear or there is not a clear product, just return an error message.
                                                """},
                    {
                    "type": "image_url",
                    "image_url": {
                        "url": url,
                        },
                    },
                ],
            }
        ],
        max_tokens=300,
    )
    return response.choices[0]