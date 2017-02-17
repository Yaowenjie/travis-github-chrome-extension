const trimTime = (duration) => {
  var minute = Math.floor(duration / 60);
  var second = Math.floor(duration % 60);
  return `${minute}min${second}s`;
};

export {trimTime};