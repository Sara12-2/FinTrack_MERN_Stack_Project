import { useState } from 'react';
import { Sparkles, TrendingDown, AlertTriangle, Lightbulb, RefreshCw, Bot, CheckCircle2 } from 'lucide-react';
import Button from '../components/ui/Button';
import toast from 'react-hot-toast';

export default function Insights() {
  const [isGenerating, setIsGenerating] = useState(false);

  // Fake AI generation effect
  const handleGenerate = () => {
    setIsGenerating(true);
    toast.loading('Analyzing your spending patterns...', { id: 'ai-loading' });
    
    setTimeout(() => {
      setIsGenerating(false);
      toast.success('New insights generated!', { id: 'ai-loading' });
    }, 2000);
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold flex items-center gap-2 text-slate-800">
            AI Insights <Sparkles className="text-amber-500" size={24} />
          </h1>
          <p className="text-sm text-slate-500 mt-1 font-medium">Smart analysis of your spending habits.</p>
        </div>
        <Button 
          onClick={handleGenerate} 
          isLoading={isGenerating}
          className="bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 border-none shadow-amber-500/20 shadow-lg"
        >
          {!isGenerating && <RefreshCw size={16} className="mr-2" />}
          Generate New Insights
        </Button>
      </div>

      {/* AI Summary Banner */}
      <div className="bg-gradient-to-br from-primary-900 to-slate-900 rounded-2xl p-6 text-white shadow-xl relative overflow-hidden group">
        <div className="absolute top-0 right-0 p-4 opacity-10 transition-transform group-hover:scale-110">
          <Bot size={140} />
        </div>
        <div className="relative z-10">
          <div className="flex items-center gap-2 mb-3">
            <div className="p-1.5 bg-white/20 rounded-lg backdrop-blur-sm">
              <Bot size={20} className="text-white" />
            </div>
            <h2 className="text-lg font-bold tracking-wide">FinTrack AI Assistant</h2>
          </div>
          <p className="text-primary-100 leading-relaxed text-sm md:text-base font-medium">
            Based on your recent expenses, you're doing great on food spending! However, your bills have exceeded the limit. I've prepared a few personalized tips for you below.
          </p>
        </div>
      </div>

      {/* Insights List */}
      <div className={`space-y-4 transition-all duration-500 ${isGenerating ? 'opacity-30 blur-[2px]' : 'opacity-100 blur-0'}`}>
        
        {/* Insight 1 - Warning */}
        <div className="bg-white rounded-2xl p-5 border border-slate-100 shadow-sm flex flex-col md:flex-row gap-4 hover:shadow-md transition-all relative overflow-hidden group">
          <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-red-500"></div>
          <div className="p-3 bg-red-50 rounded-xl text-red-600 h-fit shrink-0">
            <AlertTriangle size={24} />
          </div>
          <div className="flex-1">
            <div className="flex justify-between items-start">
              <h3 className="font-bold text-lg text-slate-800">High Spending on Bills</h3>
              <span className="text-xs font-bold bg-red-100 text-red-700 px-3 py-1 rounded-lg">Action Needed</span>
            </div>
            <p className="text-slate-600 mt-2 text-sm leading-relaxed font-medium">
              You have exceeded your Bills budget by <strong className="text-red-600">Rs 2,000</strong> this month. Consider reducing your electricity usage or renegotiating your internet plan to save money.
            </p>
          </div>
        </div>

        {/* Insight 2 - Positive */}
        <div className="bg-white rounded-2xl p-5 border border-slate-100 shadow-sm flex flex-col md:flex-row gap-4 hover:shadow-md transition-all relative overflow-hidden group">
          <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-emerald-500"></div>
          <div className="p-3 bg-emerald-50 rounded-xl text-emerald-600 h-fit shrink-0">
            <TrendingDown size={24} />
          </div>
          <div className="flex-1">
            <div className="flex justify-between items-start">
              <h3 className="font-bold text-lg text-slate-800">Good job on Food Savings!</h3>
              <span className="text-xs font-bold bg-emerald-100 text-emerald-700 px-3 py-1 rounded-lg flex items-center gap-1"><CheckCircle2 size={14}/> On Track</span>
            </div>
            <p className="text-slate-600 mt-2 text-sm leading-relaxed font-medium">
              Your food expenses are <strong className="text-emerald-600">15% lower</strong> than last month. You are on track to meet your Food budget. Keep up the good work!
            </p>
          </div>
        </div>

        {/* Insight 3 - Tip */}
        <div className="bg-white rounded-2xl p-5 border border-slate-100 shadow-sm flex flex-col md:flex-row gap-4 hover:shadow-md transition-all relative overflow-hidden group">
          <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-amber-500"></div>
          <div className="p-3 bg-amber-50 rounded-xl text-amber-600 h-fit shrink-0">
            <Lightbulb size={24} />
          </div>
          <div className="flex-1">
            <h3 className="font-bold text-lg text-slate-800">Subscription Review</h3>
            <p className="text-slate-600 mt-2 text-sm leading-relaxed font-medium">
              You have <strong>3 active monthly subscriptions</strong> (Netflix, Gym, etc.) totaling <strong>Rs 31,500</strong>. Review them to see if you are actually using all of them.
            </p>
          </div>
        </div>

      </div>
    </div>
  );
}