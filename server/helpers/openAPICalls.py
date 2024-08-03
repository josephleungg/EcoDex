import os
from openai import OpenAI


def openApiCall(key):


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

                                                Try and give exact answers. For anything that youre unsure of, put N/A
                                                """},
                    {
                    "type": "image_url",
                    "image_url": {
                        "url": "https://www.fixfactory.ca/wp-content/uploads/iPhone-12-and-12-Pro-Battery-Replacement-Fix-Factory-Canada.jpg",
                        },
                    },
                ],
            }
        ],
        max_tokens=300,
    )
    
    return response.choices[0]