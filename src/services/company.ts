import getRealm from '../config/realm';
import uuid from 'react-native-uuid';

class Company {
  async create(document: string, name: string, fantasyName: string) {
    const realm: any = await getRealm();

    try {
      const user: any = realm
        .objects('Company')
        .filtered(`document = '${document}'`);

      if (user.length > 0) {
        throw new Error('CNPJ ja cadastrado!');
      }

      realm.write(() => {
        realm.create(
          'Company',
          {
            id: uuid.v4(),
            document,
            name,
            fantasyName,
          },
          'modified',
        );
      });
    } catch (e: any) {
      //realm.cancelTransaction();
      throw new Error(e.message);
    }
  }

  async update(
    id: string,
    document: string,
    name: string,
    fantasyName: string,
  ) {
    const realm: any = await getRealm();

    try {
      realm.write(() => {
        realm.create(
          'Company',
          {
            id,
            document,
            name,
            fantasyName,
          },
          'modified',
        );
      });
    } catch (e: any) {
      //realm.cancelTransaction();
      throw new Error(e.message);
    }
  }

  async removeById(id: string) {
    const realm: any = await getRealm();

    try {
      const companyData: any = realm
        .objects('Company')
        .filtered(`id = '${id}'`);

      if (companyData.length > 0) {
        realm?.write(() => {
          realm?.delete(companyData[0]);
        });
      }
    } catch (e: any) {
      //realm.cancelTransaction();
      throw new Error(e.message);
    }
  }

  async get() {
    const realm: any = await getRealm();

    try {
      const companyData: any = await realm?.objects('Company');

      let response: any = [];
      companyData?.forEach((item: any) => {
        response.push({
          id: item.id,
          name: item.name,
          fantasyName: item.fantasyName,
          document: item.document,
        });
      });

      return response;
    } catch (e: any) {
      console.log('error', e);
      //realm.cancelTransaction();
      throw new Error(e.message);
    }
  }

  async updateRemember(
    id: string,
    document: string,
    companyName: string,
    fantasyName: string,
  ) {
    const realm: any = await getRealm();

    try {
      const companyData: any = realm
        .objects('Company')
        .filtered(`id = '${id}'`);

      realm.write(() => {
        if (companyData.length > 0) {
          realm?.create(
            'Company',
            {
              id,
              document,
              companyName,
              fantasyName,
            },
            'modified',
          );
        }
      });
    } catch (e) {
      // realm?.cancelTransaction();
      throw e;
    }
  }
}

export default new Company();
