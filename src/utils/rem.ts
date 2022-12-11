const baseSize = 100;
// 设置 rem 函数
export const setRem = () => {
  // 当前页面宽度相对于 1920 宽的缩放比例，可根据自己设计图的宽度修改。
  let deviceWidth = document.documentElement.clientWidth
  let scale = 0
  if (deviceWidth > 749) {
    scale = document.documentElement.clientWidth / 1920;
  } else {
    scale = document.documentElement.clientWidth / 750;
  }
  // 设置页面根节点字体大小
  document.documentElement.style.fontSize =
    baseSize * Math.min(scale, 2) + "px";
};
// 初始化
setRem();
// 改变窗口大小时重新设置 rem
window.onresize = function () {
  setRem();
};
