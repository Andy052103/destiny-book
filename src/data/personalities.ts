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

export function getPersonality(id: number): Personality {
  return personalities.find((p) => p.id === id) ?? personalities[0];
}

export const personalities: Personality[] = [
  {
    id: 1,
    name: "海王本王",
    title: "多情泛滥的撩人高手",
    subtitle: "鱼塘千万，皆为备胎",
    description:
      "你是天生的情感捕手，三句话让对方沦陷，五分钟确定下一个目标。你的魅力不在于专一，而在于让每个人都觉得自己是唯一。鱼塘管理井井有条，每条鱼都觉得自己是海里的王。但深夜里你也会问自己：到底是他们离不开我，还是我离不开这种被需要的感觉？",
    traits: ["魅力爆表", "情感游走", "高情商伪装", "难以专一", "夜深人静的孤独"],
    suitableFields: ["销售公关", "自媒体", "主播艺人", "情感咨询"],
    motto: "专一是给凡人的，我是海的王",
    color: "#8b1a3a",
    accentColor: "#f0d060",
    cardImage: buildImage(
      "a seductive elegant figure holding a trident, surrounded by multiple heart-shaped fish swimming in golden mist, mysterious smile, dark velvet robes, temptation aura"
    ),
  },
  {
    id: 2,
    name: "卷王之王",
    title: "永不停歇的内卷达人",
    subtitle: "卷不动了？不存在的",
    description:
      "你的字典里没有'躺平'两个字。别人下班你加班，别人周末你学习，别人睡觉你规划人生。你不是被时代裹挟，你是主动跳进卷轴的那个人。你的努力不是为了证明给谁看，而是停下来的瞬间你会焦虑到窒息。但偶尔也会想：这么拼，到底是为了什么？",
    traits: ["高效执行", "目标导向", "休息焦虑", "自我驱动", "KPI信仰"],
    suitableFields: ["互联网大厂", "金融投行", "创业老板", "科研学术"],
    motto: "今天不卷，明天没饭",
    color: "#1a4d8b",
    accentColor: "#f0d060",
    cardImage: buildImage(
      "a determined warrior in golden armor holding a glowing sword of progress, surrounded by floating scrolls and stars, intense focused eyes, crown of achievement"
    ),
  },
  {
    id: 3,
    name: "社恐天花板",
    title: "深度社恐的家里蹲",
    subtitle: "能打字绝不说话，能在家绝不出门",
    description:
      "你的舒适圈是以床为圆心、WIFI为半径的圆。电话铃声是你的催命符，陌生人主动搭话是世界末日。你不是不会社交，是社交一次需要充能三天。但你心里其实有个热闹的小宇宙，只是更愿意在脑内自嗨，不愿对外广播。",
    traits: ["内向深思", "社交耗能", "脑内剧场丰富", "独处充电", "文字优于语言"],
    suitableFields: ["程序员", "插画师", "作家编剧", "数据分析师"],
    motto: "别打电话，我怕",
    color: "#3a2a5a",
    accentColor: "#f0d060",
    cardImage: buildImage(
      "a cloaked figure hiding in a hooded robe, surrounded by floating screens and books, soft purple glow, a small cat companion, mysterious introverted aura"
    ),
  },
  {
    id: 4,
    name: "戏精本精",
    title: "戏多到溢出的表演家",
    subtitle: "生活处处是舞台，全世界都是观众",
    description:
      "你的生活就是一部连续剧，而且你是编剧、导演、主演三位一体。一杯咖啡能脑补出一部悬疑片，一条未读消息能演出八集情感剧。朋友说你夸张，但你知道：平淡日子不加点戏，怎么熬得过去？你的存在让世界不至于太无聊。",
    traits: ["想象力爆棚", "情绪外放", "戏剧化表达", "脑补大师", "氛围制造者"],
    suitableFields: ["演员表演", "内容创作", "广告创意", "活动策划"],
    motto: "人生如戏，全靠演技",
    color: "#8b6a1a",
    accentColor: "#f0d060",
    cardImage: buildImage(
      "a theatrical jester holding two golden masks of comedy and tragedy, dramatic pose, swirling golden mist, stage curtains in background, charismatic performer"
    ),
  },
  {
    id: 5,
    name: "摸鱼大师",
    title: "躺平摸鱼的佛系青年",
    subtitle: "卷是不可能卷的，这辈子都不可能",
    description:
      "你是公司里最会装忙的人，也是朋友里最会'下次一定'的人。你的核心人生哲学是：能拖就拖，能躺就躺，能不接的电话绝不接。别人焦虑KPI，你焦虑午休吃什么。你不是没能力，你只是选择把能量留给真正重要的事——比如睡觉。",
    traits: ["佛系应对", "拖延美学", "装忙专家", "活在当下", "反内卷先锋"],
    suitableFields: ["公务员事业编", "自由职业", "内容创作者", "海归待业"],
    motto: "急什么，又不会死",
    color: "#2a5a4a",
    accentColor: "#f0d060",
    cardImage: buildImage(
      "a relaxed sage lying on a floating cloud, holding a cup of tea, golden koi fish swimming around, peaceful smile, bamboo and lotus decorations, zen master aura"
    ),
  },
  {
    id: 6,
    name: "毒舌王者",
    title: "说话扎心的吐槽机器",
    subtitle: "一句顶一万句，句句带血",
    description:
      "你是天生的语言刺客，三句话让对方破防，五个字让群聊鸦雀无声。你的嘴是双刃剑：戳穿虚伪一针见血，但也常常误伤友军。朋友又爱又怕——爱你说话痛快，怕自己哪天成为靶子。其实你不是嘴毒，是看不得装腔作势。",
    traits: ["一针见血", "逻辑锋利", "反矫情", "嘴上不饶人", "内心其实柔软"],
    suitableFields: ["脱口秀", "评论自媒体", "律师辩护", "产品经理"],
    motto: "我不是嘴毒，是你们太装",
    color: "#6a1a4d",
    accentColor: "#f0d060",
    cardImage: buildImage(
      "a sharp-eyed figure with a silver tongue literally glowing, holding a golden dagger made of words, dark elegant attire, mocking smile, intelligence aura"
    ),
  },
  {
    id: 7,
    name: "鸽子精",
    title: "放鸽子成瘾的爽约王",
    subtitle: "下次一定，一定不会来",
    description:
      "你的口头禅是'下次一定'，'下次'是永远不会到来的未来。约好的饭局你临时有事，定好的会议你睡过头，连自己定的人生目标都能鸽到下辈子。你不是故意的，是每次到了时间点，'不去'这个念头就会自动占据大脑。朋友已经习惯了，但还在等你。",
    traits: ["计划性弱", "临阵脱逃", "事后愧疚", "时间观念玄学", "真香体质"],
    suitableFields: ["自由职业", "创意行业", "深夜主播", "流浪艺术家"],
    motto: "想去想去，下次一定",
    color: "#4a4a5a",
    accentColor: "#f0d060",
    cardImage: buildImage(
      "a winged figure with white dove feathers flying away from a clock, golden sand slipping through fingers, apologetic smile, time distortion effects"
    ),
  },
  {
    id: 8,
    name: "钢铁直球",
    title: "不解风情的直球选手",
    subtitle: "弯弯绕绕看不懂，一拳直击要害",
    description:
      "你是恋爱市场的逻辑鬼才，对方说'我没事'你就真的以为没事，对方说'你猜'你直接说猜不到。你的世界里没有潜台词，没有弯弯绕绕，只有'是'和'不是'。这种直球有时让人窒息，有时又让人舒服——至少跟你相处，不用猜。",
    traits: ["直线思维", "不解暗示", "坦率真诚", "逻辑至上", "浪漫绝缘体"],
    suitableFields: ["工程师", "程序员", "数据分析", "技术管理"],
    motto: "有话直说，别让我猜",
    color: "#5a3a1a",
    accentColor: "#f0d060",
    cardImage: buildImage(
      "a stoic warrior holding a massive iron hammer, straightforward posture, geometric patterns, unmovable mountain background, blunt honest eyes"
    ),
  },
  {
    id: 9,
    name: "恋爱脑本脑",
    title: "一谈恋爱就降智的纯爱战神",
    subtitle: "为爱可以不要命，但不能不要对象",
    description:
      "你是行走的恋爱教学反面案例。单身时理智清醒见解独到，一恋爱立刻降智到小学生水平。对象三小时不回消息你脑补出八百集悲剧，对方一句'多喝热水'你能感动到流泪。朋友劝你清醒，你嘴上答应转头又去给对象转账。你不是不懂，是甘愿。",
    traits: ["感情至上", "脑补王者", "卑微到尘埃", "为爱降智", "纯爱信仰"],
    suitableFields: ["情感博主", "婚庆行业", "小说创作", "公益志愿者"],
    motto: "只要是他/她，怎样都行",
    color: "#8b3a5a",
    accentColor: "#f0d060",
    cardImage: buildImage(
      "a lovestruck figure with heart-shaped golden chains binding them, holding a broken crown, teary adoring eyes, rose petals swirling, tragic romantic aura"
    ),
  },
  {
    id: 10,
    name: "搞钱脑",
    title: "眼里只有搞钱的人间清醒",
    subtitle: "感情可以没有，钱不能不搞",
    description:
      "你是当代最务实的人间清醒代表。别人谈恋爱你研究副业，别人emo你看财报，别人发朋友圈你发广告。你的手机置顶是股票基金和银行APP，你的口头禅是'这个能赚钱吗'。别人觉得你功利，但你知道：成年人的世界，没钱谈什么感情和理想？",
    traits: ["目标清晰", "反emo达人", "副业狂魔", "价值导向", "情绪稳定"],
    suitableFields: ["金融投资", "电商创业", "销售业务", "商业咨询"],
    motto: "搞钱使我快乐，搞对象浪费时间",
    color: "#4a5a1a",
    accentColor: "#f0d060",
    cardImage: buildImage(
      "a calculating merchant surrounded by floating golden coins and abacus, sharp intelligent eyes, money tree growing behind, business strategist aura"
    ),
  },
  {
    id: 11,
    name: "立 flag 狂人",
    title: "三分钟热度集大成者",
    subtitle: "立时雄心万丈，三天后查无此人",
    description:
      "你是当代 flag 制造机。办了健身卡第三天转手，买课学习第五天退款，立誓早睡当晚熬夜到三点。你的兴趣广泛到惊人，踩过的坑比谁都多，但真正坚持下来的几乎没有。朋友已经习惯你的'这次一定'，你也习惯了三天后的自己。你不是没努力过，只是热情的保质期实在太短。",
    traits: ["三分钟热度", "flag制造机", "踩坑达人", "热情易逝", "始终在重启"],
    suitableFields: ["自由探索", "内容创作", "兴趣电商", "副业试水"],
    motto: "这次我一定坚持到底（大概）",
    color: "#b85a3a",
    accentColor: "#f0d060",
    cardImage: buildImage(
      "a hopeful dreamer surrounded by broken golden flags and unfinished scrolls, scattered abandoned tools, determined yet guilty expression, sunset background"
    ),
  },
  {
    id: 12,
    name: "嘴硬心软",
    title: "刀子嘴豆腐心的傲娇怪",
    subtitle: "嘴上说不要，身体很诚实",
    description:
      "你是嘴上不饶人心里却比谁都软的矛盾体。骂朋友'活该单身'转头给人家介绍对象，吐槽同事'菜得抠脚'私下帮他改方案。你的爱都藏在毒舌里，关心都伪装成嫌弃。懂你的人会心一笑，不懂的人会真以为你冷漠。其实你只是不会表达温柔。",
    traits: ["刀子嘴豆腐心", "傲娇属性", "关心伪装", "嘴硬到底", "内心柔软"],
    suitableFields: ["教师", "医护", "心理咨询", "产品运营"],
    motto: "我才不是为你，顺手而已",
    color: "#7a3a2a",
    accentColor: "#f0d060",
    cardImage: buildImage(
      "a tsundere warrior with a harsh exterior but holding a hidden golden heart glowing inside, thorny rose decoration, crossed arms, soft eyes betraying tough pose"
    ),
  },
  {
    id: 13,
    name: "白日梦想家",
    title: "现实是壳，脑内才是主场",
    subtitle: "开会指挥星际舰队，通勤写完三部曲",
    description:
      "你是当代最沉浸式的白日梦想家。开会时你在脑内指挥星际舰队，通勤时你在脑内写完了三部曲小说，睡前脑内演完了一整部电影还自己配了BGM。朋友说你走神，老板说你心不在焉，但只有你知道：你的脑内世界比现实精彩一万倍。你不是逃避现实，是现实这个壳子实在装不下你的想象力。",
    traits: ["脑洞清奇", "沉浸幻想", "走神大师", "执行力滞后", "想象力王者"],
    suitableFields: ["小说创作", "游戏策划", "影视编剧", "广告创意"],
    motto: "现实是壳，脑内才是主场",
    color: "#4a3a6a",
    accentColor: "#f0d060",
    cardImage: buildImage(
      "a dreamer with closed eyes surrounded by floating thought bubbles containing galaxies and fantasy worlds, golden imagination streams, surreal peaceful expression"
    ),
  },
  {
    id: 14,
    name: "平平无奇正常人",
    title: "藏在大多数人里的中间位",
    subtitle: "卷不动也躺不平，就活在中间",
    description:
      "你既不是人群中最亮眼的那个，也不是角落里最沉默的那个。你不拼命卷，也不彻底躺，按部就班上班下班，偶尔emo偶尔振作。看到别人秀恩爱你会酸一下，看到别人卷你会叹一下，但转过身该吃吃该喝喝。你没什么特别的人设，但你的存在本身就是大多数人的真实写照——平淡、平衡、不戏剧化，但日子过得去。",
    traits: ["情绪平稳", "中庸之道", "不极端", "务实生活", "隐形大多数"],
    suitableFields: ["各行各业稳定岗位", "行政管理", "教培服务", "通用职能岗"],
    motto: "差不多就行，日子是过出来的",
    color: "#5a5a4a",
    accentColor: "#f0d060",
    cardImage: buildImage(
      "a neutral balanced figure standing at the center of a golden scale, neither ascending nor descending, calm peaceful expression, equal light and shadow"
    ),
  },
  {
    id: 15,
    name: "豪爽大哥",
    title: "放荡不羁讲义气的江湖大哥",
    subtitle: "兄弟一声大过天，规矩是给陌生人看的",
    description:
      "你是天生的江湖大哥型人格。朋友有难第一个冲，酒桌上有你在气氛永远不冷。你不懂弯弯绕绕，也不喜欢揣摩心思，看不惯的事当场就讲，护短护到不讲理。别人觉得你粗线条，但懂你的人都知道：你的豪爽底下是真心，你的义气比合同还靠谱。你的世界很简单——是自己人，就护到底。",
    traits: ["讲义气", "豪爽直接", "护短", "江湖气", "粗中有细"],
    suitableFields: ["销售业务", "餐饮老板", "工程承包", "团队管理"],
    motto: "是自己人，就护到底",
    color: "#8b5a2a",
    accentColor: "#f0d060",
    cardImage: buildImage(
      "a bold chieftain figure with a broad sword, surrounded by loyal companions, golden wine cups, hearty laugh, warm campfire light, brotherhood aura"
    ),
  },
];
