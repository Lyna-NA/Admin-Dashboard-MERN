import Product from '../models/Product.js';
import User from '../models/User.js';
import ProductStat from '../models/ProductStat.js';
import Transaction from '../models/Transaction.js';

export const getProducts = async (req, res) => {
  try {
    const products = await Product.find();

    const productsWithStat = await Promise.all(
      products.map(async (product) => {
        const stat = await ProductStat.find({
          productId: product._id,
        });
        return { ...product._doc, stat };
      })
    );

    res.status(200).json(productsWithStat);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const getCustomers = async (req, res) => {
  try {
    const customers = await User.find({ role: 'user' }).select('-password');
    res.status(200).json(customers);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const getTransactions = async (req, res) => {
  try {
    const { page = 1, pageSize = 20, sort = {}, search = '' } = req.query;

    //sort should look like : {'field': 'userId', 'sort': 'desc'}\
    //formatted sort should look like: {userId: -1}
    const generateSort = () => {
      const sortParsed = JSON.parse(sort)[0];
      console.log(
        '🚀 ~ file: client.js:42 ~ generateSort ~ sortParsed:',
        sortParsed
      );
      return { [sortParsed.field]: sortParsed.sort == 'asc' ? 1 : -1 };
    };

    const sortFormatted = sort === '{}' ? {}: generateSort() ;
   
    const transactions = await Transaction.find({
      $or: [
        { cost: { $regex: new RegExp(search, 'i') } },
        { userId: { $regex: new RegExp(search, 'i') } },
      ],
    })
      .sort(sortFormatted)
      .skip(page * pageSize)
      .limit(pageSize);

    const total = await Transaction.countDocuments({
      $or: [
        { cost: { $regex: new RegExp(search, 'i') } },
        { userId: { $regex: new RegExp(search, 'i') } },
      ],
    });

    res.status(200).json({ transactions, total });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
