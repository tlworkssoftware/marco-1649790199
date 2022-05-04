import getRealm from '../config/realm';
import uuid from 'react-native-uuid';

class Category {
  async create(name: string, description: string) {
    const realm: any = await getRealm();

    try {
      realm.write(() => {
        realm.create(
          'Category',
          {
            id: uuid.v4(),
            name,
            description,
            active: true,
          },
          'modified',
        );
      });
    } catch (e: any) {
      //realm.cancelTransaction();
      throw new Error(e.message);
    }
  }

  async update(id: string, name: string, description: string) {
    const realm: any = await getRealm();

    try {
      realm.write(() => {
        realm.create(
          'Category',
          {
            id,
            name,
            description,
          },
          'modified',
        );
      });
    } catch (e: any) {
      //realm.cancelTransaction();
      throw new Error(e.message);
    }
  }

  async get() {
    const realm: any = await getRealm();

    try {
      const categoryData: any = await realm?.objects('Category');

      let response: any = [];
      categoryData?.forEach((item: any) => {
        response.push({
          id: item.id,
          name: item.name,
          description: item.description,
          active: item.active,
        });
      });

      return response;
    } catch (e: any) {
      console.log('error', e);
      //realm.cancelTransaction();
      throw new Error(e.message);
    }
  }

  async updateStatus(id: string, active: boolean) {
    const realm: any = await getRealm();

    try {
      realm.write(() => {
        realm?.create(
          'Category',
          {
            id,
            active,
          },
          'modified',
        );
      });
    } catch (e) {
      // realm?.cancelTransaction();
      throw e;
    }
  }
}

export default new Category();
