import axios from "axios";

export function fetchUser() {
  axios.get("http://rest.learncode.academy/api/nenjotsu/users")
    .then((response) => {
      console.log(response.data);
      return response.data
    })
    .catch((err) => {
      console.log(err);
    })
}

export function createUserRecord(userRecord) {

  axios.post("http://rest.learncode.academy/api/nenjotsu/users", userRecord)
    .then((response) => {
      userRecord.id = response.data.id;
      fetchUser();
    })
    .catch((err) => {
      debugger;
      console.log(err)
    })

}

export function updateUserRecord(userRecord) {

  const userName = userRecord.data.name;
  const userAge = userRecord.data.age;
  fetch('http://rest.learncode.academy/api/nenjotsu/users/' + userRecord.id, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name: userName, age: userAge }),
  }).then((response) => {
    fetchUser();
    console.log("Update success!", response); //returns 200 ok
  })

}

export function deleteUser(id) {
  console.log(id)
  axios.delete("http://rest.learncode.academy/api/nenjotsu/users/" + id)
    .then((response) => {
      console.log(response)
     fetchUser()
    })
    .catch((err) => {
      console.log(err)
    })

}

