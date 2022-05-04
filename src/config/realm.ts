import Realm from 'realm';
import CategorySchema from '../schemas/CategorySchema';
import CompanySchema from '../schemas/CompanySchema';
import SettingSchema from '../schemas/SettingSchema';
import UserSchema from '../schemas/UserSchema';
import NFSchema from '../schemas/NFSchema';

export default function getRealm() {
  try {
    const connected = Realm.open({
      path: 'triaderm',
      deleteRealmIfMigrationNeeded: true,
      schema: [
        UserSchema,
        CompanySchema,
        CategorySchema,
        SettingSchema,
        NFSchema,
      ],
    });

    console.log('RealmDB connected...');
    return connected;
  } catch (err: any) {
    console.error('Failed to open the realm', err.message);
  }
}
