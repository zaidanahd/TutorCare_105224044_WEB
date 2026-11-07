import crypto from 'crypto';

/**
 * TUGAS 2 — Enkripsi Terautentikasi dan Integritas Data
 * Topik: Authenticated Encryption with Associated Data (AEAD)
 * Algoritma: AES-256-GCM (Galois/Counter Mode)
 * Produk: TutorCare
 * 
 * Parameter Terdokumentasi:
 * - Panjang Kunci: 256-bit (32 bytes / 64 karakter heksadesimal)
 * - Nonce / IV: 96-bit (12 bytes) CSPRNG acak unik per enkripsi (NIST SP 800-38D)
 * - Authentication Tag: 128-bit (16 bytes)
 * - AAD (Additional Authenticated Data): Konteks sesi bimbingan / ID siswa
 * - Penanganan Galat: Gagal Tertutup (Fail-Closed) tanpa membocorkan plaintext
 */

export const ALGORITHM = 'aes-256-gcm';
export const KEY_LENGTH_BYTES = 32;       // 256 bits
export const IV_LENGTH_BYTES = 12;        // 96 bits
export const TAG_LENGTH_BYTES = 16;       // 128 bits

export interface EncryptedPayload {
  ciphertext: string; // representasi heksadesimal
  iv: string;         // 24 karakter hex (12 bytes)
  tag: string;        // 32 karakter hex (16 bytes)
  aad?: string;       // metadata konteks yang diotentikasi
}

/**
 * Membangkitkan kunci enkripsi simetris 256-bit baru menggunakan CSPRNG.
 * Kunci direpresentasikan dalam bentuk 64 karakter heksadesimal.
 */
export function generateEncryptionKey(): string {
  return crypto.randomBytes(KEY_LENGTH_BYTES).toString('hex');
}

/**
 * Mengambil dan memvalidasi kunci enkripsi dari environment variable.
 * Bersifat fail-closed: melempar error jika kunci tidak ditemukan atau panjangnya tidak tepat.
 */
export function getEncryptionKeyFromEnv(): Buffer {
  const envKey = process.env.TUTORCARE_ENCRYPTION_KEY;
  if (!envKey) {
    throw new Error(
      'Kunci enkripsi tidak ditemukan di environment variable TUTORCARE_ENCRYPTION_KEY (Fail-Closed).'
    );
  }
  return parseAndValidateKey(envKey);
}

/**
 * Validasi dan konversi kunci (baik berupa hex string atau Buffer) menjadi Buffer 32 bytes.
 */
export function parseAndValidateKey(key: string | Buffer): Buffer {
  let keyBuffer: Buffer;

  if (Buffer.isBuffer(key)) {
    keyBuffer = key;
  } else if (typeof key === 'string') {
    const trimmed = key.trim();
    if (trimmed.length === 64 && /^[0-9a-fA-F]+$/.test(trimmed)) {
      keyBuffer = Buffer.from(trimmed, 'hex');
    } else {
      keyBuffer = Buffer.from(trimmed, 'utf8');
    }
  } else {
    throw new Error('Tipe kunci tidak valid: harus berupa string heksadesimal atau Buffer (Fail-Closed).');
  }

  if (keyBuffer.length !== KEY_LENGTH_BYTES) {
    throw new Error(
      `Panjang kunci tidak valid: diharapkan ${KEY_LENGTH_BYTES} bytes (256-bit), diterima ${keyBuffer.length} bytes (Fail-Closed).`
    );
  }

  return keyBuffer;
}

/**
 * Melakukan enkripsi terautentikasi (AEAD) menggunakan AES-256-GCM.
 * 
 * @param plaintext Teks rahasia yang akan dienkripsi (catatan bimbingan siswa)
 * @param contextAad Data konteks asosiasi opsional yang dijamin integritasnya
 * @param customKey Kunci kustom opsional (default: dari .env)
 */
