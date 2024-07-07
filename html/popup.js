//urlの保存用
let rejectedURLs = [];

//rejectedURLsを取得して、なければ空っぽで作る
chrome.storage.local.get(['rejectedURLs'], function (result) {
    rejectedURLs = result.rejectedURLs || [];

    //データ表示を更新
    displayURLs();

});

// ページが読み込まれたときに実行
document.addEventListener('DOMContentLoaded', () => {
    //データ表示を更新
    displayURLs();

    // +ボタンでブロックするURLを追加
    if (document.getElementById('addbutton') === null) {
        return;
    }
    document.getElementById('addbutton').onclick = () => {
        const url = document.getElementById('rejectURL').value;
        if (url) {
            addURL(url);
            // テキストボックスをクリア
            document.getElementById('rejectURL').value = '';
        }
        //データを表示更新
        displayURLs();
    };
});



//データの表示を更新する
function displayURLs() {
    //id="blockedurls"の子要素をすべて削除
    const blockedURLsElement = document.getElementById('blockedurls');
    console.log("blockedURLsElement");
    console.log(blockedURLsElement);
    if (blockedURLsElement === null) {
        return;
    }
    while (blockedURLsElement.firstChild) {
        blockedURLsElement.removeChild(blockedURLsElement.firstChild);
    }

    // テキストボックスと×ボタンを作成して、blockedURLsElementに追加する
    rejectedURLs.forEach(url => {
        const container = document.createElement('div');
        container.classList.add('url-container');

        const input = document.createElement('input');
        input.classList.add('textbox');
        input.type = 'text';
        input.value = url;
        input.disabled = true;
        container.appendChild(input);

        const closeButton = document.createElement('button');
        closeButton.textContent = '×';
        closeButton.classList.add('del');
        closeButton.addEventListener('click', () => {
            removeURL(url);
            container.remove();
        });
        container.appendChild(closeButton);

        blockedURLsElement.appendChild(container);
    });
}

// URLをrejectedURLsに追加し、localStorageに保存する
function addURL(url) {
    if (!rejectedURLs.includes(url)) {
        rejectedURLs.push(url);

        chrome.storage.local.set({ "rejectedURLs": rejectedURLs }, function () {
            console.log("rejectedURLs set");
        });
    }
    //表示を更新
    displayURLs();
}

// URLをrejectedURLsから削除し、localStorageに保存する関数
function removeURL(url) {
    rejectedURLs = rejectedURLs.filter(u => u !== url);
    chrome.storage.local.set({ "rejectedURLs": rejectedURLs }, function () {
        console.log("rejectedURLs set");
    });

    //表示を更新
    displayURLs();
}

