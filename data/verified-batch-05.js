(()=>{'use strict';
const B={
 "Discothyrea banna":{
  status:"物种级资料核验批次05",
  summary:"Discothyrea banna 是中国云南西双版纳描述的卷尾猛蚁，目前仅知工蚁；已知采集点集中在勐腊县海拔约900 m以上的闭合森林。",
  distribution:"中国云南；目前记录集中于西双版纳勐腊县。",
  habitat:"闭合森林，记录包括半常绿季雨林和雨林，采集海拔约900–1210 m。",
  worker:"工蚁总长约2.5–2.9 mm，正模约2.8 mm。",
  ecology:"与 Discothyrea diana 可同域出现，甚至曾在同一20 m × 20 m调查样方中共同采到。",
  identification:"触角9节；与 D. kamiteta 等近缘种的区分需结合头后缘、前唇基、前胸背板和腹柄节形态。",
  nomenclature:"Xu、Burwell 与 Nakamura 于2014年描述本种，模式系列均为工蚁。",
  sources:[["AntWiki · Discothyrea banna","https://www.antwiki.org/wiki/Discothyrea_banna","原始描述摘要、生境、体长与分布资料"]]
 },
 "Discothyrea clavicornis":{
  status:"物种级资料核验批次05",
  summary:"Discothyrea clavicornis 是从新几内亚描述、分布跨越东南亚至西太平洋的卷尾猛蚁，中国也有区域记录；物种级自然史资料目前很少。",
  distribution:"记录包括中国、菲律宾、巴布亚新几内亚和所罗门群岛等地区；模式产地为巴布亚新几内亚。",
  nomenclature:"Emery 于1897年描述本种，最初模式材料为工蚁，后有蚁后记录。",
  sources:[["AntWiki · Discothyrea clavicornis","https://www.antwiki.org/wiki/Discothyrea_clavicornis","分布、模式材料与分类资料"]]
 },
 "Discothyrea diana":{
  status:"物种级资料核验批次05",
  summary:"Discothyrea diana 是中国云南南部描述的卷尾猛蚁，目前仅知工蚁，记录来自勐腊和河口的闭合森林。",
  distribution:"中国云南；已知于勐腊县和河口县。",
  habitat:"云南南部闭合森林，采集海拔约700 m和1200 m附近；模式材料来自雨林枯落物/土壤提取。",
  identification:"触角7节；腹柄节背面横向凹陷、腹柄节腹突较大且近三角形，是与近缘种区分的重要特征组合。",
  nomenclature:"Xu、Burwell 与 Nakamura 于2014年描述本种，模式系列均为工蚁。",
  sources:[["AntWiki · Discothyrea diana","https://www.antwiki.org/wiki/Discothyrea_diana","原始描述摘要、生境、分布与鉴别资料"]]
 },
 "Discothyrea kamiteta":{
  status:"物种级资料核验批次05",
  summary:"Discothyrea kamiteta 是中国和日本记录的小型卷尾猛蚁，工蚁约2 mm出头，可在原生林、石灰岩林、次生林和阔叶林枯落物中采到。",
  distribution:"中国、日本；模式产地为日本琉球群岛冲绳岛。",
  habitat:"枯落物层；记录生境包括原生林、石灰岩林、次生林和阔叶林。",
  worker:"工蚁总长约2.3 mm，通常略大于2 mm。",
  identification:"体色红褐，触角9节，复眼较大并明显突出；与 D. sauteri 相比体型略大、眼更大且胸部更短高。",
  nomenclature:"Kubota 与 Terayama 于1999年描述本种。",
  sources:[["AntWiki · Discothyrea kamiteta","https://www.antwiki.org/wiki/Discothyrea_kamiteta","体长、生境、分布与鉴别资料"]]
 },
 "Discothyrea sauteri":{
  status:"物种级资料核验批次05",
  summary:"Discothyrea sauteri 是东亚小型卷尾猛蚁，已有直接物种级观察显示其在腐朽树桩中筑巢，并取食蜘蛛和蜈蚣的卵。",
  distribution:"中国、日本、韩国、新加坡及台湾等地；模式产地为台湾。",
  habitat:"森林隐蔽微生境，已有腐朽树桩筑巢记录。",
  nest:"在腐朽树桩中筑巢。",
  diet:"已观察取食蜘蛛卵和蜈蚣卵。",
  colony:"公开性状资料将其记录为可兼性多后（facultatively polygynous）。",
  nomenclature:"Forel 于1912年以 Discothyrea globus var. sauteri 描述，后提升为独立种。",
  sources:[["AntWiki · Discothyrea sauteri","https://www.antwiki.org/wiki/Discothyrea_sauteri","食性、筑巢、分布与分类资料"]]
 },
 "Discothyrea testacea":{
  status:"物种级资料核验批次05",
  summary:"Discothyrea testacea 是北美至加勒比地区记录的极小型隐蔽卷尾猛蚁，群落小、行动缓慢，受扰时会静止不动，因此容易在常规调查中被漏检。",
  distribution:"北美和加勒比地区；美国记录从北卡罗来纳、佛罗里达向西至俄克拉荷马，区域名录还包括墨西哥、古巴和多米尼加等。",
  habitat:"枯落物、腐殖质和腐木等隐蔽微生境；美国东南部记录涵盖干旱灌丛、松林、湿润阔叶林等多种生境。",
  nest:"小型群落可出现在枯落物、腐木以及埋藏的空橡子等微型巢址中。",
  worker:"工蚁体长小于约2 mm。",
  behavior:"受扰后常进入静止状态，类似“装死”，使其更难被发现。",
  diet:"被怀疑捕食节肢动物卵、尤其蜘蛛卵，但该食性在本种仍应视为尚待进一步确认。",
  nomenclature:"Roger 于1863年描述本种，是 Discothyrea 属模式种。",
  sources:[["AntWiki · Discothyrea testacea","https://www.antwiki.org/wiki/Discothyrea_testacea","分布、生境、体型、行为与自然史资料"]]
 },
 "Probolomyrmex longiscapus":{
  status:"物种级资料核验批次05",
  summary:"Probolomyrmex longiscapus 是中国云南至中南半岛记录的卷尾猛蚁亚科物种，自然史目前基本未知，但已有明确的模式采集、体型和分布资料。",
  distribution:"中国云南、老挝和越南北部。",
  habitat:"模式工蚁来自云南勐腊县约820 m海拔的土壤样品；物种级生态资料仍不足。",
  worker:"正模工蚁总长约3.0 mm。",
  identification:"触角柄节较长；工蚁和蚁后与 P. longinodus 接近，需结合腹柄节后背缘和触角节比例等特征鉴别。",
  nomenclature:"Xu 与 Zeng 于2000年描述本种，后续已有蚁后和雄蚁描述。",
  sources:[["AntWiki · Probolomyrmex longiscapus","https://www.antwiki.org/wiki/Probolomyrmex_longiscapus","分布、模式生境、工蚁体长与鉴别资料"]]
 },
 "Proceratium bruelheidei":{
  status:"物种级资料核验批次05",
  summary:"Proceratium bruelheidei 是中国江西和浙江记录的卷尾猛蚁，模式系列多来自亚热带混交林实验林的枯落物调查。",
  distribution:"中国；已知记录来自江西婺源附近和浙江古田山国家级自然保护区。",
  habitat:"亚热带混交林枯落物层；多数模式材料来自较年轻的人工实验林，另有早期演替林分记录。是否偏好早期演替环境仍需更多采样验证。",
  nomenclature:"Staab、Xu 与 Hita Garcia 于2018年描述本种。",
  sources:[["AntWiki · Proceratium bruelheidei","https://www.antwiki.org/wiki/Proceratium_bruelheidei","分布、枯落物采集和生境讨论"]]
 },
 "Proceratium google":{
  status:"物种级资料核验批次05",
  summary:"Proceratium google 是马达加斯加东北部孤立山地已知的稀有卷尾猛蚁，目前仅知工蚁，所有可靠记录集中于 Anjanaharibe-Sud 山地保护区。",
  distribution:"马达加斯加东北部 Anjanaharibe-Sud 特别保护区，目前未见其他地区可靠记录。",
  habitat:"山地雨林枯落物，已知采集海拔约1200–1565 m。",
  identification:"腹部第IV节背板末端均匀圆弧、无明显凹陷，前唇基中叶截形，腹柄节低而结节状等特征用于与近缘种区分。",
  nomenclature:"Fisher 于2005年描述本种，种名用于致意 Google 对生物多样性信息检索的潜在贡献。",
  sources:[["AntWiki · Proceratium google","https://www.antwiki.org/wiki/Proceratium_google","模式产地、山地雨林生境与鉴别资料"]]
 },
 "Proceratium longigaster":{
  status:"物种级资料核验批次05",
  summary:"Proceratium longigaster 由越南中部模式材料描述。过去部分中国南方材料曾被鉴定为本种，但2025年的修订研究对这些中国记录提出重新鉴定意见，因此站内将中国分布作为存在分类争议的历史记录处理。",
  distribution:"可靠模式产地为越南中部 Bà Nà 山地。历史文献曾报道中国云南、湖南、浙江等地，但2025年修订认为部分中国材料属于其他物种，建议将本种排除出中国蚁相；中国记录目前标记为待进一步厘清。",
  habitat:"越南模式产地约1400 m；相关材料多来自常绿阔叶林地表或腐木，但中国材料的物种归属存在最新分类争议。",
  worker:"历史上归入本种的测量材料总长约2.66–3.10 mm；由于部分中国材料现被重新解释，该范围不作为全种稳定核心参数。",
  nomenclature:"Karavaiev 于1935年描述本种。2025年中国 Proceratium 修订对以往中国 P. longigaster 鉴定提出异议，需保留这一最新分类说明。",
  sources:[["AntWiki · Proceratium longigaster","https://www.antwiki.org/wiki/Proceratium_longigaster","模式产地、历史中国记录及2025分类修订说明"]]
 },
 "Proceratium zhaoi":{
  status:"物种级资料核验批次05",
  summary:"Proceratium zhaoi 是中国云南森林土壤中记录的地下生活卷尾猛蚁；目前仅知云南南部和西部少数地点，但模式群落提供了难得的物种级群落数据。",
  distribution:"中国云南；已知地点包括南部勐海以及西部怒江河谷附近山地。",
  habitat:"中海拔森林土壤，记录包括落叶阔叶林土样和云南松林河谷坡地。",
  nest:"从土壤样品中发现群落，体态和采集方式支持强烈地下生活倾向。",
  colony:"原始描述的一处模式群落记录约45个个体。",
  nomenclature:"Xu 于2000年描述本种；Proceratium nujiangense 后被处理为其同物异名。",
  sources:[["AntWiki · Proceratium zhaoi","https://www.antwiki.org/wiki/Proceratium_zhaoi","云南生境、45个体群落、分布与分类资料"]]
 }
};
window.ANTDEX_IMPORT?.('verified-batch-05',B);
})();
