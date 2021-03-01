const {Score, Quiz, User} = require("./model.js").models;

const getRandomInt = (min, max) => Math.floor(Math.random() * (max - min)) + min;

// Show all quizzes in DB including <id> and <author>
exports.play = async (rl) =>  {
	let quizzes = await Quiz.findAll();
	let wins = 0;

	while (quizzes.length > 0) {
		let index = getRandomInt(0, quizzes.length);
		let quiz = quizzes.splice(index, 1)[0];
		let answered = await rl.questionP(quiz.question);

		if (answered.toLowerCase().trim()===quiz.answer.toLowerCase().trim()) {
			rl.log(`  The answer "${answered}" is right!`);
			wins++;
		} else {
			rl.log(`  The answer "${answered}" is wrong!`);
			break;
		}
	}
	rl.log(`  Score: ${wins}`);

	let name = await rl.questionP("Enter user");
    let user = await User.findOne({where: {name}},{ include: [{
        model: Score,
        as: 'scores'
      }]
    });
    if (!user)   user = await User.create( { name, age: 0 } );
    Score.create( { wins, 
        userId: user.id } );
}

// Show all scores in DB including <id> and <author>
exports.list = async (rl) =>  {

  let scores = await Score.findAll(
    {
      include: [{
        model: User,
        as: 'user'
      }],
      order: [
        [ "wins", "DESC" ]
      ]
    }
  );
  scores.forEach(
    s => rl.log(`  ${s.user.name}|${s.wins}|${s.createdAt.toUTCString()}`)
  );
}