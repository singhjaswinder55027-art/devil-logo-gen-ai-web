import os
from flask import Flask, render_template, request, jsonify
from urllib.parse import quote

# Vercel ke environment ke hisab se path set karna
template_dir = os.path.abspath(os.path.join(os.path.dirname(__file__), '..', 'templates'))
static_dir = os.path.abspath(os.path.join(os.path.dirname(__file__), '..', 'static'))

app = Flask(__name__, template_folder=template_dir, static_folder=static_dir)

# API endpoint
API_URL = "https://ai-image-genl.vercel.app/"

@app.route('/')
def home():
    return render_template('index.html')

@app.route('/generate-image')
def generate_image():
    prompt = request.args.get('prompt')
    if not prompt:
        return jsonify({'error': 'Prompt is required.'}), 400
    encoded_prompt = quote(prompt)
    image_url = f"{API_URL}?prompt={encoded_prompt}"
    return jsonify({'image_url': image_url})

# Yeh zaroori hai, Flask instance ka naam 'app' hi hona chahiye
# Vercel isi ko dhoondhta hai.
turn the direct URL.
    return jsonify({'image_url': image_url})

# This part is needed for local testing, Vercel will use its own entry point.
if __name__ == '__main__':
    app.run(debug=True)
