export default function Footer() {
  return (
    <footer className="border-t border-gray-800 bg-black/30 backdrop-blur-lg mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="text-center md:text-left">
            <div className="flex items-center space-x-2 mb-2">
              <span className="text-2xl">⛓️</span>
              <span className="font-bold gradient-text">MultiChain TX</span>
            </div>
            <p className="text-gray-400 text-sm">
              The professional standard for blockchain transaction normalization.
            </p>
            <p className="text-gray-400 text-sm">
              Open-source, private, and built for tax compliance.
            </p>
          </div>
          <div className="text-center md:text-right">
            <p className="text-gray-400">© 2026 MultiChain TX. All rights reserved.</p>
            <p className="text-gray-500 text-sm">Built for Tax compatibility.</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
