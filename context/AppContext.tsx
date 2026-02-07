
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User, Permissions, Announcement, Program, SiteConfig, SchoolProfile } from '../types';

interface AppContextType {
  user: User | null;
  login: (username: string, role: 'admin' | 'adminsistem') => void;
  logout: () => void;
  permissions: Permissions;
  updatePermissions: (newPermissions: Permissions) => void;
  activeTab: string;
  setActiveTab: (tab: string) => void;
  
  announcements: Announcement[];
  addAnnouncement: (announcement: Announcement) => void;
  programs: Program[];
  addProgram: (program: Program) => void;
  updateProgram: (program: Program) => void;
  deleteProgram: (id: number) => void;
  
  siteConfig: SiteConfig;
  updateSiteConfig: (config: Partial<SiteConfig>) => void;

  schoolProfile: SchoolProfile;
  updateSchoolProfile: (profile: SchoolProfile) => void;

  toastMessage: string | null;
  showToast: (msg: string) => void;

  saveToCloud: () => Promise<void>;
  loadFromCloud: () => Promise<void>;
  isSyncing: boolean;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

const defaultProfile: SchoolProfile = {
  pengetuaName: "Zulkeffle bin Muhammad",
  pengetuaQuote: "Selamat datang ke SMA Al-Khairiah Al-Islamiah Mersing. Bersama-sama kita membentuk generasi ulul albab yang cemerlang di dunia and akhirat.",
  pengetuaImage: "",
  schoolName: "SMA AL-KHAIRIAH AL-ISLAMIAH MERSING",
  schoolCode: "JFT4001",
  address: "Jalan Dato' Onn, 86800 Mersing, Johor",
  email: "jft4001@moe.edu.my",
  phone: "07-7996272",
  location: "Luar Bandar (A)",
  visi: "Pendidikan Berkualiti, Insan Terdidik, Negara Sejahtera.",
  misi: "Mengekalkan kegemilangan sekolah dan melahirkan generasi berilmu, beramal dan bertaqwa melalui tadbir urus yang lestari.",
  moto: "Ilmu. Iman. Amal.",
  slogan: "SMAAM Gemilang!",
  status: "Sekolah Gred A",
  stats: {
    lulusSpm: "98%",
    gred: "Gred A",
    guruTotal: 45,
    guruLelaki: 10,
    guruPerempuan: 35,
    muridTotal: 650,
    muridLelaki: 320,
    muridPerempuan: 330
  }
};

const defaultPermissions: Permissions = {
  pentadbiran: true,
  kurikulum: true,
  hem: true,
  kokurikulum: true,
  takwim: true,
  program: true,
  pengumuman: true,
  laporan: true,
};

const initialAnnouncements: Announcement[] = [
  {
    id: 1,
    title: "Mesyuarat Agung PIBG Kali Ke-15",
    date: "25-10-2026",
    summary: "Semua ibu bapa dan guru dijemput hadir ke Dewan Utama bermula jam 8.00 pagi.",
    views: 124,
    likes: 45
  },
  {
    id: 2,
    title: "Cuti Peristiwa Sempena Sukan Tahunan",
    date: "01-11-2026",
    summary: "Sekolah akan bercuti pada hari Isnin sebagai cuti peristiwa.",
    views: 312,
    likes: 89
  }
];

const initialPrograms: Program[] = [
  {
    id: 1,
    title: "Minggu Bahasa & Budaya",
    date: "15-11-2026",
    time: "08:00 Pagi",
    location: "Dewan Terbuka SMAAM",
    category: "Kurikulum",
    description: "Pertandingan pidato, sajak dan penulisan esei yang melibatkan semua pelajar tingkatan 1 hingga 5. Program ini bertujuan memartabatkan bahasa kebangsaan.",
    image1: "https://images.unsplash.com/photo-1544531586-fde5298cdd40?q=80&w=600&auto=format&fit=crop",
    image2: "https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?q=80&w=600&auto=format&fit=crop"
  }
];

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [permissions, setPermissions] = useState<Permissions>(defaultPermissions);
  const [activeTab, setActiveTab] = useState('Dashboard');
  const [announcements, setAnnouncements] = useState<Announcement[]>(initialAnnouncements);
  const [programs, setPrograms] = useState<Program[]>(initialPrograms);
  const [schoolProfile, setSchoolProfile] = useState<SchoolProfile>(defaultProfile);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [isSyncing, setIsSyncing] = useState(false);
  
  const [siteConfig, setSiteConfig] = useState<SiteConfig>({
    systemTitle: "PENGURUSAN DIGITAL SMAAM",
    schoolName: "SMA Al-Khairiah Al-Islamiah Mersing",
    welcomeMessage: "Selamat Datang ke Dashboard Utama",
    googleScriptUrl: ""
  });

