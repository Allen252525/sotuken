let deckId;
let EnemyDeckId;
let totalHearts = 0;
let totalDiamonds = 0;
let totalClubs = 0;
let totalSpades 
let count=0;
let count2=0;
let element;
let faze=0;
let contentDiv;
let enemy;
let hand;

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
//enemy手札
function EnemyDrawCards() {
    fetch(`${deckApiUrl}/${EnemyDeckId}/draw/?count=4`)
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

// 山札からカードを引く
function drawCards() {
    faza=1;//エネミーフェーズに移行
    fetch(`${deckApiUrl}/${deckId}/draw/?count=4`)
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
                if(count2==0){
                    faze=2;//捨札フェーズに移行
                    contentDiv = document.getElementById("content");
                    const message = document.createElement("p");
                    message.innerText = "~~~捨札フェーズ~~~\n捨てるカードをクリックで選択してください\n捨てない場合、下記ボタンでドローフェーズへ移行します";
                    contentDiv.appendChild(message);

                    // ボタンだす
                    const newButton = document.createElement("button");
                    newButton.innerText = "完了してドローフェーズへ";
                    newButton.onclick = function() {
                    
                        
                        faze=3;//ドローフェーズに移行
                        contentDiv.remove();
                        element = document.getElementById("draw-deck"); 
                        if(faze==3){

                            contentDiv = document.getElementById("content2");
                            const message = document.createElement("p");
                            message.innerText = "~~~ドローフェーズ~~~\n自分の手札を引いてください\n下記ボタンで捕獲フェーズへ移行します";
                            contentDiv.appendChild(message);
                            //alert("ここにドローフェーズ");
                            contentDiv = document.getElementById("content2");
                            const newButton2 = document.createElement("button");
                            
                            newButton2.innerText = "完了して捕獲フェーズへ";
                            

                            faze=4;
                            newButton2.onclick = function() {
                                if(faze==4){
                                    contentDiv.remove();
                                    contentDiv = document.getElementById("content3");
                                    const message = document.createElement("p");
                                    message.innerText = "~~~捕獲フェーズ~~~\n敵を捕獲してください\n下記ボタンでエネミーフェーズへ移行します";
                                    contentDiv.appendChild(message);
                                    //alert("ここに捕獲フェーズ");
                                    contentDiv = document.getElementById("content3");
                                    const newButton3 = document.createElement("button");
                                    
                                    newButton3.innerText = "完了してエネミーフェーズへ";
                                    
        
                                    faze=0;
                                    newButton3.onclick = function() {
                                                    
                                        
                        
                                    }
                                    contentDiv.appendChild(newButton3);

                                }   
                                
                
                            }
                            contentDiv.appendChild(newButton2);
                        }else{
                            
                            //element.remove();
                            //alert("ここにドローフェーズ");
                        }



                    

                    };
                    contentDiv.appendChild(newButton);
                    



                }
                
                count2++;
                // カードを選択してリストに追加、場から削除
                
                function selectCard(cardElement) {
                    
                    if(count<1){
                        //裏面表示
                        const imageUrl = "https://deckofcardsapi.com/static/img/back.png";
                        const imgElement = document.createElement("img");
                        imgElement.src = imageUrl;
                        imgElement.alt = "カードの裏面";
                        document.getElementById("image-container").appendChild(imgElement);

                    }
                    count++;
                    document.getElementById('total').textContent = count;


                    
                    //場から選択されたカードを削除
                    cardElement.remove();

                    

                }
                
            //----

        });
        
        ////////ドローフェイズになったらこいつを無効化
        element = document.getElementById("draw-deck"); 

        
        
        
        
        
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
