// 現在のページのURLを取得
let currentURL = window.location.href;

console.log(currentURL);

// rejectedURLsをlocalStorageから読み込む。存在しない場合は空の配列を使用
let rejectedURLs = JSON.parse(localStorage.getItem('rejectedURLs')) || [];

console.log(rejectedURLs);



// 現在のURLがrejectedURLsに含まれるURLの文字列を含んでいるか確認
let isBlocked = rejectedURLs.some(rejectedURL => currentURL.includes(rejectedURL));

if (isBlocked) {
    // blocked.htmlにリダイレクト
    console.log("blocked");
    window.location.href = chrome.runtime.getURL('./html/blocked.html');
} else {
    console.log("not blocked");
}