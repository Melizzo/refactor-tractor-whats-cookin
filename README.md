# Refactor Tractor - What's Cookin

A Mod 2, group project that simulates an food-based website that allows a user to be able to save recipes, add recipes to cook, and search/filter recipes by tags and keywords. 

The details of this project are outline in [this project spec](https://frontend.turing.io/projects/module-2/refactor-tractor-wc.html).

## Clone This Repo

That's right, _clone_ not fork. You will use this repo multiple times, but you can only fork a repository once. So here is what you need to do to clone the repo and still be able to push changes to your repo:

1. Clone down this repo. Since you don't want to name your project "webpack-starter-kit", you can use an optional argument when you run `git clone` (you replace the `[...]` with the terminal command arguments): `git clone [remote-address] [what you want to name the repo]`
1. Remove the default remote: `git remote rm origin` (notice that `git remote -v` not gives you back nothing)
1. Create a new repo on GitHub with the name of `[what you want to name the repo]` to be consistent with naming
1. Copy the address that you would use to clone down this repo - something like `git@github.com:...`
1. Add this remote to your cloned down repo: `git remote add origin [address you copied in the previous step]` - do not include the brackets

Now try to commit something and push it up to your new repo. If everything is setup correctly, you should see the changes on GitHub.

## Setup

After one person has gone through the steps of cloning down this repo and editing the remote, everyone should clone down the repo. 

Then install the library dependencies. Run:

```bash
npm install
```

To verify that it is setup correctly, run `npm start` in your terminal. Go to `http://localhost:8080/` and you should see a page that displays the what's cookin' page, with a random user on start. 

## Learning Goals

1. Utulize APIs 
2. Utulize Fetch: get & post
3. Testing all files, including sad paths
4. Testing with Chai Spies
4. SRP and DRY code
5. Create a DomUpdates file to handle dom changes
5. Work remotely to ensure a successful project. 

## Contributors

* **[Jeremiah Black](https://github.com/jeremiahblakol)**
* **[Melissa VanKempen](https://github.com/Melizzo)**
* **[Bill Wilke](https://github.com/billwilke42)**
