
export interface User {
  username: string;
  role: 'admin' | 'adminsistem' | null;
  name: string;
}

export interface Announcement {
  id: number;
  title: string;
  date: string;
  summary: string;
  views: number;
  likes: number;
}

export interface Program {
  id: number;
  title: string;
  date: string;
  time?: string;
  location?: string;
  category: string;
  description: string;
  image1?: string;
  image2?: string;
}

export interface SchoolProfile {
  pengetuaName: string;
  pengetuaQuote: string;
  pengetuaImage: string;
  schoolName: string;
  schoolCode: string;
  address: string;
  email: string;
  phone: string;
  location: string;
  visi: string;
  misi: string;
  moto: string;
  slogan: string;
  status: string;
  stats: {
    lulusSpm: string;
    gred: string;
    guruTotal: number;
    guruLelaki: number;
    guruPerempuan: number;
    muridTotal: number;
    muridLelaki: number;
    muridPerempuan: number;
  };
}

export interface Permissions {
  pentadbiran: boolean;
  kurikulum: boolean;
  hem: boolean;
  kokurikulum: boolean;
  takwim: boolean;
  program: boolean;
  pengumuman: boolean;
  laporan: boolean;
}

export interface SiteConfig {
  systemTitle: string;
  schoolName: string;
  welcomeMessage: string;
  googleScriptUrl?: string;
}
