# hackthon-pixnet
SOV Hackthon #3:

### 1. 下載專案
```
git clone git@github.com:sovmedcare/hackthon-pixnet.git
```

### 2. 進入專案並利用 yarn 安裝相關套件
```
cd hackthon-pixnet
yarn install
```

### 3. 建置專案
```
yarn build
```


### 4. 到 chrome 瀏覽器「擴充功能」設定頁面
```
chrome://extensions/
```

### 5. 載入專案
點擊設定頁面右上方「開發人員模式」  
點擊設定頁面左上方「載入未封裝項目」按鈕  
並選取 `hackthon-pixnet/dist` 資料夾，即可載入
![image](https://user-images.githubusercontent.com/33479301/63661034-ae7a3f80-c7eb-11e9-8732-bcc495e1780b.png)


### 6. 開始使用
[Demo 影片](https://youtu.be/el3vGpKjttk)  


<details>
<summary>開發者注意事項</summary>
[node-synonym](https://github.com/Samurais/node-synonyms) 沒辦法安裝在 node v12.x 版本
所以要開發的話，要把 node 降版到 v10 才能夠正常安裝該套件。
應該是與相依的 [node-word2vec](https://github.com/chatopera/node-word2vec) 有關，參考這個 [issue](https://github.com/chatopera/node-word2vec/issues/3)
</details>
