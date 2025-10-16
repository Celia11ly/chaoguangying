import React from 'react';

const Quadrant: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className }) => (
    <div className={`flex flex-col items-center justify-center p-4 ${className}`}>
        {children}
    </div>
);

const CompanyPill: React.FC<{ name: string; isHighlighted?: boolean }> = ({ name, isHighlighted }) => (
    <div className={`px-4 py-2 rounded-lg text-base font-semibold transition-all duration-300 transform ${
        isHighlighted 
        ? 'bg-gradient-to-r from-cyan-400 to-sky-500 text-white shadow-lg shadow-cyan-500/30 scale-110' 
        : 'bg-slate-700/50 text-slate-300 border border-slate-600/50 hover:bg-slate-700 hover:-translate-y-1'
    }`}>
        {name}
    </div>
);

const CompanyCard: React.FC<{ name: string; note: string; }> = ({ name, note }) => (
    <div className="flex flex-col items-center justify-center gap-2">
        <CompanyPill name={name} />
        <p className="text-xs text-slate-400 max-w-xs text-center leading-relaxed">
            {note}
        </p>
    </div>
);

const Slide5: React.FC = () => {
    return (
        <div className="w-full max-w-screen-2xl mx-auto px-4 py-2 animate-fade-in flex flex-col h-full">
            <h2 className="text-3xl sm:text-4xl font-bold text-center mb-2">
                行业地图与己方位置
            </h2>
            <p className="text-lg text-slate-400 text-center mb-4 max-w-5xl mx-auto">
                认准“<span className="text-cyan-400">新视听垂直领域的AI应用型平台</span>”的位置
            </p>

            <div className="flex-1 w-full flex items-center justify-center">
                <div className="relative w-full max-w-5xl h-[480px] px-20 py-10">
                    {/* Axis Labels */}
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 text-center flex flex-col items-center">
                        <p className="text-base font-bold text-slate-300 tracking-wider">更垂直社区</p>
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-slate-500 mt-1">
                            <path d="M12 19V5m0 0l-4 4m4-4l4 4" />
                        </svg>
                    </div>
                    <div className="absolute bottom-0 left-1/2 -translate-x-1/2 text-center flex flex-col items-center">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-slate-500 mb-1">
                            <path d="M12 5v14m0 0l-4-4m4 4l-4-4" />
                        </svg>
                        <p className="text-base font-bold text-slate-300 tracking-wider">更综合</p>
                    </div>
                    <div className="absolute left-20 top-1/2 -translate-y-1/2 -translate-x-full text-center flex items-center pr-3">
                        <p className="text-base font-bold text-slate-300 tracking-wider whitespace-nowrap">大模型基础研究</p>
                         <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-slate-500 ml-2">
                            <path d="M5 12h14M5 12l4-4m-4 4l4 4" />
                        </svg>
                    </div>
                     <div className="absolute right-20 top-1/2 -translate-y-1/2 translate-x-full text-center flex items-center pl-3">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-slate-500 mr-2">
                            <path d="M19 12H5m14 0l-4-4m4 4l-4 4" />
                        </svg>
                        <p className="text-base font-bold text-slate-300 tracking-wider whitespace-nowrap">智能体研发与应用</p>
                    </div>
                    
                    {/* Quadrants */}
                    <div className="w-full h-full grid grid-cols-2 grid-rows-2 border-2 border-slate-700/50 rounded-lg shadow-2xl shadow-slate-900/50">
                        {/* Top-Left Quadrant */}
                        <Quadrant className="bg-slate-800/30 rounded-tl-md border-r border-b border-slate-700/50">
                             <CompanyCard 
                                name="猫眼" 
                                note="虽然美团具有大模型研发能力，但是也失去对其他先进大模型应用的灵活性"
                            />
                        </Quadrant>
                        
                        {/* Top-Right Quadrant - Highlight */}
                        <div className="bg-slate-800/30 rounded-tr-md border-b border-slate-700/50 flex items-center justify-center p-4">
                            <div className="animate-pulse-border p-1 rounded-lg">
                                <CompanyPill name="潮光影" isHighlighted />
                            </div>
                        </div>
                        
                        {/* Bottom-Left Quadrant */}
                        <Quadrant className="bg-slate-800/30 rounded-bl-md border-r border-slate-700/50">
                           <CompanyCard 
                                name="豆包" 
                                note="综合能力强，因此他们的视野更全局，关注AI技术的领先性，释放足够的能力给其他垂直领域"
                            />
                        </Quadrant>
                        
                        {/* Bottom-Right Quadrant */}
                        <Quadrant className="bg-slate-800/30 rounded-br-md">
                           <CompanyCard 
                                name="星野" 
                                note="虽然具有智能体搭建的成熟能力，但不善于建立垂类氛围和社区认知"
                            />
                        </Quadrant>
                    </div>
                </div>
            </div>
            <div className="w-full text-center mt-auto pb-2">
                <p className="text-xl font-semibold text-slate-300 leading-relaxed max-w-5xl mx-auto">
                    强化<span className="text-cyan-400 font-bold">「智能体搭建引擎」</span>的优势，及早建立<span className="text-cyan-400 font-bold">「影视社群氛围」</span>，赢得<span className="text-cyan-400 font-bold">「用户认知心智」</span>，最终利用<span className="text-cyan-400 font-bold">「品牌」</span>的势能不断获取用户口碑。
                </p>
            </div>
        </div>
    );
};

export default Slide5;

const animationStyles = `
<style>
@keyframes fadeIn {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}
.animate-fade-in {
  animation: fadeIn 0.7s ease-in-out forwards;
}
@keyframes pulse-border {
  0%, 100% { 
    box-shadow: 0 0 8px 0px rgba(34, 211, 238, 0.4), 0 0 12px 0px rgba(14, 165, 233, 0.3); 
    border-color: rgba(34, 211, 238, 0.5);
  }
  50% { 
    box-shadow: 0 0 16px 4px rgba(34, 211, 238, 0.6), 0 0 30px 6px rgba(14, 165, 233, 0.4); 
    border-color: rgba(56, 189, 248, 0.8);
  }
}
.animate-pulse-border {
  border: 1px solid transparent;
  animation: pulse-border 3s ease-in-out infinite;
}
</style>
`;

if (!document.querySelector('#slide5-animation-styles')) {
    const styleElement = document.createElement('style');
    styleElement.id = 'slide5-animation-styles';
    styleElement.innerHTML = animationStyles;
    document.head.appendChild(styleElement);
}