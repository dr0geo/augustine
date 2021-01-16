import firebase from '@/utils/firebase';

const handleLogout = async (_, res) => {
  try {
    await firebase.auth().signOut();
    res.status(200).end();

  } catch {
    res.status(400).end();
  }
}

export default handleLogout;
