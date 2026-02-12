import os
from flask import Flask, request, jsonify
from flask_cors import CORS
import numpy as np
from tensorflow.keras.preprocessing import image
from tensorflow.keras.models import load_model
from PIL import Image
import io

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

MODEL_PATH = 'skin_cancer_cnn.h5'
model = None

def load_ai_model():
    global model
    if os.path.exists(MODEL_PATH):
        try:
            model = load_model(MODEL_PATH)
            print(f"Model loaded from {MODEL_PATH}")
        except Exception as e:
            print(f"Error loading model: {e}")
            model = None
    else:
        print(f"Model file {MODEL_PATH} not found. Please place the trained .h5 file in the backend directory.")
        model = None

# Load model once at startup
load_ai_model()

def preprocess_image(img_bytes):
    # Retrieve image from bytes
    img = Image.open(io.BytesIO(img_bytes)).convert("RGB")
    img = img.resize((224, 224))
    img_array = image.img_to_array(img) / 255.0
    img_array = np.expand_dims(img_array, axis=0) # Batch dimension
    return img_array

@app.route('/analyze', methods=['POST'])
def analyze():
    global model
    if 'image' not in request.files:
        return jsonify({'error': 'No image provided'}), 400
    
    file = request.files['image']
    if file.filename == '':
        return jsonify({'error': 'No selected file'}), 400

    if model is None:
        # Try finding the model again in case user just added it
        load_ai_model()
        if model is None:
            return jsonify({'error': 'Model not loaded. Please ensure skin_cancer_cnn.h5 is present.'}), 503

    try:
        img_bytes = file.read()
        processed_img = preprocess_image(img_bytes)
        
        if model is None or model == "MOCK":
            print("Model not found. Using mock prediction.")
            import random
            is_malignant = random.choice([True, False])
            confidence = random.uniform(0.7, 0.99)
            result = {
                'status': 'malignant' if is_malignant else 'benign',
                'confidence': round(confidence * 100, 2),
                'prediction_raw': float(confidence) if is_malignant else 1.0 - float(confidence),
                'mock': True
            }
            return jsonify(result)

        prediction = model.predict(processed_img)
        # Assuming binary classification: Malignant > 0.5
        is_malignant = prediction[0][0] > 0.5
        confidence = float(prediction[0][0]) if is_malignant else 1.0 - float(prediction[0][0])
        
        result = {
            'status': 'malignant' if is_malignant else 'benign',
            'confidence': round(confidence * 100, 2),
            'prediction_raw': float(prediction[0][0])
        }
        return jsonify(result)

    except Exception as e:
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    # Run on port 5000 (standard for Flask)
    app.run(host='0.0.0.0', port=5000, debug=True)
