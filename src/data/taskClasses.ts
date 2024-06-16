abstract class Task {
  #date;
  #time;
  #lat;
  #lng;
  #privateProps = new Map<string, any>();
  #JSONDataObj;

  constructor(
    date: string,
    time: string,
    lat: number,
    lng: number,
    propName: string,
    propVal: any
  ) {
    if (this.constructor === Task)
      throw new Error('Task cannot be instantiated directly');

    this.#date = date;
    this.#time = time;
    this.#lat = lat;
    this.#lng = lng;
    if (!!propName && !!propVal) {
      this.#privateProps.set(propName, propVal);
    }

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
  constructor(
    date: string,
    time: string,
    lat: number,
    lng: number,
    propVal: any
  ) {
    super(date, time, lat, lng, 'isCoursework', propVal);
  }
}

export class Shop extends Task {
  constructor(
    date: string,
    time: string,
    lat: number,
    lng: number,
    propVal: any
  ) {
    super(date, time, lat, lng, 'budget', propVal);
  }
}

export class Workout extends Task {
  constructor(
    date: string,
    time: string,
    lat: number,
    lng: number,
    propVal: any
  ) {
    super(date, time, lat, lng, 'caloriesBurnt', propVal);
  }
}

export class BusinessMeet extends Task {
  constructor(
    date: string,
    time: string,
    lat: number,
    lng: number,
    propVal: any
  ) {
    super(date, time, lat, lng, 'expectedSuccessPercent', propVal);
  }
}

export class FriendMeet extends Task {
  constructor(
    date: string,
    time: string,
    lat: number,
    lng: number,
    propVal: any
  ) {
    super(date, time, lat, lng, 'expectedExpenses', propVal);
  }
}

export class OtherTask extends Task {
  constructor(
    date: string,
    time: string,
    lat: number,
    lng: number,
    propVal: any
  ) {
    super(date, time, lat, lng, 'comment', propVal);
  }
}
