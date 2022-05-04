export default class UserSchema {
  static schema = {
    name: 'User',
    primaryKey: 'id',
    properties: {
      id: 'string',
      email: 'string',
      fullname: 'string',
      document: 'int',
      companyName: 'string',
      phone: 'int',
      password: 'string',
      remember: 'bool',
    },
  };
}
