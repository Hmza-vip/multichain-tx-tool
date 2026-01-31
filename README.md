# 🔗 MultiChain Explorer

A professional, multi-chain blockchain transaction explorer and CSV exporter. **Live and running with Moralis API!** Export your transaction history for tax reporting across multiple blockchain networks.

![MultiChain TX Explorer](https://img.shields.io/badge/React-18.2.0-blue) ![Vite](https://img.shields.io/badge/Vite-5.0.0-purple) ![Moralis-Powered-brightgreen](https://img.shields.io/badge/Moralis-Powered-brightgreen) ![License](https://img.shields.io/badge/license-MIT-green)

## ✨ Features

### 🌍 Multi-Chain Support
- **Ethereum** - The leading smart contract platform
- **Ronin** - Axie Infinity's gaming chain
- **Bittensor** - Decentralized AI network *(Coming Soon)*
- **Polkadot** - Cross-chain protocol *(Coming Soon)*
- **Osmosis** - Cosmos DEX *(Coming Soon)*
- **Variational** - Custom network *(Coming Soon)*
- **Extended** - Extended network *(Coming Soon)*

### 📊 Comprehensive Data Fetching
- ✅ **Native Transactions** - All coin transfers (ETH, RON, etc.)
- ✅ **Token Transfers** - Complete ERC-20 token history
- ✅ **Token Holdings** - Current token balances
- ✅ **Account Balance** - Real-time native balance
- ✅ **Balance Graph** - Visual balance changes over time

### 💎 Premium Features
- 🎯 **Smart Pagination** - Load 10 transactions at a time
- 📈 **Interactive Charts** - Beautiful balance history visualization
- 🔄 **Tab Filtering** - Switch between All/Native/Token transactions
- 📥 **Multi-Format Export** - Koinly, CoinTracking, Standard CSV
- 🎨 **Modern UI** - Dark theme with smooth animations
- 🔒 **Privacy First** - Zero data storage, browser-only processing

## 🚀 Quick Start

### Prerequisites
- Node.js v18+
- npm or yarn
- **Moralis API key** (free - 2 minutes to get!)

### Installation

```bash
# 1. Clone repository
git clone https://github.com/Hmza-vip/multichain-tx-tool.git
cd multichain-tx-tool

# 2. Install dependencies
npm install

# 3. Setup environment
cp .env.example .env
# Edit .env and add your Moralis key

# 4. Start development server
npm run dev
```

### 🔑 Get Your FREE Moralis API Key

1. Visit https://admin.moralis.io/register
2. Create free account (no credit card!)
3. Create a new project
4. Navigate to **Settings → API Keys**
5. Copy your API key
6. Add to `.env`: `VITE_MORALIS_KEY=your_key_here`

**Why Moralis?**
- ✅ One key for ALL chains
- ✅ 100% FREE for most users
- ✅ 100,000 requests/month free tier
- ✅ Better data than individual explorers
- ✅ Industry-standard reliability

## 🎯 How to Use

1. **Select Chain** - Choose from Ethereum, Ronin, or upcoming chains
2. **Enter Address** - Paste any wallet address (0x...)
3. **Scan** - Click "Scan Transactions" button
4. **View Data**:
   - Account summary (Balance, Last TX, Token Count)
   - Token holdings table
   - Interactive balance graph
   - Transaction history with tabs
5. **Load More** - Click "Load More" to see additional transactions (10 at a time)
6. **Export** - Download as CSV in your preferred format

## 📁 Project Structure

```
multichain-tx-tool/
├── src/
│   ├── components/
│   │   ├── Header.jsx           # Navigation with GitHub link
│   │   ├── ChainSelector.jsx    # Multi-chain selector
│   │   ├── SearchBar.jsx        # Address input
│   │   ├── TransactionTable.jsx # Paginated table with tabs
│   │   ├── Features.jsx         # Feature cards
│   │   ├── LoadingState.jsx     # Loading animation
│   │   └── Footer.jsx           # Footer
│   ├── services/
│   │   └── api.js               # Moralis API integration
│   ├── utils/
│   │   ├── chains.js            # Chain configurations
│   │   └── csvExport.js         # Export functions
│   ├── App.jsx                  # Main component
│   ├── main.jsx                 # Entry point
│   └── index.css                # Tailwind styles
├── .env.example                 # Environment template
├── package.json
└── README.md
```

## 📊 Data Overview

### Account Summary Cards
- **Balance Card** - Current native token balance
- **Last Transaction** - Most recent transaction date & value
- **Token Holdings** - Number of different tokens owned

### Token Holdings Table
Shows up to 10 tokens with:
- Token name
- Symbol
- Balance
- Type (ERC-20, etc.)

### Transaction Table Features
- **Pagination** - 10 transactions per load
- **Tabs** - All / Native / Tokens
- **Details** - Type, Hash, From, To, Value, Time, Chain
- **Links** - Direct explorer links
- **Load More** - Button to fetch next 10

## 📄 CSV Export Formats

1. **Standard CSV** - Generic spreadsheet format
2. **Koinly** - Tax reporting compatibility
3. **CoinTracking** - Alternative tax platform

All formats include complete transaction data.

## 🐛 Troubleshooting

### Common Issues

**White Screen**
- Check browser console (F12)
- Verify `VITE_MORALIS_KEY` in `.env`
- Restart dev server

**"Chain not supported"**
- Only Ethereum & Ronin work currently
- Other chains coming soon
- Clear error message will show

**API Errors**
- Verify Moralis key is active
- Check free tier limits (100k/month)
- Ensure valid wallet address format

**No Transactions Found**
- Verify address is correct
- Check selected chain has transactions
- Try different chain

## 🚀 Deployment

### Build for Production
```bash
npm run build
```

### Deploy to Vercel
1. Push to GitHub
2. Import to Vercel
3. Add `VITE_MORALIS_KEY` env variable
4. Deploy!

### Deploy to Netlify
1. Build project
2. Upload `dist/` folder
3. Add environment variables
4. Launch!

## 🛣️ Roadmap

### Coming Soon
- [ ] Bittensor integration (Substrate-based)
- [ ] Polkadot integration (Substrate-based)
- [ ] Osmosis integration (Cosmos-based)
- [ ] Variational network support
- [ ] Extended network support
- [ ] NFT transaction tracking
- [ ] DeFi protocol integration
- [ ] Multi-wallet comparison
- [ ] Advanced filtering & search
- [ ] Custom date ranges

### Future Enhancements
- [ ] Mobile app version
- [ ] Batch address processing
- [ ] Portfolio tracking
- [ ] Price integration
- [ ] Tax calculation helpers
- [ ] Email reports

## 🤝 Contributing

We welcome contributions!

1. Fork the project
2. Create feature branch: `git checkout -b feature/NewFeature`
3. Commit changes: `git commit -m 'Add NewFeature'`
4. Push to branch: `git push origin feature/NewFeature`
5. Open Pull Request

## 📝 License

MIT License - Free and open source!

## 🙏 Acknowledgments

- **Moralis** - Blockchain data infrastructure
- **React** - UI framework
- **Vite** - Build tool
- **Tailwind CSS** - Styling
- **Chart.js** - Data visualization

## 💡 Tips & Best Practices

1. **API Key Security** - Never commit `.env` file
2. **Rate Limits** - App makes 4 calls per search
3. **Performance** - Use pagination for large wallets
4. **Accuracy** - Always verify exported data
5. **Privacy** - No data leaves your browser

## 📞 Support & Contact

- **Issues**: [GitHub Issues](https://github.com/Hmza-vip/multichain-tx-tool/issues)
- **Discussions**: [GitHub Discussions](https://github.com/Hmza-vip/multichain-tx-tool/discussions)
- **Author**: [Hmza-vip](https://github.com/Hmza-vip)

## 📈 Stats

- 🌟 **7 Chains** (2 live, 5 coming soon)
- 📊 **4 Data Types** (Transactions, Tokens, Balances, Transfers)
- 📥 **3 Export Formats** (Standard, Koinly, CoinTracking)
- 🆓 **100% Free** to use

---

**Built with ❤️ by [Hmza-vip](https://github.com/Hmza-vip) for the crypto community**

*Making blockchain data accessible to everyone* 🚀
