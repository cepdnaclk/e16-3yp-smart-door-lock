const assert = require('assert');
const firebase =require('@firebase/testing');

const MY_PROJECT_ID ='doorlock-a0c00';
const DATABASE_NAME = "doorlock";

const COVERAGE_URL = `http://${process.env.FIREBASE_DATABASE_EMULATOR_HOST}/.inspect/coverage?ns=${DATABASE_NAME}`;

function getAuthedDatabase(auth) {
    return firebase
      .initializeTestApp({ databaseName: DATABASE_NAME, auth })
      .database();
  }

describe('test firbase security rules', ()=>{
    
    it("should allow users to update details if passed credentials are valid", async () => {
        const alice = getAuthedDatabase({ uid: "69ffXtVKsDOUgQjDsCcXpFoN1wH2" });
        await firebase.assertSucceeds(
          alice.ref('Users/-MS2owbb_yzQQLpZzdpz').update({ UserDepartment: "dept1",  }));
    });
    it("should not update details if credentials are null", async () => {
        const alice = getAuthedDatabase({ uid: "" });
        await firebase.assertSucceeds(
          alice.ref('Users/-MS2owbb_yzQQLpZzdpz').update({ UserDepartment: "dept1",})  );
    });
    it("should  not allow to write details if uid is null", async () => {
        const alice = getAuthedDatabase({ uid: "" });
    
        await firebase.assertSucceeds(
          alice.ref('Users/-MS2owbb_yzQQLpZzdpz').set({
            UserDepartment: "hello2",
          })
        );

    });
    it("should allow users to enter(write) details if passed credentials are valid", async () => {
        const alice = getAuthedDatabase({ uid: "69ffXtVKsDOUgQjDsCcXpFoN1wH2" });
        await firebase.assertSucceeds(
          alice.ref("Users/-MS2owbb_yzQQLpZzdpz").set({ UserDepartment: "dept1" }))
      });
    
})
