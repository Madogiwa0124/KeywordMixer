$(function () {
    
    // 画面要素の取得
    // ワードは追加を考慮して配列で保持    
    var words = [
         document.getElementById('word1')          // ワード①
        ,document.getElementById('word2')          // ワード②
    ];
    var wordResetCnt = 0;
    var resetBtn1 = document.getElementById('resetBtn1');       // リセットボタン①
    var resetBtn2 = document.getElementById('resetBtn2');       // リセットボタン②
    var ideaText = document.getElementById('ideaText');         // アイデアメモ
    var postBtn = document.getElementById('postBtn');           // 投稿ボタン
    var wordHistory_body = document.getElementById('wordHistory_body');   // ワード履歴

    // #キーワードミキサーを含むTweetを取得 ★TODO:Twitter APIを用いて検索結果を取得する。
    // var feedUrl = "https://api.twitter.com/1.1/search/tweets.json?lang=ja&q=%23%83L%81%5b%83%8f%81%5b%83h%83%7e%83L%83T%81%5b"
    // getTweetList(feedUrl);

    // キーワード定義(keywords.jsから取得)
    var keyWords = keyWordsArray;

    // 初期表示時、ランダムなキーワードを設定    
    changeKeyWord(words[0]);
    changeKeyWord(words[1]);

    // 各ボタンを押下時ランダムにテキストを変更    
    resetBtn1.addEventListener('click', function() {
        changeKeyWord(words[0]);
    });
    resetBtn2.addEventListener('click', function() {
        changeKeyWord(words[1]);
    });

    // 実行ボタン押下時の処理   
    postBtn.addEventListener('click', function() {

        // 現在日時の生成
        var date = new Date();
        var year = date.getFullYear();
        var month = date.getMonth() + 1;
        var day = date.getDate();
        var hour = date.getHours();
        var minutes = date.getMinutes();
        var dateText = year + "/" + month + "/" + day + " " + hour + ":" + minutes;

        // キーワード及びアイデアメモを保持し、Tweet画面を開く
        window.open(
            "https://twitter.com/intent/tweet?text=" +
            encodeURIComponent(
                "キーワード①:" + words[0].value + "\n" +
                "キーワード②:" + words[1].value + "\n" +
                "[アイデア]" + "\n"+ ideaText.value + "\n\n" +
                "日時:" + dateText + "\n\n" + "#キーワードミキサー"
            )
        );
    });

    // ランダムなキーワードを取得する
    function changeKeyWord(word) {
        // 初回起動時以外は、ワード更新時に履歴を保持
        if (wordResetCnt > 1) { insertWordHistry(); }

        // ランダムなキーワードを生成し、設定する。
        var randIndex = Math.floor(Math.random() * keyWords.length);
        word.value = keyWords[randIndex];

        // ワード更新回数の更新
        wordResetCnt++;
    }

    // キーワード履歴の登録
    function insertWordHistry() {
        // 現時点のワードの情報を取得
        var beforeWords = words;
        wordHistory_body.innerHTML += "<tr><td>" + escapeHtml(words[0].value) + "</td><td>" + escapeHtml(words[1].value) + "</td></tr>";
    } 
    
    // HTMLエスケープ処理
    function escapeHtml(str) {
        str = str.replace(/&/g, '&amp;');
        str = str.replace(/</g, '&lt;');
        str = str.replace(/>/g, '&gt;');
        str = str.replace(/"/g, '&quot;');
        str = str.replace(/'/g, '&#39;');
        return str;
    }

    // #キーワードミキサーのTweet検索結果を取得 ★TODO:Twitter APIを用いて検索結果を取得する。
    // function getTweetList(feedUrl) {
    //     $.getJSON(feedUrl, function (json){console.log(json)});
    // } 

});