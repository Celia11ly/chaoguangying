import React, { useState, useEffect, useRef } from 'react';
import {
  PushIcon,
  InquiryIcon,
  GroupViewingIcon,
  BoxOfficeIcon,
  AnalysisIcon,
  SummaryIcon,
} from './icons/FeatureIcons';
import { AgentFrameworkIcon } from './icons/StrategyIcons';
import { DataFlywheelIcon } from './icons/OperationIcons';
import { YingbaoIcon } from './icons/YingbaoIcon';
import { UserIcon } from './icons/UserIcon';
import { imageData } from './imageData';

// --- Helper & Mock Data ---

type MovieStatus = 'in-theaters' | 'online' | 'both';
interface Movie {
  id: number;
  title: string;
  genres: string[];
  description: string;
  posterUrl: string;
  rating: number;
  status: MovieStatus;
  associatedAgents: { name: string; type: 'character' | 'actor'; avatarUrl: string }[];
  cinema?: { name: string; distance: string; route: string; };
  platform?: string;
  userProfile: string;
  chainOfThought: string;
}

const mockMoviesData: Movie[] = [
  {
    id: 1,
    title: '星际叛乱者',
    genres: ['科幻', '动作', '冒险'],
    description: '在一场跨越星系的史诗级对决中，一位孤独的飞行员成为了宇宙最后的希望。',
    posterUrl: imageData.interstellarRebelPoster,
    rating: 8.9,
    status: 'in-theaters',
    cinema: {
      name: '光影未来科幻主题影院',
      distance: '2.5公里',
      route: '地铁2号线直达，A口出',
    },
    userProfile: '科幻迷、动作片爱好者',
    chainOfThought: `[分析用户画像]
- 标签：#科幻 #动作 #冒险 #视觉特效
- 历史偏好：《银翼杀手2049》、《沙丘》
- 结论：用户是硬核科幻迷，注重世界观构建和视觉冲击力。

[启动检索任务]
- 任务1：搜索近期上映的高分科幻、动作类影片。
  - 结果：《星际叛乱者》(8.9分), 《时空裂痕》(7.8分)
  - 筛选：锁定评分最高的《星际叛乱者》。
- 任务2：分析《星际叛乱者》与用户画像的匹配度。
  - 匹配点：史诗级星际战争，符合用户对宏大叙事的偏好。
- 任务3：检索线下观影方案。
  - 用户位置：[定位中...] 市中心区域。
  - 影院搜索：发现2.5公里内有“光影未来科幻主题影院”，提供IMAX沉浸式体验。
- 任务4：检索线上播放渠道。
  - 结果：暂无线上资源。

[生成最终推荐]
- 结论：线下主题影院是最佳选择，能最大化满足用户的观影偏好。`,
    associatedAgents: [
      { name: '主角“凯”', type: 'character', avatarUrl: imageData.kaiAvatar },
      { name: '导演“雷德利”', type: 'actor', avatarUrl: imageData.ridleyAvatar },
    ],
  },
  {
    id: 2,
    title: '都市迷踪',
    genres: ['悬疑', '惊悚', '犯罪'],
    description: '霓虹灯下的罪恶之城，一位侦探必须在黎明前解开一个缠绕着谎言与背叛的谜题。',
    posterUrl: imageData.urbanEnigmaPoster,
    rating: 8.2,
    status: 'online',
    platform: '流光影视',
    userProfile: '悬疑片爱好者、喜欢烧脑剧情',
    chainOfThought: `[分析用户画像]
- 标签：#悬疑 #惊悚 #犯罪 #烧脑
- 历史偏好：《看不见的客人》、《利刃出鞘》
- 结论：用户喜欢高智商博弈和反转剧情。

[启动检索任务]
- 任务1：在用户的“想看”片单中搜索悬疑类影片。
  - 结果：发现《都市迷踪》。
- 任务2：检索《都市迷踪》的播放渠道。
  - 影院：已下映。
  - 线上：已独家上线“流光影视”平台。
- 任务3：分析影片口碑。
  - 评分：8.2分。
  - 关键词：“结局反转”、“氛围感强”、“黑色电影”。匹配用户偏好。

[生成最终推荐]
- 结论：推荐用户立即在线观看《都市迷踪》，满足其对烧脑悬疑的即时需求。`,
    associatedAgents: [{ name: '反派“谜语人”', type: 'character', avatarUrl: imageData.riddlerAvatar }],
  },
];

const pushNotifications = [
    {
        type: 'movie',
        trigger: '热门推荐',
        reason: '本周口碑榜第一，不容错过！',
        content: {
            title: '银河边缘',
            poster: imageData.galaxyEdgePoster,
            genres: ['科幻', '动作', '冒险'],
        }
    },
    {
        type: 'coupon',
        trigger: '周末福利',
        reason: '影宝送你观影优惠，周末愉快！',
        content: {
            value: '5',
            title: '电影票立减券',
            description: '购买任意场次电影票可用',
            expiry: '2024-12-31',
        }
    },
    {
        type: 'agent',
        trigger: '角色上新',
        reason: '《都市迷踪》中的“谜语人”已上线，快来和他聊聊电影里的秘密吧！',
        content: {
            name: '反派“谜语人”',
            avatarUrl: imageData.riddlerAvatar,
            description: '“一座城市的罪恶，需要一个象征...”'
        }
    },
    {
        type: 'event',
        trigger: '七夕特辑',
        reason: '与心爱的TA一起，共度浪漫光影之夜。',
        content: {
            title: '“星光下的约定”七夕观影会',
            banner: imageData.qixiEventBanner,
            date: '8月10日 19:00',
            location: '光影未来影城'
        }
    },
    {
        type: 'movie',
        trigger: '生日专属',
        reason: '生日快乐！为您推荐一部轻松愉快的喜剧，祝您今天过得开心！',
        content: {
            title: '夏日终曲',
            poster: imageData.summerFinalePoster,
            genres: ['喜剧', '爱情', '文艺'],
        }
    }
];

