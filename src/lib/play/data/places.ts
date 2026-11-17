import type { PlacePack } from "../pin";

/**
 * Pin It places (2026-11-18): the ones Indian GK papers ask about. Each is
 * [name, state or union territory, latitude, longitude], decimal degrees, to
 * within a few km (the game scores from 25 km out). Two blind checkers matched
 * every row before shipping (scripts/play/places-check/). Delhi, Mumbai,
 * Kolkata and Chennai are left out: they are the map's landmarks.
 */

type Row = [name: string, state: string, lat: number, lon: number];

const PARKS: Row[] = [
  ["Kaziranga National Park", "Assam", 26.58, 93.17],
  ["Jim Corbett National Park", "Uttarakhand", 29.53, 78.77],
  ["Gir National Park", "Gujarat", 21.13, 70.8],
  ["Periyar Tiger Reserve", "Kerala", 9.47, 77.17],
  ["Ranthambore National Park", "Rajasthan", 26.02, 76.5],
  ["Sundarbans National Park", "West Bengal", 21.94, 88.9],
  ["Kanha National Park", "Madhya Pradesh", 22.33, 80.61],
  ["Bandhavgarh National Park", "Madhya Pradesh", 23.7, 81.03],
  ["Pench Tiger Reserve (Madhya Pradesh side)", "Madhya Pradesh", 21.73, 79.3],
  ["Tadoba Andhari Tiger Reserve", "Maharashtra", 20.25, 79.38],
  ["Bandipur National Park", "Karnataka", 11.67, 76.63],
  ["Nagarhole National Park", "Karnataka", 12.04, 76.15],
  ["Silent Valley National Park", "Kerala", 11.08, 76.45],
  ["Keoladeo National Park", "Rajasthan", 27.17, 77.52],
  ["Sariska Tiger Reserve", "Rajasthan", 27.33, 76.42],
  ["Manas National Park", "Assam", 26.66, 90.95],
  ["Dudhwa National Park", "Uttar Pradesh", 28.5, 80.65],
  ["Great Himalayan National Park", "Himachal Pradesh", 31.73, 77.58],
  ["Hemis National Park", "Ladakh", 33.9, 77.35],
  ["Valley of Flowers National Park", "Uttarakhand", 30.73, 79.6],
  ["Namdapha National Park", "Arunachal Pradesh", 27.55, 96.4],
  ["Keibul Lamjao National Park", "Manipur", 24.5, 93.82],
  ["Simlipal National Park", "Odisha", 21.75, 86.35],
  ["Bhitarkanika National Park", "Odisha", 20.7, 86.9],
  ["Satpura National Park", "Madhya Pradesh", 22.53, 78.2],
  ["Dachigam National Park", "Jammu and Kashmir", 34.13, 75.03],
  ["Nanda Devi National Park", "Uttarakhand", 30.42, 79.85],
  ["Khangchendzonga National Park", "Sikkim", 27.63, 88.4],
  ["Wild Ass Sanctuary, Little Rann of Kutch", "Gujarat", 23.5, 71.22],
  ["Mudumalai National Park", "Tamil Nadu", 11.57, 76.55],
  ["Eravikulam National Park", "Kerala", 10.18, 77.08],
  ["Gulf of Mannar Marine National Park", "Tamil Nadu", 9.2, 79.05],
  ["Mahatma Gandhi Marine National Park", "Andaman and Nicobar Islands", 11.6, 92.6],
  ["Desert National Park", "Rajasthan", 26.43, 70.53],
];

const WATERS: Row[] = [
  ["Bhakra Dam", "Himachal Pradesh", 31.41, 76.43],
  ["Hirakud Dam", "Odisha", 21.52, 83.87],
  ["Tehri Dam", "Uttarakhand", 30.38, 78.48],
  ["Sardar Sarovar Dam", "Gujarat", 21.83, 73.75],
  ["Nagarjuna Sagar Dam", "Telangana and Andhra Pradesh", 16.57, 79.31],
  ["Tungabhadra Dam", "Karnataka", 15.27, 76.33],
  ["Mettur Dam", "Tamil Nadu", 11.8, 77.8],
  ["Indira Sagar Dam", "Madhya Pradesh", 22.28, 76.47],
  ["Koyna Dam", "Maharashtra", 17.4, 73.75],
  ["Rihand Dam", "Uttar Pradesh", 24.2, 83.01],
  ["Idukki Arch Dam", "Kerala", 9.84, 76.97],
  ["Srisailam Dam", "Andhra Pradesh and Telangana", 16.09, 78.9],
  ["Farakka Barrage", "West Bengal", 24.8, 87.92],
  ["Wular Lake", "Jammu and Kashmir", 34.35, 74.6],
  ["Dal Lake", "Jammu and Kashmir", 34.12, 74.87],
  ["Loktak Lake", "Manipur", 24.55, 93.8],
  ["Chilika Lake", "Odisha", 19.72, 85.32],
  ["Pulicat Lake", "Andhra Pradesh and Tamil Nadu", 13.57, 80.17],
  ["Vembanad Lake", "Kerala", 9.6, 76.4],
  ["Sambhar Lake", "Rajasthan", 26.92, 75.08],
  ["Pangong Tso", "Ladakh", 33.74, 78.72],
  ["Kolleru Lake", "Andhra Pradesh", 16.65, 81.2],
  ["Hussain Sagar", "Telangana", 17.42, 78.47],
  ["Tso Moriri", "Ladakh", 32.9, 78.3],
];

const HIGHLANDS: Row[] = [
  ["Nathu La", "Sikkim", 27.39, 88.83],
  ["Zoji La", "Jammu and Kashmir and Ladakh", 34.28, 75.47],
  ["Khardung La", "Ladakh", 34.28, 77.6],
  ["Rohtang Pass", "Himachal Pradesh", 32.37, 77.25],
  ["Shipki La", "Himachal Pradesh", 31.82, 78.75],
  ["Lipulekh Pass", "Uttarakhand", 30.23, 81.03],
  ["Bomdi La", "Arunachal Pradesh", 27.26, 92.42],
  ["Banihal Pass", "Jammu and Kashmir", 33.5, 75.2],
  ["Baralacha La", "Himachal Pradesh", 32.76, 77.42],
  ["Palghat Gap", "Kerala and Tamil Nadu", 10.78, 76.65],
  ["Thal Ghat", "Maharashtra", 19.7, 73.47],
  ["Bhor Ghat", "Maharashtra", 18.76, 73.38],
  ["Kangchenjunga (peak)", "Sikkim", 27.7, 88.15],
  ["Nanda Devi (peak)", "Uttarakhand", 30.38, 79.97],
  ["Anamudi (peak)", "Kerala", 10.17, 77.06],
  ["Doddabetta (peak)", "Tamil Nadu", 11.4, 76.73],
  ["Guru Shikhar (peak)", "Rajasthan", 24.65, 72.78],
  ["Dhupgarh (peak)", "Madhya Pradesh", 22.45, 78.37],
  ["Mahendragiri (Eastern Ghats peak)", "Odisha", 18.97, 84.37],
  ["Siachen Glacier", "Ladakh", 35.42, 77.1],
  ["Gangotri Glacier", "Uttarakhand", 30.92, 79.08],
];

const HERITAGE: Row[] = [
  ["Hampi", "Karnataka", 15.33, 76.46],
  ["Khajuraho", "Madhya Pradesh", 24.85, 79.92],
  ["Konark Sun Temple", "Odisha", 19.89, 86.09],
  ["Ajanta Caves", "Maharashtra", 20.55, 75.7],
  ["Ellora Caves", "Maharashtra", 20.03, 75.18],
  ["Sanchi Stupa", "Madhya Pradesh", 23.48, 77.74],
  ["Bodh Gaya", "Bihar", 24.7, 84.99],
  ["Nalanda", "Bihar", 25.14, 85.44],
  ["Fatehpur Sikri", "Uttar Pradesh", 27.09, 77.66],
  ["Mahabalipuram", "Tamil Nadu", 12.62, 80.19],
  ["Brihadeeswara Temple, Thanjavur", "Tamil Nadu", 10.78, 79.13],
  ["Rani ki Vav, Patan", "Gujarat", 23.86, 72.1],
  ["Bhimbetka rock shelters", "Madhya Pradesh", 22.94, 77.61],
  ["Dholavira", "Gujarat", 23.89, 70.21],
  ["Pattadakal", "Karnataka", 15.95, 75.82],
  ["Lothal", "Gujarat", 22.52, 72.25],
  ["Taj Mahal", "Uttar Pradesh", 27.17, 78.04],
  ["Golden Temple, Amritsar", "Punjab", 31.62, 74.88],
  ["Ramappa Temple", "Telangana", 18.26, 79.94],
  ["Chittorgarh Fort", "Rajasthan", 24.89, 74.65],
  ["Somnath Temple", "Gujarat", 20.89, 70.4],
];

const PORTS: Row[] = [
  ["Deendayal Port, Kandla", "Gujarat", 23.02, 70.22],
  ["Mundra Port", "Gujarat", 22.74, 69.7],
  ["Mormugao Port", "Goa", 15.41, 73.8],
  ["New Mangalore Port", "Karnataka", 12.92, 74.81],
  ["Kochi Port", "Kerala", 9.97, 76.27],
  ["Vizhinjam Port", "Kerala", 8.38, 76.99],
  ["V.O. Chidambaranar Port, Tuticorin", "Tamil Nadu", 8.76, 78.18],
  ["Kamarajar Port, Ennore", "Tamil Nadu", 13.26, 80.33],
  ["Kakinada Port", "Andhra Pradesh", 16.94, 82.24],
  ["Visakhapatnam Port", "Andhra Pradesh", 17.69, 83.29],
  ["Paradip Port", "Odisha", 20.26, 86.67],
  ["Haldia Dock", "West Bengal", 22.03, 88.06],
  ["Port Blair", "Andaman and Nicobar Islands", 11.62, 92.73],
];

const pack = (id: string, name: string, rows: Row[]): PlacePack => ({
  id,
  name,
  places: rows.map(([name, state, lat, lon]) => ({ name, state, lat, lon })),
});

export const PLACE_PACKS: PlacePack[] = [
  pack("parks", "National parks", PARKS),
  pack("waters", "Dams and lakes", WATERS),
  pack("highlands", "Passes, peaks and glaciers", HIGHLANDS),
  pack("heritage", "Heritage sites", HERITAGE),
  pack("ports", "Ports", PORTS),
];

/** The map's four landmarks, drawn as dots so a first pin has a reference. */
export const LANDMARKS: { name: string; lat: number; lon: number }[] = [
  { name: "Delhi", lat: 28.61, lon: 77.21 },
  { name: "Mumbai", lat: 19.08, lon: 72.88 },
  { name: "Kolkata", lat: 22.57, lon: 88.36 },
  { name: "Chennai", lat: 13.08, lon: 80.27 },
];
