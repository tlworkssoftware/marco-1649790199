import getRealm from '../config/realm';
import uuid from 'react-native-uuid';
import moment from 'moment';

class NF {
  async create(
    company: string,
    value: string,
    number: number,
    description: string,
    month: number,
    receiptDate: any,
  ) {
    const realm: any = await getRealm();

    try {
      realm.write(() => {
        realm.create(
          'NF',
          {
            id: uuid.v4(),
            company,
            value,
            number,
            description,
            month,
            receiptDate,
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
    company: string,
    value: string,
    number: number,
    description: string,
    month: number,
    receiptDate: any,
  ) {
    const realm: any = await getRealm();

    try {
      realm.write(() => {
        realm.create(
          'NF',
          {
            id,
            company,
            value,
            number,
            description,
            month,
            receiptDate,
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
      const nfData: any = realm.objects('NF').filtered(`id = '${id}'`);

      if (nfData.length > 0) {
        realm?.write(() => {
          realm?.delete(nfData[0]);
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
      const nfData: any = await realm?.objects('NF');

      let response: any = [];
      nfData?.forEach((item: any) => {
        response.push({
          id: item.id,
          company: JSON.parse(item.company),
          value: item.value,
          number: item.number,
          description: item.description,
          month: item.month,
          receiptDate: moment(item.receiptDate).format('DD/MM/YYYY'),
        });
      });

      return response;
    } catch (e: any) {
      console.log('error', e);
      //realm.cancelTransaction();
      throw new Error(e.message);
    }
  }
}

export default new NF();
