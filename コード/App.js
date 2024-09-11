let deckId;
let EnemyDeckId;
let totalHearts = 0;
let totalDiamonds = 0;
let totalClubs = 0;
let totalSpades = 0;

//デッキAPIのURL
const deckApiUrl = "https://deckofcardsapi.com/api/deck";





// ゲーム開始時にデッキを取得(エネミー)
window.onload = () => {
    fetch(`${deckApiUrl}/new/shuffle/?cards=5S,6S,7S,8S,9S,10S,JS,QS,KS,AS,5D,6D,7D,8D,9D,10D,JD,QD,KD,AD,5C,6C,7C,8C,9C,10C,JC,QC,KC,AC,5H,6H,7H,8H,9H,10H,JH,QH,KH,AH
`)
        .then(response => response.json())
        .then(data => {
            EnemyDeckId = data.deck_id;
        });
// ゲーム開始時にデッキを取得(プレイヤーデッキ)

    fetch(`${deckApiUrl}/new/shuffle/?cards=2S,3S,4S,2D,3D,4D,2C,3C,4C,2H,3H,4H,X1,X2&jokers_enabled=true`)
        .then(response => response.json())
        .then(data => {
            deckId = data.deck_id;
        });


        
};
//onload


// 山札からカードを引く
function drawCards() {
    fetch(`${deckApiUrl}/${deckId}/draw/?count=5`)
        .then(response => response.json())
        .then(data => {
            const drawnCardsDiv = document.getElementById('drawn-cards');
            drawnCardsDiv.innerHTML = ''; // 以前のカードをクリア

            data.cards.forEach(card => {
                const cardImg = document.createElement('img');
                cardImg.src = card.image;
                cardImg.alt = `${card.value} of ${card.suit}`;
                cardImg.dataset.value = card.value;
                cardImg.dataset.suit = card.suit;

                cardImg.onclick = () => selectCard(cardImg);

                drawnCardsDiv.appendChild(cardImg);
            });

            
            //----
                //フェーズ表示
                //メッセージ
                const contentDiv = document.getElementById("content");
                const message = document.createElement("p");
                message.innerText = "~~~捨札フェーズ~~~\n捨てるカードをクリックで選択してください\n捨てない場合、下記ボタンで次のフェーズへ移行します";
                contentDiv.appendChild(message);

                    // カードを選択してリストに追加、場から削除
                    function selectCard(cardElement) {
                        const selectedCardsDiv = document.getElementById('selected-cards');
                        const clonedCard = cardElement.cloneNode(true); // カードを選択リストに追加
                        selectedCardsDiv.appendChild(clonedCard);
                        //場から選択されたカードを削除
                        cardElement.remove();
                    }

                // ボタンだす
                const newButton = document.createElement("button");
                newButton.innerText = "完了して次のフェーズへ";
                newButton.onclick = function() {


                
                    
                    
                    
                    alert("ここにドローフェーズ");






                };
                contentDiv.appendChild(newButton);
            //----

        });
        const element = document.getElementById("draw-deck"); 
        element.remove();
}



enemy手札
        function EnemyDrawCards() {
            fetch(`${deckApiUrl}/${EnemyDeckId}/draw/?count=5`)
                .then(response => response.json())
                .then(data1 => {
                    const drawnCardsDiv = document.getElementById('enemy-drawn-cards');
                    drawnCardsDiv.innerHTML = ''; // 以前のカードをクリア
        
                    data1.cards.forEach(card => {
                        const cardImg = document.createElement('img');
                        cardImg.src = card.image;
                        cardImg.alt = `${card.value} of ${card.suit}`;
                        cardImg.dataset.value = card.value;
                        cardImg.dataset.suit = card.suit;
        
                        cardImg.onclick = () => selectCard(cardImg);
        
                        drawnCardsDiv.appendChild(cardImg);
                    });
                });
        const element = document.getElementById("enemy-draw-deck"); 
        element.remove();
                
    }

    
    
    


 
//      // カードの値をスートごとに合計値に追加
//      updateTotals(cardElement.dataset.suit, cardElement.dataset.value);


//  }

//  // カードの値を数値に変換する
//  function getCardValue(value) {
//      if (value === 'ACE') return 1;
//      if (value === 'JACK' || value === 'QUEEN' || value === 'KING') return 10;
//      return parseInt(value);
//  }

//  // スートごとの合計値を更新
//  function updateTotals(suit, value) {
//      const cardValue = getCardValue(value);

//      switch (suit) {
//          case 'HEARTS':
//              totalHearts += cardValue;
//              document.getElementById('hearts-total').textContent = totalHearts;
//              break;
//          case 'DIAMONDS':
//              totalDiamonds += cardValue;
//              document.getElementById('diamonds-total').textContent = totalDiamonds;
//              break;
//          case 'CLUBS':
//              totalClubs += cardValue;
//              document.getElementById('clubs-total').textContent = totalClubs;
//              break;
//          case 'SPADES':
//              totalSpades += cardValue;
//              document.getElementById('spades-total').textContent = totalSpades;
//              break;
//          default:
//              break;
//      }
//  }