const YingbaoAvatar = () => (
    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-cyan-500 to-slate-600 flex items-center justify-center flex-shrink-0">
        <YingbaoIcon className="w-5 h-5 text-white" />
    </div>
);
const UserAvatar = () => (
    <div className="w-8 h-8 rounded-full bg-slate-600 flex items-center justify-center flex-shrink-0">
        <UserIcon className="w-5 h-5 text-slate-300" />
    </div>
);
const CheckCircleIcon = ({ className }: { className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className={className}>
        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
    </svg>
);
const ChevronRightIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
  </svg>
);

// --- Demo Components ---

const RecommendationCard: React.FC<{ movie: Movie }> = ({ movie }) => (
    <div className="bg-slate-800/80 rounded-lg overflow-hidden mt-2 border border-slate-600/50">
    <img src={movie.posterUrl} alt={movie.title} className="w-full h-32 object-cover" />
    <div className="p-3">
      <h4 className="font-bold text-base text-white">{movie.title}</h4>
      <p className="text-xs text-cyan-400 font-mono tracking-wider">{movie.genres.join(' / ')} · ★ {movie.rating}</p>
      <p className="text-sm text-slate-300 mt-2">{movie.description}</p>
      
      <div className="mt-3 space-y-2">
        { (movie.status === 'in-theaters' || movie.status === 'both') && movie.cinema && (
            <div className="bg-slate-700/50 p-2 rounded-md">
                <p className="text-sm font-bold text-slate-200">{movie.cinema.name}</p>
                <p className="text-xs text-slate-400">{`${movie.cinema.distance}，${movie.cinema.route}`}</p>
                <button className="w-full text-center bg-cyan-500 text-white font-bold py-1 rounded-md mt-2 text-sm hover:bg-cyan-400 transition-colors">立即购票</button>
            </div>
        )}
         { (movie.status === 'online' || movie.status === 'both') && movie.platform && (
            <button className="w-full text-center bg-emerald-500 text-white font-bold py-1 rounded-md text-sm hover:bg-emerald-400 transition-colors">{`在 ${movie.platform} 在线观看`}</button>
        )}
      </div>

      <div className="mt-3 pt-2 border-t border-slate-600/50">
          <p className="text-xs text-slate-400 mb-2">关联智能体</p>
          <div className="flex flex-col gap-2">
              {movie.associatedAgents.map(agent => (
                  <div key={agent.name} className="flex items-center gap-2 bg-slate-700/50 p-1.5 rounded-lg border border-transparent hover:border-cyan-500/50 transition-colors duration-300 cursor-pointer">
                      <img src={agent.avatarUrl} alt={agent.name} className="w-10 h-10 rounded-full object-cover flex-shrink-0" />
                      <div className="flex-1">
                          <p className="font-bold text-white text-sm">{agent.name}</p>
                          <p className="text-xs text-cyan-400">点击进入对话</p>
                      </div>
                      <button className="bg-cyan-500/20 text-cyan-300 text-xs font-bold py-1 px-2 rounded-full hover:bg-cyan-500/40 transition-colors">
                          互动
                      </button>
                  </div>
              ))}
          </div>
      </div>
    </div>
  </div>
);

const InquiryDemo: React.FC<{
  movie?: Movie;
  userInput: string;
  streamingThought: string;
  isStreamingFinished: boolean;
}> = ({ movie, userInput, streamingThought, isStreamingFinished }) => {
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [streamingThought, isStreamingFinished]);

  if (!userInput) {
    return (
      <div className="flex flex-col items-center justify-center h-full text-center p-4">
        <InquiryIcon className="w-16 h-16 text-slate-600 mb-4" />
        <p className="text-base text-slate-400">
          点击“影讯询问”按钮
          <br />
          体验 <span className="text-cyan-400 font-bold">影宝</span> 为您带来的个性化推荐
        </p>
      </div>
    );
  }

  return (
    <div className="text-white p-2 space-y-4 h-full overflow-y-auto" ref={scrollRef}>
        <div className="flex justify-end items-start gap-2 animate-fade-in">
            <div className="bg-cyan-600 p-2 rounded-lg max-w-[80%] text-sm">
            {userInput}
            </div>
            <UserAvatar />
        </div>

        <div className="flex justify-start items-start gap-2 animate-fade-in">
            <YingbaoAvatar />
            <div className="bg-slate-700 p-2 rounded-lg max-w-[85%] w-full flex flex-col gap-2">
                <div className="text-xs text-slate-400 whitespace-pre-wrap font-mono">
                    {streamingThought}
                    {!isStreamingFinished && (
                    <span className="inline-block w-1.5 h-3 bg-cyan-400 animate-pulse ml-1 align-middle"></span>
                    )}
                </div>
                {isStreamingFinished && movie && (
                    <div className="animate-fade-in">
                        <p className="text-sm text-slate-300 mb-1">没问题！根据您的喜好，我为您找到了这部：</p>
                        <RecommendationCard movie={movie} />
                    </div>
                )}
            </div>
        </div>
    </div>
  );
};

// --- New Smart Push Components ---

const PushWrapper: React.FC<{ trigger: string; reason: string; children: React.ReactNode }> = ({ trigger, reason, children }) => (
    <div className="bg-slate-700/50 rounded-lg p-3">
        <p className="text-xs text-cyan-400 mb-2">{trigger}</p>
        <p className="text-sm text-slate-300 mb-3 pl-2 border-l-2 border-cyan-500">{reason}</p>
        {children}
    </div>
);

const MoviePushCard: React.FC<{ data: typeof pushNotifications[0] }> = ({ data }) => (
    <PushWrapper trigger={data.trigger} reason={data.reason}>
        <div className="flex gap-3">
            <img src={data.content.poster} className="w-20 h-28 object-cover rounded-md" />
            <div className="flex flex-col">
                <h4 className="font-bold text-white text-lg">{data.content.title}</h4>
                <p className="text-sm text-slate-400">{data.content.genres.join(' / ')}</p>
                <div className="mt-auto flex gap-2">
                    <button className="text-sm bg-cyan-500 text-white font-bold py-1 px-4 rounded-md hover:bg-cyan-400">查看详情</button>
                    <button className="text-sm bg-slate-600 text-slate-200 font-bold py-1 px-4 rounded-md hover:bg-slate-500">忽略</button>
                </div>
            </div>
        </div>
    </PushWrapper>
);

