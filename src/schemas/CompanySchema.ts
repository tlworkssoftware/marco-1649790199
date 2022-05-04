export default class CompanySchema {
  static schema = {
    name: 'Company',
    primaryKey: 'id',
    properties: {
      id: 'string',
      document: 'string',
      name: 'string',
      fantasyName: 'string',
    },
  };
}
