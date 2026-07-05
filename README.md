# 🎓 EduTrack — Modern Learning Management & Assessment System

EduTrack is a premium, full-stack Learning Management System (LMS) built with **Next.js 15, React 18, TypeScript, Mongoose, and MongoDB**. Engineered with real product workflows, it supports a rich, roles-based architecture (Students, Instructors, Admins), integrated Stripe payments, secure Clerk authentication, and an advanced automated quiz/assessment engine.

---

## 🖥️ UI Dashboard Preview

![EduTrack UI Mockup](public/assets/edutrack_mockup.png)

---

## 🛠️ Tech Stack & Services

*   **Framework**: Next.js 15 (App Router), React 18, TypeScript
*   **Styling**: Vanilla CSS & Tailwind CSS for maximum responsiveness
*   **Database**: MongoDB with Mongoose ODM (fully relational populates)
*   **Authentication**: Clerk Auth (Server & Client sync)
*   **Payments**: Stripe (Secure Checkout Sessions & Webhooks integration)
*   **Media Storage**: Cloudinary (Image & media uploads)
*   **State Management**: Zustand

---

## ⚙️ Quick Start & Local Setup

### 1. Clone & Install Dependencies
```bash
git clone https://github.com/dubeypranaviiit/edu-track.git
cd edu-track
npm install
```

### 2. Configure Environment Variables
Copy the template `.env.example` file to create your local variables configuration:
```bash
cp .env.example .env.local
```
Fill in the credentials in `.env.local` for the following:
*   **Clerk**: Setup Clerk Application keys, Webhook Secret (for user updates).
*   **MongoDB**: Connection URI string (local or Mongo Atlas).
*   **Stripe**: API keys and Webhook signing secret.
*   **Cloudinary**: Cloud name, API Key, and Secret.

### 3. Run Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) to view the app.

---

## 🏗️ Architecture & Data Flow Diagram

```mermaid
flowchart TD
    subgraph Client Roles
        Student["👨‍🎓 Student"]
        Instructor["👨‍🏫 Instructor"]
        Admin["👑 Admin"]
    end

    subgraph Authentication & Gateway
        Clerk["🔐 Clerk Auth"]
    end

    subgraph Platform Services
        NextJS["🚀 Next.js API Routes"]
        Stripe["💳 Stripe API"]
        Cloudinary["📁 Cloudinary API"]
    end

    subgraph Data Layer
        MongoDB[("🍃 MongoDB / Mongoose")]
    end

    %% Flows
    Student -->|1. Authenticates| Clerk
    Instructor -->|1. Authenticates| Clerk
    Admin -->|1. Authenticates| Clerk

    Student -->|2. Stripe Checkout Request| NextJS
    NextJS -->|3. Initiates Session| Stripe
    Stripe -->|4. Webhook Confirmation| NextJS
    NextJS -->|5. Grants Course Enrollment| MongoDB

    Instructor -->|Uploads Course Assets| NextJS
    NextJS -->|Streams Media| Cloudinary
    NextJS -->|Persists Chapters & Items| MongoDB

    Admin -->|Toggles Instructor Vacancies| MongoDB
    Student -->|Applies to teach (If Vacancy Open)| NextJS
    Admin -->|Approves Applications| NextJS
    NextJS -->|Promotes Role to Instructor| MongoDB
```

---

## 🧩 Core Platform Workflows

### 1. Student Course Access & Learning
*   Secure browse/search, course landing pages with price discounts.
*   Secure course checkout via Stripe.
*   Learning dashboard supporting chapter-subtopic progression, video lecture streaming, and text readings.
*   Real-time grading list & analytics.

### 2. Instructor Authoring Suite
*   Course builder interface with dynamic chapters, subtopics, and nested item uploads.
*   Interactive quiz creation utilizing **percentage-based passing criteria** (auto-adjusts required score relative to question point edits).
*   Student quiz submission analysis, text-based assignments review, and grading feedback workspace.

### 3. Admin Control Panel
*   Comprehensive statistics and analytics dashboard.
*   User account suspension (interferes user actions globally via middleware checks).
*   Verification and approval pipeline for pending instructor requests.
*   **Site Settings Vacancy Switcher**: Toggles student instructor application eligibility in real-time.

---

## 📜 License
Built for educational and product demonstration purposes. 

**Developed by Pranav Abhimanyu**
Third-year engineering student passionate about building highly scalable systems and real-world UI products.
