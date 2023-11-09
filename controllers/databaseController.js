const User = require('../models/user');
const OpenAI = require('openai');

//OpenAi
const openai = new OpenAI({
  apiKey: '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',
});

//ai functions
async function sendFitnessChatRequest(id) {
  try {
    const user = await User.findById(id);
    if (!user) {
      return console.status(404).json({ message: 'User not found' });
    }

    const userSummary = `This user is ${user.health.age} years old, this height ${user.health.height}, this weight ${user.health.weight}, this user's current activity level is this ${user.health.activity}, this user's fitness skill level / knowledge level is ${user.health.skillLevel}, this user's time availability is ${user.health.timeAvailability}, this user's preffered type of exercise(s) is/are ${user.health.prefferedExercise}, this user's limitations are ${user.health.limitations}, these are additional comments made by the user about their current health and fitess ${user.health.other}. These are the users goals: overall goals ${user.goals.overall}, strength goals ${user.goals.strength}, weight goals ${user.goals.weight}, other goals ${user.goals.other}`;

    const fitnessTitlePrompt = [
      {
        role: 'system',
        content:
          'You are a helpful assistant that is very knowledgable about health and fitness, you are a personal trainer/ health coach.',
      },
      {
        role: 'user',
        content: `Generate a title for a fitness plan for this user based upon this information about them ${userSummary}.`,
      },
    ];

    const fitnessBodyPrompt = [
      {
        role: 'system',
        content:
          'You are a helpful assistant that is very knowledgable about health and fitness, you are basically a personal trainer/ health coach.',
      },
      {
        role: 'user',
        content: `Generate a fitness plan for this user based upon this information about them ${userSummary}. Only include information about a fitness plan, nutrition and diet will be covered elsewhere`,
      },
    ];

    const fitnessExtraPrompt = [
      {
        role: 'system',
        content:
          'You are a helpful assistant that is very knowledgable about health and fitness, you are basically a personal trainer/ health coach.',
      },
      {
        role: 'user',
        content: `Generate additional details and things to keep in mind for a fitness plan for this user based upon this information about them ${userSummary}.`,
      },
    ];

    const messages = [
      [...fitnessTitlePrompt],
      [...fitnessBodyPrompt],
      [...fitnessExtraPrompt],
    ];

    const responseTitle = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: messages[0],
      max_tokens: 50,
    });

    const responseBody = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: messages[1],
      max_tokens: 500,
    });

    const responseExtra = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: messages[2],
      max_tokens: 100,
    });

    user.fitnessPlan = {
      title: responseTitle.choices[0].message.content,
      body: responseBody.choices[0].message.content,
      extra: responseExtra.choices[0].message.content,
    };

    await user.save();
  } catch (err) {
    console.log(err);
  }
}

async function sendDietChatRequest(id) {
  try {
    const user = await User.findById(id);
    if (!user) {
      return console.status(404).json({ message: 'User not found' });
    }

    const userSummary = `This user is ${user.health.age} years old, this height ${user.health.height}, this weight ${user.health.weight}, this user's current activity level is this ${user.health.activity}, this user's fitness skill level / knowledge level is ${user.health.skillLevel}, this user's time availability is ${user.health.timeAvailability}, this user's preffered type of exercise(s) is/are ${user.health.prefferedExercise}, this user's limitations are ${user.health.limitations}, these are additional comments made by the user about their current health and fitess ${user.health.other}. These are the users goals: overall goals ${user.goals.overall}, strength goals ${user.goals.strength}, weight goals ${user.goals.weight}, other goals ${user.goals.other}`;

    const dietTitlePrompt = [
      {
        role: 'system',
        content:
          'You are a helpful assistant that is very knowledgable about health and fitness, you are a personal trainer/ health coach.',
      },
      {
        role: 'user',
        content: `Generate a title for a diet plan for this user based upon this information about them ${userSummary}.`,
      },
    ];

    const dietBodyPrompt = [
      {
        role: 'system',
        content:
          'You are a helpful assistant that is very knowledgable about health and fitness, you are basically a personal trainer/ health coach.',
      },
      {
        role: 'user',
        content: `Generate a diet plan for this user based upon this information about them ${userSummary}. Only include information about a diet plan, nutrition and fitness will be covered elsewhere`,
      },
    ];

    const dietExtraPrompt = [
      {
        role: 'system',
        content:
          'You are a helpful assistant that is very knowledgable about health and fitness, you are basically a personal trainer/ health coach.',
      },
      {
        role: 'user',
        content: `Generate additional details and things to keep in mind for a diet plan for this user based upon this information about them ${userSummary}.`,
      },
    ];

    const messages = [
      [...dietTitlePrompt],
      [...dietBodyPrompt],
      [...dietExtraPrompt],
    ];

    const responseTitle = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: messages[0],
      max_tokens: 50,
    });

    const responseBody = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: messages[1],
      max_tokens: 500,
    });

    const responseExtra = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: messages[2],
      max_tokens: 100,
    });

    user.dietPlan = {
      title: responseTitle.choices[0].message.content,
      body: responseBody.choices[0].message.content,
      extra: responseExtra.choices[0].message.content,
    };

    await user.save();
  } catch (err) {
    console.log(err);
  }
}

