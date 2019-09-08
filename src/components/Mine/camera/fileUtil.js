/*
 * @desc:文件处理的工具类
 * @Author: xxp
 * @Date: 2019-09-08 15:45:42
 * @LastEditTime: 2019-09-08 15:46:18
 */
export default {
  /**
   * base64转文件
   * @param dataurl
   * @param filename
   * @returns {File}
   */
  base64ToFile(dataurl, filename) {
    var arr = dataurl.split(',')
    var mime = arr[0].match(/:(.*?);/)[1]
    var bstr = atob(arr[1])
    var n = bstr.length
    var u8arr = new Uint8Array(n)
    while (n--) {
      u8arr[n] = bstr.charCodeAt(n)
    }
    return new File([u8arr], filename, { type: mime })
  }
}
