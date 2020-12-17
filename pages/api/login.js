import firebase from '@/utils/firebase';

const handleLogin = async (req, res) => {
  const user = await firebase.auth().signInWithEmailAndPassword(req.body.email, req.body.password);

  if (user) {
    res.status(200).end();
  } else {
    res.status(401).end();
  }
}

export default handleLogin;
