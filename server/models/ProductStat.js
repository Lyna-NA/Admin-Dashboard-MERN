import mongoose from 'mongoose'

const ProductStatSchema = mongoose.Schema(
  {
    productId: {
      type: String,
    },
    yearlySalesTotal: {
      type: Number,
    },
    yearlyTotalSoldUnits: {
      type: Number,
    },
    year: {
      type: Number,
    },
    monthlyData: [
      {
        month: String,
        totalSales: Number,
        totalUnits: Number,
      },
    ],
    dailyData: [{ date: String, totalSales: Number, totalUnits: Number }],
  },
  {
    timestamps: true,
  }
);
const Product = mongoose.model('ProductStat', ProductStatSchema);
export default Product;