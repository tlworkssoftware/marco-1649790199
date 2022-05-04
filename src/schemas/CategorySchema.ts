export default class CategorySchema {
  static schema = {
    name: 'Category',
    primaryKey: 'id',
    properties: {
      id: 'string',
      name: 'string',
      description: 'string',
      active: 'bool',
    },
  };
}
