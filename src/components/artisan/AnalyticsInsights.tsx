import { TrendingUp, Users, MessageSquare, Sparkles, ArrowRight } from 'lucide-react'
import { Card } from '@/components/ui/card'

export function AnalyticsInsights() {
  const stats = [
    { label: 'Profile Views', value: '1,240', change: '+12%', icon: Users, color: 'text-accent' },
    { label: 'Inquiries', value: '48', change: '+5%', icon: MessageSquare, color: 'text-primary' },
    { label: 'Sales', value: 'Rs. 42,000', change: '+18%', icon: TrendingUp, color: 'text-secondary' },
  ]

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {stats.map((stat, i) => (
          <Card key={i} className="p-6 rounded-[32px] border-none shadow-xl bg-white flex flex-col gap-4">
            <div className="flex justify-between items-start">
              <div className={`p-3 rounded-2xl bg-secondary/5 ${stat.color}`}>
                <stat.icon className="w-6 h-6" />
              </div>
              <span className="text-xs font-black text-green-500 bg-green-500/10 px-2 py-1 rounded-full">{stat.change}</span>
            </div>
            <div>
              <p className="text-xs font-bold text-secondary/40 uppercase tracking-widest">{stat.label}</p>
              <p className="text-3xl font-black text-secondary">{stat.value}</p>
            </div>
          </Card>
        ))}
      </div>

      <div className="p-8 rounded-[40px] bg-secondary text-white relative overflow-hidden">
        <div className="relative z-10">
          <div className="flex items-center gap-2 mb-4">
            <Sparkles className="w-5 h-5 text-accent" />
            <span className="text-xs font-black uppercase tracking-widest text-accent">AI Voice Assistant Insight</span>
          </div>
          <h3 className="text-2xl font-black mb-4 leading-tight">&quot;Authentic stories increase sales by 40% in your region.&quot;</h3>
          <p className="text-white/60 font-medium mb-8 max-w-lg">
            Based on current trends in Malappuram, adding a voice recording of your carving process will likely boost your &apos;Traditional Teak&apos; collection&apos;s visibility.
          </p>
          <button className="flex items-center gap-2 text-sm font-bold bg-white/10 hover:bg-white/20 transition-colors px-6 py-3 rounded-2xl border border-white/10">
            Record New Story
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <div className="absolute -top-10 -right-10 w-64 h-64 bg-accent/20 rounded-full blur-[80px]" />
        <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-primary/20 rounded-full blur-[100px]" />
      </div>
    </div>
  )
}
