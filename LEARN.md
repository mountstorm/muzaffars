# LEARN — daily reps toward elite SWE

A running logbook. **DSA is the main track (a lesson most days); distributed-AI
systems and chess are lighter weekly threads.** Each DSA entry is: the concept in
plain terms → one worked example you can trace by hand → one practice problem I
check next time.

## How to use it
- Ask **"give me today's LEARN lesson"** and I append the next entry here.
- Answer the previous **practice problem** first; I mark it and then teach the new thing.
- Newest entries sit at the top of the **Log**. The **Patterns index** at the bottom
  is your quick-reference cheat sheet as it grows.
- Want it fully automatic (a fresh lesson appended every morning without asking)?
  Say the word and I'll set up a scheduled agent for it.

## Tracks
- **DSA (main):** bit tricks → two pointers → sliding window → hashing → stacks/queues
  → binary search → recursion/backtracking → trees → graphs → dynamic programming →
  greedy → intervals. One pattern at a time, with a problem.
- **Distributed AI / edge systems (weekly):** your moat — inference partitioning,
  latency vs. compute, communication cost, quantization, batching, serving.
- **Chess (weekly):** tactics first (they decide most games), then key endgames, then
  positional principles.

---

# Log

## Day 1 — 2026-07-24

### DSA · Bit manipulation & XOR (you're already warm on this)
**Concept.** Bits are just switches; bitwise ops act on all switches at once, which
makes them O(1) and memory-free. The three you'll reuse forever:
- `x & 1` → is `x` odd? (checks the lowest bit)
- `x >> 1` / `x << 1` → divide / multiply by 2 (shift the switches)
- `x & (x - 1)` → clears the lowest set bit. Loop it to **count set bits**.

The XOR superpowers you saw: `x ^ x = 0`, `x ^ 0 = x`, order doesn't matter. Together
they make XOR a *pairing detector* — pairs cancel, the odd one out survives.

**Worked example — count the 1-bits in 13.**
```
13 = 1101
13 & 12 = 1101 & 1100 = 1100  (cleared lowest set bit)  → count 1
12 & 11 = 1100 & 1011 = 1000  → count 2
 8 &  7 = 1000 & 0111 = 0000  → count 3
now 0 → stop.  Answer: 3 set bits.
```
Each step erases exactly one `1`, so the loop runs once per set bit — faster than
checking all 32 positions.

**Practice (answer next time).** An array has every number appearing **twice except
two** numbers that appear once, e.g. `[1, 2, 1, 3, 2, 5]` → the loners are `3` and `5`.
XOR-ing everything gives `3 ^ 5`, not the two answers separately.
*How do you separate the two single numbers?* Hint: `3 ^ 5` has some bit set to `1` —
what does that bit tell you about how `3` and `5` differ, and how could you split the
array into two groups on that bit?

### Distributed AI · The core edge tradeoff
Every edge-inference decision is one tension: **compute locally** (a phone/edge box —
instant, private, but weak hardware) **vs. offload to the cloud** (huge compute, but
you pay network latency + bandwidth to ship the data there and back). "Split
inference" is the middle path: run the first layers of a neural net on the device,
send the *intermediate tensor* to the cloud for the rest. The art is choosing the
**split point** — a layer where the intermediate data is small (cheap to transmit)
and the on-device compute so far is affordable. That single choice is a whole research
area (yours). *Next week: how to actually find the optimal split point.*

### Chess · The fork (double attack)
The highest-ROI tactic: **one piece attacks two targets at once**, so your opponent
can only save one. Knights are the classic forkers because they hit squares no other
piece defends the same way. The dream: a **royal fork** — a knight attacking the king
and queen together; they must move the king, you take the queen. *Drill this week:
on lichess puzzles, filter to "Fork" and do 10.* Pattern to burn in: look for enemy
king + queen (or two rooks) that a single knight leap could hit simultaneously.

---

# Patterns index
*(quick-reference; grows over time)*

- **Bit: is-odd** → `x & 1`
- **Bit: count set bits** → loop `x &= x - 1`, count iterations
- **XOR: find the unique** → XOR everything; pairs cancel, loner remains
- **XOR: split two uniques** → *(you'll fill this in after the practice problem)*
