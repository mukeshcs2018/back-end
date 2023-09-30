import express from "express";
import bodyParser from "body-parser";

const app = express();
const port = 3000;
const masterKey = "4VGP2DN-6EWM4SJ-N6FGRHV-Z3PR3TT";

app.use(bodyParser.urlencoded({ extended: true }));

//1. GET a random joke
app.get("/random", (req, res) =>{

  const randomIndex = Math.floor(Math.random() * jokes.length);

  const randomJoke = jokes[randomIndex];

  res.send(randomJoke);

});


//2. GET a specific joke

app.get("/jokes/:id", (req, res) => {

  const id = parseInt(req.params.id);

  const foundJoke = jokes.find((joke) => joke.id === id);

  res.json(foundJoke);
})



//3. GET a jokes by filtering on the joke type

app.get("/filter", (req, res) => {
  const requestType = req.query.type;
  const jokesObjects = jokes.filter((joke) => joke.jokeType === requestType);

  const randomIndOfJokeType = Math.floor(Math.random() * jokesObjects.length);

  res.json(jokesObjects[randomIndOfJokeType]);
  
})

//4. POST a new joke
app.post("/jokes", (req, res) => {
  const newJoke = {
    id : jokes.length + 1,
    jokeText : req.body.text,
    jokeType : req.body.type,
  }
  jokes.push(newJoke);

  console.log(jokes.slice(-1));
  res.json(newJoke);
});

//5. PUT a joke

app.put("/jokes/:id", (req, res) =>{
  const id = parseInt(req.params.id);

  const replaceJoke = {
    id : id,
    jokeText : req.body.text,
    jokeType : req.body.type,
  }

  const searchIndex = jokes.findIndex((joke) => joke.id === id)
  
  jokes[searchIndex] = replaceJoke;

  res.json(replaceJoke);
})

//6. PATCH a joke




app.patch("/jokes/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const existingJoke = jokes.find((joke) => joke.id === id);
  const replacementJoke = {
    id: id,
    jokeText: req.body.text || existingJoke.jokeText,
    jokeType: req.body.type || existingJoke.jokeType,
  };
  const searchIndex = jokes.findIndex((joke) => joke.id === id);
  jokes[searchIndex] = replacementJoke;
  console.log(jokes[searchIndex]);
  res.json(replacementJoke);
});


//7. DELETE Specific joke

app.delete("/jokes/:id", (req, res) => {
  const id = parseInt(req.params.id);

  const searchIndex = jokes.findIndex((joke) => joke.id === id);
  
  if(searchIndex > -1){
    jokes.splice(searchIndex, 1);
    res.sendStatus(200);
  }
  else{
    res
      .status(404)
      .json({error : `Joke with id ${id} not found. No jokes were deleted`});
  }
  
})


//8. DELETE All jokes

app.delete("/all", (req, res) => {
  const userKey = req.query.key;
  if(userKey === masterKey){
    jokes.splice(0, jokes.length);
    res.sendStatus(200);
  }
  else{
    res
      .status(404)
      .json({error : `You are not authorized to perform this action. `})
  }
})

app.listen(port, () => {
  console.log(`Successfully started server on port ${port}.`);
});

