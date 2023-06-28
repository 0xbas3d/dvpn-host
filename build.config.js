module.exports = {
  productName: 'DVPN',
  appId: 'org.erb.DVPN',
  asar: true,
  asarUnpack: '**\\*.{node,dll}',
  files: ['dist', 'node_modules', 'package.json'],
  afterSign: '.erb/scripts/notarize.js',
  mac: {
    target: {
      target: 'default',
      arch: ['arm64', 'x64'],
    },
    type: 'distribution',
    hardenedRuntime: true,
    entitlements: 'assets/entitlements.mac.plist',
    entitlementsInherit: 'assets/entitlements.mac.plist',
    gatekeeperAssess: false,
  },
  dmg: {
    contents: [
      {
        x: 130,
        y: 220,
      },
      {
        x: 410,
        y: 220,
        type: 'link',
        path: '/Applications',
      },
    ],
  },
  win: {
    target: ['nsis'],
  },
  deb: {
    depends: ['socat'],
  },
  linux: {
    target: 'deb',
    maintainer: 'Sentinel <abc@gmail.com>',
    category: 'Development',
  },
  directories: {
    app: 'release/app',
    buildResources: 'assets',
    output: 'release/build',
  },
  extraResources: [
    '/assets/**',
    {
      from: 'scripts',
      to: 'scripts',
      filter: ['**/*'],
    },
  ],
};
