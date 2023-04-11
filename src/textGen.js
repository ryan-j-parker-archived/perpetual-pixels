const openai = require('openai');

(async () => {
  const response = await openai.Completion.create({
    engine: 'text-davinci-002',
    prompt: 'Once upon a time...',
    max_tokens: 100,
    n: 1,
    stop: null,
    temperature: 0.7,
  });

  const generated_text = response.choices[0].text;
  console.log(generated_text);
})();
