import { SUPPORTED_CHAINS } from '../utils/chains';

export default function ChainSelector({ selectedChain, onChainChange }) {
  return (
    <div className="mb-8">
      <h3 className="text-sm font-semibold text-gray-400 mb-4 text-center">
        SUPPORTED CHAINS
      </h3>
      <div className="flex flex-wrap justify-center gap-3">
        {SUPPORTED_CHAINS.map(chain => (
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
  );
}
