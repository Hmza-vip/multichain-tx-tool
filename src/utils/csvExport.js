import Papa from 'papaparse';

export const exportToAwakensCSV = (transactions, address) => {
  // Awakens Tax CSV Format (Recommended)
  const csvData = transactions.map(tx => {
    const date = new Date(tx.timestamp * 1000).toISOString();
    const isReceived = tx.to.toLowerCase() === address.toLowerCase();
    
    return {
      'Date': date,
      'Received Amount': isReceived ? tx.value : '',
      'Received Currency': isReceived ? (tx.tokenSymbol || tx.symbol) : '',
      'Sent Amount': !isReceived ? tx.value : '',
      'Sent Currency': !isReceived ? (tx.tokenSymbol || tx.symbol) : '',
      'Fee Amount': tx.fee || '',
      'Fee Currency': tx.symbol || '',
      'Tag': isReceived ? 'Deposit' : 'Withdrawal',
      'Transaction Hash': tx.hash,
      'Chain': tx.chain,
      'Block Number': tx.blockNumber || '',
      'Status': tx.status || 'Success'
    };
  });

  const csv = Papa.unparse(csvData);
  downloadCSV(csv, `awakens_tax_${transactions[0]?.chainId || 'multi'}_${Date.now()}.csv`);
};

export const exportToStandardCSV = (transactions) => {
  const csvData = transactions.map(tx => ({
    'Transaction Hash': tx.hash,
    'Block Number': tx.blockNumber,
    'Timestamp': new Date(tx.timestamp * 1000).toISOString(),
    'From': tx.from,
    'To': tx.to,
    'Value': tx.value,
    'Symbol': tx.tokenSymbol || tx.symbol,
    'Gas Used': tx.gasUsed,
    'Gas Price': tx.gasPrice,
    'Fee': tx.fee,
    'Status': tx.status,
    'Chain': tx.chain
  }));

  const csv = Papa.unparse(csvData);
  downloadCSV(csv, `transactions_${transactions[0]?.chainId || 'multi'}_${Date.now()}.csv`);
};

export const exportToKoinlyCSV = (transactions, address) => {
  // Koinly CSV Format
  const csvData = transactions.map(tx => {
    const date = new Date(tx.timestamp * 1000).toISOString();
    const isReceived = tx.to.toLowerCase() === address.toLowerCase();
    
    return {
      'Date': date,
      'Sent Amount': !isReceived ? tx.value : '',
      'Sent Currency': !isReceived ? (tx.tokenSymbol || tx.symbol) : '',
      'Received Amount': isReceived ? tx.value : '',
      'Received Currency': isReceived ? (tx.tokenSymbol || tx.symbol) : '',
      'Fee Amount': tx.fee,
      'Fee Currency': tx.symbol,
      'Net Worth Amount': '',
      'Net Worth Currency': '',
      'Label': isReceived ? 'deposit' : 'withdrawal',
      'Description': `${tx.chain} transaction`,
      'TxHash': tx.hash
    };
  });

  const csv = Papa.unparse(csvData);
  downloadCSV(csv, `koinly_${transactions[0]?.chainId || 'multi'}_${Date.now()}.csv`);
};

export const exportToCoinTrackingCSV = (transactions, address) => {
  // CoinTracking CSV Format
  const csvData = transactions.map(tx => {
    const date = new Date(tx.timestamp * 1000);
    const isReceived = tx.to.toLowerCase() === address.toLowerCase();
    
    return {
      'Type': isReceived ? 'Deposit' : 'Withdrawal',
      'Buy Amount': isReceived ? tx.value : '',
      'Buy Currency': isReceived ? (tx.tokenSymbol || tx.symbol) : '',
      'Sell Amount': !isReceived ? tx.value : '',
      'Sell Currency': !isReceived ? (tx.tokenSymbol || tx.symbol) : '',
      'Fee': tx.fee,
      'Fee Currency': tx.symbol,
      'Exchange': tx.chain,
      'Trade Group': '',
      'Comment': `TxHash: ${tx.hash}`,
      'Date': date.toLocaleString('en-US')
    };
  });

  const csv = Papa.unparse(csvData);
  downloadCSV(csv, `cointracking_${transactions[0]?.chainId || 'multi'}_${Date.now()}.csv`);
};

const downloadCSV = (csvContent, filename) => {
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  
  if (link.download !== undefined) {
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', filename);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
};

export const exportFormats = [
  { id: 'awakens', name: 'Awaken Tax', export: exportToAwakensCSV, description: 'Recommended for Awaken Tax' },
  { id: 'koinly', name: 'Koinly', export: exportToKoinlyCSV, description: 'Compatible with Koinly' },
  { id: 'cointracking', name: 'CoinTracking', export: exportToCoinTrackingCSV, description: 'Compatible with CoinTracking' },
  { id: 'standard', name: 'Standard CSV', export: exportToStandardCSV, description: 'Generic CSV format' }
];