import React, { useState, useEffect, createContext, useContext } from 'react'
import { 
    createUserWithEmailAndPassword,
    updateProfile,
    onAuthStateChanged,
    signInWithEmailAndPassword,
    signOut,
    sendPasswordResetEmail,
    reload,
    getAuth,
 } from "firebase/auth";

import { collection, addDoc, getDocs, doc, setDoc,  } from "firebase/firestore"; 

import { AppAuth, db } from "./firebase"

const AuthContext = createContext({})

export const useAuthContext = () => useContext(AuthContext)


export const AuthContextProvider = ({children}) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [isError, setIsError] = useState(false)
    const [user, setUser] = useState(null)

    const auth = getAuth();

    useEffect(() => {
        setIsLoading(true)
        const unsubscribe = onAuthStateChanged(auth, res => {
            res ? setUser(res) : setUser(null)
            res ? setIsLoggedIn(true) : setIsLoggedIn(false)
            // console.log(res)
            // setError("")
            setIsLoading(false)
        });
        return unsubscribe;
    }, [])
    

  const registerUser = (username, email, password) => {
    createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
        // Signed in 
        const user = userCredential.user;
        // creating & adding the users info to the database
        addDoc(collection(db,"users"), {
            username,
            email,
            password,
            uid:user.uid,
        })        
        // log in the user
        setIsLoggedIn(true)
    })
    .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        // ..
    });
  };


  const logoutUser = () => {
        signOut(auth)
  }


  const forgotPassword = email => {
    return sendPasswordResetEmail(auth, email)
  }

  const signInUser = (email, password) => {
    signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
        // Signed in 
        const user = userCredential.user;
        // log in the user
        setIsLoggedIn(true)

        // getting the user info from the database
        getDocs(collection(db, "users")).then((item) => {
            item.docs.forEach((thing) => {
                /*checking if object of values exists and if the current objects uid value(the unique user id) is equal to signed in users uid*/
                if(thing["_document"].data.value.mapValue.fields && thing["_document"].data.value.mapValue.fields.uid.stringValue === userCredential.uid) {
                    let currentInfo = thing["_document"].data.value.mapValue.fields;
                    // the user info
                    /*
                    email:currentInfo.email.stringValue,
                    password:currentInfo.password.stringValue,             
                    username:currentInfo.username.stringValue,             
                    uid:currentInfo.uid.stringValue,
                    */
                    console.log({
                        email:currentInfo.email.stringValue,
                        password:currentInfo.password.stringValue,             
                        username:currentInfo.username.stringValue,             
                        uid:currentInfo.uid.stringValue,
                    })
                }
            })
        })
    })
    .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
    });
  }



    // const signInUser = (email, password) => {
    //     setLoading(true)
    //     signInWithEmailAndPassword(auth, email, password)
    //     .then(res => {
    //         // getting the user info from the database
    //         getDocs(collection(db, "users")).then((item) => {
    //             item.docs.forEach((thing) => {
    //                 /*checking if object of values exists and if the current objects uid value(the unique user id) is equal to signed in users uid*/
    //                 if(thing["_document"].data.value.mapValue.fields && thing["_document"].data.value.mapValue.fields.uid.stringValue === res.user.uid) {
    //                     let currentInfo = thing["_document"].data.value.mapValue.fields;
    //                     setUserInfo({
    //                         email:currentInfo.email.stringValue,
    //                         name:currentInfo.name.stringValue,
    //                         role:currentInfo.role.stringValue,
    //                         uid:currentInfo.uid.stringValue,
    //                     })
    //                 }
    //             })
    //         })
    //     })
    //     .catch(error => setError(error.message))
    //     .finally(setLoading(false))
    // }

