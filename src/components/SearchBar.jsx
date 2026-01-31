import { Search, Loader2 } from 'lucide-react';
import { useState } from 'react';

export default function SearchBar({ onSearch, loading }) {
  const [address, setAddress] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    if (!address.trim()) {
      setError('Please enter a wallet address');
      return;
    }

    if (!address.match(/^0x[a-fA-F0-9]{40}$/)) {
      setError('Invalid Ethereum address format');
      return;
    }

    onSearch(address.trim());
  };

  return (
    <div className="card-hover bg-gray-900/50 backdrop-blur-lg rounded-2xl p-8 border border-gray-800 mb-8">
      <form onSubmit={handleSubmit} className="flex flex-col md:flex-row gap-4">
        <input
          type="text"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          placeholder="Enter wallet address (0x...)"
          className="flex-1 px-6 py-4 bg-gray-800 rounded-xl border border-gray-700 focus:border-purple-500 focus:outline-none text-white placeholder-gray-500"
          disabled={loading}
        />
        <button
          type="submit"
          disabled={loading}
          className="px-8 py-4 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-xl font-semibold hover:from-purple-700 hover:to-indigo-700 transition disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap"
        >
          {loading ? (
            <span className="flex items-center justify-center">
              <Loader2 className="animate-spin mr-2" size={20} />
              Scanning...
            </span>
          ) : (
            <span className="flex items-center justify-center">
              <Search className="mr-2" size={20} />
              Scan Transactions
            </span>
          )}
        </button>
      </form>
      
      {error && (
        <div className="mt-4 p-4 bg-red-900/30 border border-red-700 rounded-lg text-red-400">
          {error}
        </div>
      )}
    </div>
  );
}
