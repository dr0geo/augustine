import firebase from '@/utils/firebase';

const handleLogout = async (_, res) => {
  await firebase.auth().signOut();

  res.status(200).end();
}

export default handleLogout;