//   const registerUser = (email, name, password, role) => {
//     setIsLoading(true);
//     createUserWithEmailAndPassword(auth, email, password)
//     .then((cred) => {
//         // creating / adding the info the database
//         addDoc(collection(db, "users"), {
//             email,
//             name,
//             role,
//             uid:cred.user.uid,
//           }).then(res => console.log(res))
//           .catch((error) => setIsError(error)) 
//     })
//     .catch(err => setIsError(err.message))
//     .finally(() => setIsLoading(false))
//   };




    // const [user, setUser] = useState(null)
    // const [loading, setLoading] = useState()
    // const [error, setError] = useState("")
    // const [userInfo, setUserInfo] = useState({})
    // // modals
    // const [logoutModal, setLogoutModal] = useState(false);
    // const [projectModal, setProjectModal] = useState(false);
    // const [ticketModal, setTicketModal] = useState(false);
    // // table data
    // const [projectTableData, setProjectTableData] = useState([]);



    // useEffect(() => {
    //     setLoading(true)
    //     const unsubscribe = onAuthStateChanged(auth, res => {
    //         res ? setUser(res) : setUser(null)
    //         setError("")
    //         setLoading(false)
    //     });
    //     return unsubscribe;
    // }, [])




    // const getUserInfo = () => {
    //     onAuthStateChanged(auth, (user) => {
    //     // 1. check if user is logged in / authenticated
    //         if(user) {
    //         // 2. get their info from the firestore database
    //             getDocs(collection(db, "users")).then((item) => {
    //                 item.docs.forEach((thing) => {
    //                     /*checking if object of values exists and if the current objects uid value(the unique user id) is equal to signed in users uid*/
    //                     if(thing["_document"].data.value.mapValue.fields && thing["_document"].data.value.mapValue.fields.uid.stringValue === user.uid) {
    //                         let currentInfo = thing["_document"].data.value.mapValue.fields;
    //                         setUserInfo({
    //                             email:currentInfo.email.stringValue,
    //                             name:currentInfo.name.stringValue,
    //                             role:currentInfo.role.stringValue,
    //                             uid:currentInfo.uid.stringValue,
    //                         })
    //                     }
    //                 })
    //             })
    //         } else {
    //             // user is signed out
    //         }
    //     })
    // }


    // useEffect(() => {
    //     getUserInfo()
    // }, [])


    

    // const registerUser = (email, name, password, role) => {
    //     setIsLoading(true);
    //     createUserWithEmailAndPassword(auth, email, password)
    //     .then((cred) => {
    //         // creating / adding the info the database
    //         addDoc(collection(db, "users"), {
    //             email,
    //             name,
    //             role,
    //             uid:cred.user.uid,
    //           }).then(res => console.log(res))
    //           .catch((error) => setIsError(error)) 
    //     })
    //     .catch(err => setIsError(err.message))
    //     .finally(() => setIsLoading(false))
    //   };


      
      


    // const signInUser = (email, password) => {
    //     setLoading(true)
    //     signInWithEmailAndPassword(auth, email, password)
    //     .then(res => {
    //         // getting the user info from the database
    //         getDocs(collection(db, "users")).then((item) => {
    //             item.docs.forEach((thing) => {
    //                 /*checking if object of values exists and if the current objects uid value(the unique user id) is equal to signed in users uid*/
    //                 if(thing["_document"].data.value.mapValue.fields && thing["_document"].data.value.mapValue.fields.uid.stringValue === res.user.uid) {
    //                     let currentInfo = thing["_document"].data.value.mapValue.fields;
    //                     setUserInfo({
    //                         email:currentInfo.email.stringValue,
    //                         name:currentInfo.name.stringValue,
    //                         role:currentInfo.role.stringValue,
    //                         uid:currentInfo.uid.stringValue,
    //                     })
    //                 }
    //             })
    //         })
    //     })
    //     .catch(error => setError(error.message))
    //     .finally(setLoading(false))
    // }



    // const logoutUser = () => {
    //     signOut(auth)
    // }



    // const forgotPassword = email => {
    //     return sendPasswordResetEmail(auth, email)
    // }


    /*data parameter should be an object containing
    1. project name
    2. project description
    3. team members on the project
    */
    // const setProjectData = async (data) => {
    //     const {name, description, teamMembers, dateCreated, id} = data;
    //     // creating / adding the info the database
    //     addDoc(collection(db, "projects"), {
    //         name,
    //         description,
    //         teamMembers,
    //         dateCreated,
    //         id,

    //       }).then(res => console.log(res))
    //       .catch((error) => setError(error)) 
    // }


    // const getProjectData = () => {
    //      return getDocs(collection(db, "projects")).then((item) => {
    //         let projects = item.docs.map((thing) => {
    //             let projectInfo = thing["_document"].data.value.mapValue.fields;
    //             const description = projectInfo.description.stringValue;
    //             const name = projectInfo.name.stringValue;
    //             const dateCreated = projectInfo.dateCreated.stringValue;
    //         // get data for the teamMembers
    //             const teamMembers = projectInfo.teamMembers.arrayValue.values.map((item) => {
    //                 const name = item.mapValue.fields.name.stringValue;
    //                 const uid = item.mapValue.fields.uid.stringValue;
    //                 const email = item.mapValue.fields.email.stringValue;
    //                 const role = item.mapValue.fields.role.stringValue;
    //                 return {name, uid, email, role};
    //             });
    //         /*when setting the id wont show the id when looking in
    //         firebase database only when you call getProjectData function
    //         because before that it has not been set*/
    //             return {
    //                 name,
    //                 description,
    //                 teamMembers,
    //                 dateCreated,
    //                 id:thing.id,
    //             }
    //         })
    //         return projects;
    //     })
    // }

    // const getAllUsers = () => {
    //     return getDocs(collection(db, "users")).then((item) => {
    //         let users = item.docs.map((thing) => {
    //             let userInfo = thing["_document"].data.value.mapValue.fields;
    //             return {
    //                 email:userInfo.email.stringValue,
    //                 name:userInfo.name.stringValue,
    //                 role:userInfo.role.stringValue,
    //                 uid:userInfo.uid.stringValue,
    //             }
    //         })
    //         return users;
    //     })
    // }

    // const getTodaysDate = _ => {
    //     var today = new Date();
    //     var dd = today.getDate();
    //     var mm = today.getMonth() + 1; //January is 0!
    //     var yyyy = today.getFullYear();

    //     if(dd < 10) {
    //         dd='0'+dd
    //     } 

    //     if(mm < 10) {
    //         mm='0'+mm
    //     } 
    //     return today = mm+'/'+dd+'/'+yyyy;

    // }
