import { Github } from 'lucide-react';

export default function Header() {
  return (
    <nav className="border-b border-gray-800 bg-black/30 backdrop-blur-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-3">
            <div className="text-3xl">⛓️</div>
            <div>
              <h1 className="text-2xl font-bold gradient-text">MultiChain Explorer</h1>
              <p className="text-xs text-gray-400">Export Transactions Across All Chains</p>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <a 
              href="https://github.com/Hmza-vip/multichain-tx-tool" 
              target="_blank" 
              rel="noopener noreferrer"
              className="px-4 py-2 bg-gray-800 hover:bg-gray-700 rounded-lg transition flex items-center space-x-2 border border-gray-700"
            >
              <Github size={20} />
              <span className="hidden md:inline font-semibold">View on GitHub</span>
              <span className="md:hidden font-semibold">GitHub</span>
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
}
