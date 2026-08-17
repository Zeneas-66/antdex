# AntDex 物种数据结构

## 两层展示

- 首页概览：`summary`、核心体型/温湿度、`distribution`、`habitat`、`nest`、`diet`。
- 完整详情：在首页字段基础上继续读取 `workerDetail`、`identification`、`ecoTags`、`ecology`、`behavior`、`colony`、`flight`、`difficulty`、`safety`、`husbandryWarning`、`nomenclature`、`nameNote`、`sources`。

## 可导入字段

`status, summary, distribution, regions, habitat, ecoTags, nest, diet, colony, worker, workerDetail, soldier, queen, male, identification, behavior, ecology, flight, temp, humidity, difficulty, safety, husbandryWarning, nomenclature, nameNote, sources`

## 证据规则

1. 只导入能追溯到具体物种的资料；属级/种团级经验不能直接填入物种参数。
2. 温度、湿度、体长、群落数量、婚飞时间等定量字段，来源未明确时保持为空。
3. `summary` 是首页摘要，不承担完整详情；详细内容拆到对应字段。
4. `sources` 为数组，每项格式：`[来源名称, URL, 证据说明]`。
5. 同一物种已有非占位字段时，新批次默认不覆盖；冲突写入 `window.ANTDEX_IMPORT_CONFLICTS`。
6. 未在白名单中的字段会被拒绝，避免拼写错误造成“导入成功但页面不读取”。

## 批次文件

新资料放在独立 `data/verified-batch-XX.js`，通过 `window.ANTDEX_IMPORT(batchId, data)` 合并。不要直接改压缩主数据库 `db-*.js`。
