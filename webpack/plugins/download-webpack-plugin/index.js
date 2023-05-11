const axios = require('axios');
const fs = require('fs-extra');
const { join } = require('path');

const NAME = 'DownloadWebpackPlugin'


class DownloadWebpackPlugin {
    constructor(options) {
        this.options = options;
    }

    apply(compiler) {
        compiler.hooks.emit.tapAsync(
            NAME,
            async (_, callback) => {
                console.log(compiler.options);

                if (!this.options.files) {
                    return;
                }

                if (this.options.cache) {
                    await fs.ensureDir(this.options.cache);
                }

                await fs.ensureDir(compiler.options.output.path)

                for (const file of this.options.files) {
                    const path = join(compiler.options.output.path, file.name);

                    if (file.cache) {
                        const cached = cachePath(this.options.cache, file.url, file.name);

                        if (await fs.exists(cached)) {
                            console.error(NAME, 'Copying', file.name, 'from', cached)

                            await fs.copy(cached, path);

                            continue;
                        }
                    }

                    console.error(NAME, 'Downloading', file.name, 'from', file.url)

                    try {
                        const { data } = await axios.get(file.url);

                        await fs.writeFile(path, data, 'utf-8')

                        if (file.cache) {
                            const cached = cachePath(this.options.cache, file.url, file.name);

                            await fs.copy(path, cached);
                        }
                    } catch (e) {
                        console.error(NAME, 'Failed to download file', file.name, 'from', file.url)
                        console.error(e.message);
                        throw e
                    }
                }

                callback();
            }
        );
    }
}

function cachePath(path, url, name) {
    const sanitized = url.replace(/[<>:"\/\\|?*]/gmi, '_')
    const filename = (sanitized + "__" + name)

    return join(path, filename);
}

module.exports = DownloadWebpackPlugin;
