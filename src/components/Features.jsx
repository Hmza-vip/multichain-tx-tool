import { Lock, BarChart3, Zap, Clock, Globe, Download } from 'lucide-react';

export default function Features() {
  const features = [
    {
      icon: <Lock size={40} />,
      title: 'Private & Secure',
      description: 'Zero data storage. All processing happens in your browser. Your wallet keys never leave your device.'
    },
    {
      icon: <Zap size={40} />,
      title: 'Lightning Fast',
      description: 'Powered by Moralis API for instant data fetching across multiple blockchain networks.'
    },
    {
      icon: <BarChart3 size={40} />,
      title: 'Tax Ready Exports',
      description: 'Export to Koinly, CoinTracking, or standard CSV. Perfect for tax season and accounting.'
    },
    {
      icon: <Clock size={40} />,
      title: 'Smart Pagination',
      description: 'Load transactions efficiently, 10 at a time. Perfect for wallets with thousands of transactions.'
    },
    {
      icon: <Globe size={40} />,
      title: 'Multi-Chain Support',
      description: '10+ EVM chains live now! Ethereum, Polygon, BSC, Arbitrum, Optimism, Base, Avalanche, Fantom, Cronos & Ronin.'
    },
    {
      icon: <Download size={40} />,
      title: 'Complete History',
      description: 'Fetch native transactions, token transfers, and token balances all in one place.'
    }
  ];

  return (
    <div className="space-y-12">
      <div className="grid md:grid-cols-3 gap-6 mt-12">
        {features.map((feature, idx) => (
          <div 
            key={idx}
            className="card-hover bg-gray-900/50 backdrop-blur-lg rounded-2xl p-6 border border-gray-800 text-center"
          >
            <div className="flex justify-center mb-4 text-purple-400">
              {feature.icon}
            </div>
            <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
            <p className="text-gray-400">{feature.description}</p>
          </div>
        ))}
      </div>

      {/* Getting Started */}
      <div className="bg-gradient-to-r from-blue-900/20 to-cyan-900/20 backdrop-blur-lg rounded-2xl p-8 border border-blue-700/30">
        <h3 className="text-2xl font-bold mb-4 text-center">
          🎯 Getting Started
        </h3>
        <div className="grid md:grid-cols-3 gap-6 text-center">
          <div>
            <div className="text-4xl mb-2">1️⃣</div>
            <h4 className="font-bold mb-2">Select Chain</h4>
            <p className="text-sm text-gray-400">Choose from 10+ supported blockchain networks</p>
          </div>
          <div>
            <div className="text-4xl mb-2">2️⃣</div>
            <h4 className="font-bold mb-2">Enter Address</h4>
            <p className="text-sm text-gray-400">Paste any wallet address to analyze transactions</p>
          </div>
          <div>
            <div className="text-4xl mb-2">3️⃣</div>
            <h4 className="font-bold mb-2">Export Data</h4>
            <p className="text-sm text-gray-400">Download your transaction history in multiple formats</p>
          </div>
        </div>
      </div>

      {/* Supported Chains Overview */}
      <div className="bg-gradient-to-br from-purple-900/20 to-indigo-900/20 backdrop-blur-lg rounded-2xl p-8 border border-purple-700/30">
        <h3 className="text-2xl font-bold mb-6 text-center">
          🌐 Supported Blockchains
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          {[
            { name: 'Ethereum', icon: '⟠' },
            { name: 'Polygon', icon: '⬡' },
            { name: 'BSC', icon: '◆' },
            { name: 'Arbitrum', icon: '◉' },
            { name: 'Optimism', icon: '○' },
            { name: 'Base', icon: '🔵' },
            { name: 'Avalanche', icon: '🔺' },
            { name: 'Fantom', icon: '👻' },
            { name: 'Cronos', icon: '🌙' },
            { name: 'Ronin', icon: '⚔️' }
          ].map((chain, idx) => (
            <div 
              key={idx}
              className="bg-gray-800/50 rounded-lg p-4 text-center border border-gray-700 hover:border-purple-500 transition"
            >
              <div className="text-3xl mb-2">{chain.icon}</div>
              <div className="font-semibold text-sm">{chain.name}</div>
              <div className="text-xs text-green-400 mt-1">✓ Live</div>
            </div>
          ))}
        </div>
        <p className="text-center text-sm text-gray-400 mt-6">
          More chains coming soon! Substrate, Cosmos & Solana chains in development.
        </p>
      </div>
    </div>
  );
}
