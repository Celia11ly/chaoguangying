import React, { useEffect, useState } from 'react';
import {
    CharacterAgentIcon,
    CelebrityAgentIcon,
    CrewAgentIcon,
    IPAgentIcon,
    OfficialAgentIcon,
    UserGeneratedAgentIcon
} from './icons/AgentTypeIcons';

const planData = [
    {
        month: "十月 · 奠基与验证",
        goal: "单点突破，跑通核心模式",
        target: 1500,
        staff: 20,
        color: "sky",
        categories: [
            { name: "短剧演员", icon: <CelebrityAgentIcon />, examples: "跑通增长模型", color: "sky" },
            { name: "经典IP角色", icon: <CharacterAgentIcon />, examples: "孙悟空, 白素贞...", color: "emerald" },
            { name: "官方合作智能体", icon: <OfficialAgentIcon />, examples: "影宝, 翠苑电影大世界...", color: "amber" },
            { name: "影片自述智能体", icon: <IPAgentIcon />, examples: "以第一人称讲述电影故事", color: "indigo" }
        ]
    },
    {
        month: "十一月 · 规模化扩张",
        goal: "品类拓展，加速数量增长",
        target: 3500,
        staff: 30,
        color: "fuchsia",
        categories: [
            { name: "明星 & MCN网红", icon: <CelebrityAgentIcon />, examples: "头部艺人, 垂类KOL", color: "sky" },
            { name: "热门影视角色", icon: <CharacterAgentIcon />, examples: "授权热门角色", color: "emerald" },
            { name: "导演/编剧/声优", icon: <CrewAgentIcon />, examples: "行业核心创作者", color: "rose" },
            { name: "文旅/非遗IP", icon: <IPAgentIcon />, examples: "西湖, 越剧...", color: "indigo" },
        ]
    },
    {
        month: "十二月 · 生态爆发",
        goal: "开放生成，引爆网络效应",
        target: 5000,
        staff: 40,
        color: "cyan",
        categories: [
            { name: "全品类覆盖", icon: <IPAgentIcon />, examples: "长尾与细分市场", color: "indigo" },
            { name: "用户个人智能体", icon: <UserGeneratedAgentIcon />, examples: "开放普通用户生成", color: "orange" },
            { name: "游戏/虚拟角色", icon: <CharacterAgentIcon />, examples: "跨界联动", color: "emerald" },
            { name: "企业智能体名片", icon: <OfficialAgentIcon />, examples: "服务B端客户", color: "amber" }
        ]
    }
];

const CountUp: React.FC<{ end: number }> = ({ end }) => {
    const [count, setCount] = useState(0);

    useEffect(() => {
        let start = 0;
        const duration = 1500;
        const frameRate = 60;
        const totalFrames = Math.round((duration / 1000) * frameRate);
        let frame = 0;

        const counter = setInterval(() => {
            frame++;
            const progress = frame / totalFrames;
            const currentCount = Math.round(end * progress);
            setCount(currentCount);

            if (frame === totalFrames) {
                clearInterval(counter);
                 setCount(end); // ensure final count is accurate
            }
        }, 1000 / frameRate);

        return () => clearInterval(counter);
    }, [end]);

    return <span>{count.toLocaleString()}</span>;
};

