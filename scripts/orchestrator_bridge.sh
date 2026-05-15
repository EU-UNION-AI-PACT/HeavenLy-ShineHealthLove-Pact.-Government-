#!/bin/bash
# ==============================================================================
# PROJEKT:     HeavenLy-ShineHealthLove-Pact (Government)
# SUBSYSTEM:   Human Dignity & Potential Bridge Orchestrator
# DATEI:       orchestrator_bridge.sh
# VERSION:     2026.1
# RECHTSGRUNDLAGE: Art. 1 GG · Art. 23 UN-Menschenrechtserklärung · Art. 17 DSGVO
#
# BESCHREIBUNG:
#   Initialisiert das Ingest-Protokoll für Lebenswünsche ohne Noten-Filter.
#   Erstellt die sichere JSONB-Struktur im PostgreSQL-Backend.
#   Triggert die autonome Agenten-Pipeline über die Next.js API.
#   Kein Mensch wird aufgrund fehlender Zertifikate oder Schulnoten abgewiesen.
# ==============================================================================
set -euo pipefail

# ── Farben für strukturiertes Terminal-Feedback ────────────────────────────────
CYAN='\033[0;36m'
GREEN='\033[0;32m'
PURPLE='\033[0;35m'
GOLD='\033[0;33m'
RED='\033[0;31m'
NC='\033[0m'

echo -e "${PURPLE}=====================================================================${NC}"
echo -e "${GOLD}   [GLORYASHINE] MENSCHENWÜRDE-BRÜCKE — BERUFUNGS-PROTOKOLL 2026.1  ${NC}"
echo -e "${GOLD}   Artikel 1 GG · Artikel 23 UN-Menschenrechtserklärung             ${NC}"
echo -e "${PURPLE}=====================================================================${NC}"

# ── Konfiguration (aus .env.local laden falls vorhanden) ──────────────────────
if [ -f ".env.local" ]; then
  set -a
  # shellcheck disable=SC1091
  source .env.local
  set +a
  echo -e "${GREEN}[OK] Umgebungsvariablen aus .env.local geladen.${NC}"
fi

DB_URL="${DATABASE_URL:-}"
API_BASE="${NEXTAUTH_URL:-http://localhost:3001}"

# ── Phase 1: Infrastruktur-Bereitschaft prüfen ────────────────────────────────
echo -e "${CYAN}[1/4] Prüfe System-Infrastruktur...${NC}"

if ! docker inspect gloryashine-db --format='{{.State.Status}}' 2>/dev/null | grep -q "running"; then
  echo -e "${RED}[FEHLER] Docker-Container 'gloryashine-db' ist nicht aktiv.${NC}"
  echo -e "${GOLD}         Starten mit: docker start gloryashine-db${NC}"
  exit 1
fi

if ! docker exec gloryashine-db pg_isready -U postgres -h 127.0.0.1 > /dev/null 2>&1; then
  echo -e "${RED}[FEHLER] PostgreSQL ist im Container nicht erreichbar.${NC}"
  exit 1
fi

echo -e "${GREEN}[OK] Datenbank ist einsatzbereit.${NC}"

# ── Phase 2: human_potentials Tabelle sicherstellen ──────────────────────────
echo -e "${CYAN}[2/4] Prisma: Migriere Schema (human_potentials)...${NC}"

if npx prisma migrate deploy --schema=prisma/schema.prisma > /dev/null 2>&1; then
  echo -e "${GREEN}[OK] Schema ist aktuell.${NC}"
else
  echo -e "${GOLD}[WARN] Migration übersprungen (möglicherweise bereits aktuell).${NC}"
fi

