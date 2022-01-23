chrome.contextMenus.create({
    title: "打开百度网盘：%s", // %s表示选中的文字
    contexts: ["selection"], // 只有当选中文字时才会出现此右键菜单
    onclick: function (params) {
        let link = params.selectionText.trim();
        let reg = /(https:\/\/)?(pan\.baidu\.com)?(\/s\/|s\/|\/)?([0-9a-zA-Z_\-]+)[^0-9a-zA-Z_\-]*([0-9a-zA-Z]{4})?/;
        link = link.replace(/\n|\r/g, "");
        reg.exec(link);
        let sharelink = RegExp.$4;
        let pwd = RegExp.$5;
        if(pwd === undefined) {
            pwd = "";
        }
        chrome.tabs.create({url: "https://pan.baidu.com/s/" + encodeURI(sharelink) + "?pwd=" + encodeURI(pwd)});
    }
});

chrome.omnibox.onInputChanged.addListener((text, suggest) => {
    // 为用户提供一些搜索建议
    let link = text.trim();
    let reg = /(https:\/\/)?(pan\.baidu\.com)?(\/s\/|s\/|\/)?([0-9a-zA-Z_\-]+)[^0-9a-zA-Z_\-]*([0-9a-zA-Z]{4})?/;
    link = link.replace(/\n|\r/g, "");
    reg.exec(link);
    let sharelink = RegExp.$4;
    let pwd = RegExp.$5;
    if(pwd === undefined) {
        pwd = "";
    }
    suggest([{
        "content": "https://pan.baidu.com/s/" + encodeURI(sharelink) + "?pwd=" + encodeURI(pwd),
        "description": "打开百度网盘分享: " + "https://pan.baidu.com/s/" + encodeURI(sharelink) + "?pwd=" + encodeURI(pwd)
    }]);
});

chrome.omnibox.onInputEntered.addListener((text, disposition) => {
    link = text.trim();
    let reg = /(https:\/\/)?(pan\.baidu\.com)?(\/s\/|s\/|\/)?([0-9a-zA-Z_\-]+)[^0-9a-zA-Z_\-]*([0-9a-zA-Z]{4})?/;
    link = link.replace(/\n|\r/g, "");
    reg.exec(link);
    let sharelink = RegExp.$4;
    let pwd = RegExp.$5;
    if(pwd === undefined) {
        pwd = "";
    }
    chrome.tabs.create({url: "https://pan.baidu.com/s/" + encodeURI(sharelink) + "?pwd=" + encodeURI(pwd)});
});
