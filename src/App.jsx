import { useState } from 'react';
import Header from './components/Header';
import ChainSelector from './components/ChainSelector';
import SearchBar from './components/SearchBar';
import TransactionTable from './components/TransactionTable';
import Features from './components/Features';
import LoadingState from './components/LoadingState';
import Footer from './components/Footer';
import { fetchTransactions } from './services/api';
import { Mail } from 'lucide-react';

function App() {
  const [selectedChain, setSelectedChain] = useState('ethereum');
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentAddress, setCurrentAddress] = useState('');
  const [error, setError] = useState('');
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSearch = async (address) => {
    setLoading(true);
    setCurrentAddress(address);
    setError('');
    
    try {
      const txs = await fetchTransactions(address, selectedChain);
      setTransactions(txs);
      if (txs.length === 0) {
        setError('No transactions found for this address');
      }
    } catch (error) {
      console.error('Error fetching transactions:', error);
      setError(error.message || 'Failed to fetch transactions. Please check your API key in .env file');
      setTransactions([]);
    } finally {
      setLoading(false);
    }
  };

  const handleChainChange = async (chainId) => {
    setSelectedChain(chainId);
    
    // Re-fetch transactions if we already have an address
    if (currentAddress) {
      setLoading(true);
      setError('');
      try {
        const txs = await fetchTransactions(currentAddress, chainId);
        setTransactions(txs);
        if (txs.length === 0) {
          setError('No transactions found for this address on this chain');
        }
      } catch (error) {
        console.error('Error fetching transactions:', error);
        setError(error.message || 'Failed to fetch transactions');
        setTransactions([]);
      } finally {
        setLoading(false);
      }
    }
  };

  const handleNewsletterSubmit = (e) => {
    e.preventDefault();
    if (email && email.includes('@')) {
      // Here you would integrate with your email service
      console.log('Newsletter signup:', email);
      setSubscribed(true);
      setTimeout(() => {
        setEmail('');
        setSubscribed(false);
      }, 3000);
    }
  };

  return (
    <div className="min-h-screen text-white">
      <Header />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-8">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Transactions Simplified{' '}
            <span className="gradient-text">Across Chains</span>
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Export your transaction history for tax reporting and accounting. 
            Generate CSVs instantly without connecting your wallet.
          </p>
        </div>

        {/* Chain Selection */}
        <ChainSelector 
          selectedChain={selectedChain} 
          onChainChange={handleChainChange}
        />

        {/* Search */}
        <SearchBar onSearch={handleSearch} loading={loading} />

        {/* Error Display */}
        {error && !loading && (
          <div className="mb-8 p-6 bg-red-900/30 border border-red-700 rounded-2xl text-red-400">
            <p className="font-semibold">⚠️ {error}</p>
            {error.includes('API key') && (
              <p className="text-sm mt-2">
                Get a free API key from the blockchain explorer and add it to your .env file
              </p>
            )}
          </div>
        )}

        {/* Loading State */}
        {loading && <LoadingState />}

        {/* Transactions Table */}
        {!loading && (
          <TransactionTable 
            transactions={transactions} 
            address={currentAddress}
          />
        )}

        {/* Features (show when no transactions) */}
        {!loading && transactions.length === 0 && !error && <Features />}

        {/* Newsletter Section */}
        {!loading && transactions.length > 0 && (
          <div className="mt-16 card-hover bg-gradient-to-r from-purple-900/30 to-indigo-900/30 backdrop-blur-lg rounded-2xl p-8 border border-purple-700/50">
            <div className="max-w-3xl mx-auto text-center">
              <Mail className="mx-auto mb-4 text-purple-400" size={48} />
              <h3 className="text-3xl font-bold mb-4">
                Stay Updated with <span className="gradient-text">Crypto Insights</span>
              </h3>
              <p className="text-gray-300 mb-6">
                Get the latest updates on blockchain technology, tax regulations, and new features. 
                Join our community of crypto enthusiasts!
              </p>
              
              {!subscribed ? (
                <form onSubmit={handleNewsletterSubmit} className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    className="flex-1 px-6 py-4 bg-gray-800 rounded-lg border border-gray-700 focus:border-purple-500 focus:outline-none text-white placeholder-gray-500"
                    required
                  />
                  <button
                    type="submit"
                    className="px-8 py-4 bg-white text-purple-900 rounded-lg font-bold hover:bg-gray-100 transition whitespace-nowrap"
                  >
                    Subscribe
                  </button>
                </form>
              ) : (
                <div className="p-4 bg-green-900/30 border border-green-700 rounded-lg text-green-400 max-w-md mx-auto">
                  ✓ Successfully subscribed! Check your email for confirmation.
                </div>
              )}
              
              <p className="text-sm text-gray-400 mt-4">
                We respect your privacy. Unsubscribe anytime.
              </p>
            </div>
          </div>
        )}

        {/* Info Section - Always show when transactions are loaded */}
        {!loading && transactions.length > 0 && (
          <div className="mt-8 grid md:grid-cols-3 gap-6">
            <div className="bg-gray-900/50 backdrop-blur-lg rounded-2xl p-6 border border-gray-800">
              <h4 className="font-bold mb-2 text-lg">⚡ Fast & Accurate</h4>
              <p className="text-sm text-gray-400">
                Process thousands of transactions in minutes with real-time blockchain data.
              </p>
            </div>
            <div className="bg-gray-900/50 backdrop-blur-lg rounded-2xl p-6 border border-gray-800">
              <h4 className="font-bold mb-2 text-lg">🔒 Privacy First</h4>
              <p className="text-sm text-gray-400">
                All data processing happens in your browser. We never store your information.
              </p>
            </div>
            <div className="bg-gray-900/50 backdrop-blur-lg rounded-2xl p-6 border border-gray-800">
              <h4 className="font-bold mb-2 text-lg">🌍 Multi-Chain</h4>
              <p className="text-sm text-gray-400">
                Support for Ethereum, Polygon, BSC, Arbitrum, Optimism, Base, and Avalanche.
              </p>
            </div>
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
}

export default App;
