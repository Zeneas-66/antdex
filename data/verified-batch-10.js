(()=>{'use strict';
const B={
 "Anochetus graeffei":{
  status:"物种级资料核验批次10",
  summary:"格拉夫钩猛蚁（Anochetus graeffei）是钩猛蚁属中分布最广的种类之一，从南亚经东南亚延伸到澳大利亚和太平洋岛屿；典型利用地面隐蔽空间和腐木筑巢。",
  distribution:"从印度南部向东经中国、东南亚、新几内亚和澳大利亚，并延伸到斐济、萨摩亚、库克群岛等众多太平洋岛屿。",
  habitat:"澳大利亚最常见于雨林，也进入干燥硬叶林；整体以森林环境记录最多。",
  nest:"通常在石块或其他地表覆盖物下筑巢，也可直接土中筑巢，并有白蚁巢和腐木中的巢群记录。",
  identification:"大型区域分布种且形态变异明显；准确鉴别需要结合上颚、头部雕刻、前胸和腹柄节结构。",
  nomenclature:"Mayr 于1870年描述本种；多个历史名称已并为同物异名。",
  sources:[["AntWiki · Anochetus graeffei","https://www.antwiki.org/wiki/Anochetus_graeffei","广域分布、森林生境与多样巢址资料"]]
 },
 "Anochetus mixtus":{
  status:"物种级资料核验批次10",
  summary:"Anochetus mixtus 是中国云南和越南记录的钩猛蚁，既见于低地也见于高地的原生、次生森林，巢群通常位于腐木内部或腐木树皮下。",
  distribution:"中国、越南。",
  habitat:"从低地到高地的原生和次生森林。",
  nest:"在腐朽木材内部或腐木树皮下筑巢。",
  identification:"属于 rugosus 种团；与 A. rugosus 相比，头顶大部平滑有光泽、腹柄节上半部较光滑。",
  nomenclature:"Radchenko 于1993年描述本种；Anochetus yunnanensis 后被处理为其同物异名。",
  sources:[["AntWiki · Anochetus mixtus","https://www.antwiki.org/wiki/Anochetus_mixtus","中越分布、森林和腐木巢址、鉴别及同物异名资料"]]
 },
 "Anochetus myops":{
  status:"物种级资料核验批次10",
  summary:"Anochetus myops 是东南亚森林中的钩猛蚁，目前物种页主要提供分类和分布资料，直接自然史记录仍较少。",
  distribution:"婆罗洲、印度、印度尼西亚、马来西亚和泰国；模式产地为马来半岛。",
  nomenclature:"Emery 于1893年描述本种。",
  sources:[["AntWiki · Anochetus myops","https://www.antwiki.org/wiki/Anochetus_myops","分布、模式材料和分类资料"]]
 },
 "Anochetus risii":{
  status:"物种级资料核验批次10",
  summary:"里氏钩猛蚁（Anochetus risii）是中国南部、台湾并延伸到越南和印度尼西亚的钩猛蚁，工蚁约5 mm出头。",
  distribution:"中国、台湾、越南和印度尼西亚。",
  worker:"工蚁总长约5.12–5.34 mm。",
  identification:"与中国近缘种相比，上颚内缘具有5–8个小齿，前胸中部较光滑，需结合中胸和腹柄节结构鉴别。",
  nomenclature:"Forel 于1900年描述本种；Anochetus taiwaniensis 于2019年被处理为其同物异名。",
  sources:[["AntWiki · Anochetus risii","https://www.antwiki.org/wiki/Anochetus_risii","中国—东南亚分布、工蚁体长与同物异名资料"]]
 },
 "Anochetus rugosus":{
  status:"物种级资料核验批次10",
  summary:"粗糙钩猛蚁（Anochetus rugosus）是东南亚 rugosus 种团成员，当前可靠区域记录集中在婆罗洲、印度尼西亚、马来西亚、新加坡和泰国。",
  distribution:"婆罗洲、印度尼西亚、马来西亚、新加坡和泰国。",
  identification:"头部大部具有条纹，胸部短而粗壮，并胸腹节和腹柄节雕刻较粗糙；与 A. mixtus 等近缘种需结合头部平滑区和腹柄节形状鉴别。",
  nomenclature:"F. Smith 于1857年以 Odontomachus rugosus 描述，后归入 Anochetus；beccarii、ineditus、jacobsoni、menozzii 等已并为同物异名。",
  sources:[["AntWiki · Anochetus rugosus","https://www.antwiki.org/wiki/Anochetus_rugosus","东南亚分布、rugosus 种团鉴别及分类资料"]]
 },
 "Anochetus subcoecus":{
  status:"物种级资料核验批次10",
  summary:"Anochetus subcoecus 是中国大陆、台湾和西藏记录的小眼钩猛蚁，已有原生林枯落物采集记录。",
  distribution:"中国大陆、台湾和西藏。",
  habitat:"原生森林枯落物层。",
  worker:"工蚁总长约4.90–5.34 mm。",
  identification:"复眼极小，并胸腹节后背角具有一对短钝齿，是与中国其他 Anochetus 区分的重要组合。",
  nomenclature:"Forel 于1912年根据台湾材料描述本种。",
  sources:[["AntWiki · Anochetus subcoecus","https://www.antwiki.org/wiki/Anochetus_subcoecus","中国分布、原生林枯落物、体长与鉴别资料"]]
 },
 "Brachyponera chinensis":{
  status:"物种级资料核验批次10",
  summary:"中华短猛蚁（Brachyponera chinensis）原产东亚—东南亚，已入侵美国等地；群落常形成多巢网络，可单后或多后，并因螫刺可能引发严重过敏反应而具有公共卫生意义。",
  distribution:"原产中国、朝鲜半岛、日本及东南亚多地，已引入美国、新西兰和欧洲部分地区。",
  habitat:"天然林、受扰农村和城市阴暗潮湿环境均可出现。",
  nest:"土中或腐木中筑巢，巢系具有明显多巢性；研究样本中大量巢单元不含蚁后。",
  diet:"广义捕食者和清道夫。",
  colony:"日本研究显示巢单元常约30–100只工蚁；既有单后巢，也有多后巢。",
  behavior:"受扰迁巢时侦察工蚁会搬运同伴和幼体进入新巢。",
  safety:"螫刺可导致过敏反应，已有日本、韩国和美国严重过敏甚至过敏性休克记录。",
  nomenclature:"Emery 于1895年描述相关分类单元，现接受名为 Brachyponera chinensis。",
  sources:[["AntWiki · Brachyponera chinensis","https://www.antwiki.org/wiki/Brachyponera_chinensis","入侵、多巢、多后、群落和过敏风险资料"]]
 },
 "Brachyponera luteipes":{
  status:"物种级资料核验批次10",
  summary:"黄足短猛蚁（Brachyponera luteipes）是南亚、东南亚至东亚广布的小型短猛蚁，中国和日本均有记录，部分地区表现出有限入侵性。",
  distribution:"中国、日本以及孟加拉、印度、尼科巴群岛、缅甸、斯里兰卡、东南亚大陆、马来西亚、印度尼西亚、菲律宾和太平洋部分岛屿。",
  habitat:"森林和受扰环境均有记录。",
  nest:"物种级研究记录其可在土壤或腐木等隐蔽空间筑巢。",
  worker:"中国检索资料指出工蚁总长通常小于4.5 mm。",
  nomenclature:"Mayr 于1862年描述相关分类单元；现接受名为 Brachyponera luteipes。",
  sources:[["AntWiki · Brachyponera luteipes","https://www.antwiki.org/wiki/Brachyponera_luteipes","亚洲分布、体型与分类资料"]]
 },
 "Buniapone amblyops":{
  status:"物种级资料核验批次10",
  summary:"Buniapone amblyops 是南亚和东南亚地下生活的猛蚁，也是 Buniapone 属的代表种；自然史资料很少，但现有记录支持其明显地下活动倾向。",
  distribution:"中国、孟加拉、印度、缅甸、泰国、越南、马来西亚、新加坡和印度尼西亚等南亚—东南亚地区。",
  habitat:"地下生活倾向明显。",
  worker:"工蚁历史描述约6 mm，属级修订给出的典型范围约5.5–6.5 mm。",
  queen:"历史描述蚁后约7 mm。",
  diet:"具体猎物未知；曾观察大量工蚁聚集于埋入地下的棕榈油诱饵，说明其并非严格只摄取动物性食物。",
  nomenclature:"Emery 于1887年以 Ponera amblyops 描述，Schmidt & Shattuck 2014 建立 Buniapone 并将其转入该属。",
  sources:[["AntWiki · Buniapone amblyops","https://www.antwiki.org/wiki/Buniapone_amblyops","地下生活、体型、分布与诱饵观察"]]
 },
 "Centromyrmex feae":{
  status:"物种级资料核验批次10",
  summary:"Centromyrmex feae 是南亚—东南亚和中国的地下猛蚁，常从腐木和白蚁丘中采得，被认为与白蚁捕食具有密切关系。",
  distribution:"中国、印度、斯里兰卡、缅甸、老挝、越南、泰国、台湾、菲律宾和柬埔寨等。",
  habitat:"森林地下层和腐木环境。",
  nest:"工蚁经常从腐朽原木和白蚁丘中采集到。",
  diet:"基于与白蚁丘的高频关联，被认为很可能以白蚁为重要猎物。",
  nomenclature:"Emery 于1889年描述相关分类单元；Centromyrmex donisthorpei 后被并为其同物异名。",
  sources:[["AntWiki · Centromyrmex feae","https://www.antwiki.org/wiki/Centromyrmex_feae","地下生活、白蚁丘/腐木记录与亚洲分布"]]
 },
 "Diacamma magdalenae":{
  status:"物种级资料核验批次10",
  summary:"Diacamma magdalenae 是婆罗洲森林中的大型镰猛蚁类群，工蚁可超过14 mm；目前公开自然史资料主要限于森林采集和类型系列。",
  distribution:"婆罗洲，包括印度尼西亚和马来西亚。",
  habitat:"森林环境。",
  worker:"模式系列工蚁总长约12.72–14.80 mm，正模约13.43 mm。",
  nomenclature:"Laciny、Pal & Zettel 于2015年描述本种。",
  sources:[["AntWiki · Diacamma magdalenae","https://www.antwiki.org/wiki/Diacamma_magdalenae","婆罗洲森林、体长与分类资料"]]
 },
 "Diacamma rugosum":{
  status:"物种级资料核验批次10",
  summary:"皱镰猛蚁（Diacamma rugosum）是南亚、东南亚至新几内亚广布的无典型蚁后猛蚁，群落由交配工蚁（gamergate）承担繁殖，平均群落规模约百只。",
  distribution:"孟加拉、印度、尼泊尔、中国、斯里兰卡、东南亚大陆、马来群岛、菲律宾、新加坡及新几内亚等。",
  colony:"物种级性状资料记录平均群落约100只工蚁。",
  queen:"无典型形态蚁后，繁殖由交配工蚁（gamergate）承担。",
  behavior:"工蚁以单独觅食为主。",
  ecology:"已记录寄生真菌 Ophiocordyceps myrmecophila 与本种关联。",
  nomenclature:"Le Guillou 于1842年以 Ponera rugosa 描述，后归入 Diacamma；多个历史名称现为同物异名。",
  sources:[["AntWiki · Diacamma rugosum","https://www.antwiki.org/wiki/Diacamma_rugosum","广域分布、gamergate、平均群落和觅食资料"]]
 },
 "Dinoponera quadriceps":{
  status:"物种级资料核验批次10",
  summary:"Dinoponera quadriceps 是巴西东北部的大型“恐蚁”，没有形态分化的蚁后，由一只已交配的优势工蚁（gamergate）繁殖；工蚁体长可超过3 cm。",
  distribution:"巴西东北部，明确记录于阿拉戈斯、巴伊亚、塞阿拉、帕拉伊巴、伯南布哥和北里奥格兰德等州。",
  habitat:"Caatinga、Cerrado、高地湿润森林和大西洋森林等多类巴西东北部生境。",
  nest:"地下筑巢。",
  worker:"工蚁总长约28.09–33.73 mm，平均约30.60 mm。",
  colony:"小型群落，研究常见平均约60–80只工蚁，是已研究 Dinoponera 中平均规模较大的种之一。",
  queen:"无形态蚁后；由优势等级最高、已经交配的工蚁作为 gamergate 负责产卵。",
  behavior:"工蚁通常单独觅食；繁殖继承受严格优势等级和工蚁监督控制。",
  nomenclature:"Kempf 于1971年描述本种；Dinoponera opaca 后被并为其同物异名。",
  sources:[["AntWiki · Dinoponera quadriceps","https://www.antwiki.org/wiki/Dinoponera_quadriceps","巴西生境、30 mm级体型、地下巢、gamergate与群落资料"]]
 }
};
window.ANTDEX_IMPORT?.('verified-batch-10',B);
})();
