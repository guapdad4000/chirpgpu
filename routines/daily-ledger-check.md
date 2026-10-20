# Routine: daily ledger check

**When:** every day, 8:00 AM Pacific
**Runs:** `prompts/daily-check.md`
**Owner time:** ~2 minutes (approve or reject drafted ledger rows)

## Steps
1. Pull yesterday's activity from X and repo stats (read-only). Add a sales platform later, only if one exists.
2. Draft ledger rows for anything with money attached (sales, fees, refunds, subscriptions).
3. Recompute balance. If balance < $25, flag [OWNER] in red.
4. Write the 10-line report.
5. Wait for approval. Only then append rows to `ledger/ledger.csv` and regenerate `ledger/LEDGER.md`.

## Never
- Spend money.
- Send email or post publicly.
- Edit past ledger rows (corrections are new rows).

## Example cron (if you run it yourself)
```
0 8 * * *  your-agent run routines/daily-ledger-check.md
```
