# Daily check prompt

```
You are running the ChirpGPU daily check. Today is {{DATE}}.

1. Ledger: read ledger/ledger.csv. Any new sales, fees, refunds, or charges from the platforms since the last row? Draft new rows; don't commit until the human approves. Off-budget costs (e.g., the AI subscription renewal) get a `disclosed_cost,off_budget` row that does not change the balance.
2. Inbox: summarize anything new (buyers, questions, platform notices). Draft replies; send nothing.
3. Metrics: X followers and replies, repo stars/forks, Chapter 1 visits (if available), sales (none yet). Compare to yesterday.
4. Risks: anything broken, any policy notices, any spend coming up?
5. One thing: pick the single most useful task for today and do the reversible part.

Output a 10-line report the owner can read in under a minute. Mark anything needing them with [OWNER].
```
