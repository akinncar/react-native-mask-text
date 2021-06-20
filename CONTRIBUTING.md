# Contributing to React Native Mask Text

First off, _thank you_ for considering contributing to the React Native Community. The community-supported packages are only possible because of amazing people like you.

Secondly, we'd like the contribution experience to be as good as possible. While we are a small all-volunteer team, we are happy to hear feedback about your experience, and if we can make the docs or experience better please let us know.

## Build/Minify

To run this lib you will need to compile on start and on every change, in the lib folder run:

```shell
$ yarn && yarn prepare
```

### Testing in a new `react-native init` or `expo init` project

In a new `react-native init` or `expo init` project, do this:

Install WML globally to can link library to your project
```shell
$ npm install -g wml
```

Link library folder to your project
```shell
$ wml add ../react-native-mask-text ./node_modules/react-native-mask-text
```

Now, your modifies on `../react-native-mask-text` will reflete to `./node_modules/react-native-mask-text`

## Quality

Make sure that you didn't break any tests, and if you are adding a new feature, please provide some tests.
You can check if tests are passing running:
```shell
yarn test
```

All tests and builds are executed on every PR with our workflow on Github.

*We will not accept Pull Requests with errors on tests*

## Commit and Branch best pratices

Currently, we are using flags:

To new features and implementations on source code <br />
Branch: `feat/<branch-name>`<br />
Commits: `chore: <commit-message>`<br />

To improve docs, contributing file, and other related to developer experience <br />
Branch: `docs/<branch-name>` <br />
Commits: `docs: <commit-message>`<br />

To fix bugs on the source code <br />
Branch: `fix/<branch-name>`<br />
Commits: `fix: <commit-message>`<br />