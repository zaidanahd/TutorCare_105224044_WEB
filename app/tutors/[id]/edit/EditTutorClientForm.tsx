'use client';

import React, { useActionState } from 'react';
import { updateTutorAction, type FormActionState } from '../../actions';

interface TutorData {
  id: number;
  nama: string;
  mataPelajaran: string;
  jenjang: string;
  moda: string;
  tarifPerJam: number;
  pengalamanTahun: number;
  kontakWa: string;
  bio: string;
  avatarUrl?: string | null;
}

export default function EditTutorClientForm({ tutor }: { tutor: TutorData }) {
  const updateActionWithId = updateTutorAction.bind(null, tutor.id);
  const [state, formAction, isPending] = useActionState<FormActionState, FormData>(
    updateActionWithId,
    {}
  );

  return (
    <form action={formAction} className="space-y-5">
      {state.message && !state.success && (
        <div className="bg-red-50 border border-red-200 text-red-800 p-4 rounded-2xl text-xs font-semibold">
          ⚠️ {state.message}
        </div>
      )}

      {/* Nama Lengkap */}
      <div>
        <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
          Nama Lengkap & Gelar *
        </label>
        <input
          type="text"
          name="nama"
          required
          defaultValue={tutor.nama}
          className={`w-full px-4 py-2.5 rounded-xl border text-sm text-slate-900 outline-none transition focus:ring-2 ${
            state.fieldErrors?.nama
              ? 'border-red-500 focus:ring-red-200'
              : 'border-slate-300 focus:ring-blue-200'
          }`}
        />
        {state.fieldErrors?.nama && (
          <p className="text-red-600 text-xs mt-1 font-semibold">{state.fieldErrors.nama}</p>
        )}
      </div>

      {/* Mata Pelajaran & Jenjang */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
            Mata Pelajaran *
          </label>
          <input
            type="text"
            name="mataPelajaran"
            required
            defaultValue={tutor.mataPelajaran}
            className={`w-full px-4 py-2.5 rounded-xl border text-sm text-slate-900 outline-none transition focus:ring-2 ${
              state.fieldErrors?.mataPelajaran
                ? 'border-red-500 focus:ring-red-200'
                : 'border-slate-300 focus:ring-blue-200'
            }`}
          />
          {state.fieldErrors?.mataPelajaran && (
            <p className="text-red-600 text-xs mt-1 font-semibold">
              {state.fieldErrors.mataPelajaran}
            </p>
          )}
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
            Target Jenjang Siswa *
          </label>
          <input
            type="text"
            name="jenjang"
            required
            defaultValue={tutor.jenjang}
            className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-sm text-slate-900 outline-none focus:ring-2 focus:ring-blue-200"
          />
        </div>
      </div>

      {/* Moda Belajar & Tarif */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
            Moda Belajar *
          </label>
          <select
            name="moda"
            defaultValue={tutor.moda}
            className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-sm text-slate-900 outline-none focus:ring-2 focus:ring-blue-200 bg-white"
          >
            <option value="Online">Online (Daring)</option>
            <option value="Offline">Offline (Tatap Muka)</option>
            <option value="Hybrid">Hybrid (Online & Offline)</option>
          </select>
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
            Tarif per Jam (Rp) *
          </label>
          <input
            type="number"
            name="tarifPerJam"
            required
            defaultValue={tutor.tarifPerJam}
            step={5000}
            min={25000}
            max={2000000}
            className={`w-full px-4 py-2.5 rounded-xl border text-sm text-slate-900 outline-none transition focus:ring-2 ${
              state.fieldErrors?.tarifPerJam
                ? 'border-red-500 focus:ring-red-200'
                : 'border-slate-300 focus:ring-blue-200'
            }`}
          />
          {state.fieldErrors?.tarifPerJam && (
            <p className="text-red-600 text-xs mt-1 font-semibold">
              {state.fieldErrors.tarifPerJam}
            </p>
          )}
        </div>
      </div>

      {/* Pengalaman & WhatsApp */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
            Pengalaman Mengajar (Tahun) *
          </label>
          <input
            type="number"
            name="pengalamanTahun"
            required
            defaultValue={tutor.pengalamanTahun}
            min={1}
            max={40}
            className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-sm text-slate-900 outline-none focus:ring-2 focus:ring-blue-200"
          />
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
            Nomor WhatsApp Aktif *
          </label>
          <input
            type="tel"
            name="kontakWa"
            required
            defaultValue={tutor.kontakWa}
            className={`w-full px-4 py-2.5 rounded-xl border text-sm text-slate-900 outline-none transition focus:ring-2 ${
              state.fieldErrors?.kontakWa
                ? 'border-red-500 focus:ring-red-200'
                : 'border-slate-300 focus:ring-blue-200'
            }`}
          />
          {state.fieldErrors?.kontakWa && (
            <p className="text-red-600 text-xs mt-1 font-semibold">{state.fieldErrors.kontakWa}</p>
          )}
        </div>
      </div>

      {/* Bio */}
      <div>
        <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
          Bio / Deskripsi Pengalaman Mengajar *
        </label>
        <textarea
          name="bio"
          required
          rows={3}
          defaultValue={tutor.bio}
          className={`w-full px-4 py-2.5 rounded-xl border text-sm text-slate-900 outline-none transition focus:ring-2 ${
            state.fieldErrors?.bio
              ? 'border-red-500 focus:ring-red-200'
              : 'border-slate-300 focus:ring-blue-200'
          }`}
        />
        {state.fieldErrors?.bio && (
          <p className="text-red-600 text-xs mt-1 font-semibold">{state.fieldErrors.bio}</p>
        )}
      </div>

      <div className="pt-4">
        <button
          type="submit"
          disabled={isPending}
          className="w-full bg-amber-500 hover:bg-amber-600 text-white font-extrabold py-3.5 rounded-2xl shadow-lg transition duration-200 disabled:opacity-50 cursor-pointer text-sm"
        >
          {isPending ? 'Menyimpan Perubahan...' : 'Simpan Perubahan Data Tutor'}
        </button>
      </div>
    </form>
  );
}
