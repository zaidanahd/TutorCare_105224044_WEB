import crypto from 'crypto';

// 1. Fungsi Hashing Kriptografis untuk Password/Kredensial (Menggunakan PBKDF2 atau SHA-256 dengan Salt Sintetis)
export function hashPassword(password: string, salt: string): string {
  return crypto.pbkdf2Sync(password, salt, 10000, 64, 'sha512').toString('hex');
}

// 2. Fungsi Enkripsi Data Sintetis (AES-256-CBC) untuk Pelindungan Data Transien/Booking
const ENCRYPTION_KEY = crypto.randomBytes(32); // Kunci simetris 256-bit
const IV_LENGTH = 16;

export function encryptBookingData(text: string): string {
  const iv = crypto.randomBytes(IV_LENGTH);
  const cipher = crypto.createCipheriv('aes-256-cbc', Buffer.from(ENCRYPTION_KEY), iv);
  let encrypted = cipher.update(text);
  encrypted = Buffer.concat([encrypted, cipher.final()]);
  return iv.toString('hex') + ':' + encrypted.toString('hex');
}

export function decryptBookingData(text: string): string {
  const textParts = text.split(':');
  const iv = Buffer.from(textParts.shift()!, 'hex');
  const encryptedText = Buffer.from(textParts.join(':'), 'hex');
  const decipher = crypto.createDecipheriv('aes-256-cbc', Buffer.from(ENCRYPTION_KEY), iv);
  let decrypted = decipher.update(encryptedText);
  decrypted = Buffer.concat([decrypted, decipher.final()]);
  return decrypted.toString();
}