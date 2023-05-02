import mongoose from 'mongoose';

const AffiliateStatSchema = mongoose.Schema(
  {
   userId: {
    type: mongoose.Types.ObjectId,
    ref: 'User'
   },
   affiliateSales: {
    type: [mongoose.Types.ObjectId],
    ref: 'Transactions'
   }
  },
  {
    timestamps: true,
  }
);
const AffiliateStat = mongoose.model('AffiliateStat', AffiliateStatSchema);
export default AffiliateStat;