const dataFormat = (val: string) => {
  const date = new Date(val);
  date.setHours(date.getHours()+8)
  const year = date.getFullYear();
  const month = date.getMonth();
  const day = date.getDay();
  const hour = date.getHours();
  const minutes = date.getMinutes();
  const seconds = date.getSeconds();
  const time =
    year + "." + month + "." + day + " " + hour + ":" + minutes + ":" + seconds;
  return time;
};

export default dataFormat;
