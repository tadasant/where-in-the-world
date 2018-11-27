# Where in the World?

Grand prize winning submission at the [freeCodeCamp/Netlify JAMstack Hackathon 2018](https://hackathon.freecodecamp.org/) by team Where In The World ([Jeff Appareti](https://github.com/jappareti), [Tyler Vick](https://github.com/tjvick), [Gabe Greenfield](https://github.com/gaberoo322), and [Tadas Antanavicius](https://github.com/tadasant)).

**We've made changes to the project since the hackathon**. View the original submission on the [`original-hackathon-submission`](https://github.com/tadasant/where-in-the-world/tree/original-hackathon-submission) branch

# Overview

[Where in the World](https://witworld.live) is a real-time game show application built on the [JAMstack](https://jamstack.org/). Its mission is two-pronged:

1) Show off the power of JAMstack
2) Show off the world

We think we hit goal #1: who knew a hacked-together static site could play host to a massive, real-time interactive game?

Goal #2 is within sight, but more work needs to be done.

Are you interested in seeing this app go somewhere? Let us know by Watching and Starring this repository.

# How do I play?

With the infrastructure we have set up, there can only be one game (hence the live, real-time Trivia HQ-like experience) going on at a time.

If you visit [witworld.live](https://witworld.live), you'll see one of the following screens:

1. "Please wait while we prepare you a game..." - You're in the player lobby, waiting for a game
2. "Where in the world is this photo" - You're in the middle of a game - act quickly!
3. "Game results" - The prior game has ended, and you're viewing the results

# Running a game

Start by initiating the player lobby if it is not yet initiated. To do so:

* If it's in the middle of a game, let it finish (games are only 30 seconds long)
* If you see the results screen, click this [Finish Game](https://witworld.live/.netlify/functions/killGames) endpoint to initiate the next game's lobby

Next, we need to kick off a game. Keep in mind, if you happen to be doing this process at the same time as someone else, you'll be in the same game -- the more, the merrier! To get started:

* Scroll down to the [admin panel](https://github.com/tadasant/where-in-the-world#admin-panel) section
* Choose one of the games to play (each game is associated with a particular image)
* There's more than 4; consider choosing a random one!

Then it's gametime!

Lastly, don't forget to click [Finish Game](https://witworld.live/.netlify/functions/killGames) when you're done.

# How it works

In a simplified nutshell, here's the flow of the game:

1. Clicking "Finish Game" invokes a Netlify Function that calls on our Hasura instance (hosted on Heroku) to move all the ongoing games (should be at most 1) in our database to "finished" state.
2. Clicking one of the "Start Game" links in the [admin panel](https://github.com/tadasant/where-in-the-world#admin-panel) kicks off a Netlify Function that also calls on Hasura: move ongoing games to "finished" state + set a new game to "live" state  
3. At this point, there's a live game. The client-side React code is connected to our Hasura instance via GraphQL subscriptions, and the logic is such that this shift to a "live" game will automatically throw all the clients into this "live" game
4. The # of live players in the top left of the UI also uses a subscription to stay updated. Our code assumes any player who has initially loaded the app in the past 5 minutes to be "live".
5. Each player's guess input is sent to a Netlify Function, which transforms it into a score, and pushes it back out to Hasura
6. The results page is built on yet another subscription, and paints the guesses as they come in

# Observations

The code in this repository is hackathon code! It works, but please please do not reference it when writing real production code. Best practices were not observed, and even the code indentation is at times entirely sloppy.

The performance bottleneck on the app is likely the number of GraphQL subscriptions that the Heroku free tier can support. Each player has to maintain that websocket connection for the game to appear "live" for everyone. We suspect we would run into issues at somewhere between 100-200 players - and we don't think the code would fail gracefully.  

# Admin Panel

Use these links to manage the game:

## [Start Game 1](https://witworld.live/.netlify/functions/runGameWrapper?idx=0)

## [Start Game 2](https://witworld.live/.netlify/functions/runGameWrapper?idx=1)

## [Start Game 3](https://witworld.live/.netlify/functions/runGameWrapper?idx=2)

## [Start Game 4](https://witworld.live/.netlify/functions/runGameWrapper?idx=3)

## [Start Random Game!](https://witworld.live/.netlify/functions/runGameWrapper)

## [Finish Game](https://witworld.live/.netlify/functions/killGames)

# Future plans

The team was thrilled with how much everyone loved the game and the level of interest in the details of how we made it work. We're hoping to do a little bit of work on it as an open source side project to make it live on.

As noted above -- If you're interested in seeing this app go somewhere, let us know by Watching and Starring this repository.
