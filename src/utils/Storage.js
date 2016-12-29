import Firebase from 'firebase';
import moment from 'moment';
import shortid from 'shortid';

class Storage {
	constructor() {
    // set up Firebase
    var config = {
      apiKey: "AIzaSyC02BDarkzp-jMztlBI32cQOlEZvVluv7M",
      authDomain: "workout-log-a0c07.firebaseapp.com",
      databaseURL: "https://workout-log-a0c07.firebaseio.com",
      storageBucket: "workout-log-a0c07.appspot.com",
      messagingSenderId: "141837028377"
    };

    this.app = Firebase.initializeApp(config);
    this.db = Firebase.database();
    this.workouts = this.db.ref('workouts/');
  }

  getWorkouts(id) {
    if (typeof id === "undefined") {
      return this.workouts;
    }

    return this.db.ref('workouts/' + id);
  }

  addWorkout({ date = false, exercises = [] }) {
    const id = shortid.generate();

    // convert to unix timestamp
    date = moment(date).unix() || moment().unix();

    this.db.ref('workouts/').push().set({ 
      id,
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