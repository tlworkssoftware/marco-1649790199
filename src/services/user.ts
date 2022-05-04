import getRealm from '../config/realm';
import uuid from 'react-native-uuid';
import Setting from './setting';

class User {
  async create(
    email: string,
    fullname: string,
    document: number,
    companyName: string,
    phone: number,
    password: string,
  ) {
    const realm: any = await getRealm();

    try {
      const user: any = realm
        .objects('User')
        .filtered(
          `email = '${email}' or document = '${document}' or phone = '${phone}'`,
        );

      if (user.length > 0) {
        throw new Error('E-mail ou CNPJ ou Celular ja estão cadastrados!');
      }

      realm.write(() => {
        realm.create(
          'User',
          {
            id: uuid.v4(),
            email,
            fullname,
            document,
            companyName,
            phone,
            password,
            remember: true,
          },
          'modified',
        );
      });

      await Setting.create('8100000', false, false, false);
    } catch (e: any) {
      //realm.cancelTransaction();
      throw new Error(e.message);
    }
  }

  async remove() {
    const realm: any = await getRealm();

    try {
      const userData: any = realm.objects('User');

      if (userData.length > 0) {
        realm?.write(() => {
          realm?.delete(userData[0]);
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
      const user: any = await realm?.objects('User');

      if (user?.length > 0) {
        return {
          id: user[0].id,
          email: user[0].email,
          fullname: user[0].fullname,
          document: user[0].document,
          companyName: user[0].companyName,
          phone: user[0].phone,
          password: user[0].password,
          remember: user[0].remember,
        };
      }

      return {};
    } catch (e: any) {
      console.log('error', e);
      //realm.cancelTransaction();
      throw new Error(e.message);
    }
  }

  async updateRemember(remember: boolean) {
    const realm: any = await getRealm();

    try {
      const user: any = realm?.objects('User');

      realm.write(() => {
        if (user.length > 0) {
          realm?.create(
            'User',
            {
              id: user[0].id,
              remember: remember,
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

export default new User();
