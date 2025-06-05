const express = require('express');
const bodyParser = require('body-parser');

const cors = require('cors');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, '../frontend')));


// Simple in-memory store
let prompts = [];
let nextId = 1;

function refinePrompt(raw) {
  if (!raw) return '';
  const trimmed = raw.trim();
  const first = trimmed.charAt(0).toUpperCase() + trimmed.slice(1);
  const punctuated = /[.!?]$/.test(first) ? first : first + '.';
  return punctuated;
}

function optimizePrompt(refined, context) {
  let optimized = refined;
  if (context) {
    optimized += ` [Context: ${context}]`;
  }
  return optimized;
}

app.get('/prompts', (req, res) => {
  res.json(prompts);
});

app.post('/prompts', (req, res) => {
  const { rawPrompt, projectContext } = req.body;
  if (!rawPrompt) {
    return res.status(400).json({ error: 'rawPrompt is required' });
  }
  const refined = refinePrompt(rawPrompt);
  const optimized = optimizePrompt(refined, projectContext);
  const prompt = { id: nextId++, rawPrompt, refinedPrompt: refined, optimizedPrompt: optimized, projectContext };
  prompts.push(prompt);
  res.status(201).json(prompt);
});

app.put('/prompts/:id', (req, res) => {
  const id = parseInt(req.params.id, 10);
  const { optimizedPrompt, refinedPrompt, projectContext } = req.body;
  const prompt = prompts.find(p => p.id === id);
  if (!prompt) return res.status(404).json({ error: 'prompt not found' });
  if (optimizedPrompt) prompt.optimizedPrompt = optimizedPrompt;
  if (refinedPrompt) prompt.refinedPrompt = refinedPrompt;
  if (projectContext) prompt.projectContext = projectContext;
  res.json(prompt);
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
