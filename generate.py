import json
import requests
from urllib.parse import quote

def handler(request):
    query = request.args
    prompt = query.get('prompt', '')
    model = query.get('model', 'light')

    if not prompt:
        return {'statusCode': 400, 'body': json.dumps({'error': 'No prompt'})}

    if model == 'light':
        api_url = f"https://ai-image-genl.vercel.app/?prompt={quote(prompt)}"
        image_url = api_url  # Direct API returns image URL
    else:
        image_url = None

    return {
        'statusCode': 200,
        'headers': {'Content-Type': 'application/json'},
        'body': json.dumps({'image': image_url})
    }