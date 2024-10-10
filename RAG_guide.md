# Basic RAG Implementation

## What is RAG?

Let's start by comparing LLMs and RAG.

LLMs are large language models. They are well known for their ability to understand and respond with human-like text.
One simple way to explain how they work is:
- First, they collect vast amounts of data, such as books, webpages, and other sources.
- Then, highly powerful and energy-intensive computer models are trained on this data to recognize patterns and relationships between words and phrases.
- Finally, these models are fine-tuned to perform tasks like summarizing text, answering questions, or generating new content.

RAG stands for Retrieval Augmented Generation. RAG generally operate on top of LLMs, with a few key differences:
- Instead of training on a massive dataset, RAG uses datasets that are specifically relevant to the task at hand.
- When a query is given, it looks through the dataset to find the most relevant information.
- Only after the relevant information is found does it generate a response.

Both methods have pros and cons.
LLMs like ChatGPT are great for quick, general tasks. The chatbot interface provides user-tailored responses for a huge variety of topics. Though infrequent, they can be less accurate for specific, niche tasks and struggle with identifying where they got their information from. Also, unless tuned, they often not consistent in their responses.

RAG is better for tasks that require a high level of accuracy and relevance. A common use case is a chatbot for say, a mid-sized company's customer service and experience. The process would go as follows: An out-of-the-box LLM is provided with many documents relevant to the company's Customer support, hopefully with the documents secure. Using RAG, each time the chatbot is queried, it will search through the documents to find the most relevant information, and tailor the response to the user's query. This solution works much better than a base LLM for this use case. Some downsides of RAG are: the data needs to be relevant and updated frequently; it also requires more computational power (compared to LLMs) to process the data and run the model. More planning in general is required. More work has to be done to ensure the data is secure and the model is robust. For many business use cases, RAG's downsides are often worth it because it provides a more tailored and accurate experience for the user, while also keeping internal data more secure.

I will demonstrate a basic RAG implementation to help demystify what it is and how it works.

## About the Example
The purpose of the example chatbot is to offer several different learning approaches for the user to learn new topics or reinforce what they already know. The options will be:
- Simulation - creates fictional scenarios about the given topic
- TeachMe - user tutors the chatbot on the given topic by roleplaying as a curious student
- CoCreate - works with the user to refine case studies based on the given topic 
- AITutor - tutors you about the given topic using examples and questions

The idea for this project was inspired by an academic paper called Instructors as Innovators. This RAG implemntation will use the paper as the document to be retrieved, where it will be used to tailor its responses based on the selected approach.

## What's needed?

### Access to a LLM

This implementation will use the [embeddings](https://platform.openai.com/docs/api-reference/embeddings) and [completions](https://platform.openai.com/docs/api-reference/completions) endpoints from OpenAI. One API key is needed, which can be found by creating and account and going to [api keys](https://platform.openai.com/account/api-keys).

### Document for retrieval

The paper is free to view [here](https://ssrn.com/abstract=4802463).

### Simple User Interface and Prompting

First, the user is asked to choose from the four learning approaches. Once chosen, the user is prompted to choose a topic. Each approach has a different set of prompts before executing the learning experience. There's also basic functionality to save and load conversations.

## How to implement

### Step 1: Embed the documents

The simplest way I could find to prepare the document is by storing it in a JSON file, labeling the content as a single section.

Once it's stored, send the file to the OpenAI embeddings endpoint. This endpoint returns a vector embedding for the text. This embedding is a representation of the text in a numerical format that can be will be used by the LLM to find the most relevant information.

```javascript
const response = await openai.embeddings.create({
  input: text,
  model: 'text-embedding-3-small'
});
```

### Step 2: Create a retrieval function

This function operates in three steps: first, it sends the user input to the OpenAI embeddings endpoint to generate a numerical representation of the text; next, it compares that embedding with pre-embedded sections to identify the most relevant ones; finally, it sends both the most relevant sections and the user input to the LLM for processing.

```javascript
async function retrieveRelevantSections(query, embeddedSections, topK = 3) {
  const queryEmbedding = await getEmbedding(query);
  const scoredSections = embeddedSections.map(section => ({
    ...section,
    score: cosineSimilarity(queryEmbedding, section.embedding)
  }));
  scoredSections.sort((a, b) => b.score - a.score);
  return scoredSections.slice(0, topK);
}
```

Cosine Similarity identifies the most relevant sections by calculating the numerical similarity between the user input and the embedded sections.

### Step 3: Integrate the retrieval function into the chatbot

## Citations

Mollick, Ethan R. and Mollick, Lilach, Instructors as Innovators: a Future-focused Approach to New AI Learning Opportunities, With Prompts (April 22, 2024). The Wharton School Research Paper, Available at SSRN: https://ssrn.com/abstract=4802463 or http://dx.doi.org/10.2139/ssrn.4802463 