
// let rejectedURLs = JSON.parse(localStorage.getItem('rejectedURLs')) || [];

//urlの保存用
let rejectedURLs = [];

function check() {
    console.log("--ccheck--");
    console.log(rejectedURLs);
}

//rejectedURLsを取得して、なければ空っぽで作る
chrome.storage.local.get(['rejectedURLs'], function (result) {
    rejectedURLs = result.rejectedURLs || [];

    check();
    displayURLs();
});



function displayURLs() {
    console.log("displayURLS");
    //id="blockedurls"の子要素をすべて削除
    const blockedURLsElement = document.getElementById('blockedurls');
    while (blockedURLsElement.firstChild) {
        blockedURLsElement.removeChild(blockedURLsElement.firstChild);
    }

    //ローカルストレージからデータを読み込み
    // chrome.storage.local.get(['rejectedURLs'], function (result) {
    //     let rejectedURLs = result.rejectedURLs || [];


    console.log(rejectedURLs.length);
    // テキストボックスと×ボタンを作成して、blockedURLsElementに追加する
    rejectedURLs.forEach(url => {
        const container = document.createElement('div');
        container.classList.add('url-container');

        console.log(url);
        const input = document.createElement('input');
        input.type = 'text';
        input.value = url;
        input.disabled = true;
        container.appendChild(input);

        const closeButton = document.createElement('button');
        closeButton.textContent = '×';
        closeButton.addEventListener('click', () => {
            removeURL(url);
            container.remove();
        });
        container.appendChild(closeButton);

        blockedURLsElement.appendChild(container);
    });


    // });



    // let rejectedURLs = JSON.parse(localStorage.getItem('rejectedURLs')) || [];


}








// chrome.storage.local.set({ "title": "タイトル" }, function () {
//     console.log("title set");
// });

// ページが読み込まれたときに実行
document.addEventListener('DOMContentLoaded', () => {
    //データを表示
    displayURLs();

    // +ボタンでブロックするURLを追加
    document.getElementById('addbutton').onclick = () => {
        const url = document.getElementById('rejectURL').value;
        if (url) {
            addURL(url);
            document.getElementById('rejectURL').value = ''; // テキストボックスをクリア
        }
        //データを表示更新
        console.log("tapped");
        displayURLs();
    };
});


// URLをrejectedURLsに追加し、localStorageに保存する関数
function addURL(url) {
    if (!rejectedURLs.includes(url)) {
        rejectedURLs.push(url);
        //localStorage.setItem('rejectedURLs', JSON.stringify(rejectedURLs));
        // displayURLs(); // URLを表示する関数を呼び出す

        chrome.storage.local.set({ "rejectedURLs": rejectedURLs }, function () {
            console.log("rejectedURLs set");
        });
    }
    displayURLs(); // 更新されたURLを表示する
}

// URLをrejectedURLsから削除し、localStorageに保存する関数
function removeURL(url) {
    rejectedURLs = rejectedURLs.filter(u => u !== url);
    chrome.storage.local.set({ "rejectedURLs": rejectedURLs }, function () {
        console.log("rejectedURLs set");
    });
    displayURLs(); // 更新されたURLを表示する
}

