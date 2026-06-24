# SALBU Shadadkot — Deployment Guide

This document walks you through wiring the website to your Google Sheets + Apps Script backend.

---

## 1. Create the Google Spreadsheet (Database)

1. Go to <https://sheets.google.com> → **Blank** spreadsheet.
2. Rename it to: `SALBU Shadadkot — Admissions`.
3. Create **3 sheets** with these exact names and headers (row 1):

### Sheet 1 — `Applications`
```
Application ID | Timestamp | Full Name | Father Name | CNIC | DOB | Gender | Phone | Email | Address | Program | Photo URL | Documents URL | Fee Slip URL | Card URL | QR URL | Status
```
(The Apps Script will auto-create this sheet if it doesn't exist.)

### Sheet 2 — `News`
```
Title | Description | Date | Image URL
```

### Sheet 3 — `Programs`
```
Program Name | Level | Duration | Eligibility | Fee Structure | Curriculum | Career Opportunities
```

4. Copy the **Spreadsheet ID** from the URL:
   `https://docs.google.com/spreadsheets/d/{THIS_PART_IS_THE_ID}/edit`

---

## 2. Create a Google Drive folder (File Storage)

1. Open <https://drive.google.com> → **New → Folder** → name it `SALBU Admissions Uploads`.
2. Right-click the folder → **Share** → "Anyone with the link — Viewer". (Required so uploaded photos render in the admission card.)
3. Copy the **Folder ID** from the URL:
   `https://drive.google.com/drive/folders/{THIS_PART_IS_THE_ID}`

---

## 3. Create the Apps Script Web App

1. Go to <https://script.google.com> → **New project**.
2. Delete the default `Code.gs` content and paste the contents of `apps-script/Code.gs` from this project.
3. At the top of the file, fill in:
   ```js
   const SPREADSHEET_ID  = '...'; // from step 1
   const DRIVE_FOLDER_ID = '...'; // from step 2
   const ADMIN_EMAIL     = 'your-admin@email.com';
   ```
4. Click **Save** (project name suggestion: `SALBU Admission Backend`).

### Deploy
1. Click **Deploy → New deployment**.
2. **Type**: Web app.
3. **Description**: `SALBU Admission API v1`.
4. **Execute as**: `Me`.
5. **Who has access**: `Anyone`.
6. Click **Deploy**, authorize the requested permissions (Drive, Sheets, Gmail).
7. Copy the **Web App URL**. It looks like:
   `https://script.google.com/macros/s/AKfycby.../exec`

> Re-deploying: each time you change `Code.gs`, click **Deploy → Manage deployments → ✎ (edit) → Version: New version → Deploy**. The URL stays the same.

---

## 4. Connect the website to the Web App

The website reads the URL from the `VITE_APPS_SCRIPT_URL` environment variable.

### In Lovable
- Open **Project settings → Environment variables** and add:
  - `VITE_APPS_SCRIPT_URL` = the Web App URL from step 3.
- Republish / refresh the preview.

### Local / self-hosted
Create a `.env` file at the project root:
```
VITE_APPS_SCRIPT_URL=https://script.google.com/macros/s/AKfycby.../exec
```
Then restart the dev server. Until this is set, the **Online Apply** form runs in **demo mode** (form works, card renders, but nothing is saved).

---

## 5. Replace the Logo

The header, footer and admission card all use `src/assets/logo.png`. Replace this file with the official SALBU crest (same filename) and the change will propagate everywhere automatically.

---

## 6. Verify

1. Open **Apply Now** → fill the form → upload a photo → submit.
2. You should see:
   - A green "Registration Successful" banner with an `ADM-2026-000001` ID.
   - The rendered admission card.
   - A "Download PDF Card" button linking to the generated PDF in Drive.
3. Open the Google Sheet — a new row should appear in `Applications`.
4. Open the Drive folder — a subfolder with the photo, docs and PDF should appear.
5. Open **Find My Application** → enter the CNIC you used → the card reappears.

---

## API Reference (Apps Script)

| Method | Action | Params | Returns |
|---|---|---|---|
| `POST` | `apply` | form fields + `photo`, `documents`, `feeSlip` | `{ ok, applicationId, photoUrl, cardUrl, qrUrl, status }` |
| `POST` | `contact` | `name, email, phone, subject, message` | `{ ok }` |
| `GET`  | `find` | `cnic` | `{ ok, application }` or `{ ok:false, notFound:true }` |
| `GET`  | `news` | — | `{ ok, items }` |
| `GET`  | `programs` | — | `{ ok, items }` |

Errors return `{ ok: false, error: "..." }`.

---

## Troubleshooting

| Symptom | Fix |
|---|---|
| "Demo Mode" banner persists | `VITE_APPS_SCRIPT_URL` not set — see step 4, then republish. |
| "Authorization required" on submit | Re-run any function in the Apps Script editor to grant scopes. |
| Photo doesn't render in card | The Drive folder isn't shared "Anyone with link — Viewer". Re-share. |
| "Failed to fetch" / CORS | Apps Script Web Apps do not require CORS headers, but they must be deployed with **Who has access: Anyone**. Re-deploy. |
| Duplicate CNIC error | The CNIC already exists in the `Applications` sheet — this is the intended behavior. |

---

## Security notes

- Photos, documents and PDFs are shared as **Anyone with the link**. This is necessary for them to render in the admission card. Don't upload sensitive documents you wouldn't want publicly accessible to anyone with the URL.
- For a production-grade system with proper authentication, file-level access control, and audit logging, consider migrating the backend to Lovable Cloud (Supabase) — this codebase can be adapted with minimal changes.
