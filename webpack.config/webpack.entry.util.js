/**
 * 自动识别工程中的entry
 * Created by LiuJiang on 2018/9/4
 */
const path = require("path");
const Glob = require("glob");
const fs = require("fs");

let obj = {
    /**
     * 根据目录获取入口
     * @param  {[type]} globPath [description]
     * @return {[type]}          [description]
     */
    getEntryJs: function (globPath) {
        globPath = path.resolve(__dirname, globPath);
        let entries = {};
        Glob.sync(globPath).forEach(function (entry) {
            let basename = path.basename(entry, path.extname(entry)),
                pathname = path.dirname(entry),
                paths = pathname.split('/'),
                fileDir = paths.splice(paths.indexOf("src") + 1).join('/');

            //仅处理page路径下的js
            if (pathname.indexOf("page") > -1) {// && fileDir && fileDir.indexOf(("page") === 0)) {
                entries[(fileDir ? fileDir + '/' : fileDir) + basename] = pathname + '/' + basename;
            }

        });
        //目录页保留
        entries["index"] = path.resolve(__dirname,"../src/index").split("\\").join("/");
        console.log("---------------------------------------------\nentries:");
        console.log(entries);
        console.log("----------------------------------------------");
        return entries;
    },

    /**
     * 根据目录获取 Html 入口
     * @param  {[type]} globPath [description]
     * @return {[type]}          [description]
     */
    getEntryHtml: function (globPath) {
        globPath = path.resolve(__dirname, globPath);
        let entries = [];
        Glob.sync(globPath).forEach(function (entry) {
            let basename = path.basename(entry, path.extname(entry)),
                pathname = path.dirname(entry),
                paths = pathname.split('/'),
                // @see https://github.com/kangax/html-minifier#options-quick-reference
                minifyConfig = process.env.NODE_ENV === "production" ? {
                    removeComments: true,
                    // collapseWhitespace: true,
                    minifyCSS: true,
                    minifyJS: true
                } : "";
            //只处理page目录下的HTML
            //保留目录页
            if (entry.indexOf("page") > -1 ) {
                let chunkName = paths.splice(paths.indexOf("src") + 1).join('/') + "/" + basename;

                entries.push({
                    filename: chunkName + ".html",
                    template: entry,
                    chunks: ['public/vendor', chunkName],
                    minify: minifyConfig
                });
            }
        });
        //保留目录页
        entries.push({
            filename: "index.html",
            template: path.resolve(__dirname,"../src/index.html").split("\\").join("/"),
            chunks: ['public/vendor',"index"]
        });
        //保存entry的json文件
        this.entry2JsonFile(entries);

        return entries;
    },
    /**
     * 生成entry对应的json文件
     * @param entries
     */
    entry2JsonFile: function (entries) {
        console.log(entries);
        let json = {};
        if (entries) {
            entries.forEach(v => {
                json[v.filename] = v.filename;
            });
        }
        console.log(json);

        //同步写入文件
        let fd = fs.openSync(path.resolve(__dirname, "../src/entry.json"), "w");
        fs.writeSync(fd, JSON.stringify(json), 0, "utf-8");
        fs.closeSync(fd);
    }
};
// obj.getEntry("../src/page/**/*.js");
// obj.getEntryHtml('../src/page/**/index.html');

module.exports = obj;