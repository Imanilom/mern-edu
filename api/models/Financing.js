// models/Financing.js
import mongoose from 'mongoose';

const financingSchema = new mongoose.Schema({
  year: { type: Number, required: true }, // Tahun anggaran
  packageType: { type: String, enum: ['A', 'B', 'C'], required: true }, // Paket A, B, atau C
  budgetAmount: { type: Number, required: true }, // Total anggaran yang dialokasikan
  fundingSource: { type: String, required: true }, // Sumber pendanaan (misalnya, "Pemerintah", "Swasta", "Donasi")
  allocations: [
    {
      category: { type: String, required: true }, // Kategori alokasi, misalnya: "Gaji Pengajar", "Fasilitas", "Ekstrakurikuler"
      amount: { type: Number, required: true }, // Jumlah alokasi dana
      description: { type: String }, // Deskripsi alokasi
    },
  ],
  expenditures: [
    {
      date: { type: Date, required: true }, // Tanggal pengeluaran
      description: { type: String, required: true }, // Keterangan pengeluaran
      category: { type: String, required: true }, // Kategori pengeluaran, harus sesuai dengan alokasi
      amount: { type: Number, required: true }, // Jumlah pengeluaran
      status: { type: String, enum: ['Pending', 'Completed'], default: 'Pending' }, // Status pembayaran
    },
  ],
  totalSpent: { type: Number, default: 0 }, // Total biaya yang sudah dikeluarkan
  remainingBudget: { type: Number }, // Sisa anggaran
}, { timestamps: true });

// Middleware untuk menghitung `remainingBudget` berdasarkan `budgetAmount` dan `totalSpent`
financingSchema.pre('save', function (next) {
  this.remainingBudget = this.budgetAmount - this.totalSpent;
  next();
});

// Method untuk menambahkan pengeluaran dan memperbarui `totalSpent` dan `remainingBudget`
financingSchema.methods.addExpenditure = function (expenditure) {
  this.expenditures.push(expenditure);
  this.totalSpent += expenditure.amount;
  this.remainingBudget = this.budgetAmount - this.totalSpent;
  return this.save();
};

const Financing = mongoose.model('Financing', financingSchema);
export default Financing;
