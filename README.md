# Nostalgiafy
Heroku Link: https://nostalgiafy.herokuapp.com/
---
## Project Brief
We were given one week to create MERN stack app.

## Conception
The idea to do an app that allows a user to search for music based on an era in the user's life (such as their 20s or university) came to me quite quickly but I wasn't sure if it would be possible in the time frame.

I started by researching the necessary APIs to get the data I would need. Figuring out a way to get the music data for each year proved the most difficult. Wikipedia seemed like a good source but it took some time to find annual pages about music that were formatted in the same manner. Then I had to decide which source to use to provide the music to the user. I decided on the YouTube API to populate iframes on the site for MVP with the option to extend the functionality to allow user's to create playlists straight on to their YouTube channel.

## Design Phase
I wireframed my project briefly, spending most of my time on the new playlist page. To go with the nostalgia theme I wanted the lists of songs to feel like a jukebox and therefore I had a neon light effect on my page titles and menu links.

<img width="600" alt="screen shot 2018-04-26 at 4 59 36 pm" src="https://user-images.githubusercontent.com/31917459/39317338-3e57913c-4973-11e8-9cbd-0ed7185b4cfc.png">
<img width="600" alt="screen shot 2018-04-15 at 5 29 45 pm" src="https://user-images.githubusercontent.com/31917459/39317341-3fe4c5b0-4973-11e8-8a01-ae6f42ae2cdd.png">

Initially, I had to use a picture of a record for the background of the tracks as I could not find a way to fetch the album artwork for the songs but I am currently working on a solution to save the song data along with their album artwork (if it is retrievable from wikipedia) to my database.

<img width="600" alt="screen shot 2018-04-26 at 4 38 34 pm" src="https://user-images.githubusercontent.com/31917459/39317454-87386818-4973-11e8-878f-d8c598f58c78.png">

## Build Process
In my previous projects I had struggled in the first few days due to scope creep on my MVP so for this project I started with a clear idea of what that would look like. My MVP was simply the ability for user's to register with the site and create playlists using Wikipedia data and iframes populated using the YouTube API.

The majority of my time on this project was spent manipulating data retrieved from APIs. Without the data from Wikipedia the MVP would not be achievable so I didn't build out the front end nor the user resource until I had that working. Once this was done I added the YouTube API and finally built out the user resource and the rest of the frontend.

Once I had reached MVP I added the ability to create YouTube playlists from the website and continued to work on the visual design.


## Wins
I initially struggled with the amount of regex needed to parse the Wikipedia data for the song titles and artists. I received a lot of very helpful guidance from our instructor and have since managed to implement further functionality using similar regex by myself. It also taught me a lot about how to debug these kinds of functions in the terminal which allowed me to breakdown the problem into manageable parts on my own.

## Blockers
Once I had the Google OAuth and YouTube API playlist creation working I realized that for larger playlists it was not adding all the songs to the YouTube playlists. The problem was that it could not handle all of the requests to add playlist items at once so it was only managing to create a few. I could not find a way around this so I spoke to my instructor who suggested I try recursive promises. Whilst this was difficult to implement it was very helpful as I had come across the idea of recursive functions in the past but had never fully understood them as I had not used them in practice before.

## Going Forward
This was my favorite project at General Assembly and there is a lot I would like to add to it. I am already in the process of retrieving the album artwork to save in the database long with the song data but I would also like to add the Spotify API so that user's have the option to create playlists there as well as on YouTube.


## Instructions
- Clone or download the repo
- Install dependencies with `yarn install` or `npm install`
- Start the local MongoDB server in Node.js with `mongod`
- Launch the app with `yarn start:server` and `yarn start:client`
