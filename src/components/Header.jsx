import { Github } from 'lucide-react';

export default function Header() {
  return (
    <nav className="border-b border-gray-800 bg-black/30 backdrop-blur-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-3">
            <div className="text-3xl">⛓️</div>
            <div>
              <h1 className="text-2xl font-bold gradient-text">My Crypto Explorer</h1>
              <p className="text-xs text-gray-400">Export Transactions Across All Chains</p>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <a 
              href="https://github.com/yourusername/multichain-tx-explorer" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-white transition flex items-center space-x-2"
            >
              <Github size={24} />
              <span className="hidden md:inline">GitHub</span>
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
}