async function sendNutritionChatRequest(id) {
  try {
    const user = await User.findById(id);
    if (!user) {
      return console.status(404).json({ message: 'User not found' });
    }

    const userSummary = `This user is ${user.health.age} years old, this height ${user.health.height}, this weight ${user.health.weight}, this user's current activity level is this ${user.health.activity}, this user's fitness skill level / knowledge level is ${user.health.skillLevel}, this user's time availability is ${user.health.timeAvailability}, this user's preffered type of exercise(s) is/are ${user.health.prefferedExercise}, this user's limitations are ${user.health.limitations}, these are additional comments made by the user about their current health and fitess ${user.health.other}. These are the users goals: overall goals ${user.goals.overall}, strength goals ${user.goals.strength}, weight goals ${user.goals.weight}, other goals ${user.goals.other}`;

    const nutritionTitlePrompt = [
      {
        role: 'system',
        content:
          'You are a helpful assistant that is very knowledgable about health and fitness, you are a personal trainer/ health coach.',
      },
      {
        role: 'user',
        content: `Generate a title for a Nutrition plan for this user based upon this information about them ${userSummary}. Nutrition means supplimentation, vitamins, etc.`,
      },
    ];

    const nutritionBodyPrompt = [
      {
        role: 'system',
        content:
          'You are a helpful assistant that is very knowledgable about health and fitness, you are basically a personal trainer/ health coach.',
      },
      {
        role: 'user',
        content: `Generate a nutrition plan for this user based upon this information about them ${userSummary}. Only include information about a diet plan, diet and fitness will be covered elsewhere. Nutrition means supplimentation, vitamins, etc.`,
      },
    ];

    const nutritionExtraPrompt = [
      {
        role: 'system',
        content:
          'You are a helpful assistant that is very knowledgable about health and fitness, you are basically a personal trainer/ health coach.',
      },
      {
        role: 'user',
        content: `Generate additional details and things to keep in mind for a nutrition plan for this user based upon this information about them ${userSummary}. Nutrition means supplimentation, vitamins, etc.`,
      },
    ];

    const messages = [
      [...nutritionTitlePrompt],
      [...nutritionBodyPrompt],
      [...nutritionExtraPrompt],
    ];

    const responseTitle = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: messages[0],
      max_tokens: 50,
    });

    const responseBody = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: messages[1],
      max_tokens: 500,
    });

    const responseExtra = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: messages[2],
      max_tokens: 100,
    });

    user.nutritionPlan = {
      title: responseTitle.choices[0].message.content,
      body: responseBody.choices[0].message.content,
      extra: responseExtra.choices[0].message.content,
    };

    await user.save();
  } catch (err) {
    console.log(err);
  }
}

const health_post = async (req, res) => {
  const id = req.params.id;
  const newInfo = req.body;
  console.log(newInfo);

  try {
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    user.health = {
      age: req.body.age,
      weight: req.body.weight,
      height: req.body.height,
      activity: req.body.activity,
      skillLevel: req.body.skillLevel,
      timeAvailability: req.body.timeAvailability,
      prefferedExercise: req.body.prefferedExercise,
      limitations: req.body.limitations,
      other: req.body.other,
    };

    await user.save();
    console.log(user);
    res.redirect('/goals-questions');
  } catch (err) {
    console.log(err);
  }
};

const goals_post = async (req, res) => {
  const id = req.params.id;
  const newInfo = req.body;
  console.log(newInfo);

  try {
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    user.goals = {
      overall: req.body.overall,
      strength: req.body.strength,
      weight: req.body.weight,
      other: req.body.other,
    };

    await user.save();
    console.log(user);
    res.redirect('/dashboard');
    await sendFitnessChatRequest(id);
    await sendDietChatRequest(id);
    await sendNutritionChatRequest(id);
  } catch (err) {
    console.log(err);
  }
};

module.exports = {
  health_post,
  goals_post,
};