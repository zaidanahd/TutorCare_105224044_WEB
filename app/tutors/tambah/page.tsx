'use client';

import React, { useActionState } from 'react';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { createTutorAction, type FormActionState } from '../actions';

export default function TambahTutorPage() {
  const [state, formAction, isPending] = useActionState<FormActionState, FormData>(
    createTutorAction,
    {}
  );

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col justify-between">
      <div>
        <Navbar />

        <div className="container mx-auto px-4 py-10 max-w-2xl">
          <Link
            href="/tutors"
            className="inline-flex items-center gap-2 text-sm font-semibold text-slate-600 hover:text-blue-600 transition mb-6"
          >
            ← Kembali ke Direktori Tutor
          </Link>

          <div className="bg-white rounded-3xl p-8 shadow-xl border border-slate-200">
            <div className="mb-8">
              <span className="bg-blue-100 text-blue-800 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                Operasi Create (Tutor)
              </span>
              <h1 className="text-3xl font-extrabold text-slate-900 mt-2">
                Tambah Profil Tutor Baru
              </h1>
              <p className="text-sm text-slate-600 mt-1">
                Data akan divalidasi oleh Zod di sisi server dan disimpan ke PostgreSQL.
              </p>
            </div>

            {state.message && !state.success && (
              <div className="mb-6 bg-red-50 border border-red-200 text-red-800 p-4 rounded-2xl text-xs font-semibold">
                ⚠️ {state.message}
              </div>
            )}

            <form action={formAction} className="space-y-5">
              {/* Nama Lengkap */}
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                  Nama Lengkap & Gelar *
                </label>
                <input
                  type="text"
                  name="nama"
                  required
                  placeholder="Contoh: Sarah Amalia, S.Pd."
                  className={`w-full px-4 py-2.5 rounded-xl border text-sm text-slate-900 outline-none transition focus:ring-2 ${
                    state.fieldErrors?.nama
                      ? 'border-red-500 focus:ring-red-200'
                      : 'border-slate-300 focus:ring-blue-200'
                  }`}
                />
                {state.fieldErrors?.nama && (
                  <p className="text-red-600 text-xs mt-1 font-semibold">
                    {state.fieldErrors.nama}
                  </p>
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
                    placeholder="Contoh: Matematika & Fisika"
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
                    defaultValue="SMP & SMA"
                    placeholder="Contoh: SMP & SMA"
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
                    defaultValue="Hybrid"
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
                    defaultValue={75000}
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
                    defaultValue={3}
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
                    placeholder="Contoh: 081234567890"
                    className={`w-full px-4 py-2.5 rounded-xl border text-sm text-slate-900 outline-none transition focus:ring-2 ${
                      state.fieldErrors?.kontakWa
                        ? 'border-red-500 focus:ring-red-200'
                        : 'border-slate-300 focus:ring-blue-200'
                    }`}
                  />
                  {state.fieldErrors?.kontakWa && (
                    <p className="text-red-600 text-xs mt-1 font-semibold">
                      {state.fieldErrors.kontakWa}
                    </p>
                  )}
                </div>
              </div>

              {/* Bio / Deskripsi */}
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                  Bio / Deskripsi Pengalaman Mengajar *
                </label>
                <textarea
                  name="bio"
                  required
                  rows={3}
                  placeholder="Ceritakan metode mengajar, spesialisasi materi, dan pendekatan yang digunakan..."
                  className={`w-full px-4 py-2.5 rounded-xl border text-sm text-slate-900 outline-none transition focus:ring-2 ${
                    state.fieldErrors?.bio
                      ? 'border-red-500 focus:ring-red-200'
                      : 'border-slate-300 focus:ring-blue-200'
                  }`}
                />
                {state.fieldErrors?.bio && (
                  <p className="text-red-600 text-xs mt-1 font-semibold">
                    {state.fieldErrors.bio}
                  </p>
                )}
              </div>

              <div className="pt-4">
                <button
                  type="submit"
                  disabled={isPending}
                  className="w-full bg-[#1f6feb] hover:bg-[#134db3] text-white font-extrabold py-3.5 rounded-2xl shadow-lg transition duration-200 disabled:opacity-50 cursor-pointer text-sm"
                >
                  {isPending ? 'Menyimpan ke PostgreSQL...' : 'Daftarkan Tutor ke Database'}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
