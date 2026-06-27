export interface Personality {
  id: number;
  name: string;
  title: string;
  subtitle: string;
  description: string;
  traits: string[];
  suitableFields: string[];
  motto: string;
  color: string;
  accentColor: string;
  cardImage: string;
}

// 黑金神秘卡牌画风的统一基底
const promptBase =
  "black and gold mysterious fantasy card art, ornate golden frame, dark background, intricate arcane symbols, glowing gold particles, cinematic lighting, highly detailed digital painting, tarot card style, ethereal atmosphere, modern urban fantasy";

function buildImage(characterDesc: string): string {
  return `https://console.enterprise.trae.cn/api/ide/v1/text_to_image?prompt=${encodeURIComponent(
    characterDesc + ", " + promptBase
  )}&image_size=portrait_4_3`;
}

export const personalities: Personality[] = [
  {
    id: 1,
    name: "海王本王",
    title: "多情泛滥的撩人高手",
    subtitle: "鱼塘千万，皆为备胎",
    description:
      "你天生懂得如何讨人欢心，一句话、一个眼神都能让人脸红心跳。你的消息列表永远热闹非凡，每一段暧昧都经营得风生水起。不是你故意要渣，只是每一段感情开始时你都觉得自己是认真的——只是结束得快了些。人们一边骂你渣，一边又忍不住被你吸引。你的魅力是双刃剑，伤人也伤己。或许某天你会遇到一个让你心甘情愿关掉鱼塘的人，但绝不是今天。",
    traits: ["魅力爆表", "暧昧成瘾", "情话满级", "承诺困难"],
    suitableFields: ["销售公关", "直播带货", "情感咨询", "演艺圈"],
    motto: "我不是渣，我只是心碎成了很多片，每一片都爱上了不同的人。",
    color: "#8b2e5a",
    accentColor: "#f0d060",
    cardImage: buildImage(
      "a charming seductive flirtatious character surrounded by multiple glowing heart symbols, rose petals, mysterious smirk, holding a golden fishing rod reeling in hearts, urban fantasy rogue aesthetic"
    ),
  },
  {
    id: 2,
    name: "卷王之王",
    title: "永不停歇的内卷达人",
    subtitle: "卷不动了？不存在的",
    description:
      "凌晨三点的城市，你是最后一盏熄灭的灯。别人在刷剧，你在刷题；别人在摸鱼，你在做PPT。你的日程表精确到分钟，你的待办清单永远清不完。你说你要躺平，身体却诚实地打开了工作群。你享受碾压同行的快感，也习惯了深夜独自崩溃的孤独。你不是不想休息，只是停不下来——因为一旦停下，你就会被后面那群卷王追上。这是你的信仰，也是你的诅咒。",
    traits: ["自律狂魔", "目标明确", "效率至上", "休息困难"],
    suitableFields: ["投行咨询", "科研学术", "创业赛道", "大厂骨干"],
    motto: "只要卷不死，就往死里卷。",
    color: "#b8382e",
    accentColor: "#f0d060",
    cardImage: buildImage(
      "a relentless overachiever surrounded by floating documents and charts, glowing golden briefcase, multiple arms holding pens and laptops, fierce determined eyes, burning ambition aura, corporate warrior"
    ),
  },
  {
    id: 3,
    name: "社恐天花板",
    title: "深度社恐的家里蹲",
    subtitle: "能打字绝不说话，能在家绝不出门",
    description:
      "你的舒适圈以床为圆心、WiFi为半径。接到陌生电话你的心跳能飙到180，群消息红点是你最大的焦虑源。你不是不想社交，只是每一次社交都像在渡劫。你熟练掌握'已读不回'的108种姿势，'下次一定'是你最常说的谎话。但在那个狭小的房间里，你是自己的王——追剧、点外卖、撸猫，这就是你的诗和远方。世界很吵，你选择静音。",
    traits: ["宅家达人", "消息已读", "社交耗电", "内心丰富"],
    suitableFields: ["远程办公", "自由撰稿", "程序开发", "插画设计"],
    motto: "我不是高冷，我只是社恐到不敢回复。",
    color: "#4a5a8c",
    accentColor: "#c9a84c",
    cardImage: buildImage(
      "a reclusive introvert wrapped in a glowing blanket cocoon, surrounded by floating screens and cat silhouettes, headphones emitting golden sound waves, peaceful isolated realm, cozy cave aesthetic"
    ),
  },
  {
    id: 4,
    name: "戏精本精",
    title: "戏多到溢出的表演家",
    subtitle: "生活处处是舞台，全世界都是观众",
    description:
      "你的内心住着一个奥斯卡影帝。打翻一杯水能演成一部灾难片，发个朋友圈能写出800字小作文。你不是在演戏，你就是戏本身。别人'还好'，你'生死未卜'；别人'有点难过'，你'心碎成渣随风飘散'。你的情绪浓度永远拉满，你的反应永远超出预期。有人嫌你浮夸，但没有了你，这群人的生活该有多无聊啊。你是人间的调味剂，过量的那种。",
    traits: ["情绪拉满", "表达欲强", "存在感高", "内心戏多"],
    suitableFields: ["短视频博主", "演艺表演", "内容创作", "直播主播"],
    motto: "人生如戏，全靠演技，我演的是连续剧。",
    color: "#a85a8a",
    accentColor: "#f0c0d0",
    cardImage: buildImage(
      "a theatrical dramatic character with exaggerated pose, spotlights and golden stage curtains, masks of comedy and tragedy floating around, rose petals falling, opera singer silhouette, performative aura"
    ),
  },
  {
    id: 5,
    name: "摸鱼大师",
    title: "躺平摸鱼的佛系青年",
    subtitle: "卷是不可能卷的，这辈子都不可能",
    description:
      "你的座右铭是'差不多得了'。工作能60分绝不做61分，下班准时消失，周末人间蒸发。你不是没能力，只是觉得没必要。你深谙'装忙'的艺术，屏幕永远停留在某个正经页面，Alt+Tab切换得比谁都快。你看着同事卷生卷死，淡定地嘬了一口奶茶。有人说你不上进，但你清楚——这世上没什么值得你拼命，除了午休时间不被打扰。你的快乐，卷王永远不懂。",
    traits: ["佛系躺平", "准点下班", "装忙大师", "知足常乐"],
    suitableFields: ["体制内闲职", "图书管理", "后台运维", "自由职业"],
    motto: "努力不一定成功，但不努力一定很舒服。",
    color: "#2a6a4a",
    accentColor: "#d4af37",
    cardImage: buildImage(
      "a zen master of slacking off lounging on a golden cloud, holding a bubble tea, floating papers and work documents drifting away, peaceful Buddha-like expression, hammock between office plants"
    ),
  },
  {
    id: 6,
    name: "中央空调",
    title: "对谁都好的暖人",
    subtitle: "温暖全世界，唯独冷落身边人",
    description:
      "你是人见人爱的暖宝宝，对谁都温柔体贴，谁找你帮忙你都答应。朋友的情绪你能第一时间察觉，陌生人的请求你也不好意思拒绝。问题是你对谁都一样好，以至于你的'好'变得廉价。恋人嫌你中央空调，朋友觉得你老好人，而你自己累得像条狗还不好意思说。你的善良没有错，只是缺了点边界感。学会说'不'，是你一生的修行。",
    traits: ["温暖体贴", "不懂拒绝", "边界感弱", "人见人爱"],
    suitableFields: ["客户服务", "人力资源", "教育培训", "心理咨询"],
    motto: "我对谁都好，这有什么错？（其实有）",
    color: "#e8a060",
    accentColor: "#f0d060",
    cardImage: buildImage(
      "a warm radiant figure emitting golden heat waves to everyone around, multiple smaller figures basking in the glow, heart symbols floating, sun-like halo, gentle smile, overly generous aura"
    ),
  },
  {
    id: 7,
    name: "毒舌王者",
    title: "说话扎心的吐槽机器",
    subtitle: "一句顶一万句，句句带血",
    description:
      "你的嘴比刀还快，吐槽比呼吸还自然。别人穿新衣服你点评像穿搭博主翻车现场，朋友发朋友圈你的评论比正文好笑。你不是故意刻薄，只是看问题太准、说话太直。你的毒舌是天赋也是诅咒——朋友又爱又恨，陌生人敬而远之。但你心里清楚，那些被你扎过的人，最后都回来谢你说了真话。毕竟这年头，敢说真话的人不多了。",
    traits: ["嘴毒心软", "洞察犀利", "吐槽满级", "直来直去"],
    suitableFields: ["脱口秀", "评论博主", "广告创意", "辩论辩手"],
    motto: "我说话难听，但都是实话。不爱听？那你别活成笑话。",
    color: "#5a3a8a",
    accentColor: "#e0c0f0",
    cardImage: buildImage(
      "a sharp-tongued witty character with glowing golden speech bubbles containing thorns and daggers, smirking expression, jester hat, quick wit aura, sharp golden tongue, sarcasm made visible"
    ),
  },
  {
    id: 8,
    name: "控制狂魔",
    title: "事事要管的掌控者",
    subtitle: "不听我的，你就会后悔",
    description:
      "你的世界里没有'随便'两个字。吃什么、去哪、几点出发，你都要安排得明明白白。你不是不信任别人，只是觉得别人做得不如你好。你的日程表精确到分钟，你的计划书详细到每个Plan B。伴侣觉得窒息，同事觉得压迫，但不可否认——跟着你，事情就是能成。你的控制欲源于责任，也源于焦虑。学会放手，是你这辈子最难的功课。",
    traits: ["掌控全局", "计划周密", "事必躬亲", "焦虑驱动"],
    suitableFields: ["项目管理", "团队领导", "活动策划", "军事指挥"],
    motto: "听我的，我说的都对。不听？那就准备好后悔。",
    color: "#1a1a2e",
    accentColor: "#c9a84c",
    cardImage: buildImage(
      "a commanding control figure surrounded by floating puppet strings and golden gears, holding a glowing master plan scroll, crown of authority, chessboard of life, imperious aura"
    ),
  },
  {
    id: 9,
    name: "老好人",
    title: "不懂拒绝的讨好型人格",
    subtitle: "好的好的没问题，我再想想办法",
    description:
      "你的口头禅是'好的没问题'。同事甩锅你接，朋友借钱你借，亲戚催婚你陪笑。你害怕冲突胜过害怕死亡，'算了'是你说过最多的两个字。你把所有人照顾得很好，唯独忘了照顾自己。深夜你躺在床上想起今天又委屈了自己三次，眼泪掉到枕头上，第二天起来继续当老好人。你的善良是糖，甜到忧伤。该翻脸时翻脸，这堂课你什么时候能上？",
    traits: ["有求必应", "害怕冲突", "委屈自己", "过度善良"],
    suitableFields: ["行政后勤", "社区服务", "客户支持", "公益志愿"],
    motto: "算了算了，没关系，我可以的。（其实不可以）",
    color: "#6a8a6a",
    accentColor: "#f0d060",
    cardImage: buildImage(
      "a self-sacrificing kind figure with golden halo, carrying stacks of favors and obligations on back, multiple hands reaching for help, gentle tired smile, martyr-like aura, too many promises"
    ),
  },
  {
    id: 10,
    name: "鸽子精",
    title: "放鸽子成瘾的爽约王",
    subtitle: "下次一定，一定不会来",
    description:
      "你是社交圈的薛定谔的猫——约你之前不知道你来不来，约了之后依然不知道。你的'在路上了'可能意味着刚起床，你的'马上到'可能意味着还没出门。你不是恶意爽约，只是每次临近时间，突然就有一种'要不算了'的冲动。你的床有引力，你的WiFi有锁链。朋友约你十次能见你一次，那一次你还会迟到。但不得不承认，能约到你的人，是你真心在乎的人。",
    traits: ["爽约成瘾", "赖床选手", "社交拖延", "临阵退缩"],
    suitableFields: ["自由职业", "弹性工作", "夜间岗位", "独立创作"],
    motto: "我真的在路上了！（其实还在床上）",
    color: "#c8762e",
    accentColor: "#f0d060",
    cardImage: buildImage(
      "a perpetually late character with golden pigeon wings, floating alarm clocks and broken promises, tangled in bedsheets, apologetic grin, tardiness made visible, time slips away"
    ),
  },
  {
    id: 11,
    name: "玻璃心",
    title: "一碰就碎的敏感灵魂",
    subtitle: "别人无心一句话，你能内耗一整晚",
    description:
      "你的心是水晶做的，漂亮但易碎。同事一个无心的眼神你能解读出108种含义，朋友半天才回消息你已经在反思自己做错了什么。你的共情能力强到能感知空气里的情绪变化，但也因此活得格外疲惫。你习惯性内耗，习惯性反思，习惯性把所有问题揽到自己身上。你的敏感是天赋也是负担——它让你更懂这个世界，也让这个世界更容易伤到你。请对自己温柔一点。",
    traits: ["高度敏感", "内耗大师", "共情满级", "容易受伤"],
    suitableFields: ["艺术创作", "心理研究", "文学写作", "音乐表演"],
    motto: "你说的对，都是我的错……（其实不是）",
    color: "#9a5ac8",
    accentColor: "#e0c0f0",
    cardImage: buildImage(
      "a fragile crystalline heart figure surrounded by cracked glass and golden repair lines kintsugi style, tear drops turning into stars, sensitive soul aura, delicate beauty, emotional depth"
    ),
  },
  {
    id: 12,
    name: "钢铁直球",
    title: "不解风情的直球选手",
    subtitle: "弯弯绕绕看不懂，一拳直击要害",
    description:
      "你的思维是一条直线，拐弯都不会。别人暗示你十遍你还在等下文，对方气走了你都不知道为什么。你的喜欢是直球，你的讨厌也是直球，社交潜规则对你来说是门外语。你不懂浪漫，但你的真诚比任何情话都动人；你不会哄人，但你的靠谱比任何承诺都管用。这个世界弯弯绕绕太多，需要你这样一根直肠子来捅破窗户纸。不解风情又怎样，你活得坦荡。",
    traits: ["直来直去", "不懂暗示", "真诚坦荡", "浪漫绝缘"],
    suitableFields: ["技术工程", "数据分析", "军警执法", "竞技体育"],
    motto: "你直说，别让我猜，猜不出来还嫌我直。",
    color: "#8a8a92",
    accentColor: "#f0d060",
    cardImage: buildImage(
      "a straightforward blunt character in silver and gold armor, holding a glowing golden straight bat ready to swing, no curves only straight lines, honest direct gaze, iron and steel aesthetic"
    ),
  },
  {
    id: 13,
    name: "人间清醒",
    title: "看透一切的毒鸡汤导师",
    subtitle: "别人在演戏，你在看剧本",
    description:
      "你是朋友圈里的'清醒剂'。别人恋爱脑你泼冷水，别人内耗你一句点醒。你不卷不躺，站在旁边看戏，偶尔点评两句，句句扎在要害。你不是冷血，只是太早就把人性的底牌看穿了。你不下场，因为你知道这局游戏的规则。别人觉得你通透得可怕，你只是懒得自欺欺人。你的清醒是盔甲也是牢笼——看透了太多，反而很难再投入。也许偶尔装一次糊涂，会让你活得更轻松。",
    traits: ["理性通透", "看破不说破", "拒绝内耗", "人间毒鸡汤"],
    suitableFields: ["投资分析", "心理咨询", "战略顾问", "评论作者"],
    motto: "我不是冷血，我只是提前看完了剧本，懒得配合演戏。",
    color: "#2a5a4a",
    accentColor: "#f0d060",
    cardImage: buildImage(
      "a clairvoyant sage holding a glowing golden mirror revealing truth, surrounded by shattered illusions and golden mist, third eye glowing, calm all-knowing expression, lantern of enlightenment,看清迷雾"
    ),
  },
  {
    id: 14,
    name: "社交牛逼症",
    title: "和谁都能聊的气氛组组长",
    subtitle: "三分钟熟络，五分钟拜把子",
    description:
      "你是行走的社交充电宝，走到哪亮到哪。排队能跟前后聊起来，打车能让司机喊你兄弟。你的嘴比嘴还快，你的脸比脸还厚。没有你接不上的话，没有你破不了的冰。你不是在社交，你就是在呼吸。别人社恐你社牛，别人已读不回你语音轰炸。你是每一个饭局的灵魂，每一个冷场的终结者。但热闹散场后，你偶尔也会想——这么多人认识你，真正懂你的又有几个？不过这个念头只持续三秒，因为下一个局又开始了。",
    traits: ["自来熟", "气氛担当", "话痨本痨", "谁都能聊"],
    suitableFields: ["销售商务", "活动主持", "社区运营", "公关外交"],
    motto: "没有我热不起来的场子，如果有，那是我还没到。",
    color: "#e85a3a",
    accentColor: "#f0d060",
    cardImage: buildImage(
      "a radiant social butterfly character at the center of a golden crowd, multiple speech bubbles and connecting threads of light, magnetic charisma aura, party soul, glowing with infectious energy"
    ),
  },
  {
    id: 15,
    name: "emo制造机",
    title: "深夜网抑云的重度患者",
    subtitle: "白天哈哈哈，晚上呜呜呜",
    description:
      "白天你是人群中的段子手，深夜你是被窝里的流泪猫。你的情绪有开关，一到凌晨十二点自动切到emo模式。一首老歌能让你哭半宿，一条旧动态能让你缅怀三年。你不是不快乐，只是快乐的保质期太短，emo的续航太长。你的朋友圈深夜限定伤感文学，你的歌单全是'这首歌唱的是我'。你把矫情活成了艺术，把伤感酿成了诗意。其实你比谁都清楚自己在演，但那一刻的眼泪是真的。明天太阳升起，你又是那个哈哈哈的人。",
    traits: ["深夜emo", "文艺忧郁", "网抑云VIP", "伤春悲秋"],
    suitableFields: ["词曲创作", "文学写作", "摄影艺术", "播客电台"],
    motto: "不是我爱emo，是这个世界太值得难过了。（明天继续哈哈哈）",
    color: "#3a4a8c",
    accentColor: "#c0c8f0",
    cardImage: buildImage(
      "a melancholic poet under moonlight, tears turning into golden musical notes, rain drops and starlight, vinyl record playing sadness, midnight blue and gold aesthetic, emotional depth, artistic sorrow"
    ),
  },
];

export function getPersonality(id: number): Personality {
  return personalities.find((p) => p.id === id) ?? personalities[0];
}
