const configHeaders = {
  token: '27E7F457C8EC9997AF50EE0E6DF0E00A41F6143A2FCD125A8ABE06BB2227FC46', // 联调环境
  terminalId: 29,
  pid: 110,
  productId: 110,
  groupId: 110, // 此字段已弃用，但某些系统可能还在读，一般取 productId 的值
  uid: '162',
  terminalType: 'ljd_3rd',
  Authorization: 'Basic c3VpeGluZGFpOjFxYXohQCMk',
  channel: 'test_channel',
  version: '5.0.2',
}
export default configHeaders
