# The Wild Oasis 🏨

A full-featured hotel management application built for internal use by hotel employees. This app helps staff manage cabins, bookings, and guests efficiently — all in a modern, responsive interface with dark mode support.

[🔗 Live Demo on Vercel](https://the-wild-oasis-app-wine.vercel.app)  
[📂 GitHub Repository](https://github.com/Anaare/the-wild-oasis-app)

---

## ✨ Features

### ✅ Authentication & User Management

- Employees must log in to access the application.
- New users can only be created from within the application.
- Authenticated users can:
  - Upload/change their avatar
  - Update their name and password

### 🛏️ Cabins Management

- View all cabins in a table with:
  - Photo
  - Name
  - Capacity
  - Price
  - Current discount
- Perform CRUD operations:
  - Create, update, delete cabins
  - Upload images for cabins

### 📆 Bookings Management

- View all bookings in a sortable and filterable table
- Booking data includes:
  - Arrival & departure dates
  - Status: **Unconfirmed**, **Checked in**, **Checked out**
  - Paid amount
  - Cabin & guest details
  - Number of nights and guests
  - Breakfast booking status and price
  - Guest observations
- Actions:
  - Check in, check out, or delete a booking
  - On check-in, confirm payment (checkbox)
  - Add breakfast if not previously included

### 🧍 Guest Management

- Guest data includes:
  - Full name
  - Email
  - National ID
  - Nationality (with country flag)

### ⚙️ App Settings

- Adjustable parameters:
  - Breakfast price
  - Min and max nights per booking
  - Max guests per booking

### 📊 Dashboard

The first screen upon login includes:

- Today's check-ins and check-outs (with actionable buttons)
- Statistics and charts for the past 7, 30, and 90 days

### 🌙 Dark Mode

- Full dark mode support across the app

---

## 🛠️ Tech Stack

- **Frontend**: React, React Router
- **Backend**: Supabase (authentication, database, storage)
- **Styling**: Styled Components
- **State Management**: React Query
- **Charting**: Recharts
- **Form Handling**: React Hook Form
- **Date Manipulation**: date-fns
- **Validation**: Yup
- **Deployment**: Vercel

---

## 🚀 Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/Anaare/the-wild-oasis-app.git
cd the-wild-oasis-app
```

### 2. Install dependencies

```bash
npm install
```

### 3. Set up environment variables

Create a .env file and add your supabase credentials

```env
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### 4. Start the development server

```bash
npm run dev
```
