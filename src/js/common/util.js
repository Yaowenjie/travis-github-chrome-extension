const trimTimeToMinScale = (duration) => {
  return Math.round(duration / 60 * 100) / 100;
};

const trimTimeStr = (duration) => {
  var minute = Math.floor(duration / 60);
  var second = Math.floor(duration % 60);
  return minute ? `${minute}min${second}s` : `${second}s`;
};

const trimMessage = (message) => {
  return (message.length > 60) ? (message.slice(0, 60) + '...') : message;
};

export {trimTimeStr, trimMessage, trimTimeToMinScale};