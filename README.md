# TARGET-IAS — Ready-to-Deploy Vercel Website

Zero-build, phone-friendly UPSC Prelims Mock Test Series website with native **Razorpay Checkout** (Vercel Serverless Functions) and an optional **Free Payment Link** fallback (e.g., Topmate / Razorpay Payment Page).

## Files Included
- `index.html` — Complete TARGET-IAS web app (Landing Page, Student Dashboard, Live UPSC Exam Engine, Analytics, 3-Layer First-Principles Explanations, Revision Bookmarks, Admin Panel with Bulk CSV Uploader, and Mandatory Razorpay Compliance Pages).
- `api/create-order.js` — Vercel serverless API that securely creates Razorpay Orders.
- `api/verify-payment.js` — Vercel serverless API that cryptographically verifies Razorpay payments.
- `manifest.json` — Enables "Add to Home Screen" (PWA) on phones.

## 4-Step Deploy on Vercel (From Smartphone)
1. **Upload to GitHub:** Open `github.com` -> New Repository (`target-ias`) -> Upload `index.html`, `manifest.json`, and the `api` folder (`api/create-order.js` & `api/verify-payment.js`).
2. **Deploy on Vercel:** Open `vercel.com` -> Log in with GitHub -> **Add New Project** -> Import `target-ias` -> Tap **Deploy**. (Leave Framework Preset as "Other").
3. **Activate Razorpay (Free to Start, 0% Monthly Fee):**
   - Go to Vercel Project -> **Settings -> Environment Variables**.
   - Add `RAZORPAY_KEY_ID` and `RAZORPAY_KEY_SECRET` from your Razorpay Dashboard (Test Mode or Live Mode).
   - Tap **Redeploy**.
4. **Admin Access:** On your live site, tap **Admin** in the top bar (default passcode: `target2026`). Upload new mock tests via CSV or paste a free external Payment Link (Topmate / Razorpay Payment Page) if you want to collect payments before API activation.
