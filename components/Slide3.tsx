import React from 'react';
import { BrandMomentumIcon, DataFlywheelIcon, DeveloperCommunityIcon } from './icons/OperationIcons';

// --- Data Structure for the New Layout ---

const allTags = [
    '科幻迷', '动作片', '悬疑', '诺兰粉', '周末必看', '文艺青年', '漫威宇宙', 'DC粉丝', 
    '喜剧爱好者', '恐怖片', '高分必看', '冷门佳片', '家庭电影', '动画电影', '经典重温', 
    '爆米花爽片', '烧脑剧情', '视觉特效党', '原声控', '独立电影', '影评人', 'IMAX拥趸'
];

const phasesData = {
  timeline: ["2025 Q4", "1-3 年", "3-5 年"],
  rows: [
    {
      title: "模式升级",
      items: [
        { 
          icon: <BrandMomentumIcon />, 
          title: "单点突破", 
          description: [
            "跑通“微短剧演员”与“影视宣发”核心案例",
            "发行“光影潮卡”和“光影潮盒”等产品，积累首批用户数据",
            "完成影宝IP和超级智能体的前期准备工作"
          ]
        },
        { 
          icon: <DeveloperCommunityIcon />, 
          title: "生态初成", 
          description: [
            "拓展“明星、导演、角色”等更多智能体品类",
            "将经典影视IP进行数字化与资产化",
            "开放B端协作平台，孵化10个AI原生IP",
            "初步构建开发者与创作者内容生态",
            "启动影视垂直领域小模型的前期开发"
          ]
        },
        { 
          icon: <DataFlywheelIcon />, 
          title: "标准引领", 
          description: [
            "成为长三角区域的影视AI模型训练中心",
            "沉淀海量数据，形成行业知识库 (know-how)",
            "牵头制定AIGC影视制作的国家级标准",
            "掌握行业话语权，实现最终的生态引领"
          ]
        },
      ],
    },
    {
      title: "数量增加",
      items: [
        {
          metrics: [
            { label: '智能体数量', value: '1万' },
            { label: '高质量对话语料', value: '100万' },
          ]
        },
        {
          metrics: [
            { label: '智能体数量', value: '10万' },
            { label: '高质量对话语料', value: '3000万' },
          ]
        },
        {
          metrics: [
            { label: '智能体数量', value: '50万' },
            { label: '高质量对话语料', value: '3亿' },
          ]
        },
      ],
    },
    {
      title: "个性化匹配率提升",
      items: [
        { rate: "3%", tags: allTags.slice(0, 5) },
        { rate: "60%", tags: allTags.slice(0, 13) },
        { rate: "95%", tags: allTags },
      ],
    },
  ]
};

// --- Sub-components for the New Layout ---

const TagAtmosphere: React.FC<{ tags: string[] }> = ({ tags }) => {
  const colors = [
      'border-sky-500/50 text-sky-300 bg-sky-500/10', 
      'border-emerald-500/50 text-emerald-300 bg-emerald-500/10', 
      'border-amber-500/50 text-amber-300 bg-amber-500/10', 
      'border-fuchsia-500/50 text-fuchsia-300 bg-fuchsia-500/10', 
      'border-rose-500/50 text-rose-300 bg-rose-500/10', 
      'border-indigo-500/50 text-indigo-300 bg-indigo-500/10', 
      'border-cyan-500/50 text-cyan-300 bg-cyan-500/10'
  ];
  
  const memoizedTags = React.useMemo(() => {
    const shuffledTags = [...tags].sort(() => Math.random() - 0.5);
    return shuffledTags.map(tag => ({
      text: tag,
      fontSize: `${0.7 + Math.random() * 0.2}rem`,
      opacity: `${0.7 + Math.random() * 0.3}`,
      colorClass: colors[Math.floor(Math.random() * colors.length)],
    }));
  }, [tags]);

  return (
    <div className="w-full flex flex-wrap justify-center items-center gap-x-1.5 gap-y-1 p-1">
      {memoizedTags.map((tag, index) => (
        <span
          key={index}
          className={`font-mono whitespace-nowrap px-1.5 py-0.5 rounded border transition-all duration-500 ${tag.colorClass}`}
          style={{ 
            fontSize: tag.fontSize, 
            opacity: tag.opacity,
            lineHeight: '1.3',
          }}
        >
          #{tag.text}
        </span>
      ))}
    </div>
  );
};

