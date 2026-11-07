import crypto from 'crypto';

/**
 * TUGAS 1 — Fondasi dan Komponen Dasar Kriptografi
 * Topik: Hashing Password dengan Salt & timingSafeEqual
 * Produk: TutorCare
 */

/**
 * Fungsi hashing password yang aman menggunakan scrypt dengan random salt 16-byte.
 */
export function hashPassword(password: string): string {
  const salt = crypto.randomBytes(16).toString('hex');
  const hash = crypto.scryptSync(password, salt, 64).toString('hex');
  return `${salt}:${hash}`;
}

/**
 * Verifikasi kecocokan password dengan hash tersimpan menggunakan timingSafeEqual
 * untuk mencegah serangan timing attack.
 */
export function verifyPassword(password: string, storedHash: string): boolean {
  const [salt, originalHash] = storedHash.split(':');
  if (!salt || !originalHash) return false;
  const hash = crypto.scryptSync(password, salt, 64).toString('hex');
  return crypto.timingSafeEqual(Buffer.from(hash, 'hex'), Buffer.from(originalHash, 'hex'));
}
