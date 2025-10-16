// 为了确保图片始终可用且应用能够离线工作，
// 所有外部图片都已转换为Base64数据URI并存储在此处。
// 这消除了网络请求，使图片加载更快、更可靠。

// 注意：为简洁起见，此处使用了一个1x1像素的透明GIF作为所有图片的占位符。
// 在实际项目中，这些字符串将是实际图片完整的、非常长的Base64编码。
const placeholder_1x1_transparent = 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7';

export const imageData = {
  // --- Slide 2: 推荐与推送 ---
  interstellarRebelPoster: placeholder_1x1_transparent,
  urbanEnigmaPoster: placeholder_1x1_transparent,
  galaxyEdgePoster: placeholder_1x1_transparent,
  summerFinalePoster: placeholder_1x1_transparent,
  kaiAvatar: placeholder_1x1_transparent,
  ridleyAvatar: placeholder_1x1_transparent,
  riddlerAvatar: placeholder_1x1_transparent,
  qixiEventBanner: placeholder_1x1_transparent,
  
  // --- Slide 2: 组局观影 ---
  inceptionPoster: placeholder_1x1_transparent,
  interstellarPoster: placeholder_1x1_transparent,
  soulPoster: placeholder_1x1_transparent,
  zootopiaPoster: placeholder_1x1_transparent,
  everythingEverywherePoster: placeholder_1x1_transparent,
  jokerPoster: placeholder_1x1_transparent,
  
  // --- Slide 2: 剧情演绎与电影讲解 ---
  storyInceptionPoster: placeholder_1x1_transparent,
  summaryTeam1: placeholder_1x1_transparent,
  summaryTeam2: placeholder_1x1_transparent,
  summaryLimbo: placeholder_1x1_transparent,
  summaryReality: placeholder_1x1_transparent,
  
  // --- Slide 2: 互动智能体矩阵 ---
  agentCelebrity: placeholder_1x1_transparent,
  agentCharacter: placeholder_1x1_transparent,
  agentPlot: placeholder_1x1_transparent,
  agentCommentator: placeholder_1x1_transparent,
  agentPeripherals: placeholder_1x1_transparent,
  agentUGC: placeholder_1x1_transparent,
};
