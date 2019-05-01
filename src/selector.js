// YOUR CODE HERE
// function constructCss(cssValue) {
//   if (cssValue[0] === '#') {
//     cssValue = cssValue.slice(1);
//     return [document.getElementById(cssValue)];
//   } else if (cssValue[0] === '.') {
//     cssValue = cssValue.slice(1);
//     return Array.from(document.getElementsByClassName(cssValue));
//   }
//   return Array.from(document.getElementsByTagName(cssValue));
// }

function $(cssValue) {
  if (cssValue[0] === '#') {
    cssValue = cssValue.slice(1);
    return [document.getElementById(cssValue)];
  } else if (cssValue[0] === '.') {
    cssValue = cssValue.slice(1);
    return Array.from(document.getElementsByClassName(cssValue));
  }
  return Array.from(document.getElementsByTagName(cssValue));
}
