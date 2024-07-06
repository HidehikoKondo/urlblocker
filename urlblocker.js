

/*
Chrome拡張です。
指定したurlにアクセスすると、指定したページにリダイレクトされるようになります。

使い方
1. 配列rejectedURLsに拒否するurlを追加する。
2. 配列の値はjson形式にして、localstorageに保存する。
3. rejectedURLsに登録したurlにアクセスすると、blocked.htmlにリダイレクトされる。

フロントエンドの仕様
1. テキストボックス（id="addurl"）の横に+ボタンを追加する。
2. テキストボックス(id="addurl")のvalueは+ボタンをクリックしたら、rejectedURLsに追加され、localstraogeに保存される。
3. 保存されているrejectedURLsを表示する。
4. 表示されたurlの横に削除ボタンを追加する。
5. 削除ボタンをクリックしたら、rejectedURLsから削除され、localstorageに保存される。
6. 削除ボタンをクリックしたら、表示されているurlが消える。
*/

console.log('urlblocker.js loaded');

// rejectedURLsをlocalStorageから読み込む。存在しない場合は空の配列を使用
let rejectedURLs = JSON.parse(localStorage.getItem('rejectedURLs')) || [];

console.log(rejectedURLs);


// URLをrejectedURLsに追加し、localStorageに保存する関数
function addURL(url) {
    if (!rejectedURLs.includes(url)) {
        rejectedURLs.push(url);
        localStorage.setItem('rejectedURLs', JSON.stringify(rejectedURLs));
        displayURLs(); // URLを表示する関数を呼び出す
    }
}

// // URLをrejectedURLsから削除し、localStorageに保存する関数
// function removeURL(url) {
//     rejectedURLs = rejectedURLs.filter(u => u !== url);
//     localStorage.setItem('rejectedURLs', JSON.stringify(rejectedURLs));
//     displayURLs(); // 更新されたURLを表示する
// }

// // rejectedURLsを表示する関数
// function displayURLs() {
//     const list = document.getElementById('urlList'); // URLを表示するリストの要素を取得
//     list.innerHTML = ''; // リストをクリア
//     rejectedURLs.forEach(url => {
//         const item = document.createElement('li');
//         item.textContent = url;
//         const removeButton = document.createElement('button');
//         removeButton.textContent = '削除';
//         removeButton.onclick = () => removeURL(url); // 削除ボタンをクリックしたときの処理
//         item.appendChild(removeButton);
//         list.appendChild(item);
//     });
// }

// // ページが読み込まれたときに実行
// document.addEventListener('DOMContentLoaded', () => {
//     displayURLs(); // 保存されているURLを表示

//     // +ボタンのクリックイベントを設定
//     document.getElementById('addButton').onclick = () => {
//         const url = document.getElementById('addurl').value; // テキストボックスからURLを取得
//         if (url) { // URLが空でない場合
//             addURL(url); // URLを追加
//             document.getElementById('addurl').value = ''; // テキストボックスをクリア
//         }
//     };
// });





/*



// var currentURL = window.location.href;
// console.log(currentURL);

// var rejectedURLs = [];
//登録したurlと一致したらリダイレクト
// var url = String(chrome.runtime.getURL('./html/blocked.html'));
// window.location.href = url;

//URLを取得するコード


*/