# Skin Cancer Detection using CNN (Deep Learning)

This project is a simple deep learning-based skin cancer detection system. It uses a Convolutional Neural Network (CNN) to classify skin lesion images as either **Benign** or **Malignant**. I also built a basic Streamlit app where you can upload an image and get the prediction.

---

## About the Project

Skin cancer is one of the most common types of cancer worldwide. Detecting it early can help with treatment and outcomes.
This project uses image classification with deep learning to help in the initial screening of skin lesions.

The model was trained using TensorFlow/Keras and deployed using a Streamlit web interface.

> ⚠️**Note:** This project is only for learning and demonstration purposes. It should not be used for real medical diagnosis.

---

## Features

* CNN model for binary image classification
* Image preprocessing (resizing, normalization, etc.)
* Web app using Streamlit
* Upload image and get a prediction result (Benign or Malignant)

---

## Project Structure

```
.
├── skin-cancer-detection-with-cnn-deep-learning.ipynb  # Notebook for training the model
├── main.py                                              # Streamlit app
├── skin_cancer_cnn.h5                                   # Trained model (saved after training)
├── img.png                                              # App screenshot
├── img_1.png                                            # Another screenshot
└── README.md                                            # Project documentation
```

---

## Installation

Make sure you have Python installed. Then install the required packages:

```bash
pip install tensorflow keras streamlit numpy matplotlib pillow
```

---

## How to Train the Model (Optional)

If you want to train the model yourself, follow these steps:

1. Open the notebook:

   ```bash
   jupyter notebook skin-cancer-detection-with-cnn-deep-learning.ipynb
   ```

2. Go through the cells:

   * Load and preprocess the dataset
   * Build and train the CNN model
   * Save the trained model as `skin_cancer_cnn.h5`

---

## How to Run the Web App

Once you have the trained model (`skin_cancer_cnn.h5`) in the same folder as `main.py`, run the app with:

```bash
streamlit run main.py
```

It will open in your browser. You can upload a skin lesion image and get a prediction.

---

## Screenshots

App Interface:

![Screenshot](img.png)

Result Display:

![Screenshot](img_1.png)

---

## Key Code Example

**Prediction function from `main.py`:**

```python
def predict_skin_cancer(image_path, model):
    img = image.load_img(image_path, target_size=(224, 224))
    img_array = image.img_to_array(img) / 255.0
    img_array = np.expand_dims(img_array, axis=0)

    prediction = model.predict(img_array)
    class_label = "Malignant" if prediction > 0.5 else "Benign"
    return class_label, img
```

**CNN Architecture from the notebook:**

```python
model = Sequential([
    Conv2D(32, (3, 3), activation='relu', input_shape=(224, 224, 3)),
    MaxPooling2D((2, 2)),
    Conv2D(64, (3, 3), activation='relu'),
    MaxPooling2D((2, 2)),
    Conv2D(128, (3, 3), activation='relu'),
    MaxPooling2D((2, 2)),
    Flatten(),
    Dense(128, activation='relu'),
    Dense(1, activation='sigmoid')
])

model.compile(optimizer='adam',
              loss='binary_crossentropy',
              metrics=['accuracy'])
```

---

## License

This project is open-source under the [MIT License](LICENSE).

---

## About Me

I'm a student currently learning machine learning and deep learning. This project is part of my learning journey and portfolio. Feedback is welcome.
