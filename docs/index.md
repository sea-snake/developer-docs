---
title: "ICP Developer Docs"
description: "Build full-stack web applications, DeFi protocols, and cross-chain integrations on the Internet Computer"
sidebar:
  order: 0
icskills: []
---

# Build on the Internet Computer

The Internet Computer (ICP) is a blockchain that runs at web speed, serves web content, and provides a complete execution environment for smart contracts called **canisters**. No cloud servers, no bridges, no external dependencies.

## Get started in under 10 minutes

[Start the quickstart](getting-started/quickstart.md) to install icp-cli, create a project, and deploy your first canister.

## What makes ICP different

### Chain-key cryptography
Canisters can sign transactions for Bitcoin, Ethereum, and other chains using threshold signatures -- no bridges or oracles required. [Learn more](concepts/chain-key-cryptography.md)

### Orthogonal persistence
Canister memory survives across executions and upgrades. No databases, no serialization -- just use variables. [Learn more](concepts/orthogonal-persistence.md)

### Reverse gas model
Users never pay gas. Canisters pay for their own compute, storage, and bandwidth using **cycles**. [Learn more](concepts/reverse-gas-model.md)

### Web-native smart contracts
Canisters serve HTTP responses directly. Host full web applications -- frontend and backend -- entirely onchain. [Learn more](concepts/app-architecture.md)

### Chain Fusion
Natively interact with Bitcoin, Ethereum, Solana, and other blockchains from ICP canisters. [Learn more](concepts/chain-fusion.md)

## Documentation sections

### [Getting Started](getting-started/quickstart.md)
Install tools, create your first project, deploy a canister, and choose your path forward.

### [Guides](guides/index.md)
Task-oriented how-to guides organized by development stage: backends, frontends, authentication, testing, production, chain fusion, DeFi, governance, and security.

### [Concepts](concepts/index.md)
Developer-focused explanations of ICP architecture, capabilities, and design decisions.

### [Languages](languages/index.md)
Language-specific guides for Rust and Motoko, including stable structures, testing, and CDK reference.

### [Reference](reference/index.md)
Specifications, canister IDs, token standards, cycle costs, execution errors, and glossary.

## AI-assisted development

ICP has first-class support for AI-assisted development. Install [icskills](https://skills.internetcomputer.org) to give your AI agent deep knowledge of ICP patterns:

```bash
npx skills add dfinity/icskills
```

[Set up agentic development](guides/tools/agentic-development.md)

## External resources

| Resource | Description |
|----------|-------------|
| [icp-cli](https://dfinity.github.io/icp-cli/) | Command-line tool for ICP development |
| [JS SDK](https://js.icp.build) | JavaScript/TypeScript libraries for ICP |
| [icskills](https://skills.internetcomputer.org) | AI agent skill files for ICP development |
| [Learn Hub](https://learn.internetcomputer.org) | Deep protocol-level explanations |
| [Motoko core library](https://mops.one/core/docs) | Motoko core library documentation |
| [Rust CDK](https://docs.rs/ic-cdk/latest/ic_cdk/) | Rust canister development kit API reference |
