import React from 'react';
import background from './background.jpeg';
import Button from './Button';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={background} className="App-logo" />
        <div className="Activity-intro">
          <div className="Activity-intro-text">
            活動介紹
          </div>
        </div>
        <div className="Activity-detail">
          <div className="Activity-detail-text">
            9.15-9.25期间，訂購Migu C包月會員，搶當第8/88/168/288/488位VIP，獲NBA中國賽門票專屬大禮，看「聯盟最強」勒邦占士 VS 「死神」杜蘭特！
          </div>
          <div className="Activity-detail-text">
            PS：C小君還為籃球迷們準備了另一份「觸手可及」的禮物——訂購排名數尾號為2/4/6/8的用戶，将加贈一個月MiguC會員權益，盡享MiguC全量NBA精彩內容。
          </div>
        </div>
        <div className="Activity-intro">
          <div className="Activity-intro-text">
            活動步驟
          </div>
        </div>
        <div className="Activity-detail">
          <div className="Activity-detail-text">
            1. 下载MiguC並注册賬戶
          </div>
          <div className="Activity-detail-text">
            2. 訂購MiguC單月會員
          </div>
          <div className="Activity-detail-text">
            3. 根據彈窗提示獲知訂購次序及是否中獎的信息
          </div>
          <div className="Activity-detail-text">
            4.系統提示中獎的用戶進入獎品兌換页領獎
          </div>
        </div>
        <Button/>
      </header>
    </div>
  );
}

export default App;
