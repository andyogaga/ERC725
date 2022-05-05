# Changelog

All notable changes to this project will be documented in this file. See [standard-version](https://github.com/conventional-changelog/standard-version) for commit guidelines.

### [0.11.1](https://github.com/ERC725Alliance/erc725.js/compare/v0.11.0...v0.11.1) (2022-04-06)

This version fix the npm pack error.

### Bug Fixes

- do not load wrong schemas ([66dc3e6](https://github.com/ERC725Alliance/erc725.js/commit/66dc3e648ad1a9aeabe66e5ae2aeb15cf3f74775))

## [0.11.0](https://github.com/ERC725Alliance/erc725.js/compare/v0.10.0...v0.11.0) (2022-04-05)

### ⚠ BREAKING CHANGES

- the output of getData is not an object anymore, but the value directly if the input is a string.
- if fetchData is called with a string, the output will be the value itself, not an object anymore.

### Features

- add schemas at the root and improve docs ([#121](https://github.com/ERC725Alliance/erc725.js/issues/121)) ([e37fb39](https://github.com/ERC725Alliance/erc725.js/commit/e37fb3926bcb682df00c632feb3b3a8b1700d2c0))
- change the output of getData for string input ([3592c1b](https://github.com/ERC725Alliance/erc725.js/commit/3592c1bb335e9a1bce824bc3ef8667e98ae9e87e))

## [0.10.0](https://github.com/ERC725Alliance/erc725.js/compare/v0.9.2...v0.10.0) (2022-03-11)

### Features

- add isValidSignature ([6490751](https://github.com/ERC725Alliance/erc725.js/commit/6490751c009e435ac23eb98e6bfe64d271b85ba4))

## [0.9.2](https://github.com/ERC725Alliance/erc725.js/compare/v0.9.1...v0.9.2) (2022-02-21)

### Features

- add LSP1 schema ([4f849da](https://github.com/ERC725Alliance/erc725.js/commit/4f849dac01116e6f019e04fea950b42d2271910b))

### Bug Fixes

- update ERC725Y JSON Schemas to latest LSPs specs ([#92](https://github.com/ERC725Alliance/erc725.js/issues/92)) ([3485baa](https://github.com/ERC725Alliance/erc725.js/commit/3485baa347cf9a194bd0c4ea2a1e8c61922b63b9))
- wait until a promise is resolved when using ethereum provider ([5efe641](https://github.com/ERC725Alliance/erc725.js/commit/5efe6414b6e4a4250d8c402baa887a269e6f83ef))

## [0.9.1](https://github.com/ERC725Alliance/erc725.js/compare/v0.9.0...v0.9.1) (2022-02-01)

### Bug Fixes

- getSchema array ([#95](https://github.com/ERC725Alliance/erc725.js/issues/95)) ([8ce5ff1](https://github.com/ERC725Alliance/erc725.js/commit/8ce5ff1c81ece3534fd557d978bda4107dfd3809))

## [0.9.0](https://github.com/ERC725Alliance/erc725.js/compare/v0.8.0...v0.9.0) (2022-01-06)

### ⚠ BREAKING CHANGES

- GraphQL / Apollo has been removed

### Features

- add encodeKeyName method ([#86](https://github.com/ERC725Alliance/erc725.js/issues/86)) ([7cf43ba](https://github.com/ERC725Alliance/erc725.js/commit/7cf43babbf461a05636d31941237adf94a3d364d))
- add getSchema ([#85](https://github.com/ERC725Alliance/erc725.js/issues/85)) ([7f677d0](https://github.com/ERC725Alliance/erc725.js/commit/7f677d0b6b08061773a151d2e91a21156ca59f3a))
- LSP6 Permissions encoding methods ([#84](https://github.com/ERC725Alliance/erc725.js/issues/84)) ([2e1031a](https://github.com/ERC725Alliance/erc725.js/commit/2e1031a047f19b2fc98104b7df58eecb1424b67f))

### Bug Fixes

- empty JSON url return null instead of crash ([#61](https://github.com/ERC725Alliance/erc725.js/issues/61)) ([2d1e417](https://github.com/ERC725Alliance/erc725.js/commit/2d1e417facbc9b2c5b1f4fae62d46b498f3f7603))

- remove GraphQL support ([#83](https://github.com/ERC725Alliance/erc725.js/issues/83)) ([a0a5e93](https://github.com/ERC725Alliance/erc725.js/commit/a0a5e93bff3e4a5cc759c7b8662f7df523fa484f))

## [0.8.0](https://github.com/ERC725Alliance/erc725.js/compare/v0.6.2-beta.4...v0.8.0) (2021-11-22)

### ⚠ BREAKING CHANGES

- remove deprecated elementValueType / elementValueContent keys (#45)

### Features

- add support for new getData([]) ([#48](https://github.com/ERC725Alliance/erc725.js/issues/48)) ([6cbb1e7](https://github.com/ERC725Alliance/erc725.js/commit/6cbb1e76e3df8b862ee35e436aaddea24f86e2ea))
- remove deprecated elementValueType / elementValueContent keys ([#45](https://github.com/ERC725Alliance/erc725.js/issues/45)) ([a326cd6](https://github.com/ERC725Alliance/erc725.js/commit/a326cd6560a8a9de6c68db61c919c07f4f71e3d5))

### Bug Fixes

- handling of missing keys ([#58](https://github.com/ERC725Alliance/erc725.js/issues/58)) ([9431f85](https://github.com/ERC725Alliance/erc725.js/commit/9431f85dd62785305f5b32ca6c4a4e9e3c9b788d))
- wrong return type for fetchData ([#54](https://github.com/ERC725Alliance/erc725.js/issues/54)) ([0ce147a](https://github.com/ERC725Alliance/erc725.js/commit/0ce147ac0774a3ec0b404896da02b923bbfbd09c))

## [0.7.0](https://github.com/ERC725Alliance/erc725.js/compare/v0.6.2-beta.4...v0.7.0) (2021-11-02)

### ⚠ BREAKING CHANGES

- remove deprecated elementValueType / elementValueContent keys (#45)

### Features

- add support for new getData([]) ([#48](https://github.com/ERC725Alliance/erc725.js/issues/48)) ([6cbb1e7](https://github.com/ERC725Alliance/erc725.js/commit/6cbb1e76e3df8b862ee35e436aaddea24f86e2ea))
- remove deprecated elementValueType / elementValueContent keys ([#45](https://github.com/ERC725Alliance/erc725.js/issues/45)) ([a326cd6](https://github.com/ERC725Alliance/erc725.js/commit/a326cd6560a8a9de6c68db61c919c07f4f71e3d5))

### [0.6.1](https://github.com/ERC725Alliance/erc725.js/compare/v0.6.0...v0.6.1) (2021-08-13)

### Docs

- **docs:** Update missed occurrences of "erc725.js"

### [0.6.0](https://github.com/ERC725Alliance/erc725.js/compare/v0.5.7...v0.6.0) (2021-08-13)

### Feature

- **API:** Adjusted API to be more consistent
  - https://github.com/ERC725Alliance/erc725.js/issues/30
  - https://github.com/ERC725Alliance/erc725.js/pull/31

### Bug Fixes

- **mocha:** increase timeout time ([b7ce1a0](https://github.com/ERC725Alliance/erc725.js/commit/b7ce1a07711b8251f4447d613c4c5a522b5e263f))

### [0.5.7](https://github.com/ERC725Alliance/erc725.js/compare/v0.2.0...v0.5.7) (2021-07-30)

### Bug Fixes

- **publish:** ensure clean build folder ([973e09b](https://github.com/ERC725Alliance/erc725.js/commit/973e09b936277c254fdc9c15d4d5d89fc4dc05ed))