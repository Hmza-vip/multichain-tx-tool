import { SUPPORTED_CHAINS, getLiveChains, getComingSoonChains } from '../utils/chains';

export default function ChainSelector({ selectedChain, onChainChange }) {
  const liveChains = getLiveChains();
  const comingSoonChains = getComingSoonChains();

  return (
    <div className="mb-8 space-y-8">
      {/* Live Chains */}
      <div>
        <h3 className="text-sm font-semibold text-green-400 mb-4 text-center flex items-center justify-center">
          <span className="mr-2">✅</span>
          LIVE CHAINS
        </h3>
        <div className="flex flex-wrap justify-center gap-3">
          {liveChains.map(chain => (
            <button
              key={chain.id}
              onClick={() => onChainChange(chain.id)}
              className={`chain-badge px-6 py-3 rounded-lg font-semibold flex items-center space-x-2 ${
                selectedChain === chain.id
                  ? `bg-gradient-to-r ${chain.color} text-white shadow-lg`
                  : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
              }`}
            >
              <span className="text-xl">{chain.icon}</span>
              <span>{chain.name}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Coming Soon Chains */}
      {comingSoonChains.length > 0 && (
        <div className="bg-gradient-to-br from-purple-900/20 to-indigo-900/20 backdrop-blur-lg rounded-2xl p-6 border border-purple-700/30">
          <h3 className="text-sm font-semibold text-purple-400 mb-4 text-center flex items-center justify-center">
            <span className="mr-2">🚀</span>
            COMING SOON
          </h3>
          <div className="flex flex-wrap justify-center gap-3">
            {comingSoonChains.map(chain => (
              <div
                key={chain.id}
                className="px-6 py-3 rounded-lg font-semibold flex items-center space-x-2 bg-gray-800/50 text-gray-500 cursor-not-allowed opacity-60"
                title={`${chain.name} support coming soon!`}
              >
                <span className="text-xl">{chain.icon}</span>
                <span>{chain.name}</span>
                <span className="text-xs bg-purple-900/30 text-purple-400 px-2 py-1 rounded">Soon</span>
              </div>
            ))}
          </div>
          <p className="text-center text-xs text-gray-400 mt-4">
            These chains are in development and will be added soon!
          </p>
        </div>
      )}
    </div>
  );
}
