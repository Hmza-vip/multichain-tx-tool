export const SUPPORTED_CHAINS = [
  {
    id: 'ethereum',
    name: 'Ethereum',
    icon: '⟠',
    symbol: 'ETH',
    apiKey: import.meta.env.VITE_ETHERSCAN_API_KEY || '',
    explorer: 'https://api.etherscan.io/api',
    explorerUrl: 'https://etherscan.io',
    color: 'from-blue-500 to-purple-500'
  },
  {
    id: 'polygon',
    name: 'Polygon',
    icon: '⬡',
    symbol: 'MATIC',
    apiKey: import.meta.env.VITE_POLYGONSCAN_API_KEY || '',
    explorer: 'https://api.polygonscan.com/api',
    explorerUrl: 'https://polygonscan.com',
    color: 'from-purple-500 to-pink-500'
  },
  {
    id: 'bsc',
    name: 'BSC',
    icon: '◆',
    symbol: 'BNB',
    apiKey: import.meta.env.VITE_BSCSCAN_API_KEY || '',
    explorer: 'https://api.bscscan.com/api',
    explorerUrl: 'https://bscscan.com',
    color: 'from-yellow-500 to-orange-500'
  },
  {
    id: 'arbitrum',
    name: 'Arbitrum',
    icon: '◉',
    symbol: 'ETH',
    apiKey: import.meta.env.VITE_ARBISCAN_API_KEY || '',
    explorer: 'https://api.arbiscan.io/api',
    explorerUrl: 'https://arbiscan.io',
    color: 'from-blue-400 to-cyan-500'
  },
  {
    id: 'optimism',
    name: 'Optimism',
    icon: '○',
    symbol: 'ETH',
    apiKey: import.meta.env.VITE_OPTIMISM_API_KEY || '',
    explorer: 'https://api-optimistic.etherscan.io/api',
    explorerUrl: 'https://optimistic.etherscan.io',
    color: 'from-red-500 to-pink-500'
  },
  {
    id: 'base',
    name: 'Base',
    icon: '🔵',
    symbol: 'ETH',
    apiKey: import.meta.env.VITE_BASESCAN_API_KEY || '',
    explorer: 'https://api.basescan.org/api',
    explorerUrl: 'https://basescan.org',
    color: 'from-blue-600 to-indigo-600'
  },
  {
    id: 'avalanche',
    name: 'Avalanche',
    icon: '🔺',
    symbol: 'AVAX',
    apiKey: import.meta.env.VITE_SNOWTRACE_API_KEY || '',
    explorer: 'https://api.snowtrace.io/api',
    explorerUrl: 'https://snowtrace.io',
    color: 'from-red-500 to-orange-500'
  }
];

export const getChainById = (chainId) => {
  return SUPPORTED_CHAINS.find(chain => chain.id === chainId);
};
