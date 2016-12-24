import Firebase from 'firebase';
import moment from 'moment';

class Database {
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
    this.workouts = this.getWorkouts().orderByChild('date');
  }

  getWorkouts(id) {
    if (typeof id === "undefined") {
      return this.db.ref('workouts/');
    }

    return this.db.ref('workouts/' + id);
  }

  addWorkout({ date = false, exercises = [] }) {
    var ref = this.db.ref('workouts/').push(),
        id = ref.key;

    // convert to unix timestamp
    date = moment(date).unix() || moment().unix();

    ref.set({ 
      id,
      date,
      exercises
    });
  }

  updateWorkout(id, data) {
    var date = moment(data.date).unix();

    this.db.ref('workouts/' + id).update({
      ...data,
      date
    });
  }

  deleteWorkout(id) {
    this.db.ref('workouts/' + id).remove();
  }
}

export default Database;