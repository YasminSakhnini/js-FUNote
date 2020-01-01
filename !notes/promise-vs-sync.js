// # PROMISE EXAMPLE
let userdata = {}

User.find().then(function (response) {
  userdata = response
  // INSIDE HERE is the promise being resolved.That means, the asynchronous call has been responded too and now you can use the data for whatever
  console.log("THIS console log will run ONLY then the .then() is triggered, which ONLY happens when there is a response from whatever server was called.")
})

console.log(userdata)
console.log("THIS console log WILL run before whatever User.find() above does because it is promise based and not async")
// # end of promise example



// ### AWAIT EXAMPLE
let usedata = {}

async function test() {
  let response = await User.find()
  userdata = response
  console.log("THIS console log IS going to run first, because it is an AWAIT before")
  return "hello"
}

console.log(test()) // hello
console.log(userdata)

console.log("THIS console log will run AFTER test() because TEST is an async function that synchronosloy STOPS the code until it is done!")



console.log('')