const CouponPushCard: React.FC<{ data: typeof pushNotifications[1] }> = ({ data }) => (
    <PushWrapper trigger={data.trigger} reason={data.reason}>
        <div className="bg-gradient-to-r from-amber-400 to-yellow-500 rounded-lg p-4 flex items-center gap-4 relative overflow-hidden">
            <div className="absolute -left-4 -top-4 w-12 h-12 bg-slate-800/50 rounded-full"></div>
            <div className="absolute -right-4 -bottom-4 w-12 h-12 bg-slate-800/50 rounded-full"></div>
            <div className="text-white">
                <span className="text-2xl font-bold">¥</span>
                <span className="text-5xl font-bold">{data.content.value}</span>
            </div>
            <div className="flex-1 border-l-2 border-dashed border-yellow-200/50 pl-4">
                <h4 className="font-bold text-white text-lg">{data.content.title}</h4>
                <p className="text-sm text-yellow-100">{data.content.description}</p>
                <p className="text-xs text-yellow-100/80 mt-1">有效期至: {data.content.expiry}</p>
            </div>
            <button className="absolute top-2 right-2 bg-white/20 text-white text-xs font-bold py-1 px-2 rounded-full hover:bg-white/40">立即领取</button>
        </div>
    </PushWrapper>
);

const AgentPushCard: React.FC<{ data: typeof pushNotifications[2] }> = ({ data }) => (
    <PushWrapper trigger={data.trigger} reason={data.reason}>
        <div className="flex items-center gap-3">
            <img src={data.content.avatarUrl} alt={data.content.name} className="w-20 h-20 rounded-full object-cover flex-shrink-0" />
            <div className="flex-1">
                <h4 className="font-bold text-white text-lg">{data.content.name}</h4>
                <p className="text-sm text-slate-400 italic">"{data.content.description}"</p>
                <button className="text-sm mt-2 bg-cyan-500 text-white font-bold py-1 px-4 rounded-md hover:bg-cyan-400">开始对话</button>
            </div>
        </div>
    </PushWrapper>
);

const EventPushCard: React.FC<{ data: typeof pushNotifications[3] }> = ({ data }) => (
    <PushWrapper trigger={data.trigger} reason={data.reason}>
        <div className="rounded-lg overflow-hidden">
            <img src={data.content.banner} className="w-full h-32 object-cover" />
            <div className="bg-slate-800 p-3">
                <h4 className="font-bold text-white text-lg">{data.content.title}</h4>
                <p className="text-sm text-slate-400">{data.content.date} · {data.content.location}</p>
                <button className="w-full text-center mt-3 bg-rose-500 text-white font-bold py-1.5 rounded-md text-base hover:bg-rose-400">查看活动详情</button>
            </div>
        </div>
    </PushWrapper>
);


const SmartPushDemo: React.FC<{ notification: typeof pushNotifications[0] | null }> = ({ notification }) => {
    if (!notification) {
         return (
             <div className="flex flex-col items-center justify-center h-full text-center p-4">
                <PushIcon className="w-16 h-16 text-slate-600 mb-4" />
                <p className="text-base text-slate-400">
                    点击“智能推送”按钮
                    <br />
                    接收来自 <span className="text-cyan-400 font-bold">影宝</span> 的个性化内容
                </p>
            </div>
        );
    }
    
    const renderCard = () => {
        switch (notification.type) {
            case 'movie': return <MoviePushCard data={notification as any} />;
            case 'coupon': return <CouponPushCard data={notification as any} />;
            case 'agent': return <AgentPushCard data={notification as any} />;
            case 'event': return <EventPushCard data={notification as any} />;
            default: return null;
        }
    }

    return (
        <div className="p-3 h-full overflow-y-auto">
            {renderCard()}
        </div>
    );
};

const GroupViewingDemo: React.FC = () => {
    const [step, setStep] = useState(1);
    const [selected, setSelected] = useState({ movie: '', cinema: '', time: '', friends: [] as string[] });

    const movies = [
        { title: '盗梦空间', poster: imageData.inceptionPoster }, 
        { title: '星际穿越', poster: imageData.interstellarPoster },
        { title: '心灵奇旅', poster: imageData.soulPoster },
        { title: '疯狂动物城', poster: imageData.zootopiaPoster },
        { title: '瞬息全宇宙', poster: imageData.everythingEverywherePoster },
        { title: '小丑', poster: imageData.jokerPoster },
    ];
    const friends = ['李雷', '韩梅梅', '张伟', '王芳'];

    const handleSelectFriend = (name: string) => {
        setSelected(prev => ({ ...prev, friends: prev.friends.includes(name) ? prev.friends.filter(f => f !== name) : [...prev.friends, name] }));
    };

    return (
        <div className="p-3 h-full overflow-y-auto animate-fade-in text-white">
            <h3 className="text-lg font-bold text-center mb-2">组局观影</h3>
            {step === 1 && (
                <div>
                    <p className="text-center text-sm text-slate-400 mb-3">第 1 步：选择电影</p>
                    <div className="grid grid-cols-2 gap-3">
                        {movies.map(m => <button key={m.title} onClick={() => { setSelected(s => ({...s, movie: m.title})); setStep(2); }} className="w-full text-left bg-slate-700/50 p-2 rounded-lg hover:bg-slate-700 space-y-2"><img src={m.poster} className="w-full h-40 object-cover rounded" /> <span className="font-bold px-1">{m.title}</span></button>)}
                    </div>
                </div>
            )}
            {step === 2 && (
                <div>
                    <p className="text-center text-sm text-slate-400 mb-3">第 2 步：选择场次</p>
                    <div className="bg-slate-700/50 p-3 rounded-lg">
                        <h4 className="font-bold">翠苑电影大世界</h4>
                        <div className="grid grid-cols-3 gap-2 mt-2">
                            {['18:30', '19:15', '20:00', '21:45'].map(t => <button key={t} onClick={() => { setSelected(s => ({...s, time: t, cinema: '翠苑电影大世界'})); setStep(3); }} className="bg-cyan-600/50 text-cyan-200 p-2 rounded text-center hover:bg-cyan-500">{t}</button>)}
                        </div>
                    </div>
                     <button onClick={() => setStep(1)} className="text-sm text-slate-400 text-center w-full mt-3">返回上一步</button>
                </div>
            )}
            {step === 3 && (
                <div>
                    <p className="text-center text-sm text-slate-400 mb-3">第 3 步：邀请好友</p>
                    <div className="space-y-2">
                        {friends.map(f => <button key={f} onClick={() => handleSelectFriend(f)} className={`w-full flex items-center p-3 rounded-lg transition-colors ${selected.friends.includes(f) ? 'bg-cyan-500/20' : 'bg-slate-700/50'}`}><span className="text-lg">{f}</span> {selected.friends.includes(f) ? <CheckCircleIcon className="w-6 h-6 ml-auto text-cyan-400" /> : <div className="w-6 h-6 ml-auto rounded-full border-2 border-slate-500"></div>}</button>)}
                    </div>
                    <button onClick={() => setStep(4)} disabled={!selected.friends.length} className="w-full bg-cyan-500 font-bold p-3 rounded-lg mt-4 disabled:bg-slate-600">下一步</button>
                    <button onClick={() => setStep(2)} className="text-sm text-slate-400 text-center w-full mt-3">返回上一步</button>
                </div>
            )}
            {step === 4 && (
                <div>
                    <p className="text-center text-sm text-slate-400 mb-3">第 4 步：确认并发送</p>
                    <div className="bg-slate-700/50 p-3 rounded-lg space-y-1 text-sm">
                        <p><span className="text-slate-400">电影：</span>{selected.movie}</p>
                        <p><span className="text-slate-400">时间：</span>今天 {selected.time}</p>
                        <p><span className="text-slate-400">好友：</span>{selected.friends.join(', ')}</p>
                    </div>
                    <p className="text-xs text-cyan-400 my-2">AI 已为您生成邀请语：</p>
                    <div className="bg-slate-900/50 p-3 rounded-lg text-base">
                        哈喽各位！影宝AI强烈推荐我们今晚 {selected.time} 去翠苑电影大世界看《{selected.movie}》，还说要帮我们解答结局！我已经占好座了，速来！
                    </div>
                    <button onClick={() => setStep(1)} className="w-full bg-emerald-500 font-bold p-3 rounded-lg mt-4">发送邀请</button>
                    <button onClick={() => setStep(3)} className="text-sm text-slate-400 text-center w-full mt-3">返回上一步</button>
                </div>
            )}
        </div>
    );
};

const BoxOfficeDemo: React.FC = () => {
    const [query, setQuery] = useState<string | null>(null);

    const handleQuery = (movie: string) => {
        setQuery(movie);
    };
    
    const responseData = {
        '星际叛乱者': {
            boxOffice: '1.2亿',
            predicted: '3.5亿',
            maoyan: '9.2',
            douban: '8.5',
            positive: '视觉效果是最大亮点，太空场面宏大震撼，IMAX体验绝佳。',
            negative: '剧情略显老套，部分角色塑造单薄，文戏节奏存在争议。'
        },
        '都市迷踪': {
            boxOffice: '8500万',
            predicted: '1.5亿',
            maoyan: '9.0',
            douban: '8.2',
            positive: '结局反转出人意料，悬疑氛围营造到位，黑色电影风格浓郁。',
            negative: '部分逻辑细节经不起推敲，节奏略慢，对非悬疑爱好者可能不太友好。'
        }
    };
    const currentResponse = query ? responseData[query as keyof typeof responseData] : null;

    return (
        <div className="p-3 h-full overflow-y-auto animate-fade-in text-white space-y-3">
            <div className="flex items-start gap-2.5">
                <YingbaoAvatar />
                <div className="bg-slate-700 p-3 rounded-lg max-w-[85%]">你好！想了解哪部电影的口碑和票房？</div>
            </div>
            {!query ? (
                 <div className="flex flex-col items-end gap-2">
                    <button onClick={() => handleQuery('星际叛乱者')} className="bg-cyan-600 p-3 rounded-lg">我想了解下《星际叛乱者》的口碑和票房</button>
                    <button onClick={() => handleQuery('都市迷踪')} className="bg-cyan-600 p-3 rounded-lg">《都市迷踪》怎么样？</button>
                </div>
            ) : (
                <>
                    <div className="flex justify-end items-start gap-2.5">
                        <div className="bg-cyan-600 p-3 rounded-lg">{query === '星际叛乱者' ? '我想了解下《星际叛乱者》的口碑和票房' : '《都市迷踪》怎么样？'}</div><UserAvatar />
                    </div>
                    <div className="flex items-start gap-2.5">
                        <YingbaoAvatar />
                        <div className="bg-slate-700 p-3 rounded-lg max-w-[85%] w-full space-y-3">
                            <p>好的，这是为您生成的《{query}》AI分析报告：</p>
                            <div className="bg-slate-800/50 p-3 rounded-md space-y-2">
                                <h4 className="font-bold text-cyan-400 text-base">票房数据</h4>
                                <div className="flex justify-around text-center">
                                    <div><p className="text-xs text-slate-400">实时票房</p><p className="text-xl font-bold">{currentResponse?.boxOffice}</p></div>
                                    <div><p className="text-xs text-slate-400">预测总票房</p><p className="text-xl font-bold">{currentResponse?.predicted}</p></div>
                                </div>
                            </div>
                            <div className="bg-slate-800/50 p-3 rounded-md space-y-2">
                                <h4 className="font-bold text-cyan-400 text-base">多平台口碑</h4>
                                 <div className="flex justify-around text-center">
                                    <div><p className="text-xs text-slate-400">猫眼评分</p><p className="text-xl font-bold">{currentResponse?.maoyan}</p></div>
                                    <div><p className="text-xs text-slate-400">豆瓣评分</p><p className="text-xl font-bold">{currentResponse?.douban}</p></div>
                                </div>
                            </div>
                             <div className="bg-slate-800/50 p-3 rounded-md space-y-2">
                                <h4 className="font-bold text-cyan-400 text-base">AI口碑分析</h4>
                                <p className="text-sm"><span className="text-emerald-400">正面词云：</span>{currentResponse?.positive}</p>
                                <p className="text-sm"><span className="text-rose-400">负面词云：</span>{currentResponse?.negative}</p>
                            </div>
                             <button onClick={() => setQuery(null)} className="w-full text-center text-sm bg-slate-600 text-slate-200 font-bold py-1 rounded-md hover:bg-slate-500 mt-2">返回</button>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
};

const storyScripts = {
    falls: [
        { q: '你感觉身体一阵轻松，前所未有的真实感包围了你。孩子们温暖的拥抱是如此清晰。此刻，你想对他们说什么？', choices: ['“爸爸回来了。”', '“我好想你们。”'] },
        { q: '你说完，泪水模糊了视线。这是喜悦的泪，也是解脱的泪。你抬头看向妻子梅尔，她正微笑着看着你。但她的微笑，似乎有些异样。你选择：', choices: ['走过去，拥抱她。', '停在原地，仔细看她。'] },
        { q: '当你走近，梅尔的影像开始变得不稳定，像一个信号不良的投影。她轻声说：“亲爱的，你真的回来了吗？还是这只是你为自己编织的又一个梦？”你如何回应？', choices: ['“这是现实，我确定。”', '“我……不知道。”'] },
        { q: '她叹了口气，身影更加透明。“记住，柯布，最危险的执念，是那些我们以为已经放下的。”话音刚落，她便消失了。整个世界开始剧烈震动。你意识到：', choices: ['陀螺的结果是假象！', '这是梅尔最后的考验。'] },
        { q: '【最终结局】\n你闭上眼，再睁开时，发现自己仍在飞机的座位上。周围的队友正关切地看着你。“欢迎回来，柯布。” 齐藤说。你明白了，刚刚的一切，不过是植入任务成功后，潜意识的最后一次抽离。你终于真正地、彻底地回家了。', choices: [] },
    ],
    spins: [
        { q: '孩子们的笑声清脆，阳光温暖。你享受着这片刻的宁静，但内心深处，一个声音在问：这一切是不是太过完美了？你决定做什么？', choices: ['忽略它，享受当下。', '回去看看桌上的陀螺。'] },
        { q: '你回到桌边，陀螺依旧在稳定旋转。没有丝毫要停下的迹象。你的心脏沉了下去。这时，你的岳父走过来，拍了拍你的肩膀：“别想了，孩子，他们都在等你。”他的话让你感到：', choices: ['一丝安慰。', '一阵寒意。'] },
        { q: '你感到一阵寒意。你记得很清楚，岳父从未支持过你的工作。他怎么会如此轻易地接纳你？你试探性地问：“梅尔……她还好吗？”他愣了一下，然后笑着说：“她当然好，她一直都在。”', choices: ['“带我去见她。”', '“你不是他！”'] },
        { q: '“我当然是我。”他脸上的笑容变得僵硬，“而你，也永远是你。那个选择留下的，可怜的造梦师。”周围的场景开始像纸片一样剥落，露出背后无尽的、灰色的海滩——迷失域。', choices: ['愤怒地冲向他。', '接受自己的命运。'] },
        { q: '【最终结局】\n你选择接受。周围的一切都化为虚无，只剩下你和那个永不停歇的陀螺。你创造了这个世界来囚禁自己，因为只有在这里，你才能和“梅尔”重逢。你得到了你想要的，也永远失去了真实的家。', choices: [] },
    ]
};

const StoryInteractionDemo: React.FC = () => {
    const [branch, setBranch] = useState<'falls' | 'spins' | null>(null);
    const [turn, setTurn] = useState(0);
    const [history, setHistory] = useState<{ type: 'ai' | 'user'; text: string }[]>([]);
    const scrollRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [history]);

    const handleStart = (selectedBranch: 'falls' | 'spins') => {
        setBranch(selectedBranch);
        setTurn(0);
        setHistory([{ type: 'ai', text: storyScripts[selectedBranch][0].q }]);
    };
    
    const handleChoice = (choiceText: string) => {
        const currentScript = storyScripts[branch!][turn];
        if (!currentScript.choices.length) return;

        const nextTurn = turn + 1;
        const nextScript = storyScripts[branch!][nextTurn];
        
        setHistory(prev => [...prev, { type: 'user', text: choiceText }, { type: 'ai', text: nextScript.q }]);
        setTurn(nextTurn);
    };

    if (branch) {
        const currentScript = storyScripts[branch][turn];
        return (
            <div className="p-3 h-full flex flex-col animate-fade-in text-white">
                <div className="flex-grow overflow-y-auto space-y-3" ref={scrollRef}>
                    {history.map((item, index) => (
                         <div key={index} className={`flex items-start gap-2.5 ${item.type === 'user' ? 'justify-end' : 'justify-start'}`}>
                            {item.type === 'ai' && <YingbaoAvatar />}
                            <div className={`${item.type === 'user' ? 'bg-cyan-600' : 'bg-slate-700'} p-3 rounded-lg max-w-[85%]`}>
                                {item.text}
                            </div>
                            {item.type === 'user' && <UserAvatar />}
                        </div>
                    ))}
                </div>
                <div className="flex-shrink-0 pt-3 space-y-2">
                    {currentScript.choices.length > 0 ? (
                        currentScript.choices.map(choice => (
                            <button key={choice} onClick={() => handleChoice(choice)} className="w-full bg-slate-700/80 p-3 rounded-lg text-base hover:bg-slate-700">{choice}</button>
                        ))
                    ) : (
                        <button onClick={() => { setBranch(null); setHistory([]); }} className="w-full bg-cyan-500 py-2 px-6 rounded-lg font-bold">重新演绎</button>
                    )}
                </div>
            </div>
        )
    }

    const storyStart = '最后的镜头，柯布回到了家，孩子们在花园里玩耍。他转动了那个熟悉的陀螺，它在桌上旋转... 他没有看结果，而是跑向了孩子。';
    return (
        <div className="p-4 h-full flex flex-col justify-center animate-fade-in text-white text-center">
            <img src={imageData.storyInceptionPoster} className="w-full h-48 object-cover rounded-lg mb-4" />
            <p className="text-base mb-4 leading-relaxed">{storyStart}</p>
            <p className="font-bold text-cyan-400 text-lg mb-4">你认为，接下来发生了什么？</p>
            <div className="space-y-3">
                <button onClick={() => handleStart('falls')} className="w-full bg-slate-700/80 p-4 rounded-lg text-lg hover:bg-slate-700">陀螺停了</button>
                <button onClick={() => handleStart('spins')} className="w-full bg-slate-700/80 p-4 rounded-lg text-lg hover:bg-slate-700">陀螺没停</button>
            </div>
        </div>
    );
};


const MovieSummaryDemo: React.FC = () => {
    const [started, setStarted] = useState(false);
    const [currentSegment, setCurrentSegment] = useState(-1);

    const plotPoints = [
        { time: '0:05', description: 'AI开始解析《盗梦空间》...', image: imageData.summaryTeam1 },
        { time: '0:32', description: '任务起源：富商齐藤雇佣柯布团队进行商业“植入”。', image: imageData.summaryTeam1 },
        { time: '1:15', description: '构建梦境：团队招募新“筑梦师”，设计层层嵌套的复杂梦境。', image: imageData.summaryTeam2 },
        { time: '2:05', description: '深入迷失域：计划出现意外，柯布被迫进入最深层的潜意识边缘。', image: imageData.summaryLimbo },
        { time: '2:48', description: '回到现实？团队成功完成任务，但最后的陀螺留下悬念。', image: imageData.summaryReality },
    ];

    useEffect(() => {
        if (started && currentSegment < plotPoints.length - 1) {
            const timer = setTimeout(() => {
                setCurrentSegment(prev => prev + 1);
            }, 2500); //每个片段“播放”2.5秒
            return () => clearTimeout(timer);
        }
    }, [started, currentSegment]);

    const handleStart = () => {
        setStarted(true);
        setCurrentSegment(0);
    }
    
    if (!started) {
        return (
             <div className="p-3 h-full overflow-y-auto animate-fade-in text-white flex flex-col">
                <div className="flex-grow"></div>
                <div className="flex-shrink-0">
                    <button onClick={handleStart} className="w-full bg-cyan-600 p-3 rounded-lg text-base">我想了解下《盗梦空间》</button>
                </div>
            </div>
        )
    }

    return (
        <div className="p-3 h-full overflow-y-auto animate-fade-in text-white space-y-3">
             <div className="flex justify-end items-start gap-2.5">
                <div className="bg-cyan-600 p-3 rounded-lg">我想了解下《盗梦空间》</div>
                <UserAvatar />
            </div>
             <div className="flex items-start gap-2.5">
                <YingbaoAvatar />
                <div className="bg-slate-700 p-3 rounded-lg max-w-[85%] w-full">
                    好的，为您生成《盗梦空间》的三分钟视频讲解：
                </div>
            </div>
            {plotPoints.map((p, i) => (
                currentSegment >= i && (
                    <div key={i} className="flex items-start gap-2.5 animate-fade-in">
                        {i > 0 && <YingbaoAvatar />}
                        <div className="bg-slate-700 p-3 rounded-lg max-w-[85%] w-full space-y-2">
                             <div className="relative">
                                <img src={p.image} className="w-full h-32 object-cover rounded-md" />
                                <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                                    <svg className="w-12 h-12 text-white/70" fill="currentColor" viewBox="0 0 20 20"><path d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z"></path></svg>
                                </div>
                             </div>
                             <p>{p.description}</p>
                             <div className="w-full bg-slate-600/50 rounded-full h-1.5">
                                 <div 
                                    className={`h-full bg-cyan-400 rounded-full ${currentSegment === i ? 'animate-video-progress' : ''}`}
                                    style={{ width: currentSegment > i ? '100%' : '0%' }}
                                 ></div>
                            </div>
                        </div>
                    </div>
                )
            ))}
        </div>
    );
};

const interactiveAgents = [
    { name: '明星智能体', description: '与你喜爱的明星随时对话', imageUrl: imageData.agentCelebrity },
    { name: '角色智能体', description: '和电影中的TA成为朋友', imageUrl: imageData.agentCharacter },
    { name: '剧情智能体', description: '探讨情节发展，续写你的结局', imageUrl: imageData.agentPlot },
    { name: '解说智能体', description: '听专业影评人深度剖析', imageUrl: imageData.agentCommentator },
    { name: '周边智能体', description: '打卡网红拍摄地，获取周边信息', imageUrl: imageData.agentPeripherals },
    { name: 'UGC智能体', description: '开放创作，打造你的专属智能体', imageUrl: imageData.agentUGC },
];
const elements = [
    { 
        title: '产业要素', 
        content: '之影集团在票务和影管方面的传统优势', 
        subItems: ['票务生态', '影管资源'] 
    },
    { 
        title: '产品和技术要素', 
        content: '潮光影拥有了灵活稳定的高拓展性智能体搭建引擎', 
        subItems: ['MCP', '业务接口', 'Agent搭建引擎', 'AIGC技术', '数字人技术'] 
    },
    { 
        title: '数据要素', 
        content: '多维度数据源构成竞争壁垒', 
        dataItems: ['票务数据', '影视元数据', '用户数据', '其他']
    }
];
const userDataBreakdown = [ '用户基本资料', '关注的明星', '消费数据', '点评数据', '互动习惯', '品味喜好' ];

const features = [
  { name: '影讯询问', icon: <InquiryIcon />, Component: InquiryDemo },
  { name: '智能推送', icon: <PushIcon />, Component: SmartPushDemo },
  { name: '组局观影', icon: <GroupViewingIcon />, Component: GroupViewingDemo },
  { name: '票房查询', icon: <BoxOfficeIcon />, Component: BoxOfficeDemo },
  { name: '剧情演绎互动', icon: <AnalysisIcon />, Component: StoryInteractionDemo },
  { name: '三分钟讲电影', icon: <SummaryIcon />, Component: MovieSummaryDemo },
];

const Slide2: React.FC = () => {
    const [activeFeatureName, setActiveFeatureName] = useState(features[0].name);
    
    const [pushedMovie, setPushedMovie] = useState<Movie | undefined>();
    const [userInput, setUserInput] = useState('');
    const [streamingThought, setStreamingThought] = useState('');
    const [isStreamingFinished, setIsStreamingFinished] = useState(false);
    const [pushIndex, setPushIndex] = useState(-1);
    const streamIntervalRef = useRef<number | null>(null);
    const pathRef = useRef<SVGPathElement>(null);

    useEffect(() => {
        if (pathRef.current) {
            const pathLength = pathRef.current.getTotalLength();
            pathRef.current.style.setProperty('--path-length', `${pathLength}`);
        }
    }, []);

    useEffect(() => {
        return () => {
            if (streamIntervalRef.current) window.clearInterval(streamIntervalRef.current);
        };
    }, []);

    const handleFeatureClick = (featureName: string) => {
        setActiveFeatureName(featureName);
        
        if (streamIntervalRef.current) {
            window.clearInterval(streamIntervalRef.current);
            streamIntervalRef.current = null;
        }
        
        setUserInput('');
        setStreamingThought('');
        setIsStreamingFinished(false);
        setPushedMovie(undefined);

        if (featureName === '智能推送') {
             setPushIndex(prev => (prev + 1) % pushNotifications.length);
        } else if (featureName === '影讯询问') {
            setPushIndex(-1);
            let newMovie;
            if (mockMoviesData.length > 0) {
              do {
                  newMovie = mockMoviesData[Math.floor(Math.random() * mockMoviesData.length)];
              } while (pushedMovie && newMovie.id === pushedMovie.id && mockMoviesData.length > 1);
            
              setPushedMovie(newMovie);
              
              const prompt = `我是个${newMovie.userProfile}，有啥好片推荐吗？`;
              setUserInput(prompt);

              const fullThought = newMovie.chainOfThought;
              let i = 0;
              streamIntervalRef.current = window.setInterval(() => {
                  if (i < fullThought.length) {
                      setStreamingThought(prev => prev + fullThought.charAt(i));
                      i++;
                  } else {
                      if (streamIntervalRef.current) clearInterval(streamIntervalRef.current);
                      streamIntervalRef.current = null;
                      setIsStreamingFinished(true);
                  }
              }, 30);
            }
        } else {
             setPushIndex(-1);
        }
    };

    const ActiveComponent = features.find(f => f.name === activeFeatureName)?.Component;
    const activePush = pushIndex === -1 ? null : pushNotifications[pushIndex];

    return (
        <div className="w-full max-w-screen-2xl mx-auto px-4 py-2 animate-fade-in h-full flex flex-col">
            <h2 className="text-3xl sm:text-4xl font-bold text-center mb-2">
                中期目标：有特色的<span className="text-cyan-400">视听消费入口级</span>平台
            </h2>
            <p className="text-lg text-slate-400 text-center mb-6 max-w-5xl mx-auto">
                <span className="font-semibold text-slate-300">智能体视角：</span>通过产业、技术、数据的融合，率先打造个性化的一站式观影智能体
            </p>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start relative flex-1">
                <div className="hidden lg:block absolute top-0 left-0 w-full h-full z-0 pointer-events-none">
                    <svg width="100%" height="100%" preserveAspectRatio="none" viewBox="0 0 1600 800">
                         <defs>
                             <linearGradient id="line-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                                <stop offset="0%" stopColor="rgba(107, 234, 255, 0)" />
                                <stop offset="50%" stopColor="rgba(107, 234, 255, 1)" />
                                <stop offset="100%" stopColor="rgba(107, 234, 255, 0)" />
                            </linearGradient>
                            <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
                                <feGaussianBlur stdDeviation="4" result="coloredBlur"/>
                                <feMerge>
                                    <feMergeNode in="coloredBlur"/>
                                    <feMergeNode in="SourceGraphic"/>
                                </feMerge>
                            </filter>
                        </defs>
                        <path d="M 1650 350 C 1200 550, 800 150, -50 400" stroke="rgba(56, 189, 248, 0.2)" strokeWidth="5" fill="none" />
                        <path ref={pathRef} d="M 1650 350 C 1200 550, 800 150, -50 400" stroke="url(#line-gradient)" strokeWidth="5" strokeLinecap="round" fill="none" filter="url(#glow)" className="animate-light-flow" />
                    </svg>
                </div>

                <div className="lg:col-span-7 flex flex-col h-full z-10">
                    <h3 className="text-lg font-bold text-center text-slate-300 tracking-wider mb-2">一站式观影智能体 (目标)</h3>
                    <div className="flex-1 flex items-stretch justify-center gap-2">
                        <div className="w-56 flex-shrink-0 flex flex-col space-y-2">
                            {features.map((feature) => (
                                <button
                                    key={feature.name}
                                    onClick={() => handleFeatureClick(feature.name)}
                                    className={`flex items-center space-x-3 p-3 rounded-lg text-left transition-all duration-300 w-full border ${
                                        activeFeatureName === feature.name
                                        ? 'bg-cyan-500/10 border-cyan-500 text-white shadow-lg shadow-cyan-500/10'
                                        : 'bg-slate-800/50 border-slate-700 text-slate-300 hover:bg-slate-700/50 hover:border-slate-600'
                                    }`}
                                >
                                    <div className={`transition-colors duration-300 ${activeFeatureName === feature.name ? 'text-cyan-400' : 'text-slate-400'}`}>
                                        {React.cloneElement(feature.icon, { className: 'h-6 w-6' })}
                                    </div>
                                    <span className="text-base font-medium">{feature.name}</span>
                                </button>
                            ))}
                        </div>
                        <div className="flex-1 flex items-center justify-center min-w-0">
                            <div className="w-full max-w-[400px] h-[660px] bg-slate-900 border-4 border-slate-700 rounded-3xl shadow-2xl p-2 flex flex-col">
                                <div className="w-full h-full bg-slate-800 rounded-2xl overflow-hidden flex flex-col">
                                    <div className="flex-shrink-0 flex items-center p-2.5 bg-slate-900/50 border-b border-slate-700/50">
                                        <YingbaoAvatar />
                                        <div className="ml-2">
                                            <h3 className="font-bold text-white leading-tight text-sm">影宝</h3>
                                            <p className="text-xs text-emerald-400 leading-tight flex items-center">
                                                <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full mr-1.5"></span>
                                                在线
                                            </p>
                                        </div>
                                    </div>
                                    <div className="flex-grow h-0" key={activeFeatureName}>
                                        {ActiveComponent && activeFeatureName === '智能推送' ? (
                                            <SmartPushDemo notification={activePush} />
                                        ) : ActiveComponent && activeFeatureName === '影讯询问' ? (
                                            <InquiryDemo 
                                                movie={pushedMovie} 
                                                userInput={userInput}
                                                streamingThought={streamingThought}
                                                isStreamingFinished={isStreamingFinished}
                                            /> 
                                        ) : ActiveComponent ? (
                                            <ActiveComponent />
                                        ) : null}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="lg:col-span-5 flex gap-4 z-10">
                    <div className="flex-[2] flex flex-col">
                         <h3 className="text-lg font-bold text-center text-slate-300 tracking-wider mb-2">核心三要素 (路径)</h3>
                         <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-3 flex-1 flex flex-col">
                             {elements.map((element, index) => (
                                 <React.Fragment key={element.title}>
                                     <div className="py-1">
                                         <h3 className="text-base font-bold text-cyan-400 mb-1">{element.title}</h3>
                                         <p className="text-slate-300 text-xs mb-1">{element.content}</p>
                                         {element.subItems && (
                                            <div className="mt-2 flex flex-col gap-1">
                                                {element.subItems.map(item => (
                                                    <div key={item} className="border rounded-md p-1.5 text-center transition-all duration-300 text-xs bg-slate-700/50 border-slate-600/50">
                                                        <span className="font-semibold tracking-wide text-slate-300">{item}</span>
                                                    </div>
                                                ))}
                                            </div>
                                         )}
                                         {element.dataItems && (
                                             <div className="mt-2 flex flex-col gap-1">
                                                 {element.dataItems.map(item => {
                                                     const isUserData = item === '用户数据';
                                                     return (
                                                         <div key={item} className={`
                                                             border rounded-md p-1.5 text-center transition-all duration-300 text-xs
                                                             ${isUserData ? 'bg-cyan-900/80 border-cyan-500 ring-1 ring-cyan-400/50 shadow-lg shadow-cyan-500/10' : 'bg-slate-700/50 border-slate-600/50'}`}>
                                                             <span className={`font-semibold tracking-wide ${isUserData ? 'text-cyan-200' : 'text-slate-300'}`}>{item}</span>
                                                         </div>
                                                     );
                                                 })}
                                             </div>
                                         )}
                                     </div>
                                     {index < elements.length - 1 && <hr className="border-slate-700 my-1" />}
                                 </React.Fragment>
                             ))}
                         </div>
                    </div>

                    <div className="flex-[3] flex flex-col">
                        <h3 className="text-lg font-bold text-center text-slate-300 tracking-wider mb-2">用户数据核心策略<span className="text-amber-400">（重点突破）</span></h3>
                        <div className="bg-slate-800/50 border-2 border-blue-500/50 rounded-lg flex flex-col p-px animate-pulse-border-blue flex-1">
                           <div className="bg-slate-800/80 rounded-[5px] w-full h-full flex flex-col">
                                <div className="p-3">
                                    <h4 className="text-base font-bold text-cyan-400 mb-2 flex items-center"><AgentFrameworkIcon className="w-5 h-5 mr-2" />「用户数据」构成</h4>
                                    <div className="grid grid-cols-2 gap-1">
                                        {userDataBreakdown.map(item => (
                                            <div key={item} className="bg-slate-700/50 rounded-md p-1 text-center text-xs text-slate-300">{item}</div>
                                        ))}
                                    </div>
                                </div>
                                <hr className="border-slate-700" />
                                <div className="p-3 flex flex-col flex-1">
                                    <h4 className="text-base font-bold text-cyan-400 mb-2 flex items-center"><DataFlywheelIcon className="w-5 h-5 mr-2" />核心解法：构建互动智能体集群/矩阵</h4>
                                    <p className="text-xs text-slate-400 mb-2">通过海量、个性化的影视互动智能体，构建高频互动场景，沉淀高价值数据资产。</p>
                                    <div className="flex flex-col gap-1.5 flex-1">
                                    {interactiveAgents.map(agent => (
                                        <div key={agent.name} className="flex items-center gap-2 bg-slate-900/50 p-1.5 rounded-lg border border-slate-700/50 hover:border-cyan-500/50 hover:bg-slate-800/50 transition-all duration-300">
                                            <img src={agent.imageUrl} alt={agent.name} className="w-10 h-10 rounded-md object-cover flex-shrink-0" />
                                            <div className="flex-1">
                                                <h5 className="font-bold text-white text-sm leading-tight">{agent.name}</h5>
                                                <p className="text-slate-300 text-xs leading-tight">{agent.description}</p>
                                            </div>
                                        </div>
                                    ))}
                                    </div>
                                </div>
                           </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Slide2;

const animationStyles = `
<style>
@keyframes fadeIn {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}
.animate-fade-in {
  animation: fadeIn 0.5s ease-in-out forwards;
}
@keyframes progressBar {
    from { transform: scaleX(0); transform-origin: left; }
    to { transform: scaleX(1); transform-origin: left; }
}
.animate-progress-bar {
    animation: progressBar 1s cubic-bezier(0.25, 1, 0.5, 1) forwards;
}
@keyframes video-progress {
    from { width: 0%; }
    to { width: 100%; }
}
.animate-video-progress {
    animation: video-progress 2.5s linear forwards;
}

@keyframes flow-light-curve {
  from { stroke-dashoffset: var(--path-length); }
  to { stroke-dashoffset: calc(-1 * var(--beam-length)); }
}
.animate-light-flow {
  --beam-length: 250;
  stroke-dasharray: var(--beam-length) var(--path-length);
  animation: flow-light-curve 8s linear infinite;
}

@keyframes pulse-border-blue {
  0%, 100% { 
    border-color: rgba(59, 130, 246, 0.5);
    box-shadow: 0 0 8px 0px rgba(59, 130, 246, 0.4), 0 0 12px 0px rgba(59, 130, 246, 0.3);
  }
  50% { 
    border-color: rgba(96, 165, 250, 0.8);
    box-shadow: 0 0 16px 4px rgba(59, 130, 246, 0.6), 0 0 30px 6px rgba(59, 130, 246, 0.4);
  }
}
.animate-pulse-border-blue {
  animation: pulse-border-blue 3s ease-in-out infinite;
}
</style>
`;

if (!document.querySelector('#slide2-animation-styles')) {
    const styleElement = document.createElement('style');
    styleElement.id = 'slide2-animation-styles';
    styleElement.innerHTML = animationStyles;
    document.head.appendChild(styleElement);
}