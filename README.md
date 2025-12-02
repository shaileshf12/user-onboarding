# User Onboarding Flow Application

A simple multi-step user onboarding flow built using **React**, **Redux**, **Ant Design**, **Formik**, and **TypeScript**.  
The app demonstrates login authentication and a step-by-step form process.

---

## Deployment Link

**Live Demo:** https://dancing-axolotl-822904.netlify.app

---

## Tech Stack

- **React**
- **Redux**
- **Ant Design**
- **Formik**
- **TypeScript**
- **Vite**

---

## Application Flow

1. **Login Page**
   - Credentials:
     - **Username:** `user123`
     - **Password:** `password123`
   - After login success → Redirect to onboarding steps.

2. **Onboarding Steps**
   - **Step 1:** Profile Details
   - **Step 2:** Add Songs
   - **Step 3:** Add Payment Details
   - **Step 4:** Successful Onboarding

3. **Home Page**
   - Displays **Welcome message**

---

## Folder Structure

```bash
src
│-- main.tsx
│-- App.tsx
│-- store.ts
│-- utils.ts
│-- types.ts
│
├── redux
│   ├── authSlice.ts
│   └── onboardingSlice.ts
│
├── pages
│   ├── LoginPage.tsx
│   ├── Onboarding.tsx
│   └── Home.tsx
│
└── components
    ├── Step1Profile.tsx
    ├── Step2Songs.tsx
    ├── Step3Payment.tsx
    ├── Step4Success.tsx
    ├── CardContainer.tsx
    └── NavBar.tsx
```