const Slide3: React.FC = () => {
  return (
    <div className="w-full max-w-screen-2xl mx-auto px-4 py-2 animate-fade-in flex flex-col">
      <h2 className="text-3xl sm:text-4xl font-bold text-center mb-2">
        短期目标：领先的<span className="text-cyan-400">新视听内容与互动</span>平台
      </h2>
      <p className="text-lg text-slate-400 text-center mb-4 max-w-5xl mx-auto">
        <span className="font-semibold text-slate-300">智能体视角：</span>快速提升互动智能体集群的数量和质量，满足个性化需求，成为全球最大的影视互动智能体平台
      </p>

      {/* New Timeline */}
      <div className="relative w-full px-10 md:px-20 mb-4">
        <div className="absolute top-4 left-0 w-full h-0.5 bg-slate-700"></div>
        <div className="absolute top-4 left-0 w-full h-px bg-gradient-to-r from-transparent via-cyan-500 to-transparent animate-pulse-line"></div>
        <div className="relative flex justify-between">
          {phasesData.timeline.map((time, index) => (
            <div key={index} className="relative flex flex-col items-center text-center w-1/3">
              <div className="relative w-8 h-8 flex items-center justify-center">
                <div className="absolute w-8 h-8 bg-cyan-500 rounded-full opacity-30 animate-ping"></div>
                <div className="w-5 h-5 bg-slate-800 border-2 border-cyan-400 rounded-full z-10"></div>
              </div>
              <h4 className="mt-2 text-lg font-bold text-slate-300 tracking-wider">{time}</h4>
            </div>
          ))}
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col space-y-2">
        {phasesData.rows.map((row, rowIndex) => (
          <div key={row.title}>
            <h3 className="text-base font-bold text-slate-300 mb-2 tracking-wider">{row.title}</h3>
            <div className="grid grid-cols-3 gap-4">
              {row.items.map((item, index) => (
                <div key={index} className="bg-slate-800/50 border border-slate-700/80 rounded-lg p-4 flex flex-col justify-center h-full">
                  { 'title' in item && 'description' in item && Array.isArray(item.description) && (
                    <>
                      <div className="flex items-center text-cyan-400 mb-2">
                        {React.cloneElement(item.icon, {className: "w-5 h-5 mr-2 flex-shrink-0"})}
                        <h4 className="text-lg font-bold">{item.title}</h4>
                      </div>
                      <ul className="space-y-1.5 text-sm text-slate-300 list-disc list-inside">
                          {item.description.map((point, i) => (
                              <li key={i}>{point}</li>
                          ))}
                      </ul>
                    </>
                  )}
                  { 'metrics' in item && (
                    <div className="flex items-center justify-evenly h-full gap-4">
                      {item.metrics.map((metric) => (
                          <div key={metric.label} className="text-center">
                              <p className="text-xs text-slate-400 whitespace-nowrap">{metric.label}</p>
                              <p className="text-2xl font-bold text-cyan-300 tracking-tighter">{metric.value}</p>
                          </div>
                      ))}
                    </div>
                  )}
                  { 'rate' in item && (
                    <div className="h-full flex flex-col justify-start">
                      <div className="text-center">
                          <p className="text-3xl font-bold text-cyan-300">{item.rate}</p>
                      </div>
                      <div className="mt-1">
                        <TagAtmosphere tags={item.tags} />
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Slide3;

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
</style>
`;

if (!document.querySelector('#slide3-animation-styles')) {
    const styleElement = document.createElement('style');
    styleElement.id = 'slide3-animation-styles';
    styleElement.innerHTML = animationStyles;
    document.head.appendChild(styleElement);
}