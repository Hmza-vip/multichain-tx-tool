export const SUPPORTED_CHAINS = [
  // LIVE EVM CHAINS (Fully Supported by Moralis)
  {
    id: 'ethereum',
    name: 'Ethereum',
    icon: '⟠',
    symbol: 'ETH',
    apiKey: import.meta.env.VITE_MORALIS_KEY || '',
    moralisChain: '0x1',
    explorerUrl: 'https://etherscan.io',
    color: 'from-blue-500 to-purple-500',
    isLive: true
  },
  {
    id: 'polygon',
    name: 'Polygon',
    icon: '⬡',
    symbol: 'MATIC',
    apiKey: import.meta.env.VITE_MORALIS_KEY || '',
    moralisChain: '0x89',
    explorerUrl: 'https://polygonscan.com',
    color: 'from-purple-500 to-pink-500',
    isLive: true
  },
  {
    id: 'bsc',
    name: 'BSC',
    icon: '◆',
    symbol: 'BNB',
    apiKey: import.meta.env.VITE_MORALIS_KEY || '',
    moralisChain: '0x38',
    explorerUrl: 'https://bscscan.com',
    color: 'from-yellow-500 to-orange-500',
    isLive: true
  },
  {
    id: 'arbitrum',
    name: 'Arbitrum',
    icon: '◉',
    symbol: 'ETH',
    apiKey: import.meta.env.VITE_MORALIS_KEY || '',
    moralisChain: '0xa4b1',
    explorerUrl: 'https://arbiscan.io',
    color: 'from-blue-400 to-cyan-500',
    isLive: true
  },
  {
    id: 'optimism',
    name: 'Optimism',
    icon: '○',
    symbol: 'ETH',
    apiKey: import.meta.env.VITE_MORALIS_KEY || '',
    moralisChain: '0xa',
    explorerUrl: 'https://optimistic.etherscan.io',
    color: 'from-red-500 to-pink-500',
    isLive: true
  },
  {
    id: 'base',
    name: 'Base',
    icon: '🔵',
    symbol: 'ETH',
    apiKey: import.meta.env.VITE_MORALIS_KEY || '',
    moralisChain: '0x2105',
    explorerUrl: 'https://basescan.org',
    color: 'from-blue-600 to-indigo-600',
    isLive: true
  },
  {
    id: 'avalanche',
    name: 'Avalanche',
    icon: '🔺',
    symbol: 'AVAX',
    apiKey: import.meta.env.VITE_MORALIS_KEY || '',
    moralisChain: '0xa86a',
    explorerUrl: 'https://snowtrace.io',
    color: 'from-red-500 to-orange-500',
    isLive: true
  },
  {
    id: 'fantom',
    name: 'Fantom',
    icon: '👻',
    symbol: 'FTM',
    apiKey: import.meta.env.VITE_MORALIS_KEY || '',
    moralisChain: '0xfa',
    explorerUrl: 'https://ftmscan.com',
    color: 'from-blue-500 to-cyan-500',
    isLive: true
  },
  {
    id: 'cronos',
    name: 'Cronos',
    icon: '🌙',
    symbol: 'CRO',
    apiKey: import.meta.env.VITE_MORALIS_KEY || '',
    moralisChain: '0x19',
    explorerUrl: 'https://cronoscan.com',
    color: 'from-indigo-500 to-purple-500',
    isLive: true
  },
  {
    id: 'ronin',
    name: 'Ronin',
    icon: '⚔️',
    symbol: 'RON',
    apiKey: import.meta.env.VITE_MORALIS_KEY || '',
    moralisChain: '0x7e4',
    explorerUrl: 'https://app.roninchain.com',
    color: 'from-blue-600 to-cyan-500',
    isLive: true
  },

  // COMING SOON (Non-EVM Chains - Not yet supported by Moralis API)
  {
    id: 'bittensor',
    name: 'Bittensor',
    icon: '🧠',
    symbol: 'TAO',
    apiKey: import.meta.env.VITE_MORALIS_KEY || '',
    moralisChain: null,
    explorerUrl: 'https://taostats.io',
    color: 'from-cyan-500 to-blue-500',
    isSubstrate: true,
    isLive: false,
    comingSoon: true
  },
  {
    id: 'polkadot',
    name: 'Polkadot',
    icon: '⬤',
    symbol: 'DOT',
    apiKey: import.meta.env.VITE_MORALIS_KEY || '',
    moralisChain: null,
    explorerUrl: 'https://polkadot.subscan.io',
    color: 'from-pink-500 to-rose-500',
    isSubstrate: true,
    isLive: false,
    comingSoon: true
  },
  {
    id: 'osmosis',
    name: 'Osmosis',
    icon: '💧',
    symbol: 'OSMO',
    apiKey: import.meta.env.VITE_MORALIS_KEY || '',
    moralisChain: null,
    explorerUrl: 'https://www.mintscan.io/osmosis',
    color: 'from-purple-500 to-indigo-500',
    isCosmos: true,
    isLive: false,
    comingSoon: true
  },
  {
    id: 'solana',
    name: 'Solana',
    icon: '◎',
    symbol: 'SOL',
    apiKey: import.meta.env.VITE_MORALIS_KEY || '',
    moralisChain: null,
    explorerUrl: 'https://solscan.io',
    color: 'from-purple-400 to-pink-400',
    isSolana: true,
    isLive: false,
    comingSoon: true
  }
];

export const getChainById = (chainId) => {
  return SUPPORTED_CHAINS.find(chain => chain.id === chainId);
};

export const getLiveChains = () => {
  return SUPPORTED_CHAINS.filter(chain => chain.isLive);
};

export const getComingSoonChains = () => {
  return SUPPORTED_CHAINS.filter(chain => chain.comingSoon);
};
