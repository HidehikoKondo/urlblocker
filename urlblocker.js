// 現在のページのURLを取得
let currentURL = window.location.href;
console.log(currentURL);

// 拒否リストのurl
chrome.storage.local.get("rejectedURLs", function (rejectedURLs) {
    // console.info(data)

    // let rejectedURLs = [];

    console.log("--rejectedURLs--");
    console.log(rejectedURLs);


    // currentURLがrejectedURLsに含まれているかチェック
    //    const isURLRejected = rejectedURLs.includes(currentURL);

    //    console.log(isURLRejected); // trueまたはfalseが出力される


    // 現在のURLがrejectedURLsに含まれるURLの文字列を含んでいるか確認
    let isBlocked = rejectedURLs["rejectedURLs"].some(rejectedURL => currentURL.indexOf(rejectedURL) !== -1);

    // let isBlocked = false;

    // rejectedURLs["rejectedURLs"].forEach(url => {
    //     console.log(url);
    // });

    if (isBlocked) {
        // blocked.htmlにリダイレクト
        console.log("blocked");
        window.location.href = chrome.runtime.getURL('./html/blocked.html');
    } else {
        console.log("not blocked");
    }
});

// rejectedURLsをlocalStorageから読み込む。存在しない場合は空の配列を使用
//let rejectedURLs = JSON.parse(localStorage.getItem('rejectedURLs')) || [];

