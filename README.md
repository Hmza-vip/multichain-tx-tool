# 🔗 MultiChain TX Explorer

A professional, multi-chain blockchain transaction explorer and CSV exporter. Export your transaction history for tax reporting with support for multiple formats including Awakens Tax, Koinly, and CoinTracking.

![MultiChain TX Explorer](https://img.shields.io/badge/React-18.2.0-blue) ![Vite](https://img.shields.io/badge/Vite-5.0.0-purple) ![License](https://img.shields.io/badge/license-MIT-green)

## ✨ Features

- 🌐 **Multi-Chain Support**: Ethereum, Polygon, BSC, Arbitrum, Optimism, Base, Avalanche
- 📊 **Multiple Export Formats**: Awakens Tax, Koinly, CoinTracking, Standard CSV
- 🔒 **Privacy First**: No data storage, all processing happens in your browser
- ⚡ **Fast & Responsive**: Built with React and Vite
- 🎨 **Beautiful UI**: Modern dark theme with smooth animations
- 🔄 **Real-time Scanning**: Fetch transactions directly from blockchain explorers

## 🚀 Quick Start

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn
- API keys from blockchain explorers (optional for demo mode)

### Installation

1. **Clone or download this repository**

```bash
# If using git
git clone https://github.com/yourusername/multichain-tx-explorer.git
cd multichain-tx-explorer

# Or download and extract the ZIP file, then navigate to the folder
```

2. **Install dependencies**

```bash
npm install
```

3. **Set up environment variables**

```bash
# Copy the example env file
cp .env.example .env

# Edit .env and add your API keys (optional - app works with demo data)
```

4. **Start the development server**

```bash
npm run dev
```

5. **Open your browser**

Navigate to `http://localhost:3000`

## 🔑 Getting API Keys

The app works in **demo mode** without API keys, but for real transaction data, you'll need free API keys:

### Ethereum (Etherscan)
1. Visit https://etherscan.io/register
2. Create a free account
3. Go to https://etherscan.io/myapikey
4. Click "Add" to create a new API key
5. Add to `.env` as `VITE_ETHERSCAN_API_KEY`

### Other Chains
Follow the same process for other chains:
- **Polygon**: https://polygonscan.com/myapikey
- **BSC**: https://bscscan.com/myapikey
- **Arbitrum**: https://arbiscan.io/myapikey
- **Optimism**: https://optimistic.etherscan.io/myapikey
- **Base**: https://basescan.org/myapikey
- **Avalanche**: https://snowtrace.io/myapikey

## 📁 Project Structure

```
multichain-tx-tool/
├── public/              # Static assets
├── src/
│   ├── components/      # React components
│   │   ├── Header.jsx
│   │   ├── ChainSelector.jsx
│   │   ├── SearchBar.jsx
│   │   ├── TransactionTable.jsx
│   │   ├── Features.jsx
│   │   ├── LoadingState.jsx
│   │   └── Footer.jsx
│   ├── services/        # API services
│   │   └── api.js
│   ├── utils/           # Utility functions
│   │   ├── chains.js
│   │   └── csvExport.js
│   ├── App.jsx          # Main app component
│   ├── main.jsx         # Entry point
│   └── index.css        # Styles
├── .env.example         # Example environment variables
├── .gitignore
├── index.html
├── package.json
├── vite.config.js
├── tailwind.config.js
└── README.md
```

## 🎯 Usage

1. **Select a blockchain** from the chain selector
2. **Enter a wallet address** (e.g., `0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045`)
3. **Click "Scan Transactions"** to fetch the transaction history
4. **View transactions** in the formatted table
5. **Export to CSV** in your preferred format

## 📄 CSV Export Formats

### Awakens Tax (Recommended)
Format optimized for Awaken Tax with columns:
- Date, Received Amount/Currency, Sent Amount/Currency, Fee, Tag, Transaction Hash, Chain

### Koinly
Compatible with Koinly's CSV import format

### CoinTracking
Compatible with CoinTracking's CSV import format

### Standard CSV
Generic format with all transaction details

## 🛠️ Development

### Available Scripts

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

### Adding New Chains

1. Open `src/utils/chains.js`
2. Add new chain configuration:

```javascript
{
  id: 'newchain',
  name: 'New Chain',
  icon: '🔗',
  symbol: 'NEW',
  apiKey: import.meta.env.VITE_NEWCHAIN_API_KEY || '',
  explorer: 'https://api.newchain-explorer.com/api',
  explorerUrl: 'https://newchain-explorer.com',
  color: 'from-blue-500 to-purple-500'
}
```

3. Add the API key to `.env.example` and `.env`

### Customization

**Change Colors**: Edit the gradient colors in `tailwind.config.js` and component files

**Modify UI**: Components are in `src/components/` - edit any component to customize the interface

**Add Features**: 
- Add transaction filtering in `TransactionTable.jsx`
- Add date range selection in `SearchBar.jsx`
- Add token transfers support in `api.js`

## 🐛 Troubleshooting

### Transactions Not Loading
- Verify you've entered a valid wallet address (starts with `0x` and is 42 characters)
- Check if you've added API keys to `.env`
- Check browser console (F12) for error messages
- Try with demo mode first (works without API keys)

### API Rate Limits
- Free API keys have rate limits (usually 5 calls/second)
- Wait a moment and try again
- Consider upgrading to a paid API plan for higher limits

### Build Errors
```bash
# Clear node_modules and reinstall
rm -rf node_modules package-lock.json
npm install

# Clear Vite cache
rm -rf node_modules/.vite
npm run dev
```

## 🚀 Deployment

### Build for Production

```bash
npm run build
```

This creates an optimized build in the `dist/` folder.

### Deploy to Vercel

1. Push your code to GitHub
2. Go to https://vercel.com
3. Import your repository
4. Add environment variables in Vercel settings
5. Deploy!

### Deploy to Netlify

1. Build the project: `npm run build`
2. Drag and drop the `dist/` folder to https://app.netlify.com/drop
3. Or connect your GitHub repo for automatic deployments

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is open source and available under the MIT License.

## 🙏 Acknowledgments

- Inspired by [OpenTx](https://www.opentxapp.xyz/)
- Built with [React](https://reactjs.org/), [Vite](https://vitejs.dev/), and [Tailwind CSS](https://tailwindcss.com/)
- Transaction data from various blockchain explorers (Etherscan, Polygonscan, etc.)

## 📞 Support

If you encounter any issues or have questions:
- Check the browser console for errors (F12)
- Review this README
- Open an issue on GitHub

---

**Built with ❤️ for the crypto community**
