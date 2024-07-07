// 現在のページのURLを取得
let currentURL = window.location.href;


chrome.storage.local.get("rejectedURLs", function (rejectedURLs) {
    // 現在のURLがrejectedURLsに含まれるURLの文字列を含んでいるか確認
    let isBlocked = rejectedURLs["rejectedURLs"].some(rejectedURL => currentURL.indexOf(rejectedURL) !== -1);

    // blocked.htmlにリダイレクト
    if (isBlocked) {
        window.location.href = chrome.runtime.getURL('./html/blocked.html');
    }
});