// projectType: str, what type of data to get, project data, project details, ect...
    // const getDataTableData = (dataFunc, projectType) => {
    //     if(dataFunc) {
    //         return dataFunc();
    //     }
    // }



    /*items: array of objects
    amountOfEntriesState: number (a state value)
    sortByDate: function
     */
    // const subdivideArray = (items, amountOfEntriesState, sortByDate) => {
    //     /*sub-divide the original array into multiple arrays
    //     based on how many entires the user wants to show*/
    //     if(items) {
    //         let size = amountOfEntriesState;
    //         let arrayOfArrays = [];
    //         for (var i = 0; i < items.length; i += size) {
    //             arrayOfArrays.push(sortByDate(items).reverse().slice(i, i + size));
    //         }
    //         return arrayOfArrays;
    //     } else {
    //         return [];
    //     }
       
    // }


    // const searchTable = (usersSearch, tableData) => {
    //     const filteredData = [];
    //     for(let i = 0; i < tableData.length; i++) {
    //         usersSearch = usersSearch.toLowerCase();
    //         // vars
    //         let name = tableData[i].name.toLowerCase();
    //         let description = tableData[i].description.toLowerCase();
    //         let date = tableData[i].dateCreated.toLowerCase(); 

    //         if(name.includes(usersSearch) 
    //            || description.includes(usersSearch)
    //            || date.includes(usersSearch)) {
    //             filteredData.push(tableData[i])
    //         }
    //     }
    //     return filteredData;
    // }


    /*data args : an array of objects w/ a custom date property formatted like: 12/23/2021*/
    // const sortByDate = (data) => {
    //     const arrSorted = data.sort(function(a, b) {
    //         /*Convert the date to a single number
    //         eg:  12 + 27 + 2021 = 2060*/
    //         let aNum = a.dateCreated.split("/").reduce((total, num) => Number(total) + Number(num));
    //         let bNum = b.dateCreated.split("/").reduce((total, num) => Number(total) + Number(num));
    //         return aNum - bNum;
    //       });
    //     return arrSorted;
    // }


    // const setUpTableData = (items, arrayOfArrays, setTotalAmountEntries,searchInput,setProjectTableIndex) => {
    //     if(items) {
    //         setTotalAmountEntries(items.length)
    //     // search for stuff from the search bar
    //         if(searchInput.length >= 1) {
    //             setProjectTableData([searchTable(searchInput, items)])
    //         } else {
    //     // dont
    //             setProjectTableData(arrayOfArrays)
    //         }
    //         sortByDate(items)
    //     }
        
    //     if(projectTableData.length <= 1) {
    //         setProjectTableIndex(0)
    //     }
    // }

    /*items: array of objects
     arrayOfArrays: array of arrays w/ objects in them
     setTotalAmountEntries: the set state value for totalAmountEntries which is a number
     setProjectTableData: 
     */
    //  const setUpTableData = (items, arrayOfArrays, setTotalAmountEntries,searchInput,setProjectTableIndex) => {
    //     if(items) {
    //         setTotalAmountEntries(items.length)
    //     // search for stuff from the search bar
    //         if(searchInput.length >= 1) {
    //             setProjectTableData([searchTable(searchInput, items)])
    //         } else {
    //     // dont
    //             setProjectTableData(arrayOfArrays)
    //         }
    //         sortByDate(items)
    //     }
        
    //     if(projectTableData.length <= 1) {
    //         setProjectTableIndex(0)
    //     }
    // }    


  const testFunc = e => {
      e.preventDefault()
      console.log("this is the test func")
  }

    const contextValue = {
        isLoggedIn, setIsLoggedIn,
        isLoading, setIsLoading,
        isError, setIsError,
        user,
        registerUser,
        logoutUser,
        forgotPassword,
        signInUser,
        testFunc,
    }

    return (
        <AuthContext.Provider value={contextValue}>
            {children}
        </AuthContext.Provider>
    )
}
