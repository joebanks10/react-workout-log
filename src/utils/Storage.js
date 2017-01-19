import firebase from 'firebase';
import moment from 'moment';
import shortid from 'shortid';

class Storage {
	constructor() {
    // set up firebase
    var config = {
      apiKey: "AIzaSyC02BDarkzp-jMztlBI32cQOlEZvVluv7M",
      authDomain: "workout-log-a0c07.firebaseapp.com",
      databaseURL: "https://workout-log-a0c07.firebaseio.com",
      storageBucket: "workout-log-a0c07.appspot.com",
      messagingSenderId: "141837028377"
    };

    this.app = firebase.initializeApp(config);
    this.db = firebase.database();
  }

  getWorkouts(id) {
    const user = firebase.auth().currentUser;
    const uid = user && user.uid;

    if (!uid) {
      return null;
    }

    if (typeof id === "undefined") {
      return this.db.ref('workouts/').orderByChild('uid').equalTo(user.uid);
    }

    return this.db.ref('workouts/' + id);
  }

  addWorkout({ date = false, exercises = [] }) {
    const id = shortid.generate();
    const user = firebase.auth().currentUser;
    const uid = user && user.uid;

    if (!uid) {
      return;
    }

    // convert to unix timestamp
    date = moment(date).unix() || moment().unix();

    this.db.ref('workouts/').push().set({ 
      id,
      uid,
      date,
      exercises
    });
  }

  updateWorkout(refId, data) {
    if (typeof refId === 'undefined') {
      return;
    }

    var date = moment(data.date).unix();

    this.db.ref('workouts/' + refId).update({
      ...data,
      date
    });
  }

  deleteWorkout(refId) {
    this.db.ref('workouts/' + refId).remove();
  }
}

export default Storage;