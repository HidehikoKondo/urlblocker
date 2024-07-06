//loadedとログを表示して
console.log('popup.js loaded');


// rejectedURLsをlocalStorageから読み込む。存在しない場合は空の配列を使用
let rejectedURLs = JSON.parse(localStorage.getItem('rejectedURLs')) || [];

console.log(rejectedURLs);




// ページが読み込まれたときに実行
document.addEventListener('DOMContentLoaded', () => {
    // displayURLs(); // 保存されているURLを表示

    // +ボタンのクリックイベントを設定
    document.getElementById('addbutton').onclick = () => {

        console.log('pushed button');

        const url = document.getElementById('rejectURL').value; // テキストボックスからURLを取得
        console.log(url);


        if (url) { // URLが空でない場合
            addURL(url); // URLを追加
            //document.getElementById('addurl').value = ''; // テキストボックスをクリア
        }
    };
});


// URLをrejectedURLsに追加し、localStorageに保存する関数
function addURL(url) {
    if (!rejectedURLs.includes(url)) {
        rejectedURLs.push(url);
        localStorage.setItem('rejectedURLs', JSON.stringify(rejectedURLs));
        //displayURLs(); // URLを表示する関数を呼び出す
    }
}