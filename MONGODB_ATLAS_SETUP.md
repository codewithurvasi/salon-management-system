# 📦 MongoDB Atlas Setup Guide

Complete step-by-step guide to set up MongoDB Atlas (Cloud Database) for your salon management system.

---

## 🎯 What You'll Do

1. Create MongoDB Atlas account
2. Create a cluster (database server)
3. Set up database user
4. Get connection string
5. Add to your project

**Time Required**: 10-15 minutes

---

## Step 1: Create MongoDB Atlas Account

### 1a. Go to MongoDB Atlas
- Visit: https://www.mongodb.com/cloud/atlas
- Click "Try Free"

### 1b. Sign Up
- Choose: "Sign up with Google/GitHub" (easiest) OR create account with email
- Fill in details:
  - First Name
  - Last Name
  - Email
  - Password (if email signup)
  - Organization name (anything you want, e.g., "My Salon")

### 1c. Verify Email
- Check your email inbox
- Click verification link
- Return to MongoDB Atlas

✅ **Account Created**

---

## Step 2: Create a Cluster

### 2a. Create Cluster Page
After login, you'll see "Create a database" button

### 2b. Choose Plan
- Select **"FREE"** (M0 - 512MB storage)
- Click "Create"
- Choose cloud provider: **AWS** (or any)
- Choose region closest to you (e.g., **ap-south-1** for India)
- Click "Create Cluster"

⏳ **Cluster Creating** (takes 2-3 minutes)

### 2c. Wait for Cluster
You'll see a loading screen. Leave it open and wait.

✅ **Cluster Created**

---

## Step 3: Create Database User

### 3a. Navigate to Security
- Once cluster is created, click "Security" on the left menu
- Choose "Database Access"

### 3b. Create User
- Click "Add New Database User"
- **Username**: `salon_user` (or anything)
- **Password**: Create a strong password (SAVE THIS!)
  - Click "Autogenerate Secure Password"
  - Copy and save it somewhere safe
- **User Privileges**: Select "Read and write to any database"
- Click "Add User"

✅ **User Created**

### Save These Credentials:
```
Username: salon_user
Password: [your_generated_password]
```

---

## Step 4: Configure IP Whitelist

### 4a. Network Access
- Still under "Security", click "Network Access"

### 4b. Add IP
- Click "Add IP Address"
- Choose: "Allow access from anywhere"
  - This adds `0.0.0.0/0` (accessible from any IP)
- Click "Confirm"

⚠️ **Note**: For production, restrict to your actual IP address

✅ **Network Configured**

---

## Step 5: Get Connection String

### 5a. Connect to Cluster
- Go to "Clusters" in left menu
- Click "Connect" button on your cluster

### 5b. Choose Connection Method
- Select "Drivers" (second option)
- Choose: **Node.js** from dropdown
- Version: **5.0 or later**

### 5c. Copy Connection String
You'll see a connection string like:
```
mongodb+srv://salon_user:<password>@cluster0.xxxxx.mongodb.net/?retryWrites=true&w=majority
```

Copy this entire string

---

## Step 6: Add to Your Project

### 6a. Create .env File
In your project folder `backend/`, create file named `.env`

### 6b. Add Connection String
Replace `<password>` with your actual password (without brackets):

```env
# Replace salon_user with your username if different
# Replace YOUR_PASSWORD with the password you created
# Keep everything else the same
MONGO_URI=mongodb+srv://salon_user:YOUR_PASSWORD@cluster0.xxxxx.mongodb.net/?retryWrites=true&w=majority

# Server port
PORT=5000

# Environment
NODE_ENV=development
```

### 6c. Example
```env
MONGO_URI=mongodb+srv://salon_user:mySecurePassword123@cluster0.abc123.mongodb.net/?retryWrites=true&w=majority
PORT=5000
NODE_ENV=development
```

✅ **Configuration Complete**

---

## Step 7: Test Connection

### In terminal:
```bash
cd backend
npm install
npm run seed
```

You should see:
```
✅ Database seeded successfully!
```

If you see an error, check:
- Password is correct (no special characters need escaping in .env)
- Username matches what you created
- No spaces in the connection string
- Network Access allows your IP

---

## 📊 View Your Data

### 5a. Go Back to Atlas
- In left menu, click "Collections"
- You should see databases:
  - **salon_db** (your database)
    - **appointments** (6 sample appointments)
    - **customers** (5 sample customers)
    - **services** (6 sample services)
    - **staffmembers** (5 sample staff)

### 5b. Explore Data
Click any collection to see the documents and data

---

## 🔐 Security Best Practices

### ✅ Do This:
- [x] Use strong passwords (letters, numbers, symbols)
- [x] Keep `.env` file private (add to `.gitignore`)
- [x] For production, restrict IP whitelist to your server only
- [x] Never commit `.env` to git

### ❌ Don't Do This:
- [ ] Share your MongoDB URI publicly
- [ ] Commit `.env` file to GitHub
- [ ] Use simple passwords like "123456"
- [ ] Allow all IPs in production

---

## 🆘 Troubleshooting

### Error: "Authentication failed"
```
MongoServerError: Authentication failed
```
**Solution:**
- Check password is correct
- Check username spelling
- Make sure special characters aren't escaped

### Error: "IP address not whitelisted"
```
connect ECONNREFUSED
```
**Solution:**
- Go to "Network Access"
- Click "Add IP Address"
- Add your current IP or "0.0.0.0/0" (anywhere)

### Error: "Connection timed out"
```
connect ETIMEDOUT
```
**Solution:**
- Check internet connection
- Verify MongoDB URI is exact copy (no extra spaces)
- Try again after 5 minutes

### Can't Find Cluster
```
Error: No cluster found
```
**Solution:**
- Make sure cluster creation finished (wait if still loading)
- Refresh page
- Check you're in the right organization

---

## 💾 Save Important Info

Create a text file and save these:

```
=== MONGODB ATLAS SETUP ===

Account Email: your_email@example.com
Organization: My Salon

Cluster Name: Cluster0
Database Name: salon_db

Database User: salon_user
Database Password: [YOUR_SECURE_PASSWORD]

Connection String: 
mongodb+srv://salon_user:PASSWORD@cluster0.xxxxx.mongodb.net/?retryWrites=true&w=majority
```

Keep this file safe and private!

---

## ✅ Next Steps

Once MongoDB is set up:

1. Create `.env` file in backend folder
2. Add connection string
3. Run `npm run seed` to load sample data
4. Run `npm run dev` to start backend
5. Run `npm run dev` in main folder for frontend
6. Open `http://localhost:5173` in browser

---

## 📸 Visual Summary

```
1. Sign Up at MongoDB Atlas
        ↓
2. Create Free Cluster (M0)
        ↓
3. Create Database User (salon_user)
        ↓
4. Allow All IPs (Network Access)
        ↓
5. Copy Connection String
        ↓
6. Create backend/.env with connection string
        ↓
7. Run: npm run seed
        ↓
✅ Database Ready!
```

---

## 🎓 Learn More

- [MongoDB Atlas Docs](https://www.mongodb.com/docs/atlas/setup-atlas-account/)
- [Connection String Guide](https://www.mongodb.com/docs/drivers/node/current/fundamentals/connection/string/)
- [Security Best Practices](https://www.mongodb.com/docs/atlas/security-checklist/)

---

## 📞 Need Help?

- Check MongoDB Atlas docs
- Visit MongoDB community forum
- Check browser console for specific error messages
- Verify `.env` file exists in backend folder

---

**Congratulations! Your database is now ready to use!** 🎉

Next: Follow QUICK_START.md to run your salon management system.

