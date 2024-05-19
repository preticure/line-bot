function checkLearningRecord() {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("sheet1");
  const today = new Date();
  today.setHours(0,0,0,0);
  const range = sheet.getDataRange();
  const values = range.getValues();

  let message = "今日の記録がまだみたいだけど？";
  for (let i = 1; i < values.length; i++) {
    const rowDate = new Date(values[i][0]);
    rowDate.setHours(0,0,0,0);
    if (rowDate.getTime() === today.getTime() && values[i][1]) {
      message = "がんばってますね";
      break;
    }
  }

  if (message) {
    sendLineNotification(message);
  }
}

function sendLineNotification(message) {
  const accessToken = 'uUSijwsGt8BmKk7HG6oB97MLoyGqXZ1IrPNb6sIPMxkFPQbCvbr5GR1ZABrEmve5mItVO4k652yEHZ+sNlHNlhw+lZ24yxQRd6jlsveJVZr3vqAE9D9I2fCccGGHqajzeJxUV5I49obI11AoBf00OwdB04t89/1O/w1cDnyilFU=';
  const userId = 'preticure'
  Logger.log("Sending message to user ID: " + userId);
  const url = 'https://api.line.me/v2/bot/message/broadcast';
  const payload = JSON.stringify({
    messages: [{ type: 'text', text: message }]
  });

  Logger.log("Payload: " + payload);

  const options = {
    'method' : 'post',
    'contentType' : 'application/json',
    'headers' : {'Authorization': 'Bearer ' + accessToken},
    'payload' : payload
  };

  try {
    const response = UrlFetchApp.fetch(url, options);
    Logger.log("Response: " + response.getContentText());
  } catch (e) {
    Logger.log("Error: " + e.toString());
  }
}