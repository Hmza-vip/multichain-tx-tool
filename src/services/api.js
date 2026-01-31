import axios from 'axios';
import { getChainById } from '../utils/chains';

export const fetchTransactions = async (address, chainId) => {
  const chain = getChainById(chainId);
  
  if (!chain) {
    throw new Error('Invalid chain');
  }

  // Check if API key exists
  if (!chain.apiKey) {
    throw new Error(`Please add ${chain.name} API key to your .env file. Get a free key from ${chain.explorerUrl}`);
  }

  try {
    const response = await axios.get(chain.explorer, {
      params: {
        module: 'account',
        action: 'txlist',
        address: address,
        startblock: 0,
        endblock: 99999999,
        page: 1,
        offset: 10000, // Fetch up to 10,000 transactions
        sort: 'desc',
        apikey: chain.apiKey
      }
    });

    if (response.data.status !== '1') {
      throw new Error(response.data.message || 'Failed to fetch transactions');
    }

    if (!response.data.result || response.data.result.length === 0) {
      return [];
    }

    return formatTransactions(response.data.result, chain);
  } catch (error) {
    console.error('API Error:', error);
    throw error;
  }
};

const formatTransactions = (transactions, chain) => {
  return transactions.map(tx => ({
    hash: tx.hash,
    hashShort: tx.hash.slice(0, 8) + '...' + tx.hash.slice(-6),
    from: tx.from,
    fromShort: tx.from.slice(0, 6) + '...' + tx.from.slice(-4),
    to: tx.to,
    toShort: tx.to.slice(0, 6) + '...' + tx.to.slice(-4),
    value: (parseInt(tx.value) / 1e18).toFixed(6),
    timestamp: parseInt(tx.timeStamp),
    status: tx.txreceipt_status === '1' ? 'Success' : 'Failed',
    chain: chain.name,
    chainId: chain.id,
    symbol: chain.symbol,
    gasUsed: tx.gasUsed,
    gasPrice: tx.gasPrice,
    fee: (parseInt(tx.gasUsed) * parseInt(tx.gasPrice) / 1e18).toFixed(6),
    blockNumber: tx.blockNumber,
    isError: tx.isError === '1'
  }));
};

export const fetchTokenTransfers = async (address, chainId) => {
  const chain = getChainById(chainId);
  
  if (!chain || !chain.apiKey) {
    return [];
  }

  try {
    const response = await axios.get(chain.explorer, {
      params: {
        module: 'account',
        action: 'tokentx',
        address: address,
        startblock: 0,
        endblock: 99999999,
        page: 1,
        offset: 10000,
        sort: 'desc',
        apikey: chain.apiKey
      }
    });

    if (response.data.status === '1') {
      return response.data.result.map(tx => ({
        ...tx,
        type: 'token',
        chain: chain.name
      }));
    }
  } catch (error) {
    console.error('Token fetch error:', error);
  }

  return [];
};
