export default function LoadingState() {
  return (
    <div className="card-hover bg-gray-900/50 backdrop-blur-lg rounded-2xl p-8 border border-gray-800">
      <div className="space-y-4">
        {[1, 2, 3, 4, 5].map(i => (
          <div key={i} className="loading-shimmer h-16 rounded-lg"></div>
        ))}
      </div>
      <div className="text-center mt-6 text-gray-400">
        <p>Scanning blockchain for transactions...</p>
      </div>
    </div>
  );
}
