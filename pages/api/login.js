import firebase from '@/utils/firebase';

const handleLogin = async (req, res) => {
  // Check admin log status:
  if (req.method === 'GET') {
    const loggedInUser = firebase.auth().currentUser;

    if (loggedInUser) {
      res.status(200).json({ loggedIn: true });
    } else {
      res.status(401).end();
    }

  // Log in an admin via the login form: 
  } else if (req.method === 'POST') {
    const user = await firebase.auth().signInWithEmailAndPassword(req.body.email, req.body.password);

    if (user) {
      res.status(200).end();
    } else {
      res.status(401).end();
    }
    
  // Other cases:
  } else {
    res.status(405).json({ message: `${req.method} requests are not authorized` });
  }
};

export default handleLogin;
