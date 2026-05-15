import { Resend } from "resend";

function getResend(): Resend {
  const key = process.env.RESEND_API_KEY;
  if (!key) throw new Error("RESEND_API_KEY is not set. Configure it in .env.local.");
  return new Resend(key);
}

const FROM = process.env.RESEND_FROM_EMAIL || "noreply@gloryashine.org";

// ─── TENANT ADMIN ONBOARDING EMAIL ───────────────────────────────────────────
// Sends ONLY to the admin/parent — never to children (juniors)

export async function sendTenantAdminOnboarding({
  to,
  tenantName,
  tenantSlug,
  adminEmail,
  adminPassword,
  sovereignId,
}: {
  to: string;
  tenantName: string;
  tenantSlug: string;
  adminEmail: string;
  adminPassword: string;
  sovereignId: string;
}) {
  const loginUrl = `${process.env.NEXTAUTH_URL}/login`;
  const adminUrl = `${process.env.NEXTAUTH_URL}/admin/tenant/${tenantSlug}`;

  const html = `
<!DOCTYPE html>
<html lang="de">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>GloryaShine — Willkommen im Ursprung</title>
  <style>
    @import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@400;700&family=Cormorant+Garamond:wght@300;600&display=swap');
    body { background:#0a0c10; color:#f9f1d7; font-family:'Cormorant Garamond',serif; margin:0; padding:0; }
    .wrapper { max-width:600px; margin:0 auto; padding:3rem 2rem; }
    .header { text-align:center; border-bottom:1px solid rgba(212,175,55,0.3); padding-bottom:2rem; margin-bottom:2rem; }
    .crown { font-size:3rem; margin-bottom:1rem; }
    .title { font-family:'Cinzel',serif; font-size:1.8rem; color:#d4af37; letter-spacing:3px; text-transform:uppercase; margin:0; }
    .subtitle { font-style:italic; opacity:0.7; margin-top:0.5rem; }
    .card { background:rgba(255,255,255,0.03); border:1px solid rgba(212,175,55,0.3); padding:1.5rem; margin:1.5rem 0; border-radius:2px; }
    .label { font-family:'Cinzel',serif; font-size:0.7rem; letter-spacing:2px; color:#d4af37; text-transform:uppercase; opacity:0.7; }
    .value { font-size:1.1rem; color:#f9f1d7; margin-top:0.3rem; font-weight:600; }
    .sovereign { font-family:'Cinzel',serif; font-size:1rem; color:#d4af37; letter-spacing:1px; }
    .btn { display:inline-block; background:#d4af37; color:#0a0c10; font-family:'Cinzel',serif; font-size:0.9rem; letter-spacing:2px; text-transform:uppercase; padding:1rem 2rem; text-decoration:none; border-radius:1px; margin-top:1rem; }
    .warning { background:rgba(212,175,55,0.05); border-left:3px solid #d4af37; padding:1rem 1.5rem; font-size:0.9rem; opacity:0.8; margin:1rem 0; }
    .footer { text-align:center; margin-top:3rem; padding-top:2rem; border-top:1px solid rgba(212,175,55,0.2); opacity:0.5; font-size:0.8rem; }
    .shield { font-size:0.75rem; font-family:'Cinzel',serif; letter-spacing:1px; color:#d4af37; opacity:0.6; margin-top:0.5rem; }
  </style>
</head>
<body>
  <div class="wrapper">
    <div class="header">
      <div class="crown">✦</div>
      <h1 class="title">GloryaShine</h1>
      <p class="subtitle">Heiliges Jahr 2026 — Der Pfad der Pilger</p>
    </div>

    <p>Willkommen im Ursprung, ${tenantName}.</p>
    <p>Dein Tenant-Administrator-Zugang wurde erfolgreich im Mesh verankert. Du bist nun der <strong>Hüter des Lichts</strong> für deinen Bereich.</p>

    <div class="card">
      <div class="label">Sovereign ID</div>
      <div class="value sovereign">${sovereignId}</div>
    </div>

    <div class="card">
      <div class="label">Tenant</div>
      <div class="value">${tenantName} (/${tenantSlug})</div>
      <div class="label" style="margin-top:1rem">Login E-Mail</div>
      <div class="value">${adminEmail}</div>
      <div class="label" style="margin-top:1rem">Temporäres Passwort</div>
      <div class="value">${adminPassword}</div>
    </div>

    <div class="warning">
      ⚠️ Bitte ändere dein Passwort beim ersten Login. Dieses Passwort ist temporär und sollte nicht gespeichert werden.
    </div>

    <div style="text-align:center;margin-top:2rem">
      <a href="${loginUrl}" class="btn">Zum Login</a>
      &nbsp;&nbsp;
      <a href="${adminUrl}" class="btn" style="background:transparent;color:#d4af37;border:1px solid rgba(212,175,55,0.4)">Admin Dashboard</a>
    </div>

    <div class="footer">
      <p>GloryaShine — Heiliges Jubiläum 2026</p>
      <p>Detmold | Im Namen der gemeinschaftlichen Alchemie</p>
      <p class="shield">🛡️ Verified by Admin-Tenant (Zero-Trust) &nbsp;|&nbsp; 🌍 Global Mesh Status: Active</p>
    </div>
  </div>
</body>
</html>
  `.trim();

  return getResend().emails.send({
    from: FROM,
    to,
    subject: `✨ GloryaShine — Dein Admin-Zugang für ${tenantName} ist aktiv`,
    html,
  });
}

