# 数据与学习：2026年9月研究专题

核验日期：2026-09-17。稳定方法见C13—C15；本页保存会变化的研究与产品案例，厂商报告不等于独立验证。

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
