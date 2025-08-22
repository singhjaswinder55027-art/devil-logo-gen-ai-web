from flask import Flask, render_template, request, jsonify
import requests
from urllib.parse import quote

app = Flask(__name__, template_folder='../templates', static_folder='../static')

# API endpoint for the image generation model
API_URL = "https://ai-image-genl.vercel.app/"

@app.route('/')
def home():
    """Renders the main page."""
    return render_template('index.html')

@app.route('/generate-image')
def generate_image():
    """Generates an image by calling the external API."""
    prompt = request.args.get('prompt')
    if not prompt:
        return jsonify({'error': 'Prompt is required.'}), 400

    # URL-encode the prompt to handle special characters
    encoded_prompt = quote(prompt)
    
    # Construct the full URL for the API call
    image_url = f"{API_URL}?prompt={encoded_prompt}"
    
    # In a real-world scenario, you might fetch the image and re-serve it.
    # But for simplicity and speed, we can just return the direct URL.
    return jsonify({'image_url': image_url})

# This part is needed for local testing, Vercel will use its own entry point.
if __name__ == '__main__':
    app.run(debug=True)
