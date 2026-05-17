# Deployment Guide

## Deploy to Cloudflare Pages via GitHub Actions

### 1. Create GitHub Repository

```bash
cd m3dsai-website
git init
git add .
git commit -m "Initial commit: m3DSai website"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/m3dsai-website.git
git push -u origin main
```

### 2. Set Up Cloudflare Pages

1. Go to [Cloudflare Dashboard](https://dash.cloudflare.com)
2. Navigate to **Pages** > **Create a project**
3. Choose **Upload assets** (not Connect to Git, since we use GitHub Actions)
4. Name your project: `m3dsai-website`

### 3. Get Cloudflare Credentials

**Account ID:**
- Go to Cloudflare Dashboard > any domain > right sidebar > **Account ID**

**API Token:**
1. Go to [Cloudflare API Tokens](https://dash.cloudflare.com/profile/api-tokens)
2. Click **Create Token**
3. Use **Custom token** template
4. Permissions:
   - Account: Cloudflare Pages: Edit
5. Create token and copy it

### 4. Add GitHub Secrets

In your GitHub repository:
1. Go to **Settings** > **Secrets and variables** > **Actions**
2. Add two repository secrets:
   - `CLOUDFLARE_API_TOKEN` = your API token
   - `CLOUDFLARE_ACCOUNT_ID` = your account ID

### 5. Deploy

Push to main branch or trigger manually:
```bash
git push origin main
```

The GitHub Action will:
1. Install dependencies
2. Build the static site (`npm run build`)
3. Deploy to Cloudflare Pages

### 6. Custom Domain (Optional)

1. In Cloudflare Pages dashboard, go to your project
2. Click **Custom domains** > **Set up a custom domain**
3. Enter your domain and follow the DNS setup

### Manual Deploy (Alternative)

If you prefer not to use GitHub Actions:

```bash
# Build locally
npm run build

# Install Wrangler
npm install -g wrangler

# Login to Cloudflare
wrangler login

# Deploy
wrangler pages deploy dist --project-name=m3dsai-website
```

## Environment Variables

Create `.env.local` for local development:
```
# Optional: OpenAI API Key for chatbot backend
OPENAI_API_KEY=sk-...

# Optional: Resend API Key for email
RESEND_API_KEY=re_...
```

**Note:** Never commit `.env.local` to Git. It's already in `.gitignore`.
