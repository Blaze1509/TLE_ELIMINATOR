# OAuth Setup Guide

Your authentication system now supports Google and GitHub OAuth! Follow these steps to set up the OAuth credentials.

## Google OAuth Setup

1. **Go to Google Cloud Console**
   - Visit: https://console.cloud.google.com/

2. **Create a New Project** (if you don't have one)
   - Click "Select a project" → "New Project"
   - Enter project name and click "Create"

3. **Enable Google+ API**
   - Go to "APIs & Services" → "Library"
   - Search for "Google+ API" and enable it

4. **Create OAuth Credentials**
   - Go to "APIs & Services" → "Credentials"
   - Click "Create Credentials" → "OAuth client ID"
   - Choose "Web application"
   - Add these URLs:
     - **Authorized JavaScript origins**: `http://localhost:3000`, `http://localhost:5000`
     - **Authorized redirect URIs**: `http://localhost:5000/api/auth/google/callback`

5. **Copy Credentials**
   - Copy the Client ID and Client Secret
   - Update your `.env` file:
     ```
     GOOGLE_CLIENT_ID=your_actual_google_client_id
     GOOGLE_CLIENT_SECRET=your_actual_google_client_secret
     ```

## GitHub OAuth Setup

1. **Go to GitHub Settings**
   - Visit: https://github.com/settings/developers

2. **Create New OAuth App**
   - Click "New OAuth App"
   - Fill in the details:
     - **Application name**: Your App Name
     - **Homepage URL**: `http://localhost:3000`
     - **Authorization callback URL**: `http://localhost:5000/api/auth/github/callback`

3. **Copy Credentials**
   - Copy the Client ID and Client Secret
   - Update your `.env` file:
     ```
     GITHUB_CLIENT_ID=your_actual_github_client_id
     GITHUB_CLIENT_SECRET=your_actual_github_client_secret
     ```

## Testing OAuth

1. **Start your backend server**:
   ```bash
   cd backend
   npm run dev
   ```

2. **Start your frontend server**:
   ```bash
   cd frontend
   npm start
   ```

3. **Test the authentication**:
   - Go to `http://localhost:3000/login`
   - Click on "Google" or "GitHub" buttons
   - You should be redirected to the respective OAuth provider
   - After authorization, you'll be redirected back to your dashboard

## Troubleshooting

- **"URL not found" error**: Make sure your backend server is running on port 5000
- **OAuth redirect errors**: Double-check your callback URLs in the OAuth app settings
- **CORS errors**: Ensure your CLIENT_URL in .env matches your frontend URL

## Current Status

✅ OAuth routes implemented
✅ Passport strategies configured
✅ Database models updated
✅ Frontend OAuth buttons working
❌ OAuth credentials need to be configured (follow steps above)

Once you've set up the OAuth credentials, your Google and GitHub authentication will work perfectly!