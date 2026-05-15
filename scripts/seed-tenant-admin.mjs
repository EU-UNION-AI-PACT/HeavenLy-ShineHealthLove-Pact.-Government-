#!/usr/bin/env node
import pg from 'pg';
import { randomUUID } from 'crypto';
const { Client } = pg;

const DATABASE_URL = process.env.DATABASE_URL || 'postgresql://gloryashine_admin:GsMcb8P6ld0NgsWLTSrpPep08C6r38GK@127.0.0.1:5433/gloryashine?sslmode=disable';

const TENANT_ADMIN = {
  email: 'tenant.admin@gloryashine.local',
  hashedPassword: '$2b$12$XFEhTzch5tlpPaIZMXiBbOYgV12eDQAg0jB/QuNhu/Y7ZATd03HhO',
  name: 'Tenant Administrator',
  role: 'TENANT_ADMIN',
  sovereignId: 'TENANT-ADMIN-' + Date.now(),
  consentGivenAt: new Date().toISOString(),
  consentVersion: '1.0.0'
};

async function seedTenantAdmin() {
  const client = new Client({ connectionString: DATABASE_URL });
  
  try {
    await client.connect();
    console.log('✓ Verbunden mit PostgreSQL');

    // Check if user exists
    const checkResult = await client.query(
      'SELECT id FROM users WHERE email = $1',
      [TENANT_ADMIN.email]
    );

    if (checkResult.rows.length > 0) {
      console.log('⚠ Tenant Admin existiert bereits:', TENANT_ADMIN.email);
      console.log('  ID:', checkResult.rows[0].id);
      return;
    }

    // Insert user
    const userId = 'usr_' + randomUUID().replace(/-/g, '');
    const insertResult = await client.query(
      `INSERT INTO users (id, email, "passwordHash", name, role, "sovereignId", "consentGivenAt", "consentVersion", "createdAt", "updatedAt")
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, NOW(), NOW())
       RETURNING id, email, name, role`,
      [
        userId,
        TENANT_ADMIN.email,
        TENANT_ADMIN.hashedPassword,
        TENANT_ADMIN.name,
        TENANT_ADMIN.role,
        TENANT_ADMIN.sovereignId,
        TENANT_ADMIN.consentGivenAt,
        TENANT_ADMIN.consentVersion
      ]
    );

    const user = insertResult.rows[0];

    // Audit log
    await client.query(
      `INSERT INTO dsgvo_audit_log ("userId", action, detail, "performedAt")
       VALUES ($1, $2, $3, NOW())`,
      [user.id, 'USER_CREATED', `Tenant Admin erstellt: ${user.email}`]
    );

    console.log('');
    console.log('═══════════════════════════════════════════════');
    console.log('  ✓ TENANT ADMIN ERFOLGREICH ERSTELLT');
    console.log('═══════════════════════════════════════════════');
    console.log('');
    console.log('  ID:    ', user.id);
    console.log('  Email: ', user.email);
    console.log('  Name:  ', user.name);
    console.log('  Role:  ', user.role);
    console.log('');
    console.log('  Login: http://localhost:3001/login');
    console.log('');
    console.log('  Email:    tenant.admin@gloryashine.local');
    console.log('  Password: Shine2026!Tenant#1adaa72d');
    console.log('');
    console.log('═══════════════════════════════════════════════');
    console.log('');

  } catch (error) {
    console.error('✗ Fehler beim Seeding:', error.message);
    throw error;
  } finally {
    await client.end();
  }
}

seedTenantAdmin().catch(console.error);
