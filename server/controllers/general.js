import User from '../models/User.js';
import OverallStat from '../models/OverallStat.js';
import Transaction from '../models/Transaction.js';

export const getUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);
    res.status(200).json(user);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const getDashboardStats = async (req, res) => {
  try {
    // Hardcoded value
    const currYear = '2021';
    const currMonth = 'November';
    const currDate = '2021-11-15';

    // Recent Transactions
    const transactions = await Transaction.find()
      .limit(50)
      .sort({ createdAt: -1 });

    //Overall Stats
    const overallStat = await OverallStat.find({ year: currYear });

    const {
      totalCustomers,
      yearlySalesTotal,
      yearlyTotalSoldUnits,
      monthlyData,
      dailyData,
      salesByCategory,
    } = overallStat[0];

    const thisMonthStats = overallStat[0].monthlyData.find(({ month }) => {
      return month === currMonth;
    });

    const todayStats = overallStat[0].dailyData.find(({ date }) => {
      return date === currDate
    });

    res.status(200).json({
      transactions,
      totalCustomers,
      yearlySalesTotal,
      yearlyTotalSoldUnits,
      monthlyData,
      dailyData,
      salesByCategory,
      thisMonthStats,
      todayStats,
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};