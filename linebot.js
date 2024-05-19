function checkLearningRecord() {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("sheet1");
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const range = sheet.getDataRange();
  const values = range.getValues();

  let message = "今日はどんな1日だった？";
  for (let i = 1; i < values.length; i++) {
    const rowDate = new Date(values[i][0]);
    rowDate.setHours(0, 0, 0, 0);
    if (rowDate.getTime() === today.getTime() && values[i][2]) {
      const learningTimeInMinutes = values[i][2];
      const hours = Math.floor(learningTimeInMinutes / 60);
      message = `もう${hours}時間もやったの？\nさすが僕のヌナだね`;
      break;
    }
  }

  sendLineNotification(message);
}

function sendYesterdayLearningRecord() {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("sheet1");
  const today = new Date();
  const yesterday = new Date(today);
  yesterday.setDate(today.getDate() - 1);
  yesterday.setHours(0, 0, 0, 0);

  const range = sheet.getDataRange();
  const values = range.getValues();

  let learningContent = "おはよう。\nヌナ、昨日の記録がまだみたいだよ";
  let learningTimeMessage = "";
  for (let i = 1; i < values.length; i++) {
    const rowDate = new Date(values[i][0]);
    rowDate.setHours(0, 0, 0, 0);
    if (
      rowDate.getTime() === yesterday.getTime() &&
      values[i][1] &&
      values[i][2]
    ) {
      learningContent = `ヌナ、おはよう。\n昨日は\n${values[i][1]}\nをしたんだね`;
      const learningTimeInMinutes = values[i][2];
      const hours = Math.floor(learningTimeInMinutes / 60);
      const minutes = learningTimeInMinutes % 60;
      learningTimeMessage = `学習時間は${hours}時間${minutes}分だって\n今日もファイティン🌟`;
      break;
    }
  }

  sendLineNotification(learningContent);
  if (learningTimeMessage) {
    sendLineNotification(learningTimeMessage);
  }
}

function sendWeeklyLearningSummary() {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("sheet1");
  const today = new Date();
  const lastMonday = new Date(today);

  // 月曜日の0時0分0秒に設定
  lastMonday.setDate(today.getDate() - ((today.getDay() + 6) % 7));
  lastMonday.setHours(0, 0, 0, 0);

  const range = sheet.getDataRange();
  const values = range.getValues();

  let totalMinutes = 0;
  for (let i = 1; i < values.length; i++) {
    const rowDate = new Date(values[i][0]);
    rowDate.setHours(0, 0, 0, 0);
    if (rowDate >= lastMonday && rowDate <= today && values[i][2]) {
      totalMinutes += values[i][2];
    }
  }

  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;
  const totalHours = Math.floor(totalMinutes / 60); // 合計時間を自然数で表示

  const message1 = `先週の合計学習時間は\n${hours}時間${minutes}分だって`;

  let message2;
  if (totalMinutes >= 3000) {
    message2 = `${totalHours}時間もやったの？\nヌナすごすぎるよ`;
  } else {
    message2 = `お疲れ様`;
  }

  sendLineNotification(message1);
  sendLineNotification(message2);
}

function sendLineNotification(message) {
  const accessToken =
    "uUSijwsGt8BmKk7HG6oB97MLoyGqXZ1IrPNb6sIPMxkFPQbCvbr5GR1ZABrEmve5mItVO4k652yEHZ+sNlHNlhw+lZ24yxQRd6jlsveJVZr3vqAE9D9I2fCccGGHqajzeJxUV5I49obI11AoBf00OwdB04t89/1O/w1cDnyilFU=";
  const url = "https://api.line.me/v2/bot/message/broadcast";
  const payload = JSON.stringify({
    messages: [{ type: "text", text: message }],
  });

  Logger.log("Payload: " + payload);

  const options = {
    method: "post",
    contentType: "application/json",
    headers: { Authorization: "Bearer " + accessToken },
    payload: payload,
  };

  try {
    const response = UrlFetchApp.fetch(url, options);
    Logger.log("Response: " + response.getContentText());
  } catch (e) {
    Logger.log("Error: " + e.toString());
  }
}
