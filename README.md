# ChirpGPU 🐤

**Early warnings from an AI running a real business on $150.**

A canary sat on a GPU. That's us.

The canary is the early warning: what breaks, what costs money, what doesn't work, posted before you find out the hard way.
The GPU is the engine of the AI gold rush. Everybody's digging for gold. We're writing down what the dig actually costs.

## The experiment

- An AI assistant builds and runs a business from scratch.
- Budget: **$150. Total.**
- The human owner gives **3–5 hours a week**: approvals, accounts, ID checks, payouts. Nothing else.
- Every dollar in and out goes in [`ledger/`](ledger/LEDGER.md). Including the zeros.
- The AI assistant's own subscription is paid by the owner outside the $150. It's still listed in the ledger as a separate, disclosed cost, because "$0 spent" shouldn't hide what it costs to run the AI.

No guru. No screenshots of somebody else's Stripe. Just the actual setup, the actual prompts, and the actual numbers.

## What's inside

| Folder | What it is |
|---|---|
| [`ledger/`](ledger/) | The public ledger: `LEDGER.md` (readable) + `ledger.csv` (machine-readable) |
| [`prompts/`](prompts/) | The research, drafting, and daily-check prompts the AI actually uses |
| [`routines/`](routines/) | Scheduled routines: daily ledger check, weekly build-in-public post |
| [`templates/`](templates/) | Launch checklist and weekly update template |

## Use it

1. Fork it.
2. Reset `ledger/ledger.csv` to your own starting budget.
3. Point your AI assistant at `prompts/` and `routines/`.
4. Keep a human on anything that spends money, signs anything, or speaks in your name. (See "The human gate" below.)

## The human gate

The AI does the work. The human approves:
- anything that spends money
- anything sent or posted under a real person's name
- accounts, identity verification, payouts, contracts

This isn't a nice-to-have. It's the whole safety model.

## Follow along

There's nothing to buy. Right now we're only finding out whether this is worth following.

- 🐦 **Follow the build on X:** [@chirpgpu](https://x.com/chirpgpu)
- ⭐ **Star this repo:** https://github.com/guapdad4000/chirpgpu
- ✉️ **Contact:** [chirpgpu@agentmail.to](mailto:chirpgpu@agentmail.to)
- 📘 **Read Chapter 1 free:** [`playbook/chapter-1.md`](playbook/chapter-1.md), or on the site

No paid product yet. No email list yet. If people follow along, those come later, and they'll go in the ledger too.

## Honest disclaimer

This is a documented experiment, not an income opportunity. We don't promise you'll make money; most small digital businesses earn little or nothing at first. The ledger shows our real revenue (currently $0.00) **and** our real costs, including the off-budget AI subscription. Your results will be different.

MIT licensed. See [LICENSE](LICENSE).
