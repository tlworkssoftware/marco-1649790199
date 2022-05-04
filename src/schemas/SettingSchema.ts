export default class SettingSchema {
  static schema = {
    name: 'Setting',
    primaryKey: 'id',
    properties: {
      id: 'string',
      limitMei: 'string',
      alertInvoice: 'bool',
      sendMail: 'bool',
      sendSMS: 'bool',
    },
  };
}