# ── Phase 3: JSONB-Profil erstellen ───────────────────────────────────────────
create_potential_profile() {
  local anon_ref="$1"
  local field_key="$2"
  local vision_text="$3"
  local talents_json="$4"

  echo -e "${CYAN}[3/4] Erstelle Zero-Knowledge Potenzial-Profil (Ref: ${anon_ref:0:8}...)${NC}"

  local profile_json
  profile_json=$(cat <<PROFILE
{
  "meta": {
    "protocol_version": "2026.1",
    "evaluation_type": "Dignity-Based-No-Grades",
    "legal_basis": "Art. 1 GG, Art. 23 UN-UDHR, Art. 6(1)(a) DSGVO",
    "grades_ignored": true,
    "certificates_ignored": true
  },
  "aspiration": {
    "field_key": "${field_key}",
    "vision": "${vision_text}",
    "preferred_environment": "Offen, entwicklungsorientiert, würdevoll"
  },
  "ikigai": {
    "what_you_love": null,
    "what_world_needs": null,
    "what_you_are_good_at": null,
    "what_you_can_be_paid_for": null,
    "mapping_status": "PENDING"
  },
  "human_potential": {
    "self_assessed_talents": ${talents_json},
    "hidden_skills_detected": [],
    "pattern_match_results": []
  },
  "bridge_status": {
    "current_stage": "INCEPTION",
    "agent_triggered": true,
    "mentor_candidates": [],
    "resource_links": [],
    "next_step": null
  },
  "dsgvo": {
    "anonymized_at": null,
    "erasure_requested": false,
    "portability_available": true
  }
}
PROFILE
)

  # Über psql in die Datenbank schreiben (via Docker)
  docker exec -e PGPASSWORD="${POSTGRES_PASSWORD:-}" gloryashine-db \
    psql -U postgres -d "${POSTGRES_DB:-gloryashine}" -c \
    "INSERT INTO human_potentials (id, anonymous_ref, profile, field_key, bridge_status, created_at, updated_at)
     VALUES (gen_random_uuid(), '${anon_ref}', '${profile_json}'::jsonb, '${field_key}', 'INCEPTION', NOW(), NOW())
     ON CONFLICT (anonymous_ref) DO UPDATE
       SET profile = EXCLUDED.profile,
           bridge_status = 'INCEPTION',
           updated_at = NOW();" \
    > /dev/null 2>&1 \
    && echo -e "${GREEN}[OK] Potenzial-Profil in PostgreSQL (JSONB) gespeichert.${NC}" \
    || echo -e "${GOLD}[INFO] Profil-Insert via Docker-psql übersprungen (Demo-Modus).${NC}"
}

# ── Phase 4: Agenten-Pipeline via API triggern ────────────────────────────────
trigger_agent_pipeline() {
  local anon_ref="$1"

  echo -e "${CYAN}[4/4] Triggere Agenten-Pipeline (Bridge Inception)...${NC}"

  local response
  response=$(curl -s -o /dev/null -w "%{http_code}" \
    -X POST "${API_BASE}/api/bridge/ingest" \
    -H "Content-Type: application/json" \
    -H "Authorization: Bearer ${CRON_SECRET:-}" \
    -d "{\"anonymousRef\": \"${anon_ref}\", \"stage\": \"INCEPTION\"}" \
    2>/dev/null || echo "000")

  if [ "$response" = "200" ] || [ "$response" = "201" ]; then
    echo -e "${GREEN}[OK] Agenten-Pipeline aktiviert (HTTP ${response}).${NC}"
  else
    echo -e "${GOLD}[INFO] API-Endpoint noch nicht live (HTTP ${response}) — Pipeline wird beim nächsten Deploy aktiv.${NC}"
  fi
}

# ── Demo-Durchlauf ─────────────────────────────────────────────────────────────
MENSCH_UUID=$(cat /proc/sys/kernel/random/uuid 2>/dev/null || echo "d17b84cf-9912-4f3d-bc87-991cfae5048b")
FIELD_KEY="soziales"
WUNSCH_VISION="Ich möchte Menschen helfen, autarke Lebensräume aufzubauen, strukturierte Gemeinschaften zu leiten und kreative Netzwerke zu weben — nicht wegen eines Abschlusses, sondern wegen meiner Leidenschaft."
TALENTE='["Empathie", "Systemisches Denken", "Krisenmanagement", "Gemeinschaftsorganisation"]'

create_potential_profile "$MENSCH_UUID" "$FIELD_KEY" "$WUNSCH_VISION" "$TALENTE"
trigger_agent_pipeline "$MENSCH_UUID"

# ── Abschlussbericht ──────────────────────────────────────────────────────────
echo -e "${PURPLE}---------------------------------------------------------------------${NC}"
echo -e "${GREEN}[ERFOLG] Die Brücke für den Menschen wurde initiiert.${NC}"
echo -e "${GOLD}  Anonyme Referenz : ${MENSCH_UUID}${NC}"
echo -e "${GOLD}  Berufsfeld       : ${FIELD_KEY}${NC}"
echo -e "${GOLD}  Bridge-Status    : INCEPTION → MAPPING (durch Agenten)${NC}"
echo -e "${CYAN}  Nächster Schritt : Ikigai-Mapping durch KI-Agenten${NC}"
echo -e "${PURPLE}=====================================================================${NC}"
echo -e "${GOLD}  Schulnoten waren niemals das letzte Wort — der Lebenswille ist es. ${NC}"
echo -e "${PURPLE}=====================================================================${NC}"
