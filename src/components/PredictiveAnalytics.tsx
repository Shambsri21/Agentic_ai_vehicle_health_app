import { motion } from 'motion/react';
import { Activity, Droplet, Battery, Thermometer, Wind, Gauge, AlertCircle, Sparkles } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer, Tooltip } from 'recharts';

const sensorData = {
  engineTemp: [
    { time: '00:00', value: 85 },
    { time: '04:00', value: 87 },
    { time: '08:00', value: 92 },
    { time: '12:00', value: 95 },
    { time: '16:00', value: 90 },
    { time: '20:00', value: 88 }
  ],
  oilPressure: [
    { time: '00:00', value: 45 },
    { time: '04:00', value: 43 },
    { time: '08:00', value: 41 },
    { time: '12:00', value: 38 },
    { time: '16:00', value: 40 },
    { time: '20:00', value: 42 }
  ]
};

export function PredictiveAnalytics() {
  const sensors = [
    { name: 'Engine Temp', value: '88°C', status: 'normal', icon: Thermometer, color: 'blue' },
    { name: 'Oil Pressure', value: '42 PSI', status: 'warning', icon: Droplet, color: 'yellow' },
    { name: 'Battery', value: '12.4V', status: 'normal', icon: Battery, color: 'green' },
    { name: 'RPM', value: '2,450', status: 'normal', icon: Gauge, color: 'blue' },
    { name: 'Coolant', value: '85%', status: 'normal', icon: Wind, color: 'cyan' },
    { name: 'Air Filter', value: '67%', status: 'warning', icon: Activity, color: 'yellow' }
  ];

  const predictions = [
    {
      day: 'Day 2',
      component: 'Brake Fluid',
      probability: 15,
      severity: 'low',
      action: 'Monitor levels daily'
    },
    {
      day: 'Day 4',
      component: 'Brake Fluid',
      probability: 45,
      severity: 'medium',
      action: 'Schedule inspection'
    },
    {
      day: 'Day 7',
      component: 'Oil Filter',
      probability: 72,
      severity: 'high',
      action: 'Immediate service required'
    }
  ];

  return (
    <div className="min-h-screen bg-[#0A0E1A] p-6 max-w-md mx-auto">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-3xl mb-2">Predictive Analytics</h1>
        <p className="text-gray-400">Real-time sensor monitoring & AI predictions</p>
      </div>

      {/* Real-time Sensors Grid */}
      <div className="mb-6">
        <h2 className="text-lg mb-3">Live Sensor Data</h2>
        <div className="grid grid-cols-2 gap-3">
          {sensors.map((sensor, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.05 }}
              className="bg-[#141824] rounded-2xl p-4 border border-gray-800"
            >
              <div className="flex items-start justify-between mb-3">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                  sensor.color === 'yellow' ? 'bg-yellow-500/20' :
                  sensor.color === 'green' ? 'bg-green-500/20' :
                  sensor.color === 'cyan' ? 'bg-cyan-500/20' : 'bg-blue-500/20'
                }`}>
                  <sensor.icon className={`w-5 h-5 ${
                    sensor.color === 'yellow' ? 'text-yellow-400' :
                    sensor.color === 'green' ? 'text-green-400' :
                    sensor.color === 'cyan' ? 'text-cyan-400' : 'text-blue-400'
                  }`} />
                </div>
                <div className={`w-2 h-2 rounded-full ${
                  sensor.status === 'warning' ? 'bg-yellow-400' : 'bg-green-400'
                }`} />
              </div>
              <p className="text-xs text-gray-400 mb-1">{sensor.name}</p>
              <p className="text-xl">{sensor.value}</p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Sensor Graphs */}
      <div className="mb-6 space-y-4">
        <div className="bg-[#141824] rounded-2xl p-5 border border-gray-800">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm">Engine Temperature (24h)</h3>
            <span className="text-xs text-gray-400">°C</span>
          </div>
          <ResponsiveContainer width="100%" height={120}>
            <LineChart data={sensorData.engineTemp}>
              <XAxis dataKey="time" stroke="#4B5563" style={{ fontSize: '10px' }} />
              <YAxis stroke="#4B5563" style={{ fontSize: '10px' }} domain={[80, 100]} />
              <Tooltip
                contentStyle={{ backgroundColor: '#1F2937', border: 'none', borderRadius: '8px', fontSize: '12px' }}
              />
              <Line type="monotone" dataKey="value" stroke="#3B82F6" strokeWidth={2} dot={false} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-[#141824] rounded-2xl p-5 border border-gray-800">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm">Oil Pressure (24h)</h3>
            <span className="text-xs text-gray-400">PSI</span>
          </div>
          <ResponsiveContainer width="100%" height={120}>
            <LineChart data={sensorData.oilPressure}>
              <XAxis dataKey="time" stroke="#4B5563" style={{ fontSize: '10px' }} />
              <YAxis stroke="#4B5563" style={{ fontSize: '10px' }} domain={[35, 50]} />
              <Tooltip
                contentStyle={{ backgroundColor: '#1F2937', border: 'none', borderRadius: '8px', fontSize: '12px' }}
              />
              <Line type="monotone" dataKey="value" stroke="#EAB308" strokeWidth={2} dot={false} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* 7-Day Failure Predictions */}
      <div className="mb-6">
        <h2 className="text-lg mb-3">Next 7-Day Failure Probability</h2>
        <div className="space-y-3">
          {predictions.map((pred, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-[#141824] rounded-2xl p-4 border border-gray-800"
            >
              <div className="flex items-start gap-3 mb-3">
                <div className={`px-3 py-1 rounded-lg text-xs ${
                  pred.severity === 'high' ? 'bg-red-500/20 text-red-400' :
                  pred.severity === 'medium' ? 'bg-yellow-500/20 text-yellow-400' :
                  'bg-blue-500/20 text-blue-400'
                }`}>
                  {pred.day}
                </div>
                <div className="flex-1">
                  <p className="mb-1">{pred.component}</p>
                  <p className="text-sm text-gray-400">{pred.action}</p>
                </div>
                <span className={`text-lg ${
                  pred.probability > 60 ? 'text-red-400' :
                  pred.probability > 40 ? 'text-yellow-400' : 'text-blue-400'
                }`}>
                  {pred.probability}%
                </span>
              </div>
              <div className="h-1.5 bg-gray-800 rounded-full overflow-hidden">
                <div
                  className={`h-full rounded-full ${
                    pred.severity === 'high' ? 'bg-red-500' :
                    pred.severity === 'medium' ? 'bg-yellow-500' : 'bg-blue-500'
                  }`}
                  style={{ width: `${pred.probability}%` }}
                />
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* AI Explanation Panel */}
      <div className="bg-gradient-to-br from-purple-900/40 to-blue-900/40 rounded-2xl p-5 border border-purple-500/30">
        <div className="flex items-start gap-3 mb-3">
          <div className="w-10 h-10 rounded-xl bg-purple-500/20 flex items-center justify-center flex-shrink-0">
            <Sparkles className="w-5 h-5 text-purple-400" />
          </div>
          <div>
            <h3 className="mb-2">AI Analysis</h3>
            <p className="text-sm text-gray-300 leading-relaxed">
              Your brake fluid is showing declining levels over the past 72 hours. Based on current consumption rate and sensor trends, we predict it will reach critical levels within 4-5 days. This could impact braking performance.
            </p>
          </div>
        </div>
        <div className="mt-4 p-3 bg-blue-500/10 rounded-xl border border-blue-500/30">
          <div className="flex items-start gap-2">
            <AlertCircle className="w-4 h-4 text-blue-400 flex-shrink-0 mt-0.5" />
            <p className="text-xs text-blue-300">
              <span className="text-white">CAPA Recommendation:</span> Schedule brake fluid inspection and refill within 48 hours to prevent safety issues.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
