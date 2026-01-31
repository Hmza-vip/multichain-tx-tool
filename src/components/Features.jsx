import { Lock, BarChart3, Zap } from 'lucide-react';

export default function Features() {
  const features = [
    {
      icon: <Lock size={40} />,
      title: 'Private & Secure',
      description: 'No data storage, no tracking. Your wallet keys never leave your device.'
    },
    {
      icon: <BarChart3 size={40} />,
      title: 'Audit Ready',
      description: 'Multiple CSV formats ensure 100% compatibility with all major accounting tools.'
    },
    {
      icon: <Zap size={40} />,
      title: 'Multi-Chain Support',
      description: 'Support for Ethereum, Polygon, BSC, Arbitrum, Optimism, Base, and Avalanche.'
    }
  ];

  return (
    <div className="grid md:grid-cols-3 gap-6 mt-12">
      {features.map((feature, idx) => (
        <div 
          key={idx}
          className="card-hover bg-gray-900/50 backdrop-blur-lg rounded-2xl p-6 border border-gray-800 text-center"
        >
          <div className="flex justify-center mb-4 text-purple-400">
            {feature.icon}
          </div>
          <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
          <p className="text-gray-400">{feature.description}</p>
        </div>
      ))}
    </div>
  );
}