var jokes = [
  {
    id: 1,
    jokeText:
      "Why don't scientists trust atoms? Because they make up everything.",
    jokeType: "Science",
  },
  {
    id: 2,
    jokeText:
      "Why did the scarecrow win an award? Because he was outstanding in his field.",
    jokeType: "Puns",
  },
  {
    id: 3,
    jokeText:
      "I told my wife she was drawing her eyebrows too high. She looked surprised.",
    jokeType: "Puns",
  },
  {
    id: 4,
    jokeText:
      "What did one ocean say to the other ocean? Nothing, they just waved.",
    jokeType: "Wordplay",
  },
  {
    id: 5,
    jokeText:
      "Why do we never tell secrets on a farm? Because the potatoes have eyes and the corn has ears.",
    jokeType: "Wordplay",
  },
  {
    id: 6,
    jokeText: "How do you organize a space party? You planet!",
    jokeType: "Science",
  },
  {
    id: 7,
    jokeText:
      "Why don't some couples go to the gym? Because some relationships don't work out.",
    jokeType: "Puns",
  },
  {
    id: 8,
    jokeText:
      "Parallel lines have so much in common. It's a shame they'll never meet.",
    jokeType: "Math",
  },
  {
    id: 9,
    jokeText: "What do you call fake spaghetti? An impasta!",
    jokeType: "Food",
  },
  {
    id: 10,
    jokeText: "Why did the tomato turn red? Because it saw the salad dressing!",
    jokeType: "Food",
  },
  {
    id: 11,
    jokeText:
      "What do you get when you cross a snowman and a vampire? Frostbite!",
    jokeType: "Wordplay",
  },
  {
    id: 12,
    jokeText:
      "Why did the golfer bring two pairs of pants? In case he got a hole in one!",
    jokeType: "Sports",
  },
  {
    id: 13,
    jokeText:
      "Why are ghosts bad at lying? Because you can see right through them!",
    jokeType: "Wordplay",
  },
  {
    id: 14,
    jokeText: "Why can't you give Elsa a balloon? Because she will let it go.",
    jokeType: "Movies",
  },
  {
    id: 15,
    jokeText:
      "I'm reading a book about anti-gravity. It's impossible to put down!",
    jokeType: "Science",
  },
  {
    id: 16,
    jokeText:
      "I told my wife she was drawing her eyebrows too high. She looked surprised.",
    jokeType: "Puns",
  },
  {
    id: 17,
    jokeText:
      "What did one ocean say to the other ocean? Nothing, they just waved.",
    jokeType: "Wordplay",
  },
  {
    id: 18,
    jokeText:
      "Why do we never tell secrets on a farm? Because the potatoes have eyes and the corn has ears.",
    jokeType: "Wordplay",
  },
  {
    id: 19,
    jokeText: "How do you organize a space party? You planet!",
    jokeType: "Science",
  },
  {
    id: 20,
    jokeText:
      "Why don't some couples go to the gym? Because some relationships don't work out.",
    jokeType: "Puns",
  },
  {
    id: 21,
    jokeText:
      "Parallel lines have so much in common. It's a shame they'll never meet.",
    jokeType: "Math",
  },
  {
    id: 22,
    jokeText: "What do you call fake spaghetti? An impasta!",
    jokeType: "Food",
  },
  {
    id: 23,
    jokeText: "Why did the tomato turn red? Because it saw the salad dressing!",
    jokeType: "Food",
  },
  {
    id: 24,
    jokeText:
      "What do you get when you cross a snowman and a vampire? Frostbite!",
    jokeType: "Wordplay",
  },
  {
    id: 25,
    jokeText:
      "Why did the golfer bring two pairs of pants? In case he got a hole in one!",
    jokeType: "Sports",
  },
  {
    id: 26,
    jokeText:
      "Why are ghosts bad at lying? Because you can see right through them!",
    jokeType: "Wordplay",
  },
  {
    id: 27,
    jokeText: "Why can't you give Elsa a balloon? Because she will let it go.",
    jokeType: "Movies",
  },
  {
    id: 28,
    jokeText:
      "I'm reading a book about anti-gravity. It's impossible to put down!",
    jokeType: "Science",
  },
  {
    id: 29,
    jokeText:
      "I told my wife she was drawing her eyebrows too high. She looked surprised.",
    jokeType: "Puns",
  },
  {
    id: 30,
    jokeText:
      "What did one ocean say to the other ocean? Nothing, they just waved.",
    jokeType: "Wordplay",
  },
  {
    id: 31,
    jokeText:
      "Why do we never tell secrets on a farm? Because the potatoes have eyes and the corn has ears.",
    jokeType: "Wordplay",
  },
  {
    id: 32,
    jokeText: "How do you organize a space party? You planet!",
    jokeType: "Science",
  },
  {
    id: 33,
    jokeText:
      "Why don't some couples go to the gym? Because some relationships don't work out.",
    jokeType: "Puns",
  },
  {
    id: 34,
    jokeText:
      "Parallel lines have so much in common. It's a shame they'll never meet.",
    jokeType: "Math",
  },
  {
    id: 35,
    jokeText: "What do you call fake spaghetti? An impasta!",
    jokeType: "Food",
  },
  {
    id: 36,
    jokeText: "Why did the tomato turn red? Because it saw the salad dressing!",
    jokeType: "Food",
  },
  {
    id: 37,
    jokeText:
      "What do you get when you cross a snowman and a vampire? Frostbite!",
    jokeType: "Wordplay",
  },
  {
    id: 38,
    jokeText:
      "Why did the golfer bring two pairs of pants? In case he got a hole in one!",
    jokeType: "Sports",
  },
  {
    id: 39,
    jokeText:
      "Why are ghosts bad at lying? Because you can see right through them!",
    jokeType: "Wordplay",
  },
  {
    id: 40,
    jokeText: "Why can't you give Elsa a balloon? Because she will let it go.",
    jokeType: "Movies",
  },
  {
    id: 41,
    jokeText:
      "I'm reading a book about anti-gravity. It's impossible to put down!",
    jokeType: "Science",
  },
  {
    id: 42,
    jokeText:
      "I told my wife she was drawing her eyebrows too high. She looked surprised.",
    jokeType: "Puns",
  },
  {
    id: 43,
    jokeText:
      "What did one ocean say to the other ocean? Nothing, they just waved.",
    jokeType: "Wordplay",
  },
  {
    id: 44,
    jokeText:
      "Why do we never tell secrets on a farm? Because the potatoes have eyes and the corn has ears.",
    jokeType: "Wordplay",
  },
  {
    id: 45,
    jokeText: "How do you organize a space party? You planet!",
    jokeType: "Science",
  },
  {
    id: 46,
    jokeText:
      "Why don't some couples go to the gym? Because some relationships don't work out.",
    jokeType: "Puns",
  },
  {
    id: 47,
    jokeText:
      "Parallel lines have so much in common. It's a shame they'll never meet.",
    jokeType: "Math",
  },
  {
    id: 48,
    jokeText: "What do you call fake spaghetti? An impasta!",
    jokeType: "Food",
  },
  {
    id: 49,
    jokeText: "Why did the tomato turn red? Because it saw the salad dressing!",
    jokeType: "Food",
  },
  {
    id: 50,
    jokeText:
      "What do you get when you cross a snowman and a vampire? Frostbite!",
    jokeType: "Wordplay",
  },
  {
    id: 51,
    jokeText:
      "Why did the golfer bring two pairs of pants? In case he got a hole in one!",
    jokeType: "Sports",
  },
  {
    id: 52,
    jokeText:
      "Why are ghosts bad at lying? Because you can see right through them!",
    jokeType: "Wordplay",
  },
  {
    id: 53,
    jokeText: "Why can't you give Elsa a balloon? Because she will let it go.",
    jokeType: "Movies",
  },
  {
    id: 54,
    jokeText:
      "I'm reading a book about anti-gravity. It's impossible to put down!",
    jokeType: "Science",
  },
  {
    id: 55,
    jokeText:
      "I told my wife she was drawing her eyebrows too high. She looked surprised.",
    jokeType: "Puns",
  },
  {
    id: 56,
    jokeText:
      "What did one ocean say to the other ocean? Nothing, they just waved.",
    jokeType: "Wordplay",
  },
  {
    id: 57,
    jokeText:
      "Why do we never tell secrets on a farm? Because the potatoes have eyes and the corn has ears.",
    jokeType: "Wordplay",
  },
  {
    id: 58,
    jokeText: "How do you organize a space party? You planet!",
    jokeType: "Science",
  },
  {
    id: 59,
    jokeText:
      "Why don't some couples go to the gym? Because some relationships don't work out.",
    jokeType: "Puns",
  },
  {
    id: 60,
    jokeText:
      "Parallel lines have so much in common. It's a shame they'll never meet.",
    jokeType: "Math",
  },
  {
    id: 61,
    jokeText: "What do you call fake spaghetti? An impasta!",
    jokeType: "Food",
  },
  {
    id: 62,
    jokeText: "Why did the tomato turn red? Because it saw the salad dressing!",
    jokeType: "Food",
  },
  {
    id: 63,
    jokeText:
      "What do you get when you cross a snowman and a vampire? Frostbite!",
    jokeType: "Wordplay",
  },
  {
    id: 64,
    jokeText:
      "Why did the golfer bring two pairs of pants? In case he got a hole in one!",
    jokeType: "Sports",
  },
  {
    id: 65,
    jokeText:
      "Why are ghosts bad at lying? Because you can see right through them!",
    jokeType: "Wordplay",
  },
  {
    id: 66,
    jokeText: "Why can't you give Elsa a balloon? Because she will let it go.",
    jokeType: "Movies",
  },
  {
    id: 67,
    jokeText:
      "I'm reading a book about anti-gravity. It's impossible to put down!",
    jokeType: "Science",
  },
  {
    id: 68,
    jokeText:
      "I told my wife she was drawing her eyebrows too high. She looked surprised.",
    jokeType: "Puns",
  },
  {
    id: 69,
    jokeText:
      "What did one ocean say to the other ocean? Nothing, they just waved.",
    jokeType: "Wordplay",
  },
  {
    id: 70,
    jokeText:
      "Why do we never tell secrets on a farm? Because the potatoes have eyes and the corn has ears.",
    jokeType: "Wordplay",
  },
  {
    id: 71,
    jokeText: "How do you organize a space party? You planet!",
    jokeType: "Science",
  },
  {
    id: 72,
    jokeText:
      "Why don't some couples go to the gym? Because some relationships don't work out.",
    jokeType: "Puns",
  },
  {
    id: 73,
    jokeText:
      "Parallel lines have so much in common. It's a shame they'll never meet.",
    jokeType: "Math",
  },
  {
    id: 74,
    jokeText: "What do you call fake spaghetti? An impasta!",
    jokeType: "Food",
  },
  {
    id: 75,
    jokeText: "Why did the tomato turn red? Because it saw the salad dressing!",
    jokeType: "Food",
  },
  {
    id: 76,
    jokeText:
      "What do you get when you cross a snowman and a vampire? Frostbite!",
    jokeType: "Wordplay",
  },
  {
    id: 77,
    jokeText:
      "Why did the golfer bring two pairs of pants? In case he got a hole in one!",
    jokeType: "Sports",
  },
  {
    id: 78,
    jokeText:
      "Why are ghosts bad at lying? Because you can see right through them!",
    jokeType: "Wordplay",
  },
  {
    id: 79,
    jokeText: "Why can't you give Elsa a balloon? Because she will let it go.",
    jokeType: "Movies",
  },
  {
    id: 80,
    jokeText:
      "I'm reading a book about anti-gravity. It's impossible to put down!",
    jokeType: "Science",
  },
  {
    id: 81,
    jokeText:
      "I told my wife she was drawing her eyebrows too high. She looked surprised.",
    jokeType: "Puns",
  },
  {
    id: 82,
    jokeText:
      "What did one ocean say to the other ocean? Nothing, they just waved.",
    jokeType: "Wordplay",
  },
  {
    id: 83,
    jokeText:
      "Why do we never tell secrets on a farm? Because the potatoes have eyes and the corn has ears.",
    jokeType: "Wordplay",
  },
  {
    id: 84,
    jokeText: "How do you organize a space party? You planet!",
    jokeType: "Science",
  },
  {
    id: 85,
    jokeText:
      "Why don't some couples go to the gym? Because some relationships don't work out.",
    jokeType: "Puns",
  },
  {
    id: 86,
    jokeText:
      "Parallel lines have so much in common. It's a shame they'll never meet.",
    jokeType: "Math",
  },
  {
    id: 87,
    jokeText: "What do you call fake spaghetti? An impasta!",
    jokeType: "Food",
  },
  {
    id: 88,
    jokeText: "Why did the tomato turn red? Because it saw the salad dressing!",
    jokeType: "Food",
  },
  {
    id: 89,
    jokeText:
      "What do you get when you cross a snowman and a vampire? Frostbite!",
    jokeType: "Wordplay",
  },
  {
    id: 90,
    jokeText:
      "Why did the golfer bring two pairs of pants? In case he got a hole in one!",
    jokeType: "Sports",
  },
  {
    id: 91,
    jokeText:
      "Why are ghosts bad at lying? Because you can see right through them!",
    jokeType: "Wordplay",
  },
  {
    id: 92,
    jokeText: "Why can't you give Elsa a balloon? Because she will let it go.",
    jokeType: "Movies",
  },
  {
    id: 93,
    jokeText:
      "I'm reading a book about anti-gravity. It's impossible to put down!",
    jokeType: "Science",
  },
  {
    id: 94,
    jokeText:
      "I told my wife she was drawing her eyebrows too high. She looked surprised.",
    jokeType: "Puns",
  },
  {
    id: 95,
    jokeText:
      "What did one ocean say to the other ocean? Nothing, they just waved.",
    jokeType: "Wordplay",
  },
  {
    id: 96,
    jokeText:
      "Why do we never tell secrets on a farm? Because the potatoes have eyes and the corn has ears.",
    jokeType: "Wordplay",
  },
  {
    id: 97,
    jokeText: "How do you organize a space party? You planet!",
    jokeType: "Science",
  },
  {
    id: 98,
    jokeText:
      "Why don't some couples go to the gym? Because some relationships don't work out.",
    jokeType: "Puns",
  },
  {
    id: 99,
    jokeText:
      "Parallel lines have so much in common. It's a shame they'll never meet.",
    jokeType: "Math",
  },
  {
    id: 100,
    jokeText: "What do you call fake spaghetti? An impasta!",
    jokeType: "Food",
  },
  {
    id: 101,
    jokeText: "Parallel lines have so much in common. It’s a shame they’ll never meet.",
    jokeType: "Math"
  },
  {
    id: 102,
    jokeText: "Why don't scientists trust atoms? Because they make up everything.",
    jokeType: "Science"
  },
  {
    id: 103,
    jokeText: "I told my computer I needed a break, and now it won't stop sending me travel ads.",
    jokeType: "Technology"
  },
  {
    id: 104,
    jokeText: "I used to play piano by ear, but now I use my hands.",
    jokeType: "Music"
  },
  {
    id: 105,
    jokeText: "What do you call fake spaghetti? An impasta.",
    jokeType: "Pun"
  },
  {
    id: 106,
    jokeText: "Why was the math book sad? Because it had too many problems.",
    jokeType: "Math"
  },
  {
    id: 107,
    jokeText: "I told my wife she should do lunges to stay in shape. That would be a big step forward.",
    jokeType: "Fitness"
  },
  {
    id: 108,
    jokeText: "Why did the scarecrow win an award? Because he was outstanding in his field!",
    jokeType: "Pun"
  },
  {
    id: 109,
    jokeText: "I'm on a seafood diet. I see food and I eat it.",
    jokeType: "Food"
  },
  {
    id: 110,
    jokeText: "I told my computer I needed a break, and now it won't stop sending me travel ads.",
    jokeType: "Technology"
  },
  {
    id: 111,
    jokeText: "I'm friends with all electricians. We have great current connections.",
    jokeType: "Pun"
  },
  {
    id: 112,
    jokeText: "Why don't scientists trust atoms? Because they make up everything.",
    jokeType: "Science"
  },
  {
    id: 113,
    jokeText: "I used to play piano by ear, but now I use my hands.",
    jokeType: "Music"
  },
  {
    id: 114,
    jokeText: "Why did the bicycle fall over? Because it was two-tired.",
    jokeType: "Pun"
  },
  {
    id: 115,
    jokeText: "Parallel lines have so much in common. It’s a shame they’ll never meet.",
    jokeType: "Math"
  },
  {
    id: 116,
    jokeText: "I used to be a baker, but I couldn't make enough dough.",
    jokeType: "Pun"
  },
  {
    id: 117,
    jokeText: "I told my wife she should do lunges to stay in shape. That would be a big step forward.",
    jokeType: "Fitness"
  },
  {
    id: 118,
    jokeText: "I'm on a seafood diet. I see food and I eat it.",
    jokeType: "Food"
  },
  {
    id: 119,
    jokeText: "Why was the math book sad? Because it had too many problems.",
    jokeType: "Math"
  },
  {
    id: 120,
    jokeText: "What do you call fake spaghetti? An impasta.",
    jokeType: "Pun"
  },
  {
    id: 121,
    jokeText: "Why did the scarecrow win an award? Because he was outstanding in his field!",
    jokeType: "Pun"
  },
  {
    id: 122,
    jokeText: "I'm friends with all electricians. We have great current connections.",
    jokeType: "Pun"
  },
  {
    id: 123,
    jokeText: "I'm reading a book on anti-gravity. It's impossible to put down!",
    jokeType: "Science"
  },
  {
    id: 124,
    jokeText: "Why don't eggs tell jokes? Because they might crack up!",
    jokeType: "Food"
  },
  {
    id: 125,
    jokeText: "I used to be a baker, but I couldn't make enough dough.",
    jokeType: "Pun"
  },
  {
    id: 126,
    jokeText: "Parallel lines have so much in common. It’s a shame they’ll never meet.",
    jokeType: "Math"
  },
  {
    id: 127,
    jokeText: "I told my wife she should do lunges to stay in shape. That would be a big step forward.",
    jokeType: "Fitness"
  },
  {
    id: 128,
    jokeText: "I'm on a seafood diet. I see food and I eat it.",
    jokeType: "Food"
  },
  {
    id: 129,
    jokeText: "Why was the math book sad? Because it had too many problems.",
    jokeType: "Math"
  },
  {
    id: 130,
    jokeText: "What do you call fake spaghetti? An impasta.",
    jokeType: "Pun"
  },
  {
    id: 131,
    jokeText: "Why did the scarecrow win an award? Because he was outstanding in his field!",
    jokeType: "Pun"
  },
  {
    id: 132,
    jokeText: "I'm friends with all electricians. We have great current connections.",
    jokeType: "Pun"
  },
  {
    id: 133,
    jokeText: "I'm reading a book on anti-gravity. It's impossible to put down!",
    jokeType: "Science"
  },
  {
    id: 134,
    jokeText: "Why don't eggs tell jokes? Because they might crack up!",
    jokeType: "Food"
  },
  {
    id: 135,
    jokeText: "I used to be a baker, but I couldn't make enough dough.",
    jokeType: "Pun"
  },
  {
    id: 136,
    jokeText: "Parallel lines have so much in common. It’s a shame they’ll never meet.",
    jokeType: "Math"
  },
  {
    id: 137,
    jokeText: "I told my wife she should do lunges to stay in shape. That would be a big step forward.",
    jokeType: "Fitness"
  },
  {
    id: 138,
    jokeText: "I'm on a seafood diet. I see food and I eat it.",
    jokeType: "Food"
  },
  {
    id: 139,
    jokeText: "Why was the math book sad? Because it had too many problems.",
    jokeType: "Math"
  },
  {
    id: 140,
    jokeText: "What do you call fake spaghetti? An impasta.",
    jokeType: "Pun"
  },
  {
    id: 141,
    jokeText: "Why did the scarecrow win an award? Because he was outstanding in his field!",
    jokeType: "Pun"
  },
  {
    id: 142,
    jokeText: "I'm friends with all electricians. We have great current connections.",
    jokeType: "Pun"
  },
  {
    id: 143,
    jokeText: "I'm reading a book on anti-gravity. It's impossible to put down!",
    jokeType: "Science"
  },
  {
    id: 144,
    jokeText: "Why don't eggs tell jokes? Because they might crack up!",
    jokeType: "Food"
  },
  {
    id: 145,
    jokeText: "I used to be a baker, but I couldn't make enough dough.",
    jokeType: "Pun"
  },
  {
    id: 146,
    jokeText: "Parallel lines have so much in common. It’s a shame they’ll never meet.",
    jokeType: "Math"
  },
  {
    id: 147,
    jokeText: "I told my wife she should do lunges to stay in shape. That would be a big step forward.",
    jokeType: "Fitness"
  },
  {
    id: 148,
    jokeText: "I'm on a seafood diet. I see food and I eat it.",
    jokeType: "Food"
  },
  {
    id: 149,
    jokeText: "Why was the math book sad? Because it had too many problems.",
    jokeType: "Math"
  },
  {
    id: 150,
    jokeText: "What do you call fake spaghetti? An impasta.",
    jokeType: "Pun"
  },
  {
    id: 151,
    jokeText: "Why did the scarecrow win an award? Because he was outstanding in his field!",
    jokeType: "Pun"
  },
  {
    id: 152,
    jokeText: "I'm friends with all electricians. We have great current connections.",
    jokeType: "Pun"
  },
  {
    id: 153,
    jokeText: "I'm reading a book on anti-gravity. It's impossible to put down!",
    jokeType: "Science"
  },
  {
    id: 154,
    jokeText: "Why don't eggs tell jokes? Because they might crack up!",
    jokeType: "Food"
  },
  {
    id: 155,
    jokeText: "I used to be a baker, but I couldn't make enough dough.",
    jokeType: "Pun"
  },
  {
    id: 156,
    jokeText: "Parallel lines have so much in common. It’s a shame they’ll never meet.",
    jokeType: "Math"
  },
  {
    id: 157,
    jokeText: "I told my wife she should do lunges to stay in shape. That would be a big step forward.",
    jokeType: "Fitness"
  },
  {
    id: 158,
    jokeText: "I'm on a seafood diet. I see food and I eat it.",
    jokeType: "Food"
  },
  {
    id: 159,
    jokeText: "Why was the math book sad? Because it had too many problems.",
    jokeType: "Math"
  },
  {
    id: 160,
    jokeText: "What do you call fake spaghetti? An impasta.",
    jokeType: "Pun"
  },
  {
    id: 161,
    jokeText: "Why did the scarecrow win an award? Because he was outstanding in his field!",
    jokeType: "Pun"
  },
  {
    id: 162,
    jokeText: "I'm friends with all electricians. We have great current connections.",
    jokeType: "Pun"
  },
  {
    id: 163,
    jokeText: "I'm reading a book on anti-gravity. It's impossible to put down!",
    jokeType: "Science"
  },
  {
    id: 164,
    jokeText: "Why don't eggs tell jokes? Because they might crack up!",
    jokeType: "Food"
  },
  {
    id: 165,
    jokeText: "I used to be a baker, but I couldn't make enough dough.",
    jokeType: "Pun"
  },
  {
    id: 166,
    jokeText: "Parallel lines have so much in common. It’s a shame they’ll never meet.",
    jokeType: "Math"
  },
  {
    id: 167,
    jokeText: "I told my wife she should do lunges to stay in shape. That would be a big step forward.",
    jokeType: "Fitness"
  },
  {
    id: 168,
    jokeText: "I'm on a seafood diet. I see food and I eat it.",
    jokeType: "Food"
  },
  {
    id: 169,
    jokeText: "Why was the math book sad? Because it had too many problems.",
    jokeType: "Math"
  },
  {
    id: 170,
    jokeText: "What do you call fake spaghetti? An impasta.",
    jokeType: "Pun"
  },
  {
    id: 171,
    jokeText: "Why did the scarecrow win an award? Because he was outstanding in his field!",
    jokeType: "Pun"
  },
  {
    id: 172,
    jokeText: "I'm friends with all electricians. We have great current connections.",
    jokeType: "Pun"
  },
  {
    id: 173,
    jokeText: "I'm reading a book on anti-gravity. It's impossible to put down!",
    jokeType: "Science"
  },
  {
    id: 174,
    jokeText: "Why don't eggs tell jokes? Because they might crack up!",
    jokeType: "Food"
  },
  {
    id: 175,
    jokeText: "I used to be a baker, but I couldn't make enough dough.",
    jokeType: "Pun"
  },
  {
    id: 176,
    jokeText: "Parallel lines have so much in common. It’s a shame they’ll never meet.",
    jokeType: "Math"
  },
  {
    id: 177,
    jokeText: "I told my wife she should do lunges to stay in shape. That would be a big step forward.",
    jokeType: "Fitness"
  },
  {
    id: 178,
    jokeText: "I'm on a seafood diet. I see food and I eat it.",
    jokeType: "Food"
  },
  {
    id: 179,
    jokeText: "Why was the math book sad? Because it had too many problems.",
    jokeType: "Math"
  },
  {
    id: 180,
    jokeText: "What do you call fake spaghetti? An impasta.",
    jokeType: "Pun"
  },
  {
    id: 181,
    jokeText: "Why did the scarecrow win an award? Because he was outstanding in his field!",
    jokeType: "Pun"
  },
  {
    id: 182,
    jokeText: "I'm friends with all electricians. We have great current connections.",
    jokeType: "Pun"
  },
  {
    id: 183,
    jokeText: "I'm reading a book on anti-gravity. It's impossible to put down!",
    jokeType: "Science"
  },
  {
    id: 184,
    jokeText: "Why don't eggs tell jokes? Because they might crack up!",
    jokeType: "Food"
  },
  {
    id: 185,
    jokeText: "I used to be a baker, but I couldn't make enough dough.",
    jokeType: "Pun"
  },
  {
    id: 186,
    jokeText: "Parallel lines have so much in common. It’s a shame they’ll never meet.",
    jokeType: "Math"
  },
  {
    id: 187,
    jokeText: "I told my wife she should do lunges to stay in shape. That would be a big step forward.",
    jokeType: "Fitness"
  },
  {
    id: 188,
    jokeText: "I'm on a seafood diet. I see food and I eat it.",
    jokeType: "Food"
  },
  {
    id: 189,
    jokeText: "Why was the math book sad? Because it had too many problems.",
    jokeType: "Math"
  },
  {
    id: 190,
    jokeText: "What do you call fake spaghetti? An impasta.",
    jokeType: "Pun"
  },
  {
    id: 191,
    jokeText: "Why did the scarecrow win an award? Because he was outstanding in his field!",
    jokeType: "Pun"
  },
  {
    id: 192,
    jokeText: "I'm friends with all electricians. We have great current connections.",
    jokeType: "Pun"
  },
  {
    id: 193,
    jokeText: "I'm reading a book on anti-gravity. It's impossible to put down!",
    jokeType: "Science"
  },
  {
    id: 194,
    jokeText: "Why don't eggs tell jokes? Because they might crack up!",
    jokeType: "Food"
  },
  {
    id: 195,
    jokeText: "I used to be a baker, but I couldn't make enough dough.",
    jokeType: "Pun"
  },
  {
    id: 196,
    jokeText: "Parallel lines have so much in common. It’s a shame they’ll never meet.",
    jokeType: "Math"
  },
  {
    id: 197,
    jokeText: "I told my wife she should do lunges to stay in shape. That would be a big step forward.",
    jokeType: "Fitness"
  },
  {
    id: 198,
    jokeText: "I'm on a seafood diet. I see food and I eat it.",
    jokeType: "Food"
  },
  {
    id: 199,
    jokeText: "Why was the math book sad? Because it had too many problems.",
    jokeType: "Math"
  },
  {
    id: 200,
    jokeText: "What do you call fake spaghetti? An impasta.",
    jokeType: "Pun"
  }
  
];
