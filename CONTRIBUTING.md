# Contributing to React Native Mask Text

First off, _thank you_ for considering contributing to the React Native Community. The community-supported packages are only possible because of amazing people like you.

Secondly, we'd like the contribution experience to be as good as possible. While we are a small all-volunteer team, we are happy to hear feedback about your experience, and if we can make the docs or experience better please let us know.

## Testing and modify with example app

To be able to edit thist library, you first step is to download all dependencies.
```shell
yarn
```

After installing package dependencies, go to example app and install it dependencies as well.
```shell
cd example && yarn
```

The last step is to start expo bundler (you need [expo-cli](https://docs.expo.dev/workflow/expo-cli/) installed globally):
```shell
yarn start
```

Now, scan the QRCode with [Expo Go](https://expo.dev/client) app and start to edit the package, and will be refleted on example app.

*Although the library is available for iOS, Android, and Web, this example app is not working on web enviroment, only Android and iOS. Feel free to open a Pull Request to configure it for web.*

## Quality

Make sure that you didn't break any tests, and if you are adding a new feature, please provide some tests.
You can check if tests are passing running:
```shell
yarn test
```

All tests and builds are executed on every PR with our workflow on Github.

*We will not accept Pull Requests with errors on tests*

## Build/Minify

Before commit, verify if build/minify is working.

```shell
$ yarn && yarn prepare
```

## Commit and Branch best pratices

Currently, we are using flags:

To new features and implementations on source code <br />
Branch: `feat/<branch-name>`<br />
Commits: `feat: <commit-message>`<br />

To improve docs, contributing file, and other related to developer experience <br />
Branch: `docs/<branch-name>` <br />
Commits: `docs: <commit-message>`<br />

To fix bugs on the source code <br />
Branch: `fix/<branch-name>`<br />
Commits: `fix: <commit-message>`<br />