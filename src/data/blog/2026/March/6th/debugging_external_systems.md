---
title: Debugging external systems with AI
pubDatetime: 2026-03-06T10:30:00Z
slug: debugging-external-systems-with-ai
description: Using AI tools to debug complex distributed systems like Mimir by building a CLI tool that lets LLMs query metrics and identify bottlenecks.
tags:
  - ai
  - debugging
  - observability
  - load-testing
  - tooling
---

## The Problem

I was recently involved in work around load testing Mimir for reads. We were facing missed iterations eventually, even
though the infra wasn't showing any bottlenecks. At this point, we start wondering which configs to tweak and for that
decision, we typically rely on metrics of the system.

Mimir has multiple components, which could be a bottleneck, query scheduler, querier, query frontend etc. and any of
those could be the root cause. A traditional way of debugging this would be a back and forth, going through documentation
for metrics to look at. A more recent method would involve asking some LLM to suggest the appropriate metric. I had
recently gone through the [showboat project blog](https://simonwillison.net/2026/Feb/10/showboat-and-rodney/) by Simon Willison and identified that we could use a similar
approach here.

## Building the Tool

So, I decided to build this cli tool for LLMs to use [mimir-analyzer](https://github.com/Krashcan/mimir-analyzer). I
realised I didn't understand the difference between mcp server and a tool, since I initially thought this is what an mcp
server is. Anyways, with the tool in place, we could let the LLM query a set of APIs during the load test period, and
look at relevant point of concerns. I am in awe of how well this approach works, where you build a tool to mimic what
you would do and get the LLM to do that instead. Of course, Claude was the one who was involved in development of the tool
with the help of following prompt

```
in my org we are using mimir as a tsdb. We were load testing it to see how well it performs for `X` alerts, but we are
seeing missed evaluations. Now the thing is we can scale stuff, but we dont know what to scale. We want to figure out
whats the bottleneck, since there already are so many metrics to look at to study the system health. We are not seeing
any bottlenecks wrt the infra. I want to give claude access to my mimir infra behind a tool. THing is all my mimir
loadtest metrics are going to an `X` instance. if we could query that and keep on proceeding and form a report,
it would be great. does this sound like the right approach. can you create a claude.md file for this, and we want to
do this in golang
```

## Results

It was able to almost one shot it, Claude had to make some tweaks based on the feedback it received from the other
Claude which tried running the tool. In its current state, Claude was able to generate a report of what's definitely
a bottleneck, and what's not along with evidences. I had to nudge it to give evidences later, I believe I could improve
the prompt I gave to run the tool.
