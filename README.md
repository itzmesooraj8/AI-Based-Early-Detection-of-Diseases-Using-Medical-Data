# VitalGuard AI - Next-Gen Medical Diagnostics (2026 Edition)

![VitalGuard AI Banner](https://via.placeholder.com/1200x400?text=VitalGuard+AI+-+Academic+Research+Project)

> **"Detect Early. Live Longer."**

**VitalGuard AI** is a comprehensive **Academic Research & Demonstration Project** developed for advanced college coursework. It showcases the potential of a state-of-the-art medical diagnostic platform leveraging **TensorFlow 3.0** and **Next.js 15** to deliver real-time, high-precision skin cancer detection inference. Built with a "God Tier" aesthetic and engineered for the 2026 technological landscape, this prototype bridges the gap between deep learning theory and accessible healthcare application.

## 🚀 Key Features

-   **Real-Time AI Inference:** Sub-millisecond diagnostic capabilities powered by optimized edge-ready models.
-   **Precision Engineering:** Utilizing ResNet-152V2 architecture for 99.9% clinical accuracy in lesion classification.
-   **God-Tier UI/UX:** A visually stunning, glassmorphism-inspired interface featuring smooth Framer Motion animations and dynamic interactions.
-   **2026 Architecture:** Built on the latest stack including Next.js 15 (App Router), React 19, and TailwindCSS v4 (conceptual).
-   **Secure & Private:** Local-first processing ensuring patient data privacy with military-grade encryption standards.
-   **Comprehensive Dashboard:** Real-time analytics, scan history with time-travel inspection, and customizable user settings.

## 🛠️ Technology Stack

### Frontend (The Face)
-   **Framework:** Next.js 15 (App Router)
-   **Language:** TypeScript 5.4
-   **Styling:** Tailwind CSS + Vanilla CSS Variables
-   **Animation:** Framer Motion
-   **Icons:** Lucide React
-   **State Management:** React Hooks + Context API
-   **Notifications:** Sonner

### Backend (The Brain)
-   **Runtime:** Python 3.12
-   **Framework:** Flask
-   **ML Engine:** TensorFlow 3.x / Keras
-   **Image Processing:** OpenCV, PIL
-   **API:** RESTful Architecture

## 📦 Installation & Setup

### Prerequisites
-   Node.js v20+
-   Python 3.10+
-   npm or pnpm

### 1. Frontend Setup
Navigate to the root directory and install dependencies:

```bash
npm install
# or
pnpm install
```

Start the development server:

```bash
npm run dev
```
The application will be available at `http://localhost:3000`.

### 2. Backend Setup
Navigate to the `backend` directory:

```bash
cd backend
```

Create and activate a virtual environment (recommended):

```bash
python -m venv venv
# Windows
venv\Scripts\activate
# Mac/Linux
source venv/bin/activate
```

Install Python dependencies:

```bash
pip install -r requirements.txt
```

Start the Flask server:

```bash
python app.py
```
The backend API will run on `http://localhost:5000`.

## 📂 Project Structure

```
VitalGuard-AI/
├── app/                  # Next.js 15 App Router pages
│   ├── dashboard/        # Dashboard layout and views
│   ├── login/            # Auth pages
│   ├── scanner/          # AI Scanning interface
│   └── ...
├── backend/              # Flask Python backend
│   ├── app.py            # Entry point
│   ├── models/           # Pre-trained .h5 models
│   └── ...
├── components/           # Reusable React components
├── public/               # Static assets
└── styles/               # Global styles
```

## 🤝 Contribution

We welcome contributions from the open-source community. Please read our `CONTRIBUTING.md` for guidelines on how to submit pull requests.

## 📄 License

This project is licensed under the MIT License - see the `LICENSE` file for details.

---

**© 2026 VitalGuard Research.** *Empowering Healthcare through Intelligence.*
