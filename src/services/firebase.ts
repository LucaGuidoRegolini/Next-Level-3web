import firebase from 'firebase'

const firebaseConfig = {
  apiKey:               "AIzaSyB1hHLYDCqPaQPQquYMbMp2pOzmHAFjfVg",
  authDomain:           "data-base-22e37.firebaseapp.com",
  projectId:            "data-base-22e37",
  storageBucket:        "data-base-22e37.appspot.com",
  messagingSenderId:    "662880841038",
  appId:                "1:662880841038:web:78adf75f78ffbf39f4421f",
  measurementId:        "G-3NX0RLPGB0"
};

const fire = firebase.initializeApp(firebaseConfig)
export default fire;