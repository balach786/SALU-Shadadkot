/**
 * Shah Abdul Latif Bhattai University — Shadadkot Campus
 * Smart Admission System — Google Apps Script Backend
 *
 * Paste this file into a new Apps Script project at https://script.google.com
 * and follow DEPLOYMENT.md for setup steps.
 *
 * Endpoints (all on the deployed Web App URL):
 *   POST { action: "apply", ...formFields, photo, documents, feeSlip }
 *   POST { action: "contact", name, email, phone, subject, message }
 *   GET  ?action=find&cnic=xxxxx-xxxxxxx-x
 */

// ============ CONFIGURATION — fill these in ============
const SPREADSHEET_ID  = 'PASTE_YOUR_SPREADSHEET_ID';
const DRIVE_FOLDER_ID = 'PASTE_YOUR_DRIVE_FOLDER_ID';
const UNIVERSITY_NAME = 'Shah Abdul Latif Bhattai University — Shadadkot Campus';
const ADMIN_EMAIL     = 'admissions@salbu-shadadkot.edu.pk';

// Sheet names
const SHEET_APPLICATIONS = 'Applications';
const SHEET_NEWS         = 'News';
const SHEET_PROGRAMS     = 'Programs';
const SHEET_CONTACT      = 'Contact';

// ============ ENTRY POINTS ============
function doGet(e) {
  const action = (e.parameter.action || '').toLowerCase();
  try {
    if (action === 'find')     return jsonOut(findApplication(e.parameter.cnic));
    if (action === 'news')     return jsonOut({ ok: true, items: readSheet(SHEET_NEWS) });
    if (action === 'programs') return jsonOut({ ok: true, items: readSheet(SHEET_PROGRAMS) });
    return jsonOut({ ok: true, message: 'SALBU Admission API' });
  } catch (err) {
    return jsonOut({ ok: false, error: String(err) });
  }
}

function doPost(e) {
  try {
    let p = {};
    if (e.postData && e.postData.type === 'application/json') {
      p = JSON.parse(e.postData.contents);
    } else {
      p = e.parameter;
    }
    const action = (p.action || '').toLowerCase();
    if (action === 'apply')   return jsonOut(handleApply(p));
    if (action === 'contact') return jsonOut(handleContact(p));
    return jsonOut({ ok: false, error: 'Unknown action' });
  } catch (err) {
    return jsonOut({ ok: false, error: String(err) });
  }
}

function jsonOut(obj) {
  return ContentService
    .createTextOutput(JSON.stringify(obj))
    .setMimeType(ContentService.MimeType.JSON);
}

// ============ APPLY ============
function handleApply(p) {
  const required = ['fullName','fatherName','cnic','dob','gender','phone','email','address','program'];
  for (const k of required) {
    if (!p[k] || String(p[k]).trim() === '') throw new Error('Missing required field: ' + k);
  }
  if (!/^\d{5}-\d{7}-\d$/.test(p.cnic)) throw new Error('Invalid CNIC format. Use xxxxx-xxxxxxx-x');

  const ss = SpreadsheetApp.openById(SPREADSHEET_ID);
  const sh = ss.getSheetByName(SHEET_APPLICATIONS) || createApplicationsSheet(ss);

  // Duplicate CNIC check
  const cnicCol = 5; // matches header order below
  const lastRow = sh.getLastRow();
  let duplicate = false;
  if (lastRow > 1) {
    const data = sh.getRange(2, cnicCol, lastRow - 1, 1).getValues();
    duplicate = data.some(r => String(r[0]).trim() === p.cnic.trim());
  }
  if (duplicate) {
    throw new Error('This CNIC has already been registered.');
  }

  // Folder
  const folder = DriveApp.getFolderById(DRIVE_FOLDER_ID);
  const appFolder = folder.createFolder(p.cnic + ' - ' + Date.now());

  // Application ID
  const applicationId = nextApplicationId(sh);

  // Files
  let photoUrl    = '';
  let docsUrl     = '';
  let feeSlipUrl  = '';

  if (p.photo && p.photo.base64) {
    photoUrl = uploadBase64_(p.photo, appFolder, applicationId + '-photo');
  }
  if (p.documents && p.documents.base64) {
    docsUrl = uploadBase64_(p.documents, appFolder, applicationId + '-docs');
  }
  if (p.feeSlip && p.feeSlip.base64) {
    feeSlipUrl = uploadBase64_(p.feeSlip, appFolder, applicationId + '-fee');
  }

  // QR code (uses Google Charts QR endpoint — kept as URL, no extra deps)
  const qrUrl = 'https://api.qrserver.com/v1/create-qr-code/?size=240x240&data=' +
    encodeURIComponent(applicationId);

  // Card PDF
  const cardPdf = generateAdmissionCardPdf_({
    applicationId: applicationId,
    fullName: p.fullName, fatherName: p.fatherName, cnic: p.cnic,
    program: p.program, dob: p.dob, photoUrl: photoUrl, qrUrl: qrUrl,
  }, appFolder);

  const row = [
    applicationId, new Date(), p.fullName, p.fatherName, p.cnic, p.dob,
    p.gender, p.phone, p.email, p.address, p.program,
    photoUrl, docsUrl, feeSlipUrl, cardPdf.getUrl(), qrUrl, 'Submitted',
  ];
  sh.appendRow(row);

  // Notify
  try {
    MailApp.sendEmail({
      to: p.email,
      cc: ADMIN_EMAIL,
      subject: '[SALBU Shadadkot] Application Received — ' + applicationId,
      htmlBody:
        '<p>Dear ' + escapeHtml_(p.fullName) + ',</p>' +
        '<p>Your application to <b>' + UNIVERSITY_NAME + '</b> has been received.</p>' +
        '<p>Your Application ID is <b>' + applicationId + '</b>. ' +
        'You can download your admission card here: <a href="' + cardPdf.getUrl() + '">View Card</a>.</p>',
    });
  } catch (_) {}

  return {
    ok: true,
    applicationId: applicationId,
    photoUrl: photoUrl,
    cardUrl: cardPdf.getUrl(),
    qrUrl: qrUrl,
    status: 'Submitted',
  };
}

// ============ FIND ============
function findApplication(cnic) {
  if (!cnic || !/^\d{5}-\d{7}-\d$/.test(cnic)) return { ok: false, error: 'Invalid CNIC' };
  const sh = SpreadsheetApp.openById(SPREADSHEET_ID).getSheetByName(SHEET_APPLICATIONS);
  if (!sh) return { ok: false, notFound: true };
  const rows = sh.getDataRange().getValues();
  for (let i = 1; i < rows.length; i++) {
    if (String(rows[i][4]).trim() === cnic) {
      return {
        ok: true,
        application: {
          applicationId: rows[i][0],
          submissionDate: Utilities.formatDate(new Date(rows[i][1]), Session.getScriptTimeZone(), 'yyyy-MM-dd'),
          fullName: rows[i][2], fatherName: rows[i][3], cnic: rows[i][4],
          program: rows[i][10], photoUrl: rows[i][11],
          status: rows[i][16] || 'Submitted',
        },
      };
    }
  }
  return { ok: false, notFound: true };
}

// ============ CONTACT ============
function handleContact(e) {
  const p = e.parameter;
  const ss = SpreadsheetApp.openById(SPREADSHEET_ID);
  let sh = ss.getSheetByName(SHEET_CONTACT);
  if (!sh) {
    sh = ss.insertSheet(SHEET_CONTACT);
    sh.appendRow(['Timestamp','Name','Email','Phone','Subject','Message']);
  }
  sh.appendRow([new Date(), p.name||'', p.email||'', p.phone||'', p.subject||'', p.message||'']);
  return { ok: true };
}

// ============ HELPERS ============
function createApplicationsSheet(ss) {
  const sh = ss.insertSheet(SHEET_APPLICATIONS);
  sh.appendRow([
    'Application ID','Timestamp','Full Name','Father Name','CNIC','DOB','Gender',
    'Phone','Email','Address','Program','Photo URL','Documents URL',
    'Fee Slip URL','Card URL','QR URL','Status',
  ]);
  sh.getRange(1,1,1,17).setFontWeight('bold');
  return sh;
}

function nextApplicationId(sh) {
  const last = sh.getLastRow();
  let seq = 1;
  if (last > 1) {
    const lastId = String(sh.getRange(last, 1).getValue() || '');
    const m = lastId.match(/(\d+)$/);
    if (m) seq = parseInt(m[1], 10) + 1;
  }
  const year = new Date().getFullYear();
  return 'ADM-' + year + '-' + ('000000' + seq).slice(-6);
}

function uploadBlob_(blob, folder, baseName) {
  const ext = (blob.getName().split('.').pop() || 'bin').toLowerCase();
  const file = folder.createFile(blob.setName(baseName + '.' + ext));
  file.setSharing(DriveApp.Access.ANYONE_WITH_LINK, DriveApp.Permission.VIEW);
  return file.getUrl();
}

function uploadBase64_(fileObj, folder, baseName) {
  const blob = Utilities.newBlob(Utilities.base64Decode(fileObj.base64), fileObj.mimeType, fileObj.name);
  const ext = (fileObj.name.split('.').pop() || 'bin').toLowerCase();
  const file = folder.createFile(blob.setName(baseName + '.' + ext));
  file.setSharing(DriveApp.Access.ANYONE_WITH_LINK, DriveApp.Permission.VIEW);
  return file.getUrl();
}

function readSheet(name) {
  const sh = SpreadsheetApp.openById(SPREADSHEET_ID).getSheetByName(name);
  if (!sh) return [];
  const rows = sh.getDataRange().getValues();
  const headers = rows[0];
  return rows.slice(1).map(r => {
    const o = {};
    headers.forEach((h, i) => { o[h] = r[i]; });
    return o;
  });
}

function escapeHtml_(s) {
  return String(s).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
}

function generateAdmissionCardPdf_(d, folder) {
  const html =
    '<html><head><style>' +
      'body{font-family:Arial,sans-serif;color:#0B3D91;margin:0;padding:24px}' +
      '.card{border:2px solid #0B3D91;border-radius:12px;overflow:hidden;max-width:720px;margin:auto}' +
      '.hdr{background:#0B3D91;color:#fff;padding:14px 20px;display:flex;justify-content:space-between;align-items:center}' +
      '.hdr small{color:#C9A227;text-transform:uppercase;letter-spacing:2px;font-size:10px}' +
      '.body{display:grid;grid-template-columns:120px 1fr 120px;gap:18px;padding:20px}' +
      '.photo{width:120px;height:160px;object-fit:cover;border:1px solid #ccc;border-radius:6px}' +
      '.qr{width:120px;height:120px}' +
      'table{font-size:13px;width:100%}td{padding:4px 0}td.k{color:#555;width:120px;font-size:11px;text-transform:uppercase}' +
      '.ft{background:#C9A22722;padding:8px 20px;font-size:10px;color:#0B3D91;display:flex;justify-content:space-between}' +
    '</style></head><body>' +
    '<div class="card">' +
      '<div class="hdr"><div><b>' + escapeHtml_(UNIVERSITY_NAME) + '</b><br/><small>Admission Card</small></div>' +
      '<div style="text-align:right"><small>Application No.</small><br/><b style="color:#C9A227;font-family:monospace">' + d.applicationId + '</b></div></div>' +
      '<div class="body">' +
        (d.photoUrl ? '<img class="photo" src="' + d.photoUrl + '"/>' : '<div class="photo"></div>') +
        '<table>' +
          '<tr><td class="k">Name</td><td><b>' + escapeHtml_(d.fullName) + '</b></td></tr>' +
          '<tr><td class="k">Father\'s Name</td><td>' + escapeHtml_(d.fatherName) + '</td></tr>' +
          '<tr><td class="k">CNIC</td><td style="font-family:monospace">' + escapeHtml_(d.cnic) + '</td></tr>' +
          '<tr><td class="k">DOB</td><td>' + escapeHtml_(d.dob) + '</td></tr>' +
          '<tr><td class="k">Program</td><td>' + escapeHtml_(d.program) + '</td></tr>' +
          '<tr><td class="k">Status</td><td style="color:#138a36;font-weight:bold">Submitted</td></tr>' +
        '</table>' +
        '<div style="text-align:center"><img class="qr" src="' + d.qrUrl + '"/><div style="font-size:9px;color:#555">Scan to verify</div></div>' +
      '</div>' +
      '<div class="ft"><span>Electronically generated. No signature required.</span><span>salbu-shadadkot.edu.pk</span></div>' +
    '</div></body></html>';
  const blob = Utilities.newBlob(html, 'text/html', d.applicationId + '.html').getAs('application/pdf')
    .setName(d.applicationId + '-AdmissionCard.pdf');
  const file = folder.createFile(blob);
  file.setSharing(DriveApp.Access.ANYONE_WITH_LINK, DriveApp.Permission.VIEW);
  return file;
}
