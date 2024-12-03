// resources/js/data.ts
export const features = [
    {
      icon: "CheckCircle",
      title: "Feature Title",
      description: "Feature description",
      benefits: ["Benefit 1", "Benefit 2"],
    },
  ];

  export const pricingPlans = [
    {
      name: "Basic",
      tag: "Paket Pemula",
      description: "Cocok untuk pelajar yang baru mulai.",
      price: "99.000",
      duration: "bulan",
      features: ["Akses 100 soal", "Analisis dasar AI", "Bimbingan komunitas"],
      featured: false,
    },
    {
      name: "Pro",
      tag: "Paket Pro",
      description: "Untuk profesional yang serius meningkatkan karier.",
      price: "199.000",
      duration: "bulan",
      features: [
        "Akses 1000 soal",
        "Analisis lengkap AI",
        "Konsultasi psikolog",
        "Prioritas dukungan",
      ],
      featured: true,
    },
    {
      name: "Enterprise",
      tag: "Paket Custom",
      description: "Paket khusus untuk tim atau organisasi.",
      price: "Custom",
      duration: "",
      features: [
        "Akses tidak terbatas",
        "Konsultasi tim",
        "Pelatihan khusus",
        "Dukungan premium",
      ],
      featured: false,
    },
  ];
  
  // data.ts
export const stats = [
    {
      icon: "Star",
      value: 50,
      suffix: "+",
      label: "Pengguna Aktif",
    },
    {
      icon: "Code",
      value: 200,
      suffix: "+",
      label: "Proyek Selesai",
    },
    {
      icon: "Award",
      value: 10,
      suffix: "+",
      label: "Penghargaan",
    },
    {
      icon: "Users",
      value: 500,
      suffix: "+",
      label: "Komunitas",
    },
  ];
  
  export const studyPaths = [
    {
      title: "Frontend Development",
      duration: "4 Minggu",
      modules: 8,
      progress: 50,
    },
    {
      title: "Backend Development",
      duration: "6 Minggu",
      modules: 10,
      progress: 30,
    },
    {
      title: "UI/UX Design",
      duration: "5 Minggu",
      modules: 6,
      progress: 70,
    },
    {
      title: "Data Science",
      duration: "8 Minggu",
      modules: 12,
      progress: 20,
    },
  ];
  
  // @/data.ts
export const successStories = [
    {
      name: "John Doe",
      role: "Software Engineer",
      testimony: "Program ini telah mengubah hidup saya. Sangat direkomendasikan!",
      rating: 5,
      image: "/path/to/image1.jpg",
    },
    {
      name: "Jane Smith",
      role: "Product Manager",
      testimony: "Berkat pembelajaran ini, saya mendapatkan promosi yang saya impikan.",
      rating: 4,
      image: "/path/to/image2.jpg",
    },
    {
      name: "Mike Johnson",
      role: "Data Scientist",
      testimony: "Saya belajar banyak dari program ini. Terima kasih!",
      rating: 5,
      image: "/path/to/image3.jpg",
    },
  ];
  