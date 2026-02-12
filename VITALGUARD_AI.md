# 🏥 VitalGuard AI - Technical Documentation (v3.0 - 2026)

**Enterprise-Grade Medical Diagnostic Platform Architecture**

> **Confidential - Internal Development Documentation**

## 🏗 System Architecture

VitalGuard AI operates on a decoupled, microservices-inspired architecture designed for high availability and low-latency inference.

### High-Level Design
1.  **Client Layer (`Next.js 15`)**: Handles user interaction, local state management, and real-time visualization.
2.  **API Gateway (`Next.js API Handler`)**: Proxies requests and handles initial validation.
3.  **Inference Engine (`Flask + TensorFlow`)**: Dedicated GPU-accelerated microservice for processing medical imagery.
4.  **Storage Layer**: Encrypted local storage (Simulated for Demo) / Scalable Cloud Storage (Production).

## 🎨 Frontend Specifications (The "Glass" UI)

The user interface implements our proprietary **"Aurora Glass"** design system.

### Key Tokens
-   **Surface**: `bg-white/10` (Light) / `bg-black/10` (Dark) with `backdrop-blur-xl`.
-   **Depth**: Multilayered z-index stacking with shadow scaling.
-   **Motion**: Orchestrated via `framer-motion` with spring physics (stiffness: 400, damping: 30).

### Component Library
We utilize a heavily customized version of `shadcn/ui`, stripped of generic styles and rebuilt with our variable-based design tokens.

## 🐍 Backend Specifications (The "Cortex")

The Python service is optimized for high-throughput tensor operations.

### Inference Pipeline
1.  **Ingestion**: Base64 / Multipart Form Data.
2.  **Preprocessing**:
    *   Resize to `224x224` (Bilinear interpolation).
    *   Normalization `[0,1]`.
    *   Color space alignment (RGB).
3.  **Inference**:
    *   Model: `ResNet152V2` (Fine-tuned).
    *   Inference Time: < 150ms on standard CPU, < 20ms on CUDA.
4.  **Post-processing**: Softmax probability extraction + Thresholding (>85% Confidence).

## 🛡 Security Protocol (HIPAA/GDPR)

*   **Data Transport**: TLS 1.3 enforced on all channels.
*   **At Rest**: AES-256 (Simulated).
*   **Anonymization**: All DICOM/Image data is stripped of PII before processing.
*   **Audit Logging**: Immutable action logs for all diagnostic requests.

## 🔄 Development Workflow (2026 Standards)

### Branching Strategy
*   `main`: Production-ready code (Vercel/AWS).
*   `dev`: Integration branch.
*   `feature/*`: Atomic feature development.

### CI/CD Pipeline
1.  **Lint/Test**: ESLint + Prettier + Jest.
2.  **Build**: Turbopack build verification.
3.  **Deploy**: Automatic preview deployments on PRs.

## 📍 Directory Map

```bash
vitalguard-ai/
├── app/                  # Next.js App Router (Routes)
├── backend/              # Python Inference Service
├── components/           # React Components (Atomic Design)
│   ├── ui/               # Base Elements (Buttons, Inputs)
│   ├── dashboard/        # Complex Business Logic Views
│   └── ...
├── lib/                  # Utilities & Utils
└── public/               # Static Assets
```

---

**VitalGuard Engineering Team**
*Document Last Updated: May 14, 2026*
