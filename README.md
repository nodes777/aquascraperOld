# Aquascraper

This branch provides a node wrapper to schedule from on heroku. It has a setInterval timed to fire every 24 hours.

[Notes on this branch and why it was needed](https://medium.com/@Tnodes/deploying-my-javascript-scraper-finally-cf13f3a80969)

Create a Procfile:
worker: node nodescrapestarter.js

Scale a worker:
heroku ps:scale worker=1

