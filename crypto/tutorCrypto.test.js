const { hashPassword, verifyPassword } = require('./tutorCrypto');

describe('Pengujian Skenario Kriptografi TutorCare', () => {
  
  test('Skenario 1: Hashing password menghasilkan format string yang valid', () => {
    const hashed = hashPassword('Password123!');
    expect(hashed).toBeDefined();
    expect(typeof hashed).toBe('string');
    expect(hashed.includes(':')).toBe(true);
  });

  test('Skenario 2: Verifikasi sukses saat password benar', () => {
    const password = 'SecurePassword!99';
    const hashed = hashPassword(password);
    const isValid = verifyPassword(password, hashed);
    expect(isValid).toBe(true);
  });

  test('Skenario 3 (Negatif): Verifikasi gagal jika password salah', () => {
    const hashed = hashPassword('Benar123!');
    const isValid = verifyPassword('SalahBanget!', hashed);
    expect(isValid).toBe(false);
  });

  test('Skenario 4 (Uji Batas): Menangani input string kosong tanpa error fatal', () => {
    expect(() => {
      const hashed = hashPassword('');
      const isValid = verifyPassword('', hashed);
      expect(isValid).toBe(true);
    }).not.toThrow();n
  });

});