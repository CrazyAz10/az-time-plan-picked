/**
 * 这只是deep copy的一个简单版本
 * 有很多边缘案例错误
 * 如果你想使用完美的深拷贝，请使用lodash的cloneDeep
 * @param {Object} source
 * @returns {Object}
 */
export function deepClone(source) {
  var result
  var targetType = Object.prototype.toString.call(source).slice(8, -1)
  if (targetType === 'Object') {
    result = {}
  } else if (targetType === 'Array') {
    result = []
  } else {
    return source
  }
  for (var i in source) {
    var value = source[i];
    var valueType = Object.prototype.toString.call(value).slice(8, -1)
    if (valueType === 'Array' || valueType === 'Object') {
      result[i] = deepClone(value)
    } else {
      result[i] = value
    }
  }
  return result
}