// ─── PARENT RELAY: junior-related events go ONLY to parent ───────────────────

export async function sendParentRelayNotification({
  parentEmail,
  parentName,
  eventType,
  childDisplayName,
  mentorId,
}: {
  parentEmail: string;
  parentName: string;
  eventType: "JUNIOR_WELCOME" | "JUNIOR_TRANSITION" | "MENTOR_GREETING" | "SYSTEM_SYNC";
  childDisplayName: string;
  mentorId?: string;
}) {
  const messages: Record<string, { subject: string; body: string }> = {
    MENTOR_GREETING: {
      subject: `✦ GloryaShine — Sicherheits-Update für deine Familie`,
      body: `Ein verifizierter Mentor hat die Ankunft von <strong>${childDisplayName}</strong> im Mesh bemerkt und sendet Segenswünsche an eure Familie.<br><br>Mentor-Referenz: <em>${mentorId ? mentorId.substring(0, 8) + "…" : "verifiziert"}</em>`,
    },
    SYSTEM_SYNC: {
      subject: `🛡️ GloryaShine — Synchronisierungs-Bestätigung`,
      body: `Der Junior-Bereich für <strong>${childDisplayName}</strong> wurde erfolgreich synchronisiert. Dein Kind agiert nun im geschützten Vakuum des Mesh. Alle Resonanzen werden gefiltert und direkt an dich weitergeleitet.<br><br>Du bist der Anker – das System ist der Schutzschirm.`,
    },
    JUNIOR_TRANSITION: {
      subject: `✨ GloryaShine — Alters-Transition bereit zur Bestätigung`,
      body: `<strong>${childDisplayName}</strong> hat die Altersgrenze erreicht. Eine vollwertige Sovereign ID kann jetzt in der Eltern-Passage aktiviert werden. Bitte bestätige die Transition in deinem Dashboard.`,
    },
    JUNIOR_WELCOME: {
      subject: `✦ GloryaShine — Dein Kind ist im Mesh beheimatet`,
      body: `<strong>${childDisplayName}</strong> wurde erfolgreich im geschützten Junior-Bereich aktiviert. Du erhältst alle Resonanzen stellvertretend hier. Das Kind hat keinen direkten Außenkontakt.`,
    },
  };

  const msg = messages[eventType];

  const html = `
<!DOCTYPE html>
<html lang="de">
<head>
  <meta charset="UTF-8">
  <style>
    body { background:#0a0c10; color:#f9f1d7; font-family:'Georgia',serif; margin:0; padding:2rem; }
    .wrapper { max-width:600px; margin:0 auto; }
    .title { color:#d4af37; font-size:1.4rem; margin-bottom:1rem; }
    .card { background:rgba(255,255,255,0.04); border:1px solid rgba(212,175,55,0.25); padding:1.5rem; border-radius:2px; }
    .footer { margin-top:2rem; font-size:0.75rem; opacity:0.4; border-top:1px solid rgba(212,175,55,0.15); padding-top:1rem; }
  </style>
</head>
<body>
  <div class="wrapper">
    <p class="title">Sicherheits-Update für ${parentName}</p>
    <div class="card">
      <p>${msg.body}</p>
    </div>
    <div class="footer">
      GloryaShine — Eltern-Passage &nbsp;|&nbsp; 🛡️ Nur an Erziehungsberechtigte &nbsp;|&nbsp; Kein Direktkontakt mit Minderjährigen
    </div>
  </div>
</body>
</html>
  `.trim();

  return getResend().emails.send({
    from: FROM,
    to: parentEmail,
    subject: msg.subject,
    html,
  });
}
