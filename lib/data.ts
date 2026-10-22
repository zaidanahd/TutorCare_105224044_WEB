import 'server-only';

export interface InternalSystemConfig {
  databaseUrl: string;
  secretApiKey: string;
  serverTimestamp: number;
}

export const internalSystemConfig: InternalSystemConfig = {
  databaseUrl: 'postgresql://postgres:secret_password@localhost:5432/tutorcare_db',
  secretApiKey: 'TC_SEC_KEY_0192837465',
  serverTimestamp: Date.now(),
};
