import React from 'react';
import { InvestmentIcon, ProductionIcon, PromotionIcon, CopyrightIcon, ScreeningIcon, TicketIcon, DerivativeIcon } from './icons/StageIcons';

const roadmapData = [
  {
    stage: '投资',
    icon: <InvestmentIcon />,
    agents: ['剧本评估智能体', '票房预测智能体', '投资回报分析智能体', '主创团队匹配智能体', '市场风险预警智能体', '消费趋势分析智能体'],
    color: 'emerald',
    example: {
        name: 'Cinelytic',
        description: '提供AI驱动的电影项目管理与票房预测平台，辅助影片的投资决策。'
    }
  },
  {
    stage: '制作',
    icon: <ProductionIcon />,
    agents: ['AI剧本生成智能体', 'AI分镜设计智能体', 'AI选角智能体', '数字人演员智能体', 'AI配乐智能体', 'AI视觉特效智能体', '场景勘探智能体', '拍摄计划生成智能体'],
    color: 'sky',
    example: {
        name: '工业光魔 (ILM)',
        description: '在《爱尔兰人》中使用AI驱动的FLUX软件，实现了革命性的“数字减龄”视觉特效。'
    }
  },
  {
    stage: '宣发',
    icon: <PromotionIcon />,
    agents: ['营销物料生成智能体', 'AI预告片剪辑智能体', '舆情监控智能体', '精准投放智能体', 'KOL/KOC匹配智能体'],
    color: 'indigo',
    example: {
        name: 'IBM Watson',
        description: '为电影《摩根》制作了全球首支由人工智能剪辑的预告片，开创了AI营销的先河。'
    }
  },
  {
    stage: '版权',
    icon: <CopyrightIcon />,
    agents: ['全网盗版追踪智能体', 'IP版权监测与维权智能体', '防伪溯源智能体', '版费自动分配结算智能体', 'IP授权匹配智能体'],
    color: 'orange',
    example: {
        name: 'MUSO',
        description: '全球领先的数字内容盗版追踪与分析公司，为媒体行业提供反盗版数据解决方案。'
    }
  },
  {
    stage: '排片放映',
    icon: <ScreeningIcon />,
    agents: ['智能排片智能体', '上座率预测智能体', '动态定价智能体', '跨区域排片协同智能体', '观影体验反馈分析智能体'],
    color: 'rose',
    example: {
        name: 'Vista Group',
        description: '旗下Cinema Intelligence利用AI为全球院线提供票房预测与智能排片优化方案。'
    }
  },
  {
    stage: '购票销售',
    icon: <TicketIcon />,
    agents: ['智能客服智能体', '个性化推荐智能体', '社交裂变营销智能体', '观影伴侣匹配智能体', '影评口碑聚合智能体', '会员忠诚度管理智能体', '场景化套票推荐智能体'],
    color: 'amber',
    example: {
        name: '猫眼 (Maoyan)',
        description: '利用大数据和AI算法为用户提供精准的电影推荐，并进行社交化营销。'
    }
  },
  {
    stage: '衍生消费',
    icon: <DerivativeIcon />,
    agents: ['IP衍生设计共创智能体', '粉丝互动智能体', '虚拟周边试玩智能体', '粉丝共创内容智能体', '角色陪伴对话智能体', '虚拟偶像互动智能体', '影视IP朝圣地导览智能体'],
    color: 'fuchsia',
    example: {
        name: '迪士尼 (Disney)',
        description: '围绕《星球大战》、《冰雪奇缘》等顶级IP，开发主题公园、玩具、服装、游戏等衍生品，构建了全球最成功的IP衍生消费生态。'
    }
  },
];

const RoadmapCard: React.FC<{ item: typeof roadmapData[0]; isHighlighted?: boolean }> = ({ item, isHighlighted }) => (
    <div className={`relative bg-slate-800/50 backdrop-blur-sm rounded-lg p-3 h-full flex flex-col items-center text-center shadow-lg hover:shadow-2xl hover:shadow-${item.color}-500/10 transition-shadow duration-300 w-full ${isHighlighted ? 'border-2 border-blue-500/60 animate-pulse-border' : 'border border-slate-700/80'}`}>
      <div className={`absolute -top-5 w-10 h-10 rounded-full bg-slate-800 border-2 border-slate-700 flex items-center justify-center text-${item.color}-400`}>
        {React.cloneElement(item.icon, { className: 'h-6 w-6' })}
      </div>
      <h3 className={`text-lg font-bold mt-6 text-${item.color}-400`}>{item.stage}</h3>
      <div className="mt-2 space-y-1 w-full">
        {item.agents.map(agent => (
          <p key={agent} className="text-xs text-slate-300 bg-slate-700/50 rounded-md py-1 px-2">
            {agent}
          </p>
        ))}
      </div>
      {item.example && (
        <div className="mt-auto pt-3 border-t border-slate-700/50 w-full mt-3">
          <h4 className="text-sm font-bold text-cyan-400 tracking-wider uppercase">先进案例</h4>
          <p className="text-base font-semibold text-slate-200 mt-2">{item.example.name}</p>
          <p className="text-xs text-slate-400 mt-1">{item.example.description}</p>
        </div>
      )}
    </div>
);

