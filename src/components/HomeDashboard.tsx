import { motion } from 'motion/react';
import { AlertTriangle, Calendar, MessageSquare, FileText, TrendingUp, Shield, ChevronRight } from 'lucide-react';
import { Button } from './ui/button';

interface HomeDashboardProps {
  onNavigate: (screen: 'home' | 'analytics' | 'maintenance' | 'assistant' | 'security' | 'profile') => void;
}

export function HomeDashboard({ onNavigate }: HomeDashboardProps) {
  const healthScore = 87;
  
  const liveIssues = [
    { id: 1, severity: 'medium', title: 'Brake Fluid Low', description: 'Estimated 5 days until critical', icon: AlertTriangle, color: 'yellow' },
    { id: 2, severity: 'low', title: 'Tire Pressure -2 PSI', description: 'Front left tire needs attention', icon: AlertTriangle, color: 'blue' }
  ];

  const forecastedFailures = [
    { component: 'Engine Oil', daysUntil: 12, probability: 78, severity: 'high' },
    { component: 'Battery', daysUntil: 45, probability: 45, severity: 'medium' },
    { component: 'Air Filter', daysUntil: 30, probability: 62, severity: 'low' }
  ];

  return (
    <div className="min-h-screen bg-[#0A0E1A] p-6 max-w-md mx-auto">
      {/* Header */}
      <div className="mb-8">
        <p className="text-gray-400 text-sm mb-1">Welcome back</p>
        <h1 className="text-3xl">Vehicle Health</h1>
      </div>

      {/* Health Score Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-br from-blue-600 to-cyan-500 rounded-3xl p-6 mb-6 relative overflow-hidden"
      >
        <div className="relative z-10">
          <div className="flex items-start justify-between mb-4">
            <div>
              <p className="text-blue-100 text-sm mb-1">Overall Health Score</p>
              <div className="flex items-baseline gap-2">
                <span className="text-5xl">{healthScore}</span>
                <span className="text-2xl text-blue-100">/100</span>
              </div>
            </div>
            <div className="w-16 h-16 rounded-2xl bg-white/20 flex items-center justify-center">
              <TrendingUp className="w-8 h-8" />
            </div>
          </div>
          <p className="text-blue-50 text-sm">Your vehicle is in good condition. 2 minor issues detected.</p>
        </div>
        
        {/* Decorative elements */}
        <div className="absolute -right-8 -bottom-8 w-32 h-32 bg-white/10 rounded-full blur-2xl" />
        <div className="absolute -left-8 -top-8 w-32 h-32 bg-white/10 rounded-full blur-2xl" />
      </motion.div>

      {/* Live Issues */}
      {liveIssues.length > 0 && (
        <div className="mb-6">
          <h2 className="text-lg mb-3 flex items-center gap-2">
            <AlertTriangle className="w-5 h-5 text-yellow-400" />
            Live Issues
          </h2>
          <div className="space-y-3">
            {liveIssues.map((issue) => (
              <motion.div
                key={issue.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="bg-[#141824] rounded-2xl p-4 border border-gray-800 hover:border-gray-700 transition-colors"
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-3 flex-1">
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                      issue.color === 'yellow' ? 'bg-yellow-500/20' : 'bg-blue-500/20'
                    }`}>
                      <issue.icon className={`w-5 h-5 ${
                        issue.color === 'yellow' ? 'text-yellow-400' : 'text-blue-400'
                      }`} />
                    </div>
                    <div className="flex-1">
                      <p className="mb-1">{issue.title}</p>
                      <p className="text-sm text-gray-400">{issue.description}</p>
                    </div>
                  </div>
                  <ChevronRight className="w-5 h-5 text-gray-600 flex-shrink-0 mt-2" />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      )}

      {/* Forecasted Failures Timeline */}
      <div className="mb-6">
        <h2 className="text-lg mb-3">Forecasted Failures (7 Days)</h2>
        <div className="bg-[#141824] rounded-2xl p-5 border border-gray-800">
          <div className="space-y-4">
            {forecastedFailures.map((forecast, index) => (
              <div key={index} className="flex items-center gap-4">
                <div className="flex-shrink-0 text-center">
                  <div className="text-2xl mb-1">{forecast.daysUntil}</div>
                  <div className="text-xs text-gray-500">days</div>
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm">{forecast.component}</span>
                    <span className="text-xs text-gray-400">{forecast.probability}% likely</span>
                  </div>
                  <div className="h-2 bg-gray-800 rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full ${
                        forecast.severity === 'high' ? 'bg-red-500' :
                        forecast.severity === 'medium' ? 'bg-yellow-500' : 'bg-blue-500'
                      }`}
                      style={{ width: `${forecast.probability}%` }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
          <Button
            onClick={() => onNavigate('analytics')}
            variant="ghost"
            className="w-full mt-4 text-blue-400 hover:text-blue-300 hover:bg-blue-500/10"
          >
            View Full Analytics
            <ChevronRight className="w-4 h-4 ml-2" />
          </Button>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-2 gap-3 mb-6">
        <Button
          onClick={() => onNavigate('maintenance')}
          className="h-24 bg-[#141824] hover:bg-[#1a1f35] border border-gray-800 rounded-2xl flex flex-col items-center justify-center gap-2"
        >
          <Calendar className="w-6 h-6 text-blue-400" />
          <span className="text-sm">Book Service</span>
        </Button>
        <Button
          onClick={() => onNavigate('assistant')}
          className="h-24 bg-[#141824] hover:bg-[#1a1f35] border border-gray-800 rounded-2xl flex flex-col items-center justify-center gap-2"
        >
          <MessageSquare className="w-6 h-6 text-cyan-400" />
          <span className="text-sm">AI Assistant</span>
        </Button>
        <Button
          onClick={() => onNavigate('analytics')}
          className="h-24 bg-[#141824] hover:bg-[#1a1f35] border border-gray-800 rounded-2xl flex flex-col items-center justify-center gap-2"
        >
          <FileText className="w-6 h-6 text-purple-400" />
          <span className="text-sm">View Logs</span>
        </Button>
        <Button
          onClick={() => onNavigate('security')}
          className="h-24 bg-[#141824] hover:bg-[#1a1f35] border border-gray-800 rounded-2xl flex flex-col items-center justify-center gap-2"
        >
          <Shield className="w-6 h-6 text-green-400" />
          <span className="text-sm">Security</span>
        </Button>
      </div>
    </div>
  );
}
