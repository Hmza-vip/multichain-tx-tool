import { Download, ExternalLink, ChevronDown, TrendingUp } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';
import { exportFormats } from '../utils/csvExport';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

export default function TransactionTable({ transactions, address }) {
  const [showExportMenu, setShowExportMenu] = useState(false);
  const [displayCount, setDisplayCount] = useState(50);
  const [showGraph, setShowGraph] = useState(true);
  const tableEndRef = useRef(null);
  const observerRef = useRef(null);

  // Infinite scroll setup
  useEffect(() => {
    const options = {
      root: null,
      rootMargin: '100px',
      threshold: 0.1
    };

    observerRef.current = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && displayCount < transactions.length) {
        setDisplayCount(prev => Math.min(prev + 50, transactions.length));
      }
    }, options);

    if (tableEndRef.current) {
      observerRef.current.observe(tableEndRef.current);
    }

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, [displayCount, transactions.length]);

  if (transactions.length === 0) return null;

  // Calculate balance changes over time
  const calculateBalanceHistory = () => {
    const sortedTxs = [...transactions].sort((a, b) => a.timestamp - b.timestamp);
    let balance = 0;
    const balanceHistory = [];

    sortedTxs.forEach(tx => {
      const isReceived = tx.to.toLowerCase() === address.toLowerCase();
      const value = parseFloat(tx.value);
      const fee = parseFloat(tx.fee);

      if (isReceived) {
        balance += value;
      } else {
        balance -= (value + fee);
      }

      balanceHistory.push({
        timestamp: tx.timestamp,
        balance: balance,
        date: new Date(tx.timestamp * 1000).toLocaleDateString()
      });
    });

    return balanceHistory;
  };

  const balanceHistory = calculateBalanceHistory();

  const chartData = {
    labels: balanceHistory.map(item => item.date),
    datasets: [
      {
        label: `Balance (${transactions[0]?.symbol || 'ETH'})`,
        data: balanceHistory.map(item => item.balance),
        borderColor: 'rgb(168, 85, 247)',
        backgroundColor: 'rgba(168, 85, 247, 0.1)',
        fill: true,
        tension: 0.4,
        pointRadius: 2,
        pointHoverRadius: 5
      }
    ]
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: true,
        labels: {
          color: '#9ca3af'
        }
      },
      tooltip: {
        mode: 'index',
        intersect: false,
        backgroundColor: 'rgba(17, 24, 39, 0.9)',
        titleColor: '#f3f4f6',
        bodyColor: '#d1d5db',
        borderColor: 'rgba(168, 85, 247, 0.5)',
        borderWidth: 1
      }
    },
    scales: {
      x: {
        grid: {
          color: 'rgba(75, 85, 99, 0.2)'
        },
        ticks: {
          color: '#9ca3af',
          maxRotation: 45,
          minRotation: 45
        }
      },
      y: {
        grid: {
          color: 'rgba(75, 85, 99, 0.2)'
        },
        ticks: {
          color: '#9ca3af'
        }
      }
    }
  };

  const handleExport = (formatId) => {
    const format = exportFormats.find(f => f.id === formatId);
    if (format) {
      format.export(transactions, address);
      setShowExportMenu(false);
    }
  };

  const displayedTransactions = transactions.slice(0, displayCount);

  return (
    <div className="space-y-6">
      {/* Balance Graph */}
      {showGraph && balanceHistory.length > 0 && (
        <div className="card-hover bg-gray-900/50 backdrop-blur-lg rounded-2xl p-8 border border-gray-800">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-2xl font-bold flex items-center">
              <TrendingUp className="mr-2" size={24} />
              Balance History
            </h3>
            <button
              onClick={() => setShowGraph(false)}
              className="text-gray-400 hover:text-white transition text-sm"
            >
              Hide Graph
            </button>
          </div>
          <div style={{ height: '300px' }}>
            <Line data={chartData} options={chartOptions} />
          </div>
        </div>
      )}

      {!showGraph && (
        <button
          onClick={() => setShowGraph(true)}
          className="text-purple-400 hover:text-purple-300 transition text-sm"
        >
          Show Balance Graph
        </button>
      )}

      {/* Transaction Table */}
      <div className="card-hover bg-gray-900/50 backdrop-blur-lg rounded-2xl p-8 border border-gray-800">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
          <div>
            <h3 className="text-2xl font-bold flex items-center">
              <span className="mr-2">📊</span>
              Transaction History
            </h3>
            <p className="text-sm text-gray-400 mt-1">
              Showing {displayedTransactions.length} of {transactions.length} transaction{transactions.length !== 1 ? 's' : ''}
            </p>
          </div>
          
          <div className="relative">
            <button
              onClick={() => setShowExportMenu(!showExportMenu)}
              className="px-6 py-3 bg-green-600 rounded-lg font-semibold hover:bg-green-700 transition flex items-center space-x-2"
            >
              <Download size={20} />
              <span>Export CSV</span>
              <ChevronDown size={16} />
            </button>
            
            {showExportMenu && (
              <div className="absolute right-0 mt-2 w-56 bg-gray-800 border border-gray-700 rounded-lg shadow-xl z-10">
                {exportFormats.filter(f => f.id !== 'awakens').map(format => (
                  <button
                    key={format.id}
                    onClick={() => handleExport(format.id)}
                    className="w-full text-left px-4 py-3 hover:bg-gray-700 transition first:rounded-t-lg last:rounded-b-lg"
                  >
                    <div className="font-semibold">{format.name}</div>
                    <div className="text-xs text-gray-400">
                      {format.id === 'koinly' && 'Compatible with Koinly'}
                      {format.id === 'cointracking' && 'Compatible with CoinTracking'}
                      {format.id === 'standard' && 'Generic CSV format'}
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-800 text-left">
                <th className="py-3 px-4 text-gray-400 font-semibold">Hash</th>
                <th className="py-3 px-4 text-gray-400 font-semibold">From</th>
                <th className="py-3 px-4 text-gray-400 font-semibold">To</th>
                <th className="py-3 px-4 text-gray-400 font-semibold">Value</th>
                <th className="py-3 px-4 text-gray-400 font-semibold">Fee</th>
                <th className="py-3 px-4 text-gray-400 font-semibold">Time</th>
                <th className="py-3 px-4 text-gray-400 font-semibold">Status</th>
                <th className="py-3 px-4 text-gray-400 font-semibold">Chain</th>
                <th className="py-3 px-4 text-gray-400 font-semibold"></th>
              </tr>
            </thead>
            <tbody>
              {displayedTransactions.map((tx, idx) => (
                <tr 
                  key={idx} 
                  className="border-b border-gray-800 hover:bg-gray-800/30 transition"
                >
                  <td className="py-4 px-4 font-mono text-purple-400 text-sm">
                    {tx.hashShort}
                  </td>
                  <td className="py-4 px-4 font-mono text-sm">
                    {tx.fromShort}
                  </td>
                  <td className="py-4 px-4 font-mono text-sm">
                    {tx.toShort}
                  </td>
                  <td className="py-4 px-4 font-semibold">
                    {tx.value} {tx.symbol}
                  </td>
                  <td className="py-4 px-4 text-sm text-gray-400">
                    {tx.fee} {tx.symbol}
                  </td>
                  <td className="py-4 px-4 text-sm text-gray-400">
                    {new Date(tx.timestamp * 1000).toLocaleString()}
                  </td>
                  <td className="py-4 px-4">
                    <span className={`px-3 py-1 rounded-full text-sm ${
                      tx.status === 'Success' 
                        ? 'bg-green-900/30 text-green-400' 
                        : 'bg-red-900/30 text-red-400'
                    }`}>
                      {tx.status}
                    </span>
                  </td>
                  <td className="py-4 px-4">
                    <span className="px-3 py-1 bg-purple-900/30 text-purple-400 rounded-full text-sm">
                      {tx.chain}
                    </span>
                  </td>
                  <td className="py-4 px-4">
                    <a
                      href={`https://${tx.chainId === 'ethereum' ? '' : tx.chainId + '.'}etherscan.io/tx/${tx.hash}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-400 hover:text-purple-400 transition"
                    >
                      <ExternalLink size={16} />
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          
          {/* Infinite scroll trigger */}
          <div ref={tableEndRef} className="h-10 flex items-center justify-center">
            {displayCount < transactions.length && (
              <p className="text-gray-400 text-sm">Loading more transactions...</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
