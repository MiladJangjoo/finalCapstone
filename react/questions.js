// When do you know to use useEffect? I don’t understand why we use that vs. making a different function with if/else statements.

// Can you explain useContext again? I watched some videos on it and how it supposedly helps to prevent chaining too many props together, but it never looked like it condensed the code so idk why we can’t just stick to props? I’m having trouble grasping how useful it can be or maybe in what scenarios I would use it outside of making a User.

// And the last thing I’m confused on is this line of code from UserProvider. Idk what question to even ask, I just don’t understand what’s happening here haha
// const [user, setUser] = useState({ username: '', token: '' });
// const value = {
//   user, 
//   setUser 
// }

// I’m kind of lost on what this code is doing on the UserForm. I think it’s asking if there is an endpoint then I must be logged in, so it should fetch my user page? Otherwise send me to register? And if I want to edit then it’s a put request but otherwise I’m posting?

// async function registerUser(user: User, endpoint: boolean | string){
//   endpoint = endpoint ? 'user' : 'register'
//   const res = await fetch(`http://127.0.0.1:5000/${endpoint}`, {
//     method: edit ? 'PUT' : 'POST',

// (edited)

