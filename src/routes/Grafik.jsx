import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { db } from "../firebaseConfig";
import {
  getDoc,
  doc
} from "firebase/firestore";

export default function Grafik() {
  const { id } = useParams();
  const [rok, setRok] = useState("2025");
  const [miesiac, setMiesiac] = useState("04");
  const [dane, setDane] = useState([]);
  const [lokalizacjaId, setLokalizacjaId] = useState("lokalizacja_001");

  useEffect(() => {
    async function fetchData() {
      try {
        const grafiki = [];

        const docRefLok = doc(
            db,
            "Pracownicy",
            id
          );

          const docSnapLok = await getDoc(docRefLok);
          if (docSnapLok.exists()) {
            var dataLok = docSnapLok.data();
            if (dataLok) {
                setLokalizacjaId(dataLok.lokalizacja); 
                }
            }
        // Iteracja po dniach
        for (let i = 1; i <= 31; i++) {
          const dzien = String(i).padStart(2, "0");
          const dzienId = `Day_${dzien}`;

          // Dynamiczna œcie¿ka do dokumentu
          const docRef = doc(
            db,
            "Lokalizacje",
            lokalizacjaId,
            `Grafik_${rok}`,
            `Month_${miesiac}`,
            "Days",
            dzienId
          );

          const docSnap = await getDoc(docRef);

          if (docSnap.exists()) {
            const data = docSnap.data();

            // SprawdŸ, czy w danych dokumentu jest wpis dla danego ID
            if (data && data[id]) {
              const dzienData = data[id];
              grafiki.push({
                dzien: dzien,
                godziny: `${dzienData.startHour}:${String(dzienData.startMinute).padStart(2, "0")} - ${dzienData.endHour}:${String(dzienData.endMinute).padStart(2, "0")}`,
                stanowisko: dzienData.position
              });
            }
          }
        }

        setDane(grafiki);
      } catch (error) {
        console.error("B³¹d pobierania danych: ", error);
        setDane([]); // Ustaw puste dane w przypadku b³êdu
      }
    }

    fetchData();
  }, [id, rok, miesiac, lokalizacjaId]);

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold mb-4">Grafik dla: {id}</h1>

      <div className="mb-4 flex gap-4">
        <select value={rok} onChange={e => setRok(e.target.value)} className="border p-1">
          <option value="2024">2024</option>
          <option value="2025">2025</option>
          <option value="2025">2026</option>
        </select>

        <select value={miesiac} onChange={e => setMiesiac(e.target.value)} className="border p-1">
          {Array.from({ length: 12 }, (_, i) => (
            <option key={i} value={String(i + 1).padStart(2, "0")}>
              {String(i + 1).padStart(2, "0")}
            </option>
          ))}
        </select>
      </div>

      <table className="w-full border ">
        <thead>
          <tr>
            <th className="border p-2">Dzien</th>
            <th className="border p-2">Godziny</th>
            <th className="border p-2">Stanowisko</th>
          </tr>
        </thead>
        <tbody>
          {Array.from({ length: 31 }, (_, i) => {
            const dzien = String(i + 1).padStart(2, "0");
            const entry = dane.find(e => e.dzien === dzien);
            return (
              <tr key={dzien}>
                <td className="border p-2">{dzien}</td>
                <td className="border p-2">{entry ? entry.godziny : "-"}</td>
                <td className="border p-2">{entry ? entry.stanowisko : "-"}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