const SectionTitle: React.FC<{ title: string; subtitle: string; className?: string }> = ({ title, subtitle, className }) => (
    <div className={`text-center ${className}`}>
        <h3 className="text-lg font-bold bg-clip-text text-transparent bg-gradient-to-r from-slate-300 to-slate-500 tracking-widest">{title}</h3>
        <p className="font-mono text-sm text-slate-500">{subtitle}</p>
    </div>
);

const Slide1: React.FC = () => {
  return (
    <div className="w-full max-w-screen-2xl mx-auto px-4 py-2 animate-fade-in">
        <h2 className="text-3xl sm:text-4xl font-bold text-center mb-2 text-slate-100">
            整体定位：领先的<span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-sky-500">新视听数智文娱</span>互动平台
        </h2>
        <p className="text-lg text-slate-400 text-center mb-6 max-w-5xl mx-auto">
            <span className="font-semibold text-slate-300">智能体视角：</span>以面向观众的视听消费智能体为核心，逐步覆盖全链条的智能体生态
        </p>
      
      <div className="flex w-full items-stretch justify-center gap-2 mt-4">
        {/* To B Section */}
        <div className="flex-[5] flex flex-col">
            <SectionTitle title="面向产业" subtitle="To Business" className="mb-4" />
            <div className="relative flex-1 flex items-stretch justify-center gap-2">
                <div className="hidden lg:block absolute top-1/2 left-0 w-full h-0.5 bg-slate-700/50 -translate-y-1/2"></div>
                <div className="hidden lg:block absolute top-1/2 left-0 w-full h-px bg-gradient-to-r from-transparent via-cyan-500 to-transparent animate-pulse-line"></div>
                {roadmapData.slice(0, 5).map((item) => (
                    <div key={item.stage} className="flex-1 p-1 z-10 flex">
                        <RoadmapCard item={item} />
                    </div>
                ))}
            </div>
        </div>

        {/* Separator */}
        <div className="flex items-center justify-center px-2 pt-12">
            <svg className="w-8 h-8 text-cyan-500 animate-pulse" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 5l7 7-7 7M5 5l7 7-7 7" />
            </svg>
        </div>

        {/* To C Section */}
        <div className="flex-[2] flex flex-col">
            <SectionTitle title="面向观众" subtitle="To Consumer" className="mb-4" />
            <div className="relative flex-1 flex items-stretch justify-center gap-2">
                 <div className="hidden lg:block absolute top-1/2 left-0 w-full h-0.5 bg-slate-700/50 -translate-y-1/2"></div>
                 <div className="hidden lg:block absolute top-1/2 left-0 w-full h-px bg-gradient-to-r from-transparent via-fuchsia-500 to-transparent animate-pulse-line"></div>
                {roadmapData.slice(5).map((item) => (
                    <div key={item.stage} className="flex-1 p-1 z-10 flex">
                        <RoadmapCard item={item} isHighlighted={true} />
                    </div>
                ))}
            </div>
        </div>
      </div>
    </div>
  );
};

export default Slide1;

const animationStyles = `
<style>
@keyframes fadeIn {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}
.animate-fade-in {
  animation: fadeIn 0.7s ease-in-out forwards;
}

@keyframes pulse-line {
    0% { transform: scaleX(0); transform-origin: left; }
    50% { transform: scaleX(1); transform-origin: left; }
    51% { transform: scaleX(1); transform-origin: right; }
    100% { transform: scaleX(0); transform-origin: right; }
}
.animate-pulse-line {
    animation: pulse-line 4s linear infinite;
}

@keyframes pulse-border {
  0%, 100% { box-shadow: 0 0 5px 0px rgba(59, 130, 246, 0.4), 0 0 10px 0px rgba(59, 130, 246, 0.2); }
  50% { box-shadow: 0 0 15px 3px rgba(59, 130, 246, 0.6), 0 0 25px 5px rgba(59, 130, 246, 0.4); }
}
.animate-pulse-border {
  animation: pulse-border 3s ease-in-out infinite;
}
</style>
`;

if (!document.querySelector('#slide1-animation-styles')) {
    const styleElement = document.createElement('style');
    styleElement.id = 'slide1-animation-styles';
    styleElement.innerHTML = animationStyles;
    document.head.appendChild(styleElement);
}