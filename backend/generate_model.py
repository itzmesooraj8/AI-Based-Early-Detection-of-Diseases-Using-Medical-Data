import os
import tensorflow as tf
from tensorflow.keras import layers, models

def create_dummy_model():
    print("Creating a lightweight placeholder model...")
    
    # Create a simple CNN that matches the input shape expected by the backend (224, 224, 3)
    model = models.Sequential([
        layers.Input(shape=(224, 224, 3)),
        layers.Conv2D(16, (3, 3), activation='relu'),
        layers.MaxPooling2D((2, 2)),
        layers.Conv2D(32, (3, 3), activation='relu'),
        layers.MaxPooling2D((2, 2)),
        layers.Flatten(),
        layers.Dense(64, activation='relu'),
        layers.Dense(1, activation='sigmoid') # Binary classification: Malignant (1) vs Benign (0)
    ])

    model.compile(optimizer='adam',
                  loss='binary_crossentropy',
                  metrics=['accuracy'])

    model_path = os.path.join(os.path.dirname(__file__), 'skin_cancer_cnn.h5')
    
    # Save the model
    model.save(model_path)
    print(f"✅ Placeholder model created successfully at: {model_path}")
    print("This will allow the backend to start and process requests in real-time.")

if __name__ == "__main__":
    create_dummy_model()
