import { useState, useEffect } from 'react';
import { router } from '@inertiajs/react';

interface User {
  name: string;
  email: string;
}

export const useAuth = () => {
  // Simpan data user di state
  const [user, setUser] = useState<User | null>(null);

  // Fetch atau inisialisasi data user saat komponen dimuat
  useEffect(() => {
    // Asumsi Anda mengambil data user dari server atau local storage.
    const fetchUser = async () => {
      // Contoh mengambil user dari localStorage (sesuaikan dengan aplikasi Anda)
      const storedUser = localStorage.getItem('user');
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      } else {
        // Jika user tidak ditemukan, redirect ke halaman login (opsional)
        router.visit('/login');
      }
    };

    fetchUser();
  }, []);

  // Fungsi logout untuk menghapus data user
  const logout = () => {
    setUser(null);
    localStorage.removeItem('user'); // Hapus data user dari localStorage
    router.visit('/login'); // Redirect ke halaman login
  };

  return { user, logout };
};
