import { useState } from 'react';
import Header from './components/Header';
import ChainSelector from './components/ChainSelector';
import SearchBar from './components/SearchBar';
import TransactionTable from './components/TransactionTable';
import Features from './components/Features';
import LoadingState from './components/LoadingState';
import Footer from './components/Footer';
import { fetchTransactions, fetchTokenTransfers, fetchTokenBalances, fetchAccountBalance } from './services/api';
import { Mail, Wallet, Clock, Coins } from 'lucide-react';

function App() {
  const [selectedChain, setSelectedChain] = useState('ethereum');
  const [transactions, setTransactions] = useState([]);
  const [tokenTransfers, setTokenTransfers] = useState([]);
  const [tokenBalances, setTokenBalances] = useState([]);
  const [accountBalance, setAccountBalance] = useState('0');
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
      // Fetch all data in parallel
      const [txs, tokens, balances, balance] = await Promise.all([
        fetchTransactions(address, selectedChain),
        fetchTokenTransfers(address, selectedChain),
        fetchTokenBalances(address, selectedChain),
        fetchAccountBalance(address, selectedChain)
      ]);

      setTransactions(txs);
      setTokenTransfers(tokens);
      setTokenBalances(balances);
      setAccountBalance(balance);

      if (txs.length === 0 && tokens.length === 0) {
        setError('No transactions found for this address');
      }
    } catch (error) {
      console.error('Error fetching data:', error);
      setError(error.message || 'Failed to fetch data. Please check your API key in .env file');
      setTransactions([]);
      setTokenTransfers([]);
      setTokenBalances([]);
      setAccountBalance('0');
    } finally {
      setLoading(false);
    }
  };

  const handleChainChange = async (chainId) => {
    setSelectedChain(chainId);
    
    // Re-fetch data if we already have an address
    if (currentAddress) {
      setLoading(true);
      setError('');
      try {
        const [txs, tokens, balances, balance] = await Promise.all([
          fetchTransactions(currentAddress, chainId),
          fetchTokenTransfers(currentAddress, chainId),
          fetchTokenBalances(currentAddress, chainId),
          fetchAccountBalance(currentAddress, chainId)
        ]);

        setTransactions(txs);
        setTokenTransfers(tokens);
        setTokenBalances(balances);
        setAccountBalance(balance);

        if (txs.length === 0 && tokens.length === 0) {
          setError('No transactions found for this address on this chain');
        }
      } catch (error) {
        console.error('Error fetching data:', error);
        setError(error.message || 'Failed to fetch data');
        setTransactions([]);
        setTokenTransfers([]);
        setTokenBalances([]);
        setAccountBalance('0');
      } finally {
        setLoading(false);
      }
    }
  };

  const handleNewsletterSubmit = (e) => {
    e.preventDefault();
    if (email && email.includes('@')) {
      console.log('Newsletter signup:', email);
      setSubscribed(true);
      setTimeout(() => {
        setEmail('');
        setSubscribed(false);
      }, 3000);
    }
  };

  const getLastTransaction = () => {
    if (transactions.length === 0) return null;
    return transactions[0];
  };

  const lastTx = getLastTransaction();

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

        {/* Account Summary */}
        {!loading && currentAddress && (
          <div className="mb-8 grid md:grid-cols-3 gap-4">
            <div className="card-hover bg-gradient-to-br from-purple-900/30 to-indigo-900/30 backdrop-blur-lg rounded-2xl p-6 border border-purple-700/50">
              <div className="flex items-center space-x-3 mb-2">
                <Wallet className="text-purple-400" size={24} />
                <h3 className="text-sm font-semibold text-gray-400">BALANCE</h3>
              </div>
              <p className="text-3xl font-bold">{accountBalance}</p>
              <p className="text-sm text-gray-400 mt-1">{transactions[0]?.symbol || 'ETH'}</p>
            </div>

            <div className="card-hover bg-gradient-to-br from-blue-900/30 to-cyan-900/30 backdrop-blur-lg rounded-2xl p-6 border border-blue-700/50">
              <div className="flex items-center space-x-3 mb-2">
                <Clock className="text-blue-400" size={24} />
                <h3 className="text-sm font-semibold text-gray-400">LAST TRANSACTION</h3>
              </div>
              {lastTx ? (
                <>
                  <p className="text-xl font-bold">{new Date(lastTx.timestamp * 1000).toLocaleDateString()}</p>
                  <p className="text-sm text-gray-400 mt-1">{lastTx.value} {lastTx.symbol}</p>
                </>
              ) : (
                <p className="text-xl font-bold">No transactions</p>
              )}
            </div>

            <div className="card-hover bg-gradient-to-br from-green-900/30 to-emerald-900/30 backdrop-blur-lg rounded-2xl p-6 border border-green-700/50">
              <div className="flex items-center space-x-3 mb-2">
                <Coins className="text-green-400" size={24} />
                <h3 className="text-sm font-semibold text-gray-400">TOKEN HOLDINGS</h3>
              </div>
              <p className="text-3xl font-bold">{tokenBalances.length}</p>
              <p className="text-sm text-gray-400 mt-1">Different tokens</p>
            </div>
          </div>
        )}

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

        {/* Token Balances Table */}
        {!loading && tokenBalances.length > 0 && (
          <div className="mb-8 card-hover bg-gray-900/50 backdrop-blur-lg rounded-2xl p-8 border border-gray-800">
            <h3 className="text-2xl font-bold mb-6 flex items-center">
              <Coins className="mr-2" size={24} />
              Token Holdings
            </h3>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-800 text-left">
                    <th className="py-3 px-4 text-gray-400 font-semibold">Token</th>
                    <th className="py-3 px-4 text-gray-400 font-semibold">Symbol</th>
                    <th className="py-3 px-4 text-gray-400 font-semibold">Balance</th>
                    <th className="py-3 px-4 text-gray-400 font-semibold">Type</th>
                  </tr>
                </thead>
                <tbody>
                  {tokenBalances.slice(0, 10).map((token, idx) => (
                    <tr key={idx} className="border-b border-gray-800 hover:bg-gray-800/30 transition">
                      <td className="py-4 px-4 font-semibold">{token.name}</td>
                      <td className="py-4 px-4 text-purple-400">{token.symbol}</td>
                      <td className="py-4 px-4">{token.balance}</td>
                      <td className="py-4 px-4">
                        <span className="px-3 py-1 bg-blue-900/30 text-blue-400 rounded-full text-sm">
                          {token.type || 'ERC-20'}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            {tokenBalances.length > 10 && (
              <p className="text-sm text-gray-400 mt-4">Showing 10 of {tokenBalances.length} tokens</p>
            )}
          </div>
        )}

        {/* Transactions Table */}
        {!loading && (
          <TransactionTable 
            transactions={transactions}
            tokenTransfers={tokenTransfers}
            address={currentAddress}
          />
        )}

        {/* Features (show when no transactions) */}
        {!loading && transactions.length === 0 && tokenTransfers.length === 0 && !error && <Features />}

        {/* Newsletter Section */}
        {!loading && (transactions.length > 0 || tokenTransfers.length > 0) && (
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

        {/* Info Section */}
        {!loading && (transactions.length > 0 || tokenTransfers.length > 0) && (
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
