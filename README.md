## 積み上げシートを管理するLINE BOT

私を管理してくれるwonbinさん

## できること

- トリガーを設定して関数を実行（メッセージを送信）する

## 制作の経緯
- めんどくさがりで記録残すのサボってしまう😭→通知が来るようにしよう
- 記録するときしかスプレッドシート開かないからどのくらいやったか実感できない🤔→一週間分の合計学習時間を知りたい
- 個人開発やってみたいけどハードル高い🌀＆実用性ないものは作りたくない→LINEbotだったら作れそう

## メッセージの内容

*v1*
- 朝7時
  前日の学習時間・内容を共有

- 夜7時
  入力を忘れないようにするためのリマインドメッセージ
  （すでに入力されていたら褒めるメッセージ）

- 毎週月曜朝7時
  一週間の学習時間を共有
  3000分（約50時間超えていたら褒める）
  
![image](https://github.com/preticure/line-bot/assets/151464878/dbce085e-e0b4-46bb-9632-a00a4806eeca)

  
## 課題

- ~~token~~とURLが剥き出しだからなんとかする
- userIdを取得して私だけに送信できるようにしたい
  （userIdが取得出来すbroadcastで送信している）
- 一週間分の合計学習時間0になってる問題
- 総学習時間

