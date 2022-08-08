# Clover

Welcome to the repository for the Clover music bot! This bot is mostly complete, but still under active development in my free time.

## How to Invite

Short answer: **you can't**.

Long answer: In order to keep this bot 100% free and in compliance with YouTube's terms of service, this bot _requires_ that you host it yourself. That means you'll have to follow the steps found in the [Hosting](#hosting) section or in other online guides in order to get this thing working. Please do not mass distribute this bot for these same reasons. This bot works through YouTube, just as Groovy and Rythm did, and I do not want Clover to meet the same fate.

## Hosting

These steps will help you get this bot up and running.

Pre-requisites:

- A hosting solution

  - Some common options are [Heroku](https://www.heroku.com/), [DigitalOcean](https://www.digitalocean.com/), or [Linode](https://www.linode.com/). If you have an old PC/laptop you don't use anymore, you can just use that. If you're a little more tech-savvy, you can follow [this guide](https://blogs.oracle.com/developers/post/how-to-set-up-and-run-a-really-powerful-free-minecraft-server-in-the-cloud#connect-to-the-running-vm-in-the-cloud) (up to the _Connect to the Running VM in the Cloud_ step) for help with setting up an Oracle Cloud VM that you can use to host this bot (this is what I do). The most important thing here is that you don't use your own PC/laptop to host this bot. It'll eat up your bandwidth and resources.

- [Node.js](https://nodejs.org/en/) (LTS is recommended, although Current _should_ work)
- A [Discord Developer account](https://discordapp.com/developers/applications/)

  - Follow the link and sign in with your Discord account.

Once you've taken care of the above pre-requisites on whatever hosting solution you use, you can follow the steps below for self-hosting. If you're using a hosting solution, follow their instructions for running a NodeJS server.

- Download this repo
  - Click the "Code" button near the top right and select "Download as ZIP" (you can also clone/fork this repo if you prefer)
- If you downloaded as a ZIP, extract it somewhere you will remember.
- If you're on Windows, double-click on `run.bat` in the extracted folder. If you're on Mac/Linux, use `run.sh` instead.
