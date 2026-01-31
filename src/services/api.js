import axios from 'axios';
import { getChainById } from '../utils/chains';

const MORALIS_KEY = import.meta.env.VITE_MORALIS_KEY;

export const fetchTransactions = async (address, chainId) => {
  const chain = getChainById(chainId);
  if (!chain) throw new Error('Invalid chain');

  if (!MORALIS_KEY) {
    throw new Error('Please add VITE_MORALIS_KEY to your .env file. Get a free key from https://moralis.io');
  }

  // Check if chain is supported
  if (!chain.isLive) {
    throw new Error(`${chain.name} is coming soon! Currently only EVM chains are supported. Check back later for updates.`);
  }

  try {
    const response = await axios.get(`https://deep-index.moralis.io/api/v2.2/${address}`, {
      params: { 
        chain: chain.moralisChain,
        limit: 100
      },
      headers: { 
        'X-API-Key': MORALIS_KEY,
        'accept': 'application/json'
      }
    });

    if (!response.data || !response.data.result) return [];

    return response.data.result.map(tx => ({
      hash: tx.hash,
      hashShort: tx.hash.slice(0, 8) + '...' + tx.hash.slice(-6),
      from: tx.from_address,
      fromShort: tx.from_address.slice(0, 6) + '...' + tx.from_address.slice(-4),
      to: tx.to_address || '0x0000000000000000000000000000000000000000',
      toShort: tx.to_address ? tx.to_address.slice(0, 6) + '...' + tx.to_address.slice(-4) : '0x0000...0000',
      value: (parseFloat(tx.value) / 1e18).toFixed(6),
      timestamp: Math.floor(new Date(tx.block_timestamp).getTime() / 1000),
      status: tx.receipt_status === '1' || tx.receipt_status === 1 ? 'Success' : 'Failed',
      chain: chain.name,
      chainId: chain.id,
      symbol: chain.symbol,
      gasUsed: tx.receipt_gas_used || tx.gas,
      gasPrice: tx.gas_price || '0',
      fee: ((parseFloat(tx.receipt_gas_used || tx.gas || 0) * parseFloat(tx.gas_price || 0)) / 1e18).toFixed(6),
      blockNumber: tx.block_number,
      isError: tx.receipt_status !== '1' && tx.receipt_status !== 1
    }));
  } catch (err) {
    console.error('Moralis Transaction fetch error:', err);
    if (err.response?.status === 401) {
      throw new Error('Invalid API key. Please check your VITE_MORALIS_KEY in .env file');
    }
    if (err.response?.status === 400) {
      throw new Error(`${chain.name}: ${err.response?.data?.message || 'Chain not supported or invalid parameters'}`);
    }
    throw new Error(err.response?.data?.message || err.message || 'Failed to fetch transactions');
  }
};

export const fetchTokenTransfers = async (address, chainId) => {
  const chain = getChainById(chainId);
  if (!chain || !MORALIS_KEY || !chain.isLive) return [];

  try {
    const response = await axios.get(`https://deep-index.moralis.io/api/v2.2/${address}/erc20/transfers`, {
      params: { 
        chain: chain.moralisChain,
        limit: 100
      },
      headers: { 
        'X-API-Key': MORALIS_KEY,
        'accept': 'application/json'
      }
    });

    if (!response.data || !response.data.result) return [];

    return response.data.result.map(tx => ({
      hash: tx.transaction_hash,
      hashShort: tx.transaction_hash.slice(0, 8) + '...' + tx.transaction_hash.slice(-6),
      from: tx.from_address,
      fromShort: tx.from_address.slice(0, 6) + '...' + tx.from_address.slice(-4),
      to: tx.to_address,
      toShort: tx.to_address.slice(0, 6) + '...' + tx.to_address.slice(-4),
      value: (parseFloat(tx.value) / Math.pow(10, parseInt(tx.token_decimals || 18))).toFixed(6),
      timestamp: Math.floor(new Date(tx.block_timestamp).getTime() / 1000),
      tokenName: tx.token_name || 'Unknown',
      tokenSymbol: tx.token_symbol || 'UNKNOWN',
      type: 'token',
      chain: chain.name,
      chainId: chain.id,
      blockNumber: tx.block_number
    }));
  } catch (err) {
    console.error('Token transfer fetch error:', err);
    return [];
  }
};

export const fetchTokenBalances = async (address, chainId) => {
  const chain = getChainById(chainId);
  if (!chain || !MORALIS_KEY || !chain.isLive) return [];

  try {
    const response = await axios.get(`https://deep-index.moralis.io/api/v2.2/${address}/erc20`, {
      params: { 
        chain: chain.moralisChain
      },
      headers: { 
        'X-API-Key': MORALIS_KEY,
        'accept': 'application/json'
      }
    });

    if (!response.data) return [];

    return response.data.map(token => ({
      contractAddress: token.token_address,
      name: token.name || 'Unknown Token',
      symbol: token.symbol || 'UNKNOWN',
      balance: (parseFloat(token.balance) / Math.pow(10, parseInt(token.decimals || 18))).toFixed(6),
      decimals: token.decimals,
      type: 'ERC-20'
    }));
  } catch (err) {
    console.error('Token balance fetch error:', err);
    return [];
  }
};

export const fetchAccountBalance = async (address, chainId) => {
  const chain = getChainById(chainId);
  if (!chain || !MORALIS_KEY || !chain.isLive) return '0';

  try {
    const response = await axios.get(`https://deep-index.moralis.io/api/v2.2/${address}/balance`, {
      params: { 
        chain: chain.moralisChain
      },
      headers: { 
        'X-API-Key': MORALIS_KEY,
        'accept': 'application/json'
      }
    });

    if (response.data && response.data.balance) {
      return (parseFloat(response.data.balance) / 1e18).toFixed(6);
    }
    return '0';
  } catch (err) {
    console.error('Balance fetch error:', err);
    return '0';
  }
};