const Slide4: React.FC = () => {
    const totalTarget = planData.reduce((acc, p) => acc + p.target, 0);

    let cumulativeTarget = 0;
    const progressSegments = planData.map(p => {
        const percentage = (p.target / totalTarget) * 100;
        cumulativeTarget += p.target;
        return {
            ...p,
            percentage,
            cumulative: cumulativeTarget,
        };
    });

    return (
        <div className="w-full max-w-screen-2xl mx-auto px-4 py-2 animate-fade-in flex flex-col">
            <h2 className="text-3xl sm:text-4xl font-bold text-center mb-2">
                百日万体：智能体<span className="text-cyan-400">量产冲刺</span>计划
            </h2>
            <p className="text-lg text-slate-400 text-center mb-6 max-w-5xl mx-auto">
                基于成熟的Agent搭建引擎，分阶段、有重点地启动智能体集群建设，抢占市场先发优势。
            </p>

            <div className="grid grid-cols-3 gap-6">
                {planData.map((phase) => (
                    <div key={phase.month} className="bg-slate-800/50 border border-slate-700/80 rounded-lg p-4 flex flex-col shadow-lg hover:shadow-2xl hover:shadow-cyan-500/10 transition-shadow duration-300">
                        <div className="flex-grow">
                            <div className="text-center mb-4">
                                <h3 className={`text-xl font-bold text-${phase.color}-400`}>{phase.month}</h3>
                                <p className="text-sm text-slate-400">{phase.goal}</p>
                            </div>
                            
                            <div className="text-center mb-4">
                                <div className="mb-3">
                                    <p className="text-xs text-slate-400 mb-1">本月目标新增</p>
                                    <p className={`text-4xl font-bold text-${phase.color}-300 tracking-tighter`}>
                                        <CountUp end={phase.target} />
                                    </p>
                                </div>
                                <div>
                                    <p className="text-xs text-slate-400 mb-1">运营人力投入</p>
                                    <p className="text-3xl font-bold tracking-tighter">
                                        <span className={`text-${phase.color}-300`}>{phase.staff}</span>
                                        <span className="text-xl font-medium text-slate-400 ml-1">人</span>
                                    </p>
                                </div>
                            </div>
                        </div>
                        
                        <div className="space-y-2 mt-auto">
                            <h4 className="text-sm font-semibold text-slate-300 border-b border-slate-700 pb-1.5 mb-1.5">重点品类</h4>
                            {phase.categories.map(cat => (
                                <div key={cat.name} className="flex items-center space-x-3">
                                    <div className={`flex-shrink-0 w-8 h-8 rounded-md bg-slate-700/50 flex items-center justify-center text-${cat.color}-400`}>
                                        {React.cloneElement(cat.icon, { className: 'w-5 h-5'})}
                                    </div>
                                    <div>
                                        <p className="font-semibold text-slate-200 text-sm">{cat.name}</p>
                                        <p className="text-xs text-slate-400">{cat.examples}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>

            <div className="mt-4">
                <h3 className="text-center text-base text-slate-400 mb-2">智能体总量累计 (年底目标: {totalTarget.toLocaleString()})</h3>
                <div className="w-full bg-slate-700/50 rounded-full h-6 flex overflow-hidden border border-slate-600">
                    {progressSegments.map((seg, index) => (
                        <div 
                          key={seg.month} 
                          style={{ width: `${seg.percentage}%`}} 
                          className={`flex items-center justify-end pr-3 text-white font-bold text-xs bg-${seg.color}-500/80 transition-all duration-500 ease-out animate-progress-bar`}
                        >
                           <span className="opacity-0 animate-fade-in-late">{seg.cumulative.toLocaleString()}</span>
                        </div>
                    ))}
                </div>
            </div>

        </div>
    );
};

export default Slide4;

const animationStyles = `
<style>
@keyframes fadeIn {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}
.animate-fade-in {
  animation: fadeIn 0.7s ease-in-out forwards;
}
@keyframes fadeInLate {
  from { opacity: 0; }
  to { opacity: 1; }
}
.animate-fade-in-late {
  animation: fadeInLate 0.5s ease-in-out 1s forwards;
}
@keyframes progressBar {
    from { transform: scaleX(0); transform-origin: left; }
    to { transform: scaleX(1); transform-origin: left; }
}
.animate-progress-bar {
    animation: progressBar 1s cubic-bezier(0.25, 1, 0.5, 1) forwards;
}
</style>
`;

if (!document.querySelector('#slide4-animation-styles')) {
    const styleElement = document.createElement('style');
    styleElement.id = 'slide4-animation-styles';
    styleElement.innerHTML = animationStyles;
    document.head.appendChild(styleElement);
}