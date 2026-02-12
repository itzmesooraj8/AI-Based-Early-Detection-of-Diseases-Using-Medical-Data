import os
import io
import sys
import numpy as np
from flask import Flask, request, jsonify
from flask_cors import CORS
from PIL import Image
from tensorflow.keras.models import load_model
from tensorflow.keras.preprocessing import image

# Initialize Flask App
app = Flask(__name__)

# Configure CORS to allow requests from the Next.js frontend
CORS(app, resources={r"/analyze": {"origins": "http://localhost:3000"}})

# Configuration
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
MODEL_PATH = os.path.join(BASE_DIR, 'skin_cancer_cnn.h5')
ALLOWED_EXTENSIONS = {'png', 'jpg', 'jpeg', 'webp'}

# Global Model Variable
model = None

def allowed_file(filename):
    return '.' in filename and \
           filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

def load_ai_model():
    """
     loads the AI model from the file system.
     If the model is not found, it prints a critical error but does not crash the server immediately,
     allowing for a graceful error response to the client.
    """
    global model
    if os.path.exists(MODEL_PATH):
        try:
            model = load_model(MODEL_PATH)
            print(f"✅ Model loaded successfully from {MODEL_PATH}")
        except Exception as e:
            print(f"❌ Error loading model: {e}")
            model = None
    else:
        print(f"❌ CRITICAL ERROR: Model file {MODEL_PATH} not found.")
        print("The server requires the pre-trained model to function.")
        model = None

# Load model at startup
load_ai_model()

def preprocess_image(img_bytes):
    """
    Preprocesses the image bytes for the AI model.
    Resizes to 224x224, normalizes pixel values, and expands dimensions.
    """
    try:
        # Open image from bytes
        img = Image.open(io.BytesIO(img_bytes)).convert("RGB")
        
        # Resize to model's expected input size
        img = img.resize((224, 224))
        
        # Convert to array and normalize
        img_array = image.img_to_array(img) / 255.0
        
        # Expand dimensions to create a batch of 1
        img_array = np.expand_dims(img_array, axis=0)
        
        return img_array
    except Exception as e:
        print(f"Error in preprocessing: {e}")
        return None

@app.route('/analyze', methods=['POST'])
def analyze():
    """
    Endpoint to analyze an image for skin cancer detection.
    Expects a multipart/form-data request with an 'image' file.
    """
    global model
    
    # 1. Strict Model Check
    if model is None:
        # Attempt to reload in case it was added later
        load_ai_model()
        if model is None:
            return jsonify({
                'error': 'Service Unavailable',
                'details': 'The AI model is currently offline. Please contact support.'
            }), 503

    # 2. Validate Request
    if 'image' not in request.files:
        return jsonify({'error': 'No image provided'}), 400
    
    file = request.files['image']
    
    if file.filename == '':
        return jsonify({'error': 'No selected file'}), 400
        
    if not allowed_file(file.filename):
         return jsonify({'error': 'Invalid file type. Allowed: png, jpg, jpeg, webp'}), 400

    try:
        # 3. Process Image
        img_bytes = file.read()
        processed_img = preprocess_image(img_bytes)
        
        if processed_img is None:
            return jsonify({'error': 'Failed to process image data'}), 400

        # 4. Perform Prediction
        prediction = model.predict(processed_img)
        
        # 5. Interpret Results (Binary Classification)
        # Assuming output is probability of Malignant (1) vs Benign (0)
        malignancy_score = float(prediction[0][0])
        is_malignant = malignancy_score > 0.5
        
        # Calculate confidence score (0.0 to 1.0)
        confidence = malignancy_score if is_malignant else 1.0 - malignancy_score
        
        # 6. Return Response
        result = {
            'status': 'malignant' if is_malignant else 'benign',
            'confidence': round(confidence * 100, 2), # Percentage
            'prediction_raw': malignancy_score,
            'timestamp': os.times().elapsed
        }
        return jsonify(result)

    except Exception as e:
        print(f"Prediction error: {e}")
        return jsonify({'error': 'Internal Analysis Error', 'details': str(e)}), 500

@app.route('/health', methods=['GET'])
def health():
    """Health check endpoint."""
    return jsonify({
        'status': 'online', 
        'model_loaded': model is not None,
        'model_type': 'CNN (ResNet Architecture)',
        'mode': 'production'
    })

if __name__ == '__main__':
    print("Starting VitalGuard AI Backend...")
    # Run on all interfaces (0.0.0.0) to ensure accessibility
    # Disable the reloader and debug mode for stable background execution
    app.run(host='0.0.0.0', port=5000, debug=False, use_reloader=False)
