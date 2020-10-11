# Summer-i-ser

![HackMD documents](https://hackmd.io/badge.svg)

> "Perhaps the best test of a man's intelligence is his capacity for making a summary." - Lytton Strachey, English writer and critic. 

***Summer-i-ser* is a discord-bot that summaries conversations and records them for future use.**

This project is [our](#Members) official submission to Hack@Home under web-based applications category. A published version of this README is also available [here](https://hackmd.io/@banrovegrie/BJKLiOlPP).

## Table of Contents

- [About](#About)
- [Members](#Members)
- [Basic Working Version](#Basic-Working-Version)
    - Features
    - Pre-requisites
    - Getting Started
    - Implementation
    - Project Structure
- [Further Development](#Further-Development)
- [License](LICENSE)

<!--I will remove the current o's later as we complete them-->

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

<!--The current implementation is majorly based on python. We have used ...
For a detailed description regarding the current implementation check [this](#Implementation).
(lot more to add)-->

### Automated Chat Summarization

Automated-summarization of text has been applied to quite a lot of genres including varities of articles, scientific papers and blogs.

However, when compared to the above examples, very little work has been done in the field of chat summarization. This is because there are several problems associated with it due to fact that chats are inherently noisy, unstructured, informal and involves frequent shifts in topic.

Our current working version uses a basic **cosine-similarity model** to generate a unique set of words (keywords) and thus use these keywords to evaluate the given data set of chats and return only *most unique sentences* as a part of the summary. This basic summarization is effectively extractive by nature. For a detailed description on implementation of this model, look [here](#Implementation).

Our further plan involves using more accurate and sophisticated algorithms for the purpose of summarization. We have explained our proposed model in [further developments](#Further-Development).

## Members

The team involved in the project comprises of [Kunwar Shaanjeet Singh Grover](https://github.com/Groverkss), [Vishva Saravanan](https://github.com/v15hv4), [Mayank Goel](https://github.com/MayankGoel28) and [Alapan Chaudhuri](https://github.com/banrovegrie), respectively.
