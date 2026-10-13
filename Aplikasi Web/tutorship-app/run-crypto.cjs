const crypto = require('crypto');

console.log('=== MENJALANKAN SKENARIO UJI KRIPTOGRAFI TUTORCARE ===');

// 1. Fungsi Hashing (PBKDF2)
function hashPassword(password, salt) {
  return crypto.pbkdf2Sync(password, salt, 10000, 64, 'sha512').toString('hex');
}

// 2. Fungsi Enkripsi/Dekripsi (AES-256-CBC)
const ENCRYPTION_KEY = crypto.randomBytes(32);
const IV_LENGTH = 16;

function encryptBookingData(text) {
  const iv = crypto.randomBytes(IV_LENGTH);
  const cipher = crypto.createCipheriv('aes-256-cbc', Buffer.from(ENCRYPTION_KEY), iv);
  let encrypted = cipher.update(text);
  encrypted = Buffer.concat([encrypted, cipher.final()]);
  return iv.toString('hex') + ':' + encrypted.toString('hex');
}

function decryptBookingData(text) {
  const textParts = text.split(':');
  const iv = Buffer.from(textParts.shift(), 'hex');
  const encryptedText = Buffer.from(textParts.join(':'), 'hex');
  const decipher = crypto.createDecipheriv('aes-256-cbc', Buffer.from(ENCRYPTION_KEY), iv);
  let decrypted = decipher.update(encryptedText);
  decrypted = Buffer.concat([decrypted, decipher.final()]);
  return decrypted.toString();
}

// --- EKSEKUSI SKENARIO UJI ---
const salt = 'sintetis-salt-123';

// Skenario 1
const h1 = hashPassword('PasswordAman123', salt);
const h2 = hashPassword('PasswordAman123', salt);
console.log(`Skenario 1 (Hash Konsisten): ${h1 === h2 ? 'BERHASIL [✔]' : 'GAGAL [✘]'}`);

// Skenario 2
const sample = 'Siswa: Budi, Kursus: Pemrograman';
const enc = encryptBookingData(sample);
const dec = decryptBookingData(enc);
console.log(`Skenario 2 (Enkripsi & Dekripsi Data): ${dec === sample ? 'BERHASIL [✔]' : 'GAGAL [✘]'}`);

// Skenario 3
const hDiff = hashPassword('PasswordBeda', salt);
console.log(`Skenario 3 (Uji Batas Password Berbeda): ${h1 !== hDiff ? 'BERHASIL [✔]' : 'GAGAL [✘]'}`);

// Skenario 4 (Uji Negatif)
let test4 = false;
try {
  decryptBookingData('invalidiv:invalidciphertext');
} catch (e) {
  test4 = true;
}
console.log(`Skenario 4 (Uji Negatif Data Rusak/Manipulasi): ${test4 ? 'BERHASIL [✔]' : 'GAGAL [✘]'}`);