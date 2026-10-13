const { hashPassword, encryptBookingData, decryptBookingData } = require('./tutorCrypto');

console.log('--- MENJALANKAN SKENARIO UJI KRIPTOGRAFI TUTORCARE ---');

const salt = 'sintetis-salt-123';
const hash1 = hashPassword('PasswordAman123', salt);
const hash2 = hashPassword('PasswordAman123', salt);
console.log(`Skenario 1 (Hash Konsisten): ${hash1 === hash2 ? 'BERHASIL [✔]' : 'GAGAL [✘]'}`);

const sampleData = 'Siswa: Budi, Kursus: Pemrograman';
const encrypted = encryptBookingData(sampleData);
const decrypted = decryptBookingData(encrypted);
console.log(`Skenario 2 (Enkripsi & Dekripsi Data): ${decrypted === sampleData ? 'BERHASIL [✔]' : 'GAGAL [✘]'}`);

const hashDifferent = hashPassword('PasswordBeda', salt);
console.log(`Skenario 3 (Uji Batas Password Berbeda): ${hash1 !== hashDifferent ? 'BERHASIL [✔]' : 'GAGAL [✘]'}`);

let test4 = false;
try {
  decryptBookingData('invalidiv:invalidciphertext');
} catch (error) {
  test4 = true;
}
console.log(`Skenario 4 (Uji Negatif Data Rusak/Manipulasi): ${test4 ? 'BERHASIL [✔]' : 'GAGAL [✘]'}`);