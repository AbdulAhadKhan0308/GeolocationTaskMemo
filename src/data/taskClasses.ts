class Task {
  #date;
  #time;
  #lat;
  #lng;
  #JSONDataObj;

  constructor(date, time, lat, lng, propName, propVal) {
    if (this.constructor === Task)
      throw new Error('Task cannot be instantiated directly');

    this.#date = date;
    this.#time = time;
    this.#lat = lat;
    this.#lng = lng;
    //private field is constructed dynamically as we pass args in constructor
    if (!!propName && !!propVal) this[`#${propName}`] = propVal;

    const obj = {} as any;
    obj.date = date;
    obj.time = time;
    obj.className = this.constructor.name;
    obj.lat = lat;
    obj.lng = lng;
    if (!!propName && !!propVal) obj[`${propName}`] = propVal;
    this.#JSONDataObj = JSON.stringify(obj);
  }

  get JSONDataObj() {
    return this.#JSONDataObj;
  }
}

export class Study extends Task {
  constructor(date, time, lat, lng, propVal) {
    super(date, time, lat, lng, 'isCoursework', propVal);
  }
}

export class Shop extends Task {
  constructor(date, time, lat, lng, propVal) {
    super(date, time, lat, lng, 'budget', propVal);
  }
}

export class Workout extends Task {
  constructor(date, time, lat, lng, propVal) {
    super(date, time, lat, lng, 'caloriesBurnt', propVal);
  }
}

export class BusinessMeet extends Task {
  constructor(date, time, lat, lng, propVal) {
    super(date, time, lat, lng, 'expectedSuccessPercent', propVal);
  }
}

export class FriendMeet extends Task {
  constructor(date, time, lat, lng, propVal) {
    super(date, time, lat, lng, 'expectedExpenses', propVal);
  }
}

export class OtherTask extends Task {
  constructor(date, time, lat, lng, propVal) {
    super(date, time, lat, lng, 'comment', propVal);
  }
}
