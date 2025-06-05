
// When served from the backend express app the same origin is used
const apiBase = '';


async function fetchHistory() {
    const res = await fetch(apiBase + '/prompts');
    const data = await res.json();
    const history = document.getElementById('history');
    history.innerHTML = '';
    data.forEach(p => {
        const li = document.createElement('li');
        li.textContent = `${p.optimizedPrompt}`;
        history.appendChild(li);
    });
}

document.getElementById('generate').addEventListener('click', async () => {
    const raw = document.getElementById('raw').value;
    const context = document.getElementById('context').value;
    const res = await fetch(apiBase + '/prompts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ rawPrompt: raw, projectContext: context })
    });
    const data = await res.json();
    document.getElementById('refined').value = data.refinedPrompt;
    document.getElementById('optimized').value = data.optimizedPrompt;
    fetchHistory();
});

document.getElementById('save').addEventListener('click', async () => {
    const optimized = document.getElementById('optimized').value;
    const refined = document.getElementById('refined').value;
    const res = await fetch(apiBase + '/prompts');
    const data = await res.json();
    if (data.length === 0) return;
    const latest = data[data.length - 1];
    await fetch(apiBase + '/prompts/' + latest.id, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ optimizedPrompt: optimized, refinedPrompt: refined })
    });
    fetchHistory();
});

fetchHistory();
