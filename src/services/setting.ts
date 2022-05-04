import getRealm from '../config/realm';
import uuid from 'react-native-uuid';

class Setting {
  async create(
    limitMei: string,
    alertInvoice: boolean,
    sendMail: boolean,
    sendSMS: boolean,
  ) {
    const realm: any = await getRealm();

    try {
      const setting = await this.get();

      realm.write(() => {
        realm.create(
          'Setting',
          {
            id: setting.id ? setting.id : uuid.v4(),
            limitMei,
            alertInvoice,
            sendMail,
            sendSMS,
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
      const settingData: any = await realm?.objects('Setting');

      let response: any = {};
      settingData?.forEach((item: any) => {
        response = {
          id: item.id,
          limitMei: item.limitMei,
          alertInvoice: item.alertInvoice,
          sendMail: item.sendMail,
          sendSMS: item.sendSMS,
        };
      });

      return response;
    } catch (e: any) {
      console.log('error', e);
      //realm.cancelTransaction();
      throw new Error(e.message);
    }
  }
}

export default new Setting();
