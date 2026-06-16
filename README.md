# ArtInMotion.Live

ArtInMotion.Live is a next‑generation platform for **3D volumetric live streaming**, designed for movement‑based arts such as **Capoeira Regional**, martial arts, dance, fitness, and physiotherapy.

The platform captures human motion using multiple cameras (smartphones/tablets), reconstructs a **3D pose model** in real time, and streams it to any device — TV, browser, AR or VR.

---

## 🚀 Vision

Enable anyone to **teach, learn, and experience movement arts** through immersive 3D live streaming — from Capoeira rodas to dance classes, martial arts training, and beyond.

---

## 🧱 Architecture Overview

ArtInMotion.Live is built using **Clean Architecture** on .NET 10, with a modern React frontend and WebRTC for low‑latency streaming.

### **Core Components**

- **Backend (API + Processing)**
  - .NET 10
  - Clean Architecture (Domain, Application, Infrastructure, API)
  - MediatR + FluentValidation
  - SignalR for real‑time sync
  - WebRTC signaling server
  - Optional GPU‑based pose reconstruction (future)

- **Frontend (Web Client)**
  - React + TypeScript
  - WebRTC video capture
  - 3D rendering with Babylon.js or Three.js
  - UI for lessons, sessions, and playback

- **Motion Capture**
  - MediaPipe / MoveNet for 3D pose estimation
  - Multi‑camera fusion (future)
  - Local or server‑side processing

- **Streaming**
  - WebRTC (low latency)
  - Optional cloud TURN servers
  - Real‑time pose data broadcasting

---

## 📦 Project Structure

/src
/ArtInMotionLive.Api
/ArtInMotionLive.Application
/ArtInMotionLive.Domain
/ArtInMotionLive.Infrastructure
/ArtInMotionLive.WebClient (React)
/ArtInMotionLive.Tests


---

## 🛠️ Tech Stack

### **Backend**
- .NET 10
- Clean Architecture
- MediatR
- SignalR
- WebRTC signaling
- Azure/AWS ready

### **Frontend**
- React + TypeScript
- WebRTC
- Babylon.js / Three.js
- Vite or Next.js (optional)

### **Motion Tracking**
- MediaPipe 3D
- MoveNet 3D
- MMPose (future)
- Multi‑camera triangulation (future)

---

## 🧪 Roadmap (MVP → Future)

### **MVP**
- Single‑camera 3D pose tracking
- Real‑time pose streaming
- Basic 3D avatar rendering
- Session recording + playback

### **Phase 2**
- Multi‑camera fusion
- Instructor mode
- Lesson templates
- Capoeira‑specific movement library

### **Phase 3**
- AR/VR clients
- AI‑based movement correction
- Marketplace for instructors

---

## 📄 License

License will be added later.

---

## 🤝 Contributing

The repository is currently private.  
Collaborators may be invited during early development.

---

## 🌐 Website (future)

https://artinmotionlive.com
