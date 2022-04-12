const getCurrentDay = () => {
    var objToday = new Date(),
    weekday = new Array('Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'),
    dayOfWeek = weekday[objToday.getDay()],
    domEnder = function() { var a = objToday; if (/1/.test(parseInt((a + "").charAt(0)))) return "th"; a = parseInt((a + "").charAt(1)); return 1 == a ? "st" : 2 == a ? "nd" : 3 == a ? "rd" : "th" }(),
    dayOfMonth = today + ( objToday.getDate() < 10) ? '0' + objToday.getDate() + domEnder : objToday.getDate() + domEnder,
    months = new Array('January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'),
    curMonth = months[objToday.getMonth()],
    curYear = objToday.getFullYear(),
    curHour = objToday.getHours() > 12 ? objToday.getHours() - 12 : (objToday.getHours() < 10 ? "0" + objToday.getHours() : objToday.getHours()),
    curMinute = objToday.getMinutes() < 10 ? "0" + objToday.getMinutes() : objToday.getMinutes(),
    curSeconds = objToday.getSeconds() < 10 ? "0" + objToday.getSeconds() : objToday.getSeconds(),
    curMeridiem = objToday.getHours() > 12 ? "PM" : "AM";
  // today
    var today = curHour + ":" + curMinute + "." + curSeconds + curMeridiem + " " + dayOfWeek + " " + dayOfMonth + " of " + curMonth + ", " + curYear;
  
    return {
      curHour,
      curMinute,
      curSeconds,
      curMeridiem,
      dayOfWeek,
      dayOfMonth,
      curMonth,
      curYear,
    }
  }


const formatBytes = (bytes, decimals = 2) => {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
}


// used to generate a unique id for a post
const UUIDGeneratorBrowser = () =>
  ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, c =>
    (c ^ (crypto.getRandomValues(new Uint8Array(1))[0] & (15 >> (c / 4)))).toString(16)
  );



const deleteDuplicates = (arrayWithDuplicates) => { 
  let arrayWithUniqueItems = [...new Set(arrayWithDuplicates)];
  return arrayWithUniqueItems;
}

/**
 * uses the userUid to find the user object your looking for
 * @param {string} userUid - the users uid might look like eg: 4hRtLMpVz5MFnHkxkI4YCEYbUta2
 * @param {array} userData - an array of users(which are objects)
 * @returns - an object of the user data
 */
const getSpecificUser = (userUid, userData) => {
  let user = userData?.filter(user => user?.uid === userUid)
  if(user) {
    return user[0]
  }
}



/**
   * 
   * @param {string} input - the class or id element name that you want to focus
   * @param {string} inputType - either a class or an id
   * @returns - an error if you dont provide a valid input type(A valid input type would be "class" or "id", anything else will throw an error)
   */
 const focusInput = (input, inputType = "class") => {
  if(inputType === "class") {
    document.querySelector(`.${input}`).focus();
  } else if(inputType === "id") {
    document.querySelector(`#${input}`).focus();
  } else {
    return new Error(`${inputType} is not a valid input type choose "class" to get a class or "id" to get an id`);
  }
}





const validateEmail = (email) => {
  return String(email)
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
};






export {
  getCurrentDay,
  formatBytes,
  UUIDGeneratorBrowser,
  deleteDuplicates,
  getSpecificUser,
  focusInput,
  validateEmail,
}