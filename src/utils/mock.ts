import type { Patient } from "../types/Patient";

const delay = (ms: number) => new Promise((res) => setTimeout(res, ms));
const randomFrom = (arr: string[]) =>
  arr[Math.floor(Math.random() * arr.length)];

export async function fetchMockPatients(count = 23): Promise<Patient[]> {
  await delay(500);
  const names = [
    "Agus",
    "Budi",
    "Citra",
    "Dewi",
    "Eka",
    "Fajar",
    "Gita",
    "Hendra",
    "Ika",
    "Joko",
  ];
  const diagnosas = [
    "DEMAM",
    "PNEUMONIA",
    "GASTRITIS",
    "FRAKTUR",
    "DIABETES",
    "HIPERTENSI",
  ];
  const dokters = ["dr. Andi", "dr. Sari", "dr. Maya", "dr. Rian"];
  const ruangs = ["301A", "302B", "ICU-1", "VIP-1", "204"];

  return Array.from({ length: count }).map((_, i) => ({
    id: `p-${i + 1}`,
    nama: `${randomFrom(names)} ${String.fromCharCode(65 + (i % 26))}`,
    nik: Math.floor(1e12 + Math.random() * 9e12)
      .toString()
      .slice(0, 16),
    diagnosa: randomFrom(diagnosas),
    tanggalMasuk: new Date(
      Date.now() - Math.floor(Math.random() * 20) * 24 * 3600 * 1000
    ).toISOString(),
    dokter: randomFrom(dokters),
    ruangan: randomFrom(ruangs),
  }));
}
