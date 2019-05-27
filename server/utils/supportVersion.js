const supportedMajorVersions = require('mineflayer/lib/version').supportedVersions;

const supportedProtocolVersions = {
    "1.7": ["1.7.10"],
    "1.8": ["1.8.8"],
    "1.9": ["1.9", "1.9.2", "1.9.4"],
    "1.10": ["1.10", "1.10.1", "1.10.2"],
    "1.11": ["1.11", "1.11.2"],
    "1.12": ["1.12", "1.12.1", "1.12.2"],
    "1.13": [" 1.13", "1.13.1", "1.13.2"],
    "1.14": ["1.14", "1.14.1"]
}

const supportedMinecraftVersions = supportedMajorVersions.reduce(
    (acc, version) => acc.concat(supportedProtocolVersions[version]), []
);

module.exports = {
    supportedVersions: supportedMinecraftVersions
}
