const times = ["2022-12-26T11:00:00+06:00", "2022-12-26T11:30:00+06:00", "2022-12-26T12:00:00+06:00"]

const moveDay = (date, day) => {
     const d = new Date(date).getDate();
     const ms = new Date(date).setDate(d + day);
     return new Date(ms);
}

const createTimes = (arr) => {
     const newArray = [];
     arr.forEach(element => {
        newArray.push(new Date(element));
        newArray.push(moveDay(element, 1));
        newArray.push(moveDay(element, 2));  
     });
     return newArray;
}

console.log(new Date("2022-12-26T05:00:00.000+00:00").toISOString());
