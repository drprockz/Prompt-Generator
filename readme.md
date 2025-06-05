# Prompt Generator Application

Develop a comprehensive prompt generator application that includes both frontend and backend functionalities within a single repository. This application is designed to transform raw, user-provided prompts into refined and optimized prompts suitable for various Large Language Models (LLMs) such as ChatGPT 4.1, v0, Gemini, and Deepseek.

## Core Features

1. **Raw Prompt Input**  
    Provide a text area or input field for users to enter their initial, unrefined prompts, specifically for software engineering tasks (e.g., building applications and websites).

2. **Prompt Refinement**  
    Automatically refactor raw prompts into grammatically correct and well-structured English.

3. **LLM Optimization**
    Optimize refined prompts so they are clear, concise, and formatted in a style that LLMs can easily interpret. The backend generates prompts using a short instructional template similar to the "v0" style.

4. **Project Context**  
    Allow users to define the context of their current software project (such as application type, technologies, or desired functionalities). The generator tailors prompts based on this context.

5. **Prompt History**  
    Maintain a history of generated prompts, enabling users to review, reuse, or modify previous prompts. Each prompt is associated with its project context.

6. **Prompt Editing**  
    Enable users to edit generated prompts for further refinement.

7. **New Prompt Generation**  
    Allow users to generate new prompts based on edited or original prompts, supporting iterative refinement.

---

The application should be efficient, scalable, and user-friendly. Use modern web development technologies for both frontend and backend to ensure optimal performance and maintainability. Structure the application for easy integration of new LLMs and features in the future.

## Running the application


1. Install dependencies for the backend and start the server. The backend also
   serves the static frontend files, so no separate web server is needed:


```bash
cd backend
npm install
npm start
```


The server listens on port `3001` by default and serves the frontend at
`http://localhost:3001/`.

2. Open `http://localhost:3001/` in your browser.

