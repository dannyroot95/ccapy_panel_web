
var firebaseConfig = {
      apiKey: "AIzaSyC4tCSqFf1t0Ga7fAbgE7zXU5daCXHQPvE",
      authDomain: "ccapy-2bc76.firebaseapp.com",
      databaseURL: "https://ccapy-2bc76-default-rtdb.firebaseio.com",
      projectId: "ccapy-2bc76",
      storageBucket: "ccapy-2bc76.appspot.com",
      messagingSenderId: "714743842176",
      appId: "1:714743842176:web:6437da89b2587a2726ed65"
  };

  firebase.initializeApp(firebaseConfig);

  var db = firebase.firestore()

  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      //var uid = user.uid;
      localStorage.setItem("session",true)
    } else {
      localStorage.setItem("currentUser","")
      localStorage.setItem("session",false)
    }
  });