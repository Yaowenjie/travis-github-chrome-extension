const MINUTE_SCALER = 60;

const trimTimeToMinScale = (duration) => {
  return Math.round(duration / MINUTE_SCALER * 100) / 100;
};

const trimTimeStr = (duration) => {
  var minute = Math.floor(duration / MINUTE_SCALER);
  var second = Math.floor(duration % MINUTE_SCALER);
  return minute ? `${minute}min${second}s` : `${second}s`;
};

const trimMessage = (message) => {
  return (message.length > MINUTE_SCALER) ? (message.slice(0, MINUTE_SCALER) + '...') : message;
};

export {trimTimeStr, trimMessage, trimTimeToMinScale};
