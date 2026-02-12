# VitalGuard AI - ML Research Module

![ML Research Banner](https://via.placeholder.com/1000x300?text=VitalGuard+AI+-+Research+Division)

> **Core Research Prototype for Skin Lesion Classification**

This directory contains the foundational research and development work for the **VitalGuard AI** diagnostic engine. It includes the exploratory data analysis (EDA), Convolutional Neural Network (CNN) architecture experimentation, and the initial model training pipelines that paved the way for the production-grade system.

## 🔬 Research Objectives

1.  **Binary Classification:** Develop a robust model to distinguish between **Benign** and **Malignant** skin lesions.
2.  **Architecture Optimization:** evaluate the performance of custom CNN architectures vs. transfer learning (e.g., MobileNetV2, ResNet50).
3.  **Data Augmentation:** Implement advanced augmentation techniques to address class imbalance in medical datasets.
4.  **Prototype Deployment:** Validated model inference using a rapid-prototype Streamlit interface before backend integration.

## 📂 Module Structure

```
Skin-cancer-detection-using-CNN/
├── skin-cancer-detection-with-cnn-deep-learning.ipynb  # Jupyter Notebook for Training & Validation
├── main.py                                             # Streamlit Research Prototype
├── skin_cancer_cnn.h5                                  # Serialized Model Weights (HDF5)
└── assets/                                             # Evaluation metrics and plots
```

## 🧠 Model Architecture (Experimental)

The initial research focused on a custom sequential CNN to establish a baseline:

```python
model = Sequential([
    # Feature Extraction
    Conv2D(32, (3, 3), activation='relu', input_shape=(224, 224, 3)),
    MaxPooling2D((2, 2)),

    Conv2D(64, (3, 3), activation='relu'),
    MaxPooling2D((2, 2)),

    Conv2D(128, (3, 3), activation='relu'),
    MaxPooling2D((2, 2)),

    # Classification Head
    Flatten(),
    Dense(128, activation='relu'),
    Dropout(0.5), # Regularization
    Dense(1, activation='sigmoid')
])
```

*Note: The production system (Main VitalGuard App) utilizes a more complex ResNet152V2 architecture for higher accuracy.*

## 📊 Performance Metrics

| Metric | Score |
| :--- | :--- |
| **Accuracy** | 92.4% |
| **Precision** | 90.1% |
| **Recall** | 88.5% |
| **F1-Score** | 89.3% |

*(Metrics based on validation split of the ISIC dataset)*

## 🚀 Running the Prototype

To explore the model interactively via the Streamlit interface:

### 1. Install Dependencies
```bash
pip install tensorflow keras streamlit numpy matplotlib pillow
```

### 2. Launch App
```bash
streamlit run main.py
```

## 🔗 Integration with VitalGuard AI

This research modules serves as the **sandbox** for our data science team. Usage of this code is strictly for model validation and experimentation. For the production application, please refer to the root `VitalGuard-AI/` directory.

---

**© 2026 VitalGuard Research.** *Advancing Dermatology with Deep Learning.*
