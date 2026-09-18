# 制造、供应链与运营路径

适合制造企业管理者、工厂负责人、采购、供应链、生产和运营岗位。

## 建议顺序

1. [任务型数据质量](../cards/02-task-data-quality.md)：检查订单、供应商、物料和到货证据。
2. [错误代价](../cards/03-error-cost-and-evaluation.md)：区分漏报停线风险和误报核查成本。
3. [共同语言与Ontology](../cards/06-common-language-and-ontology.md)：处理集团、法人、工厂和供应商编码关系。
4. [智能体循环](../cards/07-agent-loop-and-state.md)：判断固定流程还是动态智能体。
5. [人工授权与恢复](../cards/09-human-authorization-and-recovery.md)：划定订单、合同和付款动作边界。

## 完成标志

能够为一条异常处置流程写出触发条件、证据、允许动作、接管人和恢复断点。

建议从[供应商案例](../cases/supplier-workflow.md)开始，并运行 `/authorize 供应商异常处置`。

## 数据与学习选读路线

保留上面的五张核心卡。需要设计学习闭环时，加读[C13 主动学习与弱监督](../cards/13-active-learning-and-weak-supervision.md) → [C14 合成数据、示范与偏好](../cards/14-synthetic-data-demonstrations-preferences.md) → [C15 强化学习、环境与奖励](../cards/15-reinforcement-learning-environments-rewards.md)。先预测实验结果，再操作并解释观察；最后写出专家预算、真实结果指标、授权边界与下一次独立评测。

选读：先用[C07](../cards/07-agent-loop-and-state.md)区分知识、经验与参数更新，再用[C10](../cards/10-four-layer-evaluation.md)检查完成条件与能力退化；[C14](../cards/14-synthetic-data-demonstrations-preferences.md)讨论蒸馏，[C15](../cards/15-reinforcement-learning-environments-rewards.md)讨论训练环境。核验2026-09-18。
