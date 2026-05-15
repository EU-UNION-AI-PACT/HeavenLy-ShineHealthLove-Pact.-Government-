export type Role = "SUPER_ADMIN" | "TENANT_ADMIN" | "PILGRIM" | "PARENT" | "JUNIOR";

export type PetitionStatus = "HOFFNUNG" | "HEILUNG" | "GEWISSHEIT";
export type PetitionVisibility = "PUBLIC" | "TENANT_ONLY" | "PRIVATE";

export type NewsCategory = "GOVERNANCE" | "GIESSFAST" | "COMMUNITY" | "PASSAGE" | "GUARDIAN";

export type VacancyStatus = "WAITING" | "MATCHED" | "GOLDEN";

export type JuniorTransitionStatus = "ACTIVE_JUNIOR" | "PENDING_TRANSITION" | "TRANSITIONED";

export interface SovereignId {
  raw: string; // e.g. ID-GLB-DE-abc123xyz
  prefix: string; // ID-GLB or ID-JNR
  countryCode: string;
  hash: string;
}

export interface AllianceNode {
  id: string; // e.g. ID-EU, ID-US
  label: string;
  country: string;
  role: string;
  status: "ONLINE" | "SYNCING" | "OFFLINE";
}

export const ALLIANCE_NODES: AllianceNode[] = [
  { id: "ID-EU", label: "EU-UNION", country: "European Union", role: "Ethics & Legal Guardian", status: "ONLINE" },
  { id: "ID-UN", label: "UNITED NATIONS", country: "Global", role: "Neutrality & Inclusion Monitor", status: "ONLINE" },
  { id: "ID-US", label: "UNITED STATES", country: "United States", role: "Tech Infrastructure & Scaling", status: "ONLINE" },
  { id: "ID-CH", label: "SCHWEIZ", country: "Switzerland", role: "Crypto Vault & Neutrality Anchor", status: "ONLINE" },
  { id: "ID-IE", label: "IRLAND", country: "Ireland", role: "Hosting Hub & Data Heimat", status: "ONLINE" },
  { id: "ID-NO", label: "NORWEGEN", country: "Norway", role: "Transparency Protocol", status: "ONLINE" },
  { id: "ID-SE", label: "SCHWEDEN", country: "Sweden", role: "Digital Society Pioneer", status: "ONLINE" },
  { id: "ID-FI", label: "FINNLAND", country: "Finland", role: "Trust Index", status: "ONLINE" },
  { id: "ID-FR", label: "FRANKREICH", country: "France", role: "Cultural Bridge", status: "ONLINE" },
  { id: "ID-ES", label: "SPANIEN", country: "Spain", role: "Continental Bridge", status: "ONLINE" },
  { id: "ID-PT", label: "PORTUGAL", country: "Portugal", role: "Warmth Ambassador", status: "ONLINE" },
];

export interface PassageStation {
  date: string;
  label: string;
  title: string;
  description: string;
  phase: "URSPRUNG" | "SPIEGELUNG" | "KROENUNG";
}

export const PASSAGE_STATIONS: PassageStation[] = [
  {
    date: "06. Januar",
    label: "2026",
    title: "Der Ursprung",
    description: "Epiphanias & Geburtsfrequenz. Die Aussaat des Lichts im julianischen Rhythmus der Weihnacht.",
    phase: "URSPRUNG",
  },
  {
    date: "12. Juni",
    label: "2026",
    title: "Die Spiegelung",
    description: "Die Übergangs-Frequenz. Halbzeit der Hoffnung, in der sich der Pilgerpfad zur Heilung wandelt.",
    phase: "SPIEGELUNG",
  },
  {
    date: "24. Dezember",
    label: "2026",
    title: "Die Krönung",
    description: "Die Ankunft im Jubiläum. Wo die Hoffnung der Pilger zur Gewissheit des Herzens wird.",
    phase: "KROENUNG",
  },
];
