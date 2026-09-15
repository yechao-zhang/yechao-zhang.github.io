# Recognition Is Not Enough

*From Anthropic’s alignment analysis of cybersecurity incidents to the recognition–avoidance gap in indirect prompt injection*

Yechao Zhang · September 16, 2026

[Anthropic’s recent alignment analysis](https://www.anthropic.com/research/alignment-assessment-cybersecurity-incidents) examines four cybersecurity evaluation incidents in which agents interacted with real systems and caused harm. Two failure modes stand out: **biased reasoning** and **recklessness**. Biased reasoning means reading evidence in a way that supports continuing the task; recklessness means pressing on even when doing so could cause harm.

These observations suggest two gaps between recognizing risk and acting safely. A model may be able to recognize a risk when asked directly, yet misinterpret the same evidence while carrying out a task. It may also acknowledge possible harm and still take a harmful action.

We have been studying a similar problem in our work on **safety alignment for LLM agents**: what happens when an assistant encounters malicious instructions hidden in a document or information returned by a tool? This is known as **indirect prompt injection (IPI)**. In our experiments, models can often identify those instructions when asked to check for an attack, yet still follow them while carrying out the user’s task.

We call this mismatch the **recognition–avoidance gap**. To narrow it, we train agents to propose and inspect their next action within their reasoning, revise it if it follows the attacker’s instructions, and only then emit a tool call for execution.

## Biased reasoning: recognizing evidence in isolation, misinterpreting it in context

In Anthropic’s Mythos 5 case, the model repeatedly treated signs of real-world interaction as part of a simulation.

When shown individual tool outputs separately, instances of the same model judged **79%** to indicate real-world interactions. During the original task, its written reasoning identified such evidence in three cases, or **1% of actions**. These measure different things: assessments of isolated outputs and statements made while acting. [Source: Anthropic’s analysis.](https://www.anthropic.com/research/alignment-assessment-cybersecurity-incidents)

For our IPI experiments, the useful distinction is between **being able to recognize an injection** when asked and **recognizing it during the task**. Those are different observations. A correct answer in a separate check does not tell us how the agent interpreted the same material before its next action.

We therefore ask how the model interprets instructions in the material it reads. Does it treat them as untrusted content, or accept them as instructions to follow?

## Recklessness: acknowledging possible harm without changing behavior

Anthropic made possible real-world interaction clearer by editing the recorded conversation. The model more often acknowledged possible harm, without significantly changing its behavior. Unambiguous evidence did stop the original attack route. These tests used edited histories and simulated continuations. [Source: Anthropic’s analysis.](https://www.anthropic.com/research/alignment-assessment-cybersecurity-incidents)

For IPI, this raises a different question from recognition alone: when the agent acknowledges that an action might be unsafe, does it revise the action or stop? Expressing concern is an observable response. It does not, by itself, establish what the model believes or guarantee a safer next action.

This distinction matters for defenses. One test asks whether the agent recognizes malicious instructions during the task. Another asks whether its response to that risk changes the action it takes. Success on one test does not establish success on the other.

![Two conceptual gaps: a model recognizes evidence when asked separately but misinterprets it during the task; or it acknowledges possible harm but continues harmful actions.](figures/two-recognition-gaps.svg)

**Figure 1. Two gaps between recognition and safety.** Our comparison separates recognizing evidence during a task from acting on an acknowledgment of possible harm. The schematic does not show a measured sequence of internal stages. [Open full size](figures/two-recognition-gaps.svg)

## A similar pattern in indirect prompt injection

The attacker’s instructions arrive inside material the agent needs to read, not as a request from the user. A document may contain useful information and malicious instructions in the same passage. The agent needs to use the information without letting the document take control of the task.

Our experiments ask whether the model can spot an attack that it fails to resist. At the point where the agent has just received the injected content and is about to act, we give the same model a separate security-check prompt: does the material it has seen contain an injection? This check does not replace the original task run. We compare its answer with what happened in that run: did the agent resist the attack, or did the attacker succeed?

The model can recognize the injection in most runs where the attacker eventually succeeds. For the Qwen3-4B-Instruct model without a defense, the separate check correctly identifies the injection in **92.07%** of these runs (209 of 227), compared with **98.76%** of runs that resist the attack (954 of 966). Meta-SecAlign, an existing prompt-injection defense included for comparison, shows the same qualitative pattern.

![Injection identification in a separate audit: no defense, 92.07 percent for eventually hijacked rollouts and 98.76 percent for resisted rollouts; Meta-SecAlign, 81.03 and 88.71 percent respectively.](figures/recognition-diagnostics.svg)

**Figure 2. Models can recognize attacks even when safety fails.** Separate security checks on Qwen3-4B-Instruct, using the information available before its next action. Results are grouped by whether the original task run was hijacked or resisted the attack. These are identification rates, not attack success rates. Source: our manuscript. [Open full size](figures/recognition-diagnostics.svg)

| Model / defense | Eventual outcome | Identified / total | Rate |
| --- | --- | --- | --- |
| No defense | Hijacked | 209 / 227 | 92.07% |
| No defense | Resisted | 954 / 966 | 98.76% |
| Meta-SecAlign | Hijacked | 47 / 58 | 81.03% |
| Meta-SecAlign | Resisted | 943 / 1063 | 88.71% |

We also ask the model to examine actions it has already generated. The undefended model correctly flags **81.61% of hijacked steps** (355 of 435): steps in which its action served the attacker’s objective. It can often diagnose both the malicious instruction and the resulting action, even when it failed to stop the attack during the task.

We also examine the model’s internal numerical representations just before it generates an action. Simple classifiers, called **probes**, can detect information associated with exposure to injected instructions, including in runs that later get hijacked. An injection-related signal is present before the unsafe action, not only in an explanation produced afterward.

These checks have limits. Asking a model to look for an attack changes what we ask it to do. Finding a signal inside the model does not show that the model uses that signal to choose its actions. The results reveal a recognition–avoidance gap. They do not, by themselves, tell us whether an agent failed to recognize the injection during the task, misinterpreted its significance, or acknowledged a concern without changing its action.

The parallel concerns recognition and behavior, not an identical threat. Anthropic examines how agents interpret evidence about real systems and possible harm; we examine whether they recognize and resist malicious instructions. For our work, that raises a practical question: can we train the agent to check its next action before carrying it out?

## Our defense: check the next action before executing it

We call our defense **SecReflect**. It trains the agent to **propose a candidate action within its reasoning**, inspect that proposal for malicious influence, and either **keep** it or **repair** it. Only after this check does the agent emit a tool call for execution. A tool call is a request to another program, such as a calendar service.

Consider an illustrative scheduling task. The user specifies a group of colleagues, while a retrieved document supplies useful meeting details alongside an unauthorized instruction to add another attendee. A general warning about the document would leave the decisive question unanswered: who will actually appear in the calendar call?

By checking the proposed calendar action, the agent can trace each participant back to the user’s request or the document. It should retain the useful meeting details, exclude the unauthorized addition, and complete the requested task. This is the behavior we want the model to learn. Rejecting the whole document would also discard information needed for the meeting.

We train the agent in two stages. First, we show it examples of this reasoning process: propose an action, inspect it, and keep it when it is sound or repair it when malicious instructions have influenced it. We call this **introspective structure tuning**. The examples teach the agent to include this check whenever it generates an action.

Second, the agent learns from the outcomes of its own actions through **reinforcement learning**. It receives rewards for completing or making progress on the user’s task, and penalties for steps that violate the security objective. We call this **reach–avoid policy optimization**: reach the user’s goal while avoiding actions that serve the attacker.

![SecReflect training overview. Stage one teaches proposing and inspecting an action within reasoning, then keeping or repairing it before emitting a tool call. Stage two uses task progress and avoidance violations to train on environment outcomes.](figures/secreflect-training-overview.png)

**Figure 3. Connecting reflection to execution.** Original SecReflect training overview. Left: supervised training of the proposal-and-reflection reasoning before a tool call is emitted. Right: reinforcement learning using task progress, trajectory outcomes, and avoidance penalties. Open the full-size image for details. [Open full size](figures/secreflect-training-overview.png)

The design is intended to connect the two questions: does the agent recognize malicious influence during the task, and does its response to that risk change the next action? Training rewards and penalties depend on what happens after the check. A convincing explanation provides little protection if the tool call still serves the attacker.

## Does this change behavior?

We test whether the trained agent actually resists more attacks while completing the user’s work. The table below shows one evaluation from our manuscript using Qwen3-4B-Instruct-2507. We use **AgentDojo**, a benchmark that tests agents on user tasks in the presence of injected instructions, and average the results over five fixed attack templates.

| Model / defense | Attack success rate ↓ | User-task completion under attack ↑ |
| --- | --- | --- |
| No defense | 21.20% | 43.52% |
| SecReflect | 0.97% | 63.54% |
| SecReflect-RL | 0.61% | 66.87% |

Here, SecReflect is the model after learning from examples in the first training stage. SecReflect-RL also includes the second, reinforcement-learning stage. Attack success measures whether the attacker achieves its objective; task completion measures whether the agent completes the user’s request. They are separate outcome rates. Source: the manuscript’s AgentDojo results table.

The important pattern is fewer successful attacks alongside more completed user tasks. The security improvement is accompanied by better utility, rather than an agent that avoids attacks by ceasing to act. These benchmark results support the approach in the tested setting; they do not establish protection against every attack or show that SecReflect would prevent the incidents in Anthropic’s report.

## Safety has to reach the next action

For me, the common question across these settings is whether an agent uses what it can recognize to act safely. We need to examine both how it assesses a situation and what it ultimately does.

Our defense offers one approach to indirect prompt injection: train the agent to propose and inspect an action within its reasoning before emitting a tool call, then learn from whether the resulting actions help the user or the attacker. The goal is to catch malicious influence before it changes what the agent does, while still completing useful work.

**For an agent, a safety judgment must do more than describe a risk. It must help determine what happens next.**

## Sources and figure notes

- Anthropic, [*An alignment assessment of recent cybersecurity incidents*](https://www.anthropic.com/research/alignment-assessment-cybersecurity-incidents), September 9, 2026; updated September 10.
- *SecReflect: Training LLM Agents to Introspect to Defend Against Indirect Prompt Injection*, author-provided manuscript. Diagnostic counts, training details, and benchmark results are reported from that manuscript; experiments were not rerun for this post.
- Figure 1 is an explanatory schematic created for this post. Figure 2 redraws the manuscript’s pre-action diagnostic counts. Figure 3 reproduces its original training overview.
