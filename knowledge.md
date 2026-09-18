# 知识导航

Agent和学习者都应从本页定位材料，只读取当前任务需要的卡片。

## 按管理问题查找

| 管理问题 | 先读 | 需要时再读 |
|---|---|---|
| 这个AI项目是否值得做？ | [01 任务与经营结果](docs/cards/01-task-and-outcome.md) | [03 错误代价](docs/cards/03-error-cost-and-evaluation.md)、[12 证据门与备忘录](docs/cards/12-evidence-gates-and-memo.md) |
| 数据质量到底要治理什么？ | [02 任务型数据质量](docs/cards/02-task-data-quality.md) | [03 错误代价](docs/cards/03-error-cost-and-evaluation.md) |
| 为什么接入资料后仍会答错？ | [04 上下文与企业知识](docs/cards/04-context-and-enterprise-knowledge.md) | [05 主动检索](docs/cards/05-active-retrieval.md)、[06 共同语言与Ontology](docs/cards/06-common-language-and-ontology.md) |
| 什么时候需要智能体？ | [07 智能体循环与状态](docs/cards/07-agent-loop-and-state.md) | [08 工具、协议与权限](docs/cards/08-tools-protocols-and-permissions.md) |
| AI可以执行到哪一步？ | [09 人工授权与恢复](docs/cards/09-human-authorization-and-recovery.md) | [08 工具、协议与权限](docs/cards/08-tools-protocols-and-permissions.md) |
| 怎样证明新版本值得上线？ | [10 四层评测](docs/cards/10-four-layer-evaluation.md) | [03 错误代价](docs/cards/03-error-cost-and-evaluation.md)、[12 证据门与备忘录](docs/cards/12-evidence-gates-and-memo.md) |
| 买产品、联合实施还是自建？ | [11 建设方式与FDE](docs/cards/11-build-buy-and-fde.md) | [12 证据门与备忘录](docs/cards/12-evidence-gates-and-memo.md) |

## 按角色进入

- [管理者与投资决策](docs/paths/executive.md)
- [制造、供应链与运营](docs/paths/manufacturing-operations.md)
- [销售、客户与服务](docs/paths/sales-service.md)
- [财务、人力与公司职能](docs/paths/finance-hr.md)

## 案例与工具

- [供应商交付预警与行动](docs/cases/supplier-workflow.md)
- [客户退款与补偿](docs/cases/customer-refund.md)
- [任务证据表](templates/task-evidence.md)
- [行动授权表](templates/action-authorization.md)
- [投资决策备忘录](templates/investment-memo.md)

## WEF报告与知识图谱

阅读[两份WEF报告如何形成知识图谱](docs/wef/from-reports-to-graph.md)，或打开[交互示范](https://jinyh.github.io/ai-management-decision-kit/wef.html)。学习Agent可按需读取 `data/wef-graph.json`，沿关系ID查看证据与管理问题；区分报告主张和课程解释。

## 动态内容

模型发布、Agent能力和产品开放范围会变化。需要讨论当前状态时，先读[前沿内容说明](docs/frontier/README.md)，再核对带日期的事实卡和官方来源。

## 数据与学习（选读）

| 管理问题 | 先读 | 需要时再读 |
|---|---|---|
| 专家标注预算有限，先标哪些？ | [C13 主动学习与弱监督](docs/cards/13-active-learning-and-weak-supervision.md) | C02、C10 |
| 如何补齐能力缺口？ | [C14 合成数据、示范与偏好](docs/cards/14-synthetic-data-demonstrations-preferences.md) | C02、C13 |
| 奖励会让系统学会什么？ | [C15 强化学习、环境与奖励](docs/cards/15-reinforcement-learning-environments-rewards.md) | C07、C10 |

[2026年9月研究专题：Snorkel、Olmix与低数据量RLVR](docs/frontier/data-learning-20260917.md)。原五张核心卡路径保持不变，新增三张为选读。

选读：先用[C07](docs/cards/07-agent-loop-and-state.md)区分知识、经验与参数更新，再用[C10](docs/cards/10-four-layer-evaluation.md)检查完成条件与能力退化；[C14](docs/cards/14-synthetic-data-demonstrations-preferences.md)讨论蒸馏，[C15](docs/cards/15-reinforcement-learning-environments-rewards.md)讨论训练环境。核验2026-09-18。

选读：[长上下文位置影响与历史研究](docs/frontier/context-position-20260918.md)，明确实验条件、当前证据及历史图的用途。
