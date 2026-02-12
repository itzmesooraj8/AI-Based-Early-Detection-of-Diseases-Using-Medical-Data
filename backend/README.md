# VitalGuard AI - Backend Engine

![VitalGuard AI Backend](https://via.placeholder.com/800x200?text=VitalGuard+AI+-+Intelligent+Backend)

The **VitalGuard AI Backend** is the analytical core of the system, responsible for handling image processing requests, executing TensorFlow/Keras inference, and providing diagnostic results to the frontend. Built with **Flask**, it exposes a RESTful API designed for speed, reliability, and security.

## 🚀 Overview

-   **Framework:** Flask (Python Microframework)
-   **Model Architecture:** Convolutional Neural Network (CNN) - ResNet152V2 / Custom
-   **Processing:** OpenCV and PIL for image augmentation and preprocessing.
-   **API Design:** RESTful endpoints for `/scan`, `/history`, and `/auth`.
-   **Cors:** Configured for seamless cross-origin communication with the frontend.

## 📦 Requirements

-   Python 3.10+
-   `tensorflow` >= 2.16
-   `flask`
-   `flask-cors`
-   `opencv-python`
-   `numpy`
-   `Pillow`

## 🛠️ Setup & Installation

### 1. Environment Setup

It is highly recommended to use a virtual environment to manage dependencies.

```bash
# Verify Python version
python --version

# Create virtual environment
python -m venv venv

# Activate on Windows
venv\Scripts\activate

# Activate on macOS/Linux
source venv/bin/activate
```

### 2. Install Dependencies

```bash
pip install -r requirements.txt
```

If `requirements.txt` is missing, you can install the core packages manually:

```bash
pip install flask flask-cors tensorflow opencv-python numpy Pillow
```

### 3. Model Files

Ensure your trained model file (`model.h5` or equivalent) is located in the `models/` directory or at the root, as referenced in `app.py`.

## 📡 API Endpoints

### `POST /api/scan`

Processes an uploaded image and returns a diagnostic prediction.

**Body:** `FormData` containing an image file under the key `image`.

**Response:**
```json
{
  "status": "success",
  "prediction": "Benign",
  "confidence": 98.5,
  "details": {
    "class_id": 0,
    "label": "Melanocytic nevi"
  }
}
```

### `GET /api/health`

Checks the operational status of the backend.

**Response:**
```json
{
  "status": "online",
  "version": "2.4.0",
  "timestamp": "2026-05-14T15:30:00Z"
}
```

## 🧠 Neural Architecture

The backend utilizes a fine-tuned ResNet152V2 model, trained on the ISIC Archive dataset. The model accepts images resized to `224x224` pixels and classifies them into one of 7 diagnostic categories.

## 🔒 Security Notes

-   Input validation is performed on all image uploads.
-   CORS is restricted to authorized frontend domains in production.
-   Detailed error logging is enabled for debugging but sanitized for client responses.

---

**VitalGuard AI Backend Team | 2026**
