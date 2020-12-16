import firebase from '@/utils/firebase';

const handleLogin = async (req, res) => {
  const user = await firebase.auth().signInWithEmailAndPassword(req.body.email, req.body.password);

  if (user) {
    res.redirect(307, '/adminpanel');
  } else {
    res.status(401).end();
  }
}

export default handleLogin;
