"use client";

import { useState, useEffect } from "react";

// Definisikan tipe data di sini agar bisa diekspor
export interface TripCostItem {
  id: string;
  komponen: string;
  prices: number[];
}

type TripCostTableProps = {
  initialData: TripCostItem[];
  onChange: (data: TripCostItem[]) => void;
};

export default function TripCostTable({
  initialData,
  onChange,
}: TripCostTableProps) {
  const [items, setItems] = useState<TripCostItem[]>(initialData);
  const paxColumns = Array.from({ length: 11 }, (_, i) => i + 2);

  useEffect(() => {
    setItems(initialData);
  }, [initialData]);

  const updateState = (newItems: TripCostItem[]) => {
    setItems(newItems);
    onChange(newItems);
  };

  const addRow = () => {
    const newItem: TripCostItem = {
      id: Date.now().toString(),
      komponen: "",
      prices: Array(11).fill(0),
    };
    updateState([...items, newItem]);
  };

  const removeRow = (id: string) => {
    updateState(items.filter((item) => item.id !== id));
  };

  const handleKomponenChange = (id: string, value: string) => {
    const newItems = items.map((item) =>
      item.id === id ? { ...item, komponen: value } : item,
    );
    updateState(newItems);
  };

  const handlePriceChange = (id: string, colIndex: number, value: string) => {
    const numValue = parseInt(value) || 0;
    const newItems = items.map((item) => {
      if (item.id === id) {
        const newPrices = [...item.prices];
        newPrices[colIndex] = numValue;
        return { ...item, prices: newPrices };
      }
      return item;
    });
    updateState(newItems);
  };

  const calculateTotal = (colIndex: number) => {
    return items.reduce((sum, item) => sum + (item.prices[colIndex] || 0), 0);
  };

  return (
    <div className="overflow-x-auto border rounded-lg">
      <table className="min-w-full text-sm">
        <thead className="bg-gray-100">
          <tr>
            {/* Menggunakan arbitrary value tetap aman, saran tailwind hanya saran gaya */}
            <th className="border p-2 text-left min-w-50px">Komponen</th>
            {paxColumns.map((pax) => (
              <th key={pax} className="border p-2 text-center min-w-25px">
                {pax} Pax
              </th>
            ))}
            <th className="border p-2 w-10">Aksi</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item) => (
            <tr key={item.id}>
              <td className="border p-0">
                <input
                  type="text"
                  className="w-full p-2 border-0 focus:ring-0 bg-transparent"
                  placeholder="Nama Item"
                  value={item.komponen}
                  onChange={(e) =>
                    handleKomponenChange(item.id, e.target.value)
                  }
                />
              </td>
              {item.prices.map((price, idx) => (
                <td key={idx} className="border p-0">
                  <input
                    type="number"
                    className="w-full p-2 text-right border-0 focus:ring-0 bg-transparent"
                    value={price || ""}
                    onChange={(e) =>
                      handlePriceChange(item.id, idx, e.target.value)
                    }
                  />
                </td>
              ))}
              <td className="border p-2 text-center">
                <button
                  onClick={() => removeRow(item.id)}
                  className="text-red-500 hover:text-red-700 font-bold text-xs"
                >
                  ✕
                </button>
              </td>
            </tr>
          ))}
        </tbody>
        <tfoot className="bg-blue-50 font-semibold">
          <tr>
            <td className="border p-2 text-right">TOTAL</td>
            {paxColumns.map((_, idx) => (
              <td key={idx} className="border p-2 text-right text-blue-600">
                {calculateTotal(idx).toLocaleString("id-ID")}
              </td>
            ))}
            <td className="border"></td>
          </tr>
        </tfoot>
      </table>

      <button
        onClick={addRow}
        className="m-2 text-sm text-blue-600 hover:underline"
      >
        + Tambah Baris
      </button>
    </div>
  );
}
