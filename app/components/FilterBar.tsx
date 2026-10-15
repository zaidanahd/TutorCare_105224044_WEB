import React from 'react';

interface FilterBarProps {
  selectedSubject: string;
  setSelectedSubject: (val: string) => void;
  selectedMode: string;
  setSelectedMode: (val: string) => void;
}

export default function FilterBar({ selectedSubject, setSelectedSubject, selectedMode, setSelectedMode }: FilterBarProps) {
  return (
    <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm mb-8 flex flex-wrap gap-4 items-center justify-between">
      <div className="flex flex-col gap-1 w-full md:w-auto flex-1">
        <label className="text-xs font-bold text-slate-600 uppercase">Filter Mata Pelajaran</label>
        <select 
          value={selectedSubject} 
          onChange={(e) => setSelectedSubject(e.target.value)}
          className="h-11 px-3 border-2 border-slate-300 rounded-xl bg-slate-50 font-medium focus:outline-none focus:border-blue-600"
        >
          <option value="">Semua Mata Pelajaran</option>
          <option value="Matematika">Matematika & Fisika</option>
          <option value="Pemrograman">Pemrograman & Komputer</option>
          <option value="Bahasa Inggris">Bahasa Inggris</option>
        </select>
      </div>

      <div className="flex flex-col gap-1 w-full md:w-auto flex-1">
        <label className="text-xs font-bold text-slate-600 uppercase">Metode Belajar</label>
        <select 
          value={selectedMode} 
          onChange={(e) => setSelectedMode(e.target.value)}
          className="h-11 px-3 border-2 border-slate-300 rounded-xl bg-slate-50 font-medium focus:outline-none focus:border-blue-600"
        >
          <option value="">Semua Metode (Online / Offline)</option>
          <option value="Online">Online</option>
          <option value="Offline">Offline</option>
          <option value="Keduanya">Keduanya</option>
        </select>
      </div>
    </div>
  );
}