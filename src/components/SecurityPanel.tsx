import { motion } from 'motion/react';
import { Shield, AlertTriangle, CheckCircle, Lock, Smartphone, MapPin, Clock } from 'lucide-react';
import { Button } from './ui/button';

export function SecurityPanel() {
  const riskScore = 92;
  
  const loginActivity = [
    {
      id: 1,
      device: 'iPhone 14 Pro',
      location: 'San Francisco, CA',
      time: '2 hours ago',
      status: 'normal',
      ip: '192.168.1.1'
    },
    {
      id: 2,
      device: 'Chrome on Windows',
      location: 'San Francisco, CA',
      time: '1 day ago',
      status: 'normal',
      ip: '192.168.1.1'
    },
    {
      id: 3,
      device: 'Unknown Device',
      location: 'New York, NY',
      time: '3 days ago',
      status: 'suspicious',
      ip: '203.45.67.89'
    }
  ];

  const securityMetrics = [
    { label: 'Account Age', value: '2.5 years', status: 'good' },
    { label: 'Password Strength', value: 'Strong', status: 'good' },
    { label: 'Two-Factor Auth', value: 'Enabled', status: 'good' },
    { label: 'Last Password Change', value: '45 days ago', status: 'warning' }
  ];

  const suspiciousActivities = [
    {
      id: 1,
      type: 'Login from new location',
      description: 'New York, NY - 850 miles from usual location',
      severity: 'medium',
      timestamp: '3 days ago',
      action: 'Verify if this was you'
    },
    {
      id: 2,
      type: 'Unusual access time',
      description: 'Login at 3:42 AM - Outside normal hours',
      severity: 'low',
      timestamp: '1 week ago',
      action: 'Review activity'
    }
  ];

  return (
    <div className="min-h-screen bg-[#0A0E1A] p-6 max-w-md mx-auto">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-3xl mb-2">Security & Privacy</h1>
        <p className="text-gray-400">Account protection powered by UEBA</p>
      </div>

      {/* Security Score */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-br from-green-600 to-emerald-500 rounded-3xl p-6 mb-6 relative overflow-hidden"
      >
        <div className="relative z-10">
          <div className="flex items-start justify-between mb-4">
            <div>
              <p className="text-green-100 text-sm mb-1">Security Risk Score</p>
              <div className="flex items-baseline gap-2">
                <span className="text-5xl">{riskScore}</span>
                <span className="text-2xl text-green-100">/100</span>
              </div>
            </div>
            <div className="w-16 h-16 rounded-2xl bg-white/20 flex items-center justify-center">
              <Shield className="w-8 h-8" />
            </div>
          </div>
          <p className="text-green-50 text-sm">Your account is secure. 1 item needs attention.</p>
        </div>
        
        <div className="absolute -right-8 -bottom-8 w-32 h-32 bg-white/10 rounded-full blur-2xl" />
        <div className="absolute -left-8 -top-8 w-32 h-32 bg-white/10 rounded-full blur-2xl" />
      </motion.div>

      {/* Security Metrics */}
      <div className="mb-6">
        <h2 className="text-lg mb-3">Security Overview</h2>
        <div className="grid grid-cols-2 gap-3">
          {securityMetrics.map((metric, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.05 }}
              className="bg-[#141824] rounded-2xl p-4 border border-gray-800"
            >
              <p className="text-xs text-gray-400 mb-2">{metric.label}</p>
              <div className="flex items-center justify-between">
                <p className="text-sm">{metric.value}</p>
                {metric.status === 'good' ? (
                  <CheckCircle className="w-4 h-4 text-green-400" />
                ) : (
                  <AlertTriangle className="w-4 h-4 text-yellow-400" />
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Suspicious Activities */}
      {suspiciousActivities.length > 0 && (
        <div className="mb-6">
          <h2 className="text-lg mb-3 flex items-center gap-2">
            <AlertTriangle className="w-5 h-5 text-yellow-400" />
            Suspicious Activity Logs
          </h2>
          <div className="space-y-3">
            {suspiciousActivities.map((activity) => (
              <motion.div
                key={activity.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: activity.id * 0.1 }}
                className="bg-[#141824] rounded-2xl p-4 border border-gray-800"
              >
                <div className="flex items-start gap-3 mb-3">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                    activity.severity === 'medium' ? 'bg-yellow-500/20' : 'bg-blue-500/20'
                  }`}>
                    <AlertTriangle className={`w-5 h-5 ${
                      activity.severity === 'medium' ? 'text-yellow-400' : 'text-blue-400'
                    }`} />
                  </div>
                  <div className="flex-1">
                    <p className="mb-1">{activity.type}</p>
                    <p className="text-sm text-gray-400 mb-2">{activity.description}</p>
                    <p className="text-xs text-gray-500">{activity.timestamp}</p>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  className="w-full text-blue-400 hover:text-blue-300 hover:bg-blue-500/10 text-sm"
                >
                  {activity.action}
                </Button>
              </motion.div>
            ))}
          </div>
        </div>
      )}

      {/* Login Activity */}
      <div className="mb-6">
        <h2 className="text-lg mb-3">Recent Login Activity</h2>
        <div className="bg-[#141824] rounded-2xl border border-gray-800 overflow-hidden">
          {loginActivity.map((login, index) => (
            <div
              key={login.id}
              className={`p-4 ${index !== loginActivity.length - 1 ? 'border-b border-gray-800' : ''} ${
                login.status === 'suspicious' ? 'bg-yellow-500/5' : ''
              }`}
            >
              <div className="flex items-start gap-3">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                  login.status === 'suspicious' ? 'bg-yellow-500/20' : 'bg-blue-500/20'
                }`}>
                  <Smartphone className={`w-5 h-5 ${
                    login.status === 'suspicious' ? 'text-yellow-400' : 'text-blue-400'
                  }`} />
                </div>
                <div className="flex-1">
                  <p className="text-sm mb-1">{login.device}</p>
                  <div className="space-y-1">
                    <div className="flex items-center gap-2 text-xs text-gray-400">
                      <MapPin className="w-3 h-3" />
                      {login.location}
                    </div>
                    <div className="flex items-center gap-2 text-xs text-gray-400">
                      <Clock className="w-3 h-3" />
                      {login.time}
                    </div>
                  </div>
                </div>
                {login.status === 'suspicious' ? (
                  <AlertTriangle className="w-5 h-5 text-yellow-400 flex-shrink-0" />
                ) : (
                  <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0" />
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Verification Section */}
      <div className="bg-gradient-to-br from-blue-900/40 to-purple-900/40 rounded-2xl p-5 border border-blue-500/30">
        <div className="flex items-start gap-3 mb-4">
          <div className="w-10 h-10 rounded-xl bg-blue-500/20 flex items-center justify-center flex-shrink-0">
            <Lock className="w-5 h-5 text-blue-400" />
          </div>
          <div>
            <h3 className="mb-2">Enhanced Verification</h3>
            <p className="text-sm text-gray-300 leading-relaxed">
              We detected unusual activity on your account. Complete verification to ensure it's really you.
            </p>
          </div>
        </div>
        <div className="space-y-2">
          <Button className="w-full bg-blue-500/20 hover:bg-blue-500/30 text-blue-300 border border-blue-500/30 rounded-xl">
            Verify via SMS
          </Button>
          <Button className="w-full bg-blue-500/20 hover:bg-blue-500/30 text-blue-300 border border-blue-500/30 rounded-xl">
            Verify via Email
          </Button>
        </div>
      </div>
    </div>
  );
}
