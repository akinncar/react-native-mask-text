// eslint-disable-next-line @typescript-eslint/no-var-requires
const path = require('path')

module.exports = {
  watchFolders: [path.resolve(__dirname, '../src')],
  resolver: {
    extraNodeModules: new Proxy(
      {},
      {
        get: (target, name) => {
          // eslint-disable-next-line
          if (target.hasOwnProperty(name)) {
            return target[name]
          }
          return path.join(process.cwd(), `node_modules/${name}`)
        },
      }
    ),
  },
}
