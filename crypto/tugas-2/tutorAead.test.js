const {
  encryptAEAD,
  decryptAEAD,
  generateEncryptionKey,
  serializeEncryptedPayload,
} = require('./tutorAead');

describe('Tugas 2 Kriptografi: Pengujian Enkripsi Terautentikasi (AEAD) & Integritas Data TutorCare', () => {
  const validKey = generateEncryptionKey();
  const wrongKey = generateEncryptionKey();
  const contextAad = 'TutorCare:KonsultasiPrivat:Siswa_105224044:ID_99';
  const sensitivePlainText = 'Siswa membutuhkan bimbingan khusus pada materi Struktur Data Lanjut dan Algoritma Greedy.';

  test('Skenario 1 (Positif - Happy Path): Enkripsi dan dekripsi data bimbingan berhasil secara utuh', () => {
    const encrypted = encryptAEAD(sensitivePlainText, contextAad, validKey);

    expect(encrypted).toBeDefined();
    expect(encrypted.ciphertext).toBeDefined();
    expect(encrypted.iv).toHaveLength(24);   // 12 bytes = 24 karakter hex
    expect(encrypted.tag).toHaveLength(32);  // 16 bytes = 32 karakter hex
    expect(encrypted.aad).toBe(contextAad);

    const decrypted = decryptAEAD(encrypted, contextAad, validKey);
    expect(decrypted).toBe(sensitivePlainText);
  });

  test('Skenario 2 (Negatif - Modifikasi Data): Ciphertext yang dimanipulasi ditolak (Fail-Closed)', () => {
    const encrypted = encryptAEAD(sensitivePlainText, contextAad, validKey);

    const tamperedCiphertext =
      (parseInt(encrypted.ciphertext.slice(0, 2), 16) ^ 0xff)
        .toString(16)
        .padStart(2, '0') + encrypted.ciphertext.slice(2);

    const tamperedPayload = {
      ...encrypted,
      ciphertext: tamperedCiphertext,
    };

    expect(() => {
      decryptAEAD(tamperedPayload, contextAad, validKey);
    }).toThrow(/Fail-Closed/i);
  });

  test('Skenario 3 (Negatif - Modifikasi Tag): Authentication Tag yang diubah ditolak (Fail-Closed)', () => {
    const encrypted = encryptAEAD(sensitivePlainText, contextAad, validKey);

    const tamperedTag =
      (parseInt(encrypted.tag.slice(0, 2), 16) ^ 0xaa)
        .toString(16)
        .padStart(2, '0') + encrypted.tag.slice(2);

    const tamperedPayload = {
      ...encrypted,
      tag: tamperedTag,
    };

    expect(() => {
      decryptAEAD(tamperedPayload, contextAad, validKey);
    }).toThrow(/Fail-Closed/i);
  });

  test('Skenario 4 (Negatif - Kunci Salah): Dekripsi dengan kunci yang tidak sah ditolak (Fail-Closed)', () => {
    const encrypted = encryptAEAD(sensitivePlainText, contextAad, validKey);

    expect(() => {
      decryptAEAD(encrypted, contextAad, wrongKey);
    }).toThrow(/Fail-Closed/i);
  });

  test('Skenario 5 (Negatif - Modifikasi AAD): Konteks AAD yang dipalsukan ditolak (Fail-Closed)', () => {
    const encrypted = encryptAEAD(sensitivePlainText, contextAad, validKey);
    const forgedAad = 'TutorCare:KonsultasiPrivat:Siswa_99999999:ID_99';

    expect(() => {
      decryptAEAD(encrypted, forgedAad, validKey);
    }).toThrow(/Fail-Closed/i);
  });

  test('Skenario 6 (Uji Serialisasi & Validasi Batas): Format string "iv:tag:ciphertext" dan penolakan kunci cacat', () => {
    const encrypted = encryptAEAD(sensitivePlainText, contextAad, validKey);

    const serializedString = serializeEncryptedPayload(encrypted);
    expect(serializedString.split(':')).toHaveLength(3);

    const decryptedFromString = decryptAEAD(serializedString, contextAad, validKey);
    expect(decryptedFromString).toBe(sensitivePlainText);

    const shortKey = 'kunci-terlalu-pendek-123';
    expect(() => {
      encryptAEAD(sensitivePlainText, contextAad, shortKey);
    }).toThrow(/Panjang kunci tidak valid/i);
  });
});