export function encryptAEAD(
  plaintext: string,
  contextAad?: string,
  customKey?: string | Buffer
): EncryptedPayload {
  if (typeof plaintext !== 'string') {
    throw new Error('Masukan plaintext harus bertipe string (Fail-Closed).');
  }

  const keyBuffer = customKey ? parseAndValidateKey(customKey) : getEncryptionKeyFromEnv();
  const ivBuffer = crypto.randomBytes(IV_LENGTH_BYTES);
  const cipher = crypto.createCipheriv(ALGORITHM, keyBuffer, ivBuffer);

  if (contextAad !== undefined && contextAad !== null) {
    cipher.setAAD(Buffer.from(String(contextAad), 'utf8'));
  }

  let ciphertext = cipher.update(plaintext, 'utf8', 'hex');
  ciphertext += cipher.final('hex');
  const tagBuffer = cipher.getAuthTag();

  return {
    ciphertext,
    iv: ivBuffer.toString('hex'),
    tag: tagBuffer.toString('hex'),
    aad: contextAad,
  };
}

/**
 * Melakukan dekripsi terautentikasi dan verifikasi integritas data menggunakan AES-256-GCM.
 * Bersifat Gagal Tertutup (Fail-Closed).
 */
export function decryptAEAD(
  payload: EncryptedPayload | string,
  contextAad?: string,
  customKey?: string | Buffer
): string {
  let parsedPayload: EncryptedPayload;

  if (typeof payload === 'string') {
    parsedPayload = deserializeEncryptedString(payload);
  } else if (payload && typeof payload === 'object') {
    parsedPayload = payload;
  } else {
    throw new Error('Payload terenkripsi tidak valid: harus berupa objek EncryptedPayload atau string terformat (Fail-Closed).');
  }

  const { ciphertext, iv, tag } = parsedPayload;

  if (!ciphertext || !iv || !tag) {
    throw new Error('Komponen payload tidak lengkap: iv, tag, dan ciphertext wajib ada (Fail-Closed).');
  }

  const ivBuffer = Buffer.from(iv, 'hex');
  const tagBuffer = Buffer.from(tag, 'hex');

  if (ivBuffer.length !== IV_LENGTH_BYTES) {
    throw new Error(`Panjang IV tidak valid: diharapkan ${IV_LENGTH_BYTES} bytes (Fail-Closed).`);
  }

  if (tagBuffer.length !== TAG_LENGTH_BYTES) {
    throw new Error(`Panjang Authentication Tag tidak valid: diharapkan ${TAG_LENGTH_BYTES} bytes (Fail-Closed).`);
  }

  const keyBuffer = customKey ? parseAndValidateKey(customKey) : getEncryptionKeyFromEnv();

  try {
    const decipher = crypto.createDecipheriv(ALGORITHM, keyBuffer, ivBuffer);
    decipher.setAuthTag(tagBuffer);

    const effectiveAad = contextAad !== undefined ? contextAad : parsedPayload.aad;
    if (effectiveAad !== undefined && effectiveAad !== null) {
      decipher.setAAD(Buffer.from(String(effectiveAad), 'utf8'));
    }

    let decrypted = decipher.update(ciphertext, 'hex', 'utf8');
    decrypted += decipher.final('utf8');

    return decrypted;
  } catch (error: unknown) {
    const originalMsg = error instanceof Error ? error.message : String(error);
    throw new Error(
      `Gagal melakukan autentikasi atau dekripsi: integritas data rusak atau kunci salah [${originalMsg}] (Fail-Closed).`
    );
  }
}

/**
 * Serialisasi EncryptedPayload menjadi string tunggal format "iv:tag:ciphertext".
 */
export function serializeEncryptedPayload(payload: EncryptedPayload): string {
  return `${payload.iv}:${payload.tag}:${payload.ciphertext}`;
}

/**
 * Deserialisasi string format "iv:tag:ciphertext" menjadi EncryptedPayload.
 */
export function deserializeEncryptedString(serialized: string): EncryptedPayload {
  const parts = serialized.split(':');
  if (parts.length < 3) {
    throw new Error('Format string terenkripsi tidak valid: diharapkan format "iv:tag:ciphertext" (Fail-Closed).');
  }
  return {
    iv: parts[0],
    tag: parts[1],
    ciphertext: parts[2],
  };
}
