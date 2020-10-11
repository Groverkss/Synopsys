# Synopsys 

> "Perhaps the best test of a man's intelligence is his capacity for making a summary." - Lytton Strachey, English writer and critic. 

**Synopsys** is a discord-bot that summaries conversations and records them for future use. 

A published version of this README is also available [here](https://hackmd.io/@banrovegrie/BJKLiOlPP). Use [this link](https://summer-iser.web.app/) to checkout the demo webapp. Checkout [this video](https://youtu.be/BpNmr4FwLCQ) for a working demo. 

So, go ahead! Use Synopsis to **find your TL;DRs**.

## Table of Contents

- [About](#About)
    - [Our Idea](#Our-Idea)
    - [Technologies Involved](#Technologies-Involved)
    - [Automated Chat Summarization](#Automated-Chat-Summarization) 
- [Members](#Members)
- [Basic Working Version](#Basic-Working-Version)
    - [Features](#Features)
    - [Installation](#Installation)
    - [Implementation](#Implementation)
- [Further Ideas](#Further-Ideas)
- [License](LICENSE)

## About

### Introduction

Today, especially when the world lies in the grasps of the Corona-virus, a considerable chunk of information exchange happens in the form of **online chat conversations**.

Such conversations involve a substantial amount of participants and a single conversation tends to span a wide range of topics interspersed with irrelevant segments. This results in the necessity of having proper **summarization**, so that people who were not present during a long (not necessarily coherent) conversation need not read through the big chain of chats to follow-up on it and can rather read a summary of the same, thus saving a lot of time.

This calls for summarization algorithms that work on scraped data from chat services and yield a summary as required.

### About Discord

Among the several instant messaging platforms available, **Discord** is one of the most popular ones. Because of its several innovative features like server-channel systems, awesome call quality, permission management and tools to integrate bots, Discord has become a major platform for people to collaborate, converse and share ideas.

<img src="https://cdn.discordapp.com/attachments/759735584444121110/764862917803769876/unknown.png">

### Our Idea

In this project, we aim to make a **Discord bot** that effectively *summarizes* conversations and allows the user to keep a *record* of these summaries on a dedicated website.

This not only allows the user to obtain a **automated-summary** of any given chain of chats, but also allows the user to have easy access to these stored summaries for future reference.

### Technologies Involved

- Python 3
- Firebase and Firestore 
- Google Cloud for hosting the bot on a virtual machine
- `Discord.py` for functionality of discord bot
- React for creating the frontend interface

For a detailed description regarding the current implementation check [this](#Implementation).

### Automated Chat Summarization

Automated-summarization of text has been applied to quite a lot of genres including varities of articles, scientific papers and blogs.

However, when compared to the above examples, very little work has been done in the field of chat summarization. This is because there are several problems associated with it due to fact that chats are inherently noisy, unstructured, informal and involves frequent shifts in topic.

Our current working version uses a basic **cosine-similarity model** to generate a unique set of words (keywords) and thus use these keywords to evaluate the given data set of chats and return only *most unique sentences* as a part of the summary. This basic summarization is extractive by nature. For a detailed description on implementation of this model, look [here](#Implementation).

In [Further Ideas](#Further-Ideas), we also attempt at constructing a better summarization algorithm, based on present research on the topic.

## Members

The team involved in the project comprises of [Kunwar Shaanjeet Singh Grover](https://github.com/Groverkss), [Vishva Saravanan](https://github.com/v15hv4), [Mayank Goel](https://github.com/MayankGoel28) and [Alapan Chaudhuri](https://github.com/banrovegrie), respectively.

# Basic Working Version

### Features

- Easy to use conversation summerisation based on discord messages
- Sick of scrolling back thousands of messages to get an important conversation you had? Record the conversation and review it again anytime the webinterface which gives a summary of the conversation as well as the keywords.
- Can be added to any required server

## Installation

:warning: **This project uses Python 3**: Usage of Python 2 may have varying effect

- Create a virtual environment and install dependencies:

    ```python
    $ python3 -m venv .env
    $ . .env/bin/activate
    $ pip3 install -r requirements.txt
    ```

- Install the nltk corpus required:

    ```python
    $ python3 nltkmodules.py
    ```

- Export the required environment variables:

    ```bash
    $ export BOT_TOKEN="TOKEN_FOR_DISCORD_BOT"
    $ export BOT_PREFIX="PREFIX_FOR_BOT"
    ```

- Run the bot:

    ```python
    python3 main.py
    ```

To add the record functionality, you need to connect the bot to a firestore database. Place the serviceAccount.json as firestore/secret.json. This allows the bot to use the record functionality to record database on the corresponding firestore database.

<!-- Vishva instructions -->

## Implementation

### Extracting Data

The discord bot works by obtaining all the messages between the given starting message id and the ending message id. The bot then uses the text summarizer we built and obtains keywords and a short summary.

<img src="https://cdn.discordapp.com/attachments/759735584444121110/764909034296836096/unknown.png">

### Text Summarization

The text summarizer works on the mathematical principle of cosine similarity for non-zero vectors.

For this, we have represented each line as a vector, of unique words, quantifying it on basis of how "important" or frequent it is, and this idea is done using a graph-based TextRank algorithm on the similarity matrix generated on the above vectors. 

<img src="https://cdn.discordapp.com/attachments/702963059764887656/764891735427514378/unknown.png">

Additional challenges were cleaning and parsing the data to include only relevant keywords, and this involved removal of stopwords and manual addition of common words. Additionally, discord usernames and other special characters like emojis were removed. 

The summarizer also outputs a list of keywords, on basis of frequency. This list is also cleaned for stopwords and other common words that do not convey the meaning of a sentence.

### Web

The output (after text summarization) is then stored on a Firebase (Firestore) database, which is exposed by a ReactJS app. 

The webapp allows to view the recordings anytime with a summary and keywords.

<img src="https://cdn.discordapp.com/attachments/759735584444121110/764907717327847444/unknown.png">

<img src="https://cdn.discordapp.com/attachments/759735584444121110/764907662344847400/unknown.png">

The following image shows the original conversation thread for the above attached image of summary.

<img src="https://cdn.discordapp.com/attachments/759735584444121110/764908497233379388/unknown.png">

Link to the mentioned web-app: [Synopsis App](https://summer-iser.web.app/).

## Further Ideas

Now that we have explained how our working version deals with summarization, we would like to elaborate upon how we plan to **better the summarization algorithm**.

Given, a conversation as data-set in the form of a series of chats, we shall first remove noise in the form of spelling errors and use text segmentation to formalize the chats to some extent.

Then, we differentiate chunks of conversation using topic modeling and then using similarity-index upon the few sets of topics to segregate the large chunk of chats.

Once we have identified the primary topic (**tag**) of a certain series of chats, we build a semantic space of words. With the help of a co-occurrence **HAL** model, we use the given space we calculate cumulative scores of sentences. Using these scores, we include sentences and generate required summary.
