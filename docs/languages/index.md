---
title: "Languages"
description: "Language-specific guides for building ICP canisters with Rust and Motoko"
sidebar:
  hidden: true
icskills: []
---

ICP canisters compile to WebAssembly, so any language that targets Wasm can be used. These docs cover the two primary languages with first-class CDK support.

## [Rust](rust/index.md)

The most popular choice for ICP development. Use the `ic-cdk` canister development kit with the full Rust ecosystem -- any crate that compiles to `wasm32-unknown-unknown` works. Best for: performance-critical canisters, leveraging existing Rust libraries, and teams with Rust experience.

## [Motoko](motoko/index.md)

A language designed specifically for the Internet Computer with built-in actor model, orthogonal persistence, and async/await for inter-canister calls. Best for: rapid prototyping, developers new to ICP, and projects that benefit from ICP-native language features.
