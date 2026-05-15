import crypto from "crypto";

const SALT = process.env.SOVEREIGN_ID_SALT || "gloryashine-default-salt";

export function generateSovereignId(countryCode: string, isJunior: boolean): string {
  const timestamp = Date.now().toString(36);
  const random = crypto.randomBytes(6).toString("hex");
  const hash = crypto
    .createHmac("sha256", SALT)
    .update(`${countryCode}-${timestamp}-${random}`)
    .digest("hex")
    .substring(0, 9)
    .toUpperCase();

  const prefix = isJunior ? "ID-JNR-GLOB" : `ID-GLB-${countryCode.toUpperCase()}`;
  return `${prefix}-${hash}`;
}

export function parseSovereignId(id: string) {
  const parts = id.split("-");
  const isJunior = id.startsWith("ID-JNR");
  return {
    raw: id,
    isJunior,
    prefix: isJunior ? "ID-JNR" : "ID-GLB",
    countryCode: isJunior ? "GLOBAL" : parts[2] || "XX",
    hash: parts[parts.length - 1],
  };
}
