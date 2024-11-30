export interface Anak {
  id: number;
  nama: string;
  nik: string;
  tanggalLahir: string;
  umur: number;
}

export interface Ayah {
  id: number;
  nama: string;
  nik: string;
}

export interface Ibu {
  id: number;
  nama: string;
  nik: string;
}

export interface LayananIbuAnak {
  id: number;
  tinggiBadanAnak: number | null;
  beratBadanAnak: number | null;
  umurAnak: number | null;
  lingkarLenganAnak: number | null;
  lingkarKepalaAnak: number | null;
  tinggiBadanIbu: number | null;
  beratBadanIbu: number | null;
  lingkarLenganIbu: number | null;
  lingkarPinggangIbu: number | null;
  alatKontrasepsi: string | null;
  jenisKelaminAnak: string;
  createdAt: Date;
  anakId: number;
  ayahId: number;
  ibuId: number;
  anak: Anak;
  ayah: Ayah;
  ibu: Ibu;
}

export interface FormattedLayananIbuAnak {
  namaAnak: string;
  namaIbu: string;
  namaAyah: string;
  tinggiBadanAnak: number | null;
  beratBadanAnak: number | null;
  umurAnak: number | null;
  lingkarLenganAnak: number | null;
  lingkarKepalaAnak: number | null;
  tinggiBadanIbu: number | null;
  beratBadanIbu: number | null;
  lingkarLenganIbu: number | null;
  lingkarPinggangIbu: number | null;
  alatKontrasepsi: string | null;
  jenisKelaminAnak: string;
  date: string;
}