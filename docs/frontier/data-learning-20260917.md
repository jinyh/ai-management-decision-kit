# 数据与学习：2026年9月研究专题

原专题核验日期：2026-09-17；以下扩展研究核验日期：2026-09-18。稳定方法见C13—C15；本页保存会变化的研究与产品案例，厂商报告不等于独立验证。

## Snorkel：从标签到训练环境

[主动学习与弱监督文档](https://docs.snorkel.ai/docs/25.4/user-guide/intro/active-learning-weak-supervision/)说明两种方法的互补：规则提供规模化监督，主动学习选择值得人工审核的样本。当前文档版本25.4，不据此断言是最新产品版本。

[企业智能体环境](https://snorkel.ai/blog/enterprise-environments-ai-agents/)（2026-08-03）将任务、工具、状态、政策与验证条件组织成可训练和评测的环境。这是厂商方法说明，课程将其用于解释为什么“有数据”还不等于“有可学习的反馈”。

## 金融任务：4B与235B比较的范围

[Snorkel金融工具训练案例](https://snorkel.ai/blog/how-tool-discipline-let-a-4b-model-outsmart-a-235b-giant-on-financial-tasks/)（2026-02-18）报告：经针对性强化学习的Qwen3-4B-Instruct-2507在该文指定金融工具使用评测中超过所比较的Qwen3-235B-A22B。训练针对金融任务与工具纪律，Snorkel提供任务／环境等支持，训练使用Berkeley rLLM。

教学主张是“针对任务的数据、环境和反馈可改善行为”。不能推广为4B模型在所有金融任务、所有评测或总体能力上胜过235B；也不能把单次算力成本写成企业项目总成本。本课程的订单Q-learning实验解释基本机制，不复现该研究。

## 数据配比与低数据量学习

| 研究 | 可以支持的课堂主张 | 需要保留的范围 |
|---|---|---|
| [Olmix](https://arxiv.org/abs/2602.12237)，2026-02 | 数据混合比例本身是可优化的训练选择 | 结论来自论文设定与评测，不能代替本企业对数据配比的试验 |
| [Learning from Less](https://arxiv.org/abs/2604.18381)，2026-04 | 低数据量RLVR可研究任务难度与样本效率的关系 | 三类程序化任务；不能推导出“任何业务都只需少量数据” |
| [RIFT](https://arxiv.org/abs/2604.01375)，2026-04 | 奖励或评分规则需要检查故障与偏差 | 基于论文实验设定；评分成功不等于业务结果完整 |

## 复习与更新

把每条新结果拆成任务、数据、基线、训练方式、评测、限制六项。更新案例时保留原始来源及核验日；若只有厂商报告，继续标为厂商报告。下一次核验建议在课前进行，不自动改变稳定原理。

关联：[C13 主动学习与弱监督](../cards/13-active-learning-and-weak-supervision.md)｜[C14 合成数据、示范与偏好](../cards/14-synthetic-data-demonstrations-preferences.md)｜[C15 强化学习、环境与奖励](../cards/15-reinforcement-learning-environments-rewards.md)。

## 9月18日扩展：从训练数据到经验系统

| 研究与来源 | 课程采用内容 | 实验边界与维护位置 |
|---|---|---|
| [Echoverse](https://www.microsoft.com/en-us/research/blog/echoverse-deep-evolving-environments-for-computer-use-agents/)，Microsoft，2026-07-30 | 企业训练把环境、任务、验证器一起建设；核对状态与因果后果 | 厂商研究，非本课程复现；C10、C15及验证器对照 |
| [ACE](https://arxiv.org/abs/2510.04618)，2025-10首发、2026-03修订 | 生成、反思、整理上下文操作手册，区别于模型参数更新 | 论文中的上下文适应方法；C07，经验仍需审核与权限控制 |
| [Retrieve-for-Train官方介绍](https://research.google/blog/bypassing-inference-bottlenecks-accelerating-complex-ai-search-with-retrieve-for-train/)及[论文](https://arxiv.org/abs/2603.06397)，2026-09-15介绍 | 4B教师产生训练材料，蒸馏到53.9M扩散检索模型 | 服装、音乐等集合检索，不能推广为通用模型能力；C14 |
| [Data-Centric Post-Training for Financial Reasoning](https://arxiv.org/abs/2609.10113)，2026-09 | 新任务表现和原有能力保留分别检查 | 技术报告，结果限于所用模型、数据和评测；C10、C14 |
| [Nested Learning](https://research.google/blog/introducing-nested-learning-a-new-ml-paradigm-for-continual-learning/)，Google，2025-11-07 | 持续学习与不同时间尺度的更新值得跟踪 | 前沿选读；HOPE为概念验证，不讲成已成熟的企业在线自学习能力 |

推荐顺序：先读C07区分更新对象，再读C15理解环境，最后用C10检查验证器和能力退化。蒸馏选读C14。新增内容不增加核心知识卡数量，也不改变课前阅读包。

论文出处：[Echoverse，Microsoft Research，2026](https://arxiv.org/abs/2607.28074)。课堂图为课程改绘，验证器对照为简化演示，不作为论文复现。运行时核验是否完成，训练时还可将核验结果转成学习信号。核验2026-09-18。
