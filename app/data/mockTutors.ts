export interface Tutor {
  id: string;
  name: string;
  subject: string;
  gradeLevel: string;
  mode: 'Online' | 'Offline' | 'Hybrid';
  pricePerHour: number;
  rating: number;
  reviewsCount: number;
  experienceYears: number;
  avatarUrl: string;
  bio: string;
}

export const MOCK_TUTORS: Tutor[] = [
  {
    id: '1',
    name: 'Sarah Amalia, S.Pd.',
    subject: 'Matematika & Fisika',
    gradeLevel: 'SMP & SMA',
    mode: 'Hybrid',
    pricePerHour: 75000,
    rating: 4.9,
    reviewsCount: 28,
    experienceYears: 4,
    avatarUrl: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&q=80',
    bio: 'Sabar membimbing siswa yang kesulitan memahami rumus dasar matematika dan fisika.'
  },
  {
    id: '2',
    name: 'Budi Santoso, M.Kom.',
    subject: 'Pemrograman & Komputer',
    gradeLevel: 'SMA & Mahasiswa',
    mode: 'Online',
    pricePerHour: 100000,
    rating: 5.0,
    reviewsCount: 42,
    experienceYears: 6,
    avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
    bio: 'Mengajar logika pemrograman dasar, Python, dan web development dari nol.'
  },
  {
    id: '3',
    name: 'Alya Rahma, B.A.',
    subject: 'Bahasa Inggris',
    gradeLevel: 'SD & SMP',
    mode: 'Offline',
    pricePerHour: 60000,
    rating: 4.8,
    reviewsCount: 19,
    experienceYears: 3,
    avatarUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=200&q=80',
    bio: 'Fokus pada conversational English, membantu anak percaya diri berbicara.'
  }
];