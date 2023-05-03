import mongoose from 'mongoose';

const OverallStatSchema = mongoose.Schema(
  {
    totalCustomers: Number,
    yearlySalesTotal: Number,
    yearlyTotalSoldUnits: Number,
    year: Number,
    monthlyData: [
      {
        month: String,
        totalSales: Number,
        totalUnits: Number,
      },
    ],
    dailyData: [{ date: String, totalSales: Number, totalUnits: Number }],
    salesByCategory: {
      type: Map,
      of: Number,
    },
  },
  {
    timestamps: true,
  }
);
const OverallStat = mongoose.model('OverallStat', OverallStatSchema);
export default OverallStat;