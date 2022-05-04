export default class NFSchema {
  static schema = {
    name: 'NF',
    primaryKey: 'id',
    properties: {
      id: 'string',
      company: 'string',
      value: 'string',
      number: 'int',
      description: 'string',
      month: 'int',
      receiptDate: 'date',
    },
  };
}
