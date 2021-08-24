import firebase from 'firebase/app'
import 'firebase/database'

const firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_APP_ID
};

class Firebase {
  constructor() {
    /* Making connection to firebase */
    firebase.initializeApp(firebaseConfig);

    /* Storing reference to database */
    this.db = firebase.database();

    console.log("Connected to Firebase!");
  }

  addPerson = (person) => {
    this.db.ref("/people/").push(person);
  }

  getPeople = () => {
    return this.db.ref("/people/").once('value');
  }

  onPeopleChange = (callback) => {
    return this.db.ref("/people/").on("child_added", callback);
  }
}

const instance = new Firebase();

export default instance;