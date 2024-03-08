const ethers = require('ethers');
const { RPC_URL, UNISWAP_V3_FACTORY_ADDRESS } = require('../config.js');
const uniswapV3FactoryAbi = require('../abis/UniswapV3Factory.js').ABI;

if (!RPC_URL) throw new Error('RPC_URL is not set.');
if (!UNISWAP_V3_FACTORY_ADDRESS) throw new Error('UNISWAP_V3_FACTORY_ADDRESS is not set.');

const provider = new ethers.JsonRpcProvider(RPC_URL);
const uniV3Factory = new ethers.Contract(UNISWAP_V3_FACTORY_ADDRESS, uniswapV3FactoryAbi, provider);

// @route   GET jairoapitest/pools/get
// @desc    Gets address of Uniswap V3 pool
// @access  Public
exports.handleGetPoolRequest = async (req, res) => {
  try {
    const { token0, token1, fee } = req.body;
    const pool = await uniV3Factory.getPool(token0, token1, fee);
    if (pool === ethers.ZeroAddress) {
      return res.status(404).json({ msg: 'Pool not found' });
    }
    return res.status(200).json(pool);
  } catch (err) {
    console.error(err.message);
    return res.status(500).send('Internal server error');
  }
};