  useEffect(() => {
    const savedPermissions = localStorage.getItem('smaam_permissions');
    if (savedPermissions) setPermissions(JSON.parse(savedPermissions));

    const savedConfig = localStorage.getItem('smaam_config');
    if (savedConfig) setSiteConfig(JSON.parse(savedConfig));

    const savedProfile = localStorage.getItem('smaam_profile');
    if (savedProfile) setSchoolProfile(JSON.parse(savedProfile));
    
    const savedUser = sessionStorage.getItem('smaam_user');
    if (savedUser) setUser(JSON.parse(savedUser));
  }, []);

  const login = (username: string, role: 'admin' | 'adminsistem') => {
    const newUser = { username, role, name: role === 'adminsistem' ? 'Admin Sistem' : 'Admin Bertugas' };
    setUser(newUser);
    sessionStorage.setItem('smaam_user', JSON.stringify(newUser));
    showToast(`Selamat datang, ${newUser.name}`);
  };

  const logout = () => {
    setUser(null);
    sessionStorage.removeItem('smaam_user');
    setActiveTab('Dashboard');
    showToast("Log keluar berjaya");
  };

  const updatePermissions = (newPermissions: Permissions) => {
    setPermissions(newPermissions);
    localStorage.setItem('smaam_permissions', JSON.stringify(newPermissions));
  };

  const updateSiteConfig = (config: Partial<SiteConfig>) => {
    const newConfig = { ...siteConfig, ...config };
    setSiteConfig(newConfig);
    localStorage.setItem('smaam_config', JSON.stringify(newConfig));
  };

  const updateSchoolProfile = (profile: SchoolProfile) => {
    setSchoolProfile(profile);
    localStorage.setItem('smaam_profile', JSON.stringify(profile));
  };

  const addAnnouncement = (item: Announcement) => {
    setAnnouncements([item, ...announcements]);
    showToast("Pengumuman ditambah");
  };

  const addProgram = (item: Program) => {
    setPrograms([item, ...programs]);
    showToast("Program ditambah");
  };

  const updateProgram = (updatedItem: Program) => {
    setPrograms(programs.map(p => p.id === updatedItem.id ? updatedItem : p));
    showToast("Program dikemaskini");
  };

  const deleteProgram = (id: number) => {
    setPrograms(programs.filter(p => p.id !== id));
    showToast("Program dipadam");
  };

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const saveToCloud = async () => {
    if (!siteConfig.googleScriptUrl) {
      alert("Sila tetapkan URL Google Apps Script di Tetapan Admin dahulu.");
      return;
    }
    setIsSyncing(true);
    showToast("Sedang menyimpan ke Google Sheet...");
    try {
      const payload = {
        action: 'save',
        data: {
          permissions,
          siteConfig,
          announcements,
          programs,
          schoolProfile
        }
      };
      const response = await fetch(siteConfig.googleScriptUrl, {
        method: 'POST',
        headers: { "Content-Type": "text/plain;charset=utf-8" },
        body: JSON.stringify(payload)
      });
      const result = await response.json();
      if (result.status === 'success') showToast("✅ Berjaya disimpan!");
      else showToast("⚠️ Ralat: " + result.message);
    } catch (error) {
      showToast("❌ Gagal menyambung ke server.");
    } finally {
      setIsSyncing(false);
    }
  };

  const loadFromCloud = async () => {
    if (!siteConfig.googleScriptUrl) {
      alert("Sila tetapkan URL Google Apps Script di Tetapan Admin dahulu.");
      return;
    }
    setIsSyncing(true);
    showToast("Sedang memuat turun data...");
    try {
       const url = `${siteConfig.googleScriptUrl}?action=read`;
       const response = await fetch(url);
       const result = await response.json();
       if (result.status === 'success' && result.data) {
          const d = result.data;
          if(d.permissions) setPermissions(d.permissions);
          if(d.siteConfig) setSiteConfig({ ...d.siteConfig, googleScriptUrl: siteConfig.googleScriptUrl });
          if(d.schoolProfile) setSchoolProfile(d.schoolProfile);
          if(d.announcements) setAnnouncements(d.announcements);
          if(d.programs) setPrograms(d.programs);
          showToast("✅ Data berjaya dimuat turun!");
       }
    } catch (error) {
       showToast("❌ Gagal memuat turun data.");
    } finally {
       setIsSyncing(false);
    }
  };

  return (
    <AppContext.Provider value={{
      user, login, logout,
      permissions, updatePermissions,
      activeTab, setActiveTab,
      announcements, addAnnouncement,
      programs, addProgram, updateProgram, deleteProgram,
      siteConfig, updateSiteConfig,
      schoolProfile, updateSchoolProfile,
      toastMessage, showToast,
      saveToCloud, loadFromCloud, isSyncing
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error("useApp must be used within AppProvider");
  return context;
};
