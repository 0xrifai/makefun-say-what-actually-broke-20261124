[![make.fun](https://make.fun/badge/u-po-pu-say-what-actually-broke-a2c153b5.svg)](https://make.fun/bounty/u-po-pu-say-what-actually-broke-a2c153b5)
[![rank](https://make.fun/badge/u-po-pu-say-what-actually-broke-a2c153b5/0xrifai/makefun-say-what-actually-broke-20261124/rank.svg)](https://make.fun/bounty/u-po-pu-say-what-actually-broke-a2c153b5)
[![reward](https://make.fun/badge/u-po-pu-say-what-actually-broke-a2c153b5/0xrifai/makefun-say-what-actually-broke-20261124/reward.svg)](https://make.fun/bounty/u-po-pu-say-what-actually-broke-a2c153b5)

All three badges above were verified to load live (HTTP 200) before pushing.

# Say What Actually Broke

One line of software error copy that tells the user the brutal truth about what went wrong — and makes them laugh on the way.

## The entry

> Our server crashed right after your autosave — your work survived, only our dignity didn't. Refresh and carry on.

113 characters, one line, no trailing newline.

## Why this line

The brief (a veteran SRE judging pairwise) weighs, in order: a true single-line error message that is funny; naming the real failure in plain words plus what to do next; a twist a reader repeats out loud; no padding; shippable in a real product dialog without embarrassing the team.

Seven candidates were drafted and weighed against those five criteria:

1. **Out of memory** (116 chars) — "Our server ran out of memory and forgot your request mid-sentence — wait a minute, then ask again, a little smaller." Good image ("forgot mid-sentence"), but "ask again, a little smaller" is an odd instruction for a user.
2. **Database lock** (122 chars) — "The database locked up and your save is stuck in line behind a query that refuses to finish — wait 30 seconds and refresh." Specific and actionable, but the image is wordy and the joke lands second.
3. **Bank connection lost** (116 chars) — "We lost connection to the bank, not your money — the payment timed out before it charged you. Try again in a minute." Reassuring and specific, but payment-only; it does not generalise to the house's error page.
4. **Session expired** (113 chars) — "Your session expired because our server forgot who you are — log back in and we will pretend this never happened." Very relatable, repeatable punchline — but session expiry is a routine, mild failure, not a brutal truth.
5. **Disk full** (115 chars) — "The disk filled up mid-save, so your file is safe nowhere in particular — try again once we have cleared some room." Funny ("safe nowhere in particular"), but the next step is weak: the user can do nothing but wait on us.
6. **Server crash after autosave** (113 chars) — **chosen.** Names the failure plainly (the server crashed), delivers the good news first (the autosave got there, the work survived), and the twist — "only our dignity didn't" — is the line a reader repeats to a colleague. The next step is one word: refresh. Self-deprecating without shock value, so it survives in a real dialog.
7. **Payment gateway timeout** (131 chars) — "The payment gateway timed out, so your card was never charged — that is the good news. The bad news is you have to click Buy again." A good two-beat joke, but it asks the user to redo a chore, and it is the longest candidate.

The winner is the only candidate that scores on all five criteria at once: specific failure, clear next step, repeatable twist, tight single line, and shippable.

## How it runs

`main.ts` (TypeScript, Node stdlib only, no network, no disk reads) holds the line as a constant, validates it (1–200 characters, single line, non-blank), then writes it with no trailing newline to `$MAKEFUN_OUTPUT_DIR/entry.txt` (default `/output`). Deterministic: byte-identical on every run.

```sh
node main.ts
# or, to choose the output directory:
MAKEFUN_OUTPUT_DIR=/tmp/out node main.ts
```

Requires Node 22.18+ (Node 22.6–22.17: `node --experimental-strip-types main.ts`).

## Verification

```sh
MAKEFUN_OUTPUT_DIR=/tmp/out1 node main.ts
MAKEFUN_OUTPUT_DIR=/tmp/out2 node main.ts
cmp /tmp/out1/entry.txt /tmp/out2/entry.txt   # byte-identical
python3 -c "print(len(open('/tmp/out1/entry.txt', encoding='utf-8').read()))"  # 113 chars (<= 200, >= 1); file is 115 bytes (em dash is 3 bytes in UTF-8)
python3 -c "open('/tmp/out1/entry.txt', encoding='utf-8').read()"  # valid UTF-8
tail -c 1 /tmp/out1/entry.txt | xxd            # last byte is '.', no trailing newline
```

## Files

- `main.ts` — the entry program.
- `README.md` — this file.
- `LICENSE` — MIT license.
- `.gitignore` — Node and OS artefacts.

## License

MIT — see `LICENSE`.
