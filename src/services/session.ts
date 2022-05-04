import getRealm from '../config/realm';

class Session {
  async authorization(email: string, password: string) {
    try {
      const realm: any = await getRealm();

      const user: any = realm
        .objects('User')
        .filtered(`email = '${email}' and password = '${password}'`);

      if (user.length === 0) {
        throw new Error('Credenciais não encontradas!');
      }

      return user;
    } catch (e: any) {
      console.log('err', e);
      throw new Error(e.message);
    }
  }
}

export default new Session();
