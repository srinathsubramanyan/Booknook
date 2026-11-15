# Booknook

A private book club site for a small group of friends. It has a reading list with votes, recommendations, a swap shelf for lending books, and meetup planning with RSVPs.

Friends sign in with an email and password that you create for them. Only emails on your guest list can see anything, even if someone else managed to create an account.

The site is plain files that you host free, on either Firebase Hosting or GitHub Pages (you choose in Step 8). The shared data lives in Firebase (Google), on the free Spark plan, which needs no credit card and is far more than a book club uses. Setup takes about 25 minutes and needs no coding.

**What is in this folder**

- `index.html`: the whole app
- `config.js`: where you paste your Firebase settings
- `firestore.rules`: the security rules (who may read and change what)
- `firebase.json` and `.firebaserc`: only needed if you host on Firebase (Step 8, Option B)
- `README.md`: this guide

---

## Step 1. Create the Firebase project

1. Go to console.firebase.google.com and sign in with a Google account.
2. Choose **Create a project** (or **Add project**). Name it, for example, `booknook`. You can turn Google Analytics off.
3. Wait until it says your project is ready, then continue.

## Step 2. Turn on sign-in

1. In the left menu open **Build**, then **Authentication**, and press **Get started**.
2. Open the **Sign-in method** tab, choose **Email/Password**, switch on the first toggle (**Email/Password**, not "Email link") and press **Save**.

## Step 3. Create the database

1. In the left menu open **Build**, then **Firestore Database**, and press **Create database**.
2. Pick a location near you. For Perth, Sydney (`australia-southeast1`) is a good choice. You cannot change this later.
3. Choose **Start in production mode**, then **Create**.

## Step 4. Make the guest list

This list is what keeps the club private.

1. Still in **Firestore Database**, open the **Data** tab and press **Start collection**.
2. Collection ID: `config`. Press Next.
3. Document ID: `allowed`.
4. Add a field named `emails`. Set its type to **array**.
5. Add one item per person, type **string**, using each person's email **in lower case** (include yourself).
6. Press **Save**.

To add or remove someone later, open this document and edit the `emails` list.

## Step 5. Publish the security rules

1. In **Firestore Database**, open the **Rules** tab.
2. Delete everything in the box, paste in the full contents of `firestore.rules`, and press **Publish**.

If Firebase shows a red error instead, copy it and send it to Claude.

## Step 6. Add your friends' accounts

1. Open **Authentication**, then the **Users** tab, then **Add user**.
2. Enter their email and a temporary password, and press **Add user**. Do this for each person, including you. The emails must match the guest list from Step 4.
3. Send each person the site link (Step 8) and their temporary password in a private message.

Each person can set their own password: on the sign-in screen they enter their email and tap **Forgot password?**, and Firebase emails them a reset link (check spam). Once signed in, they can also change it from the member menu at the top right.

Optional extra lock: in **Authentication**, **Settings**, **User actions**, switch off **Enable create (sign-up)**. The guest list already protects your data, so this is just a second layer.

## Step 7. Connect the site to Firebase

1. Click the gear icon next to **Project Overview**, then **Project settings**.
2. On the **General** tab, scroll to **Your apps** and press the web icon `</>`.
3. Give the app a nickname (for example `booknook-web`). Leave Firebase Hosting unticked. Press **Register app**.
4. You will see a block of code containing `apiKey`, `authDomain`, `projectId` and `appId`.
5. Open `config.js` in any text editor and replace the four `YOUR-...` values with those. Keep the quotation marks. Save the file.

These values are meant to be visible in a website. The guest list and rules are what protect your data.

## Step 8. Put the site online

Choose one option. Both are free.

**Option A: GitHub Pages (all clicks, no terminal)**

1. Sign in at github.com and choose **New repository**. Name it something like `booknook`. Choose **Public** (free GitHub Pages needs this) and create it.
2. Choose **uploading an existing file**, drag in `index.html`, `config.js`, `firestore.rules` and `README.md`, and press **Commit changes**.
3. Open the repository's **Settings**, then **Pages**. Under **Build and deployment** choose **Deploy from a branch**, pick `main` and `/ (root)`, and press **Save**.
4. After a minute or two the page shows your link, which looks like `https://YOUR-NAME.github.io/booknook/`.
5. Open the link and sign in.

Because the repository is public, anyone could read the code. That is fine: it contains no secrets and no club data. Without an invited account a visitor sees only a sign-in box.

**Option B: Firebase Hosting (everything in one place, a few typed commands)**

You do not need GitHub at all with this option.

1. Install Node.js (the LTS version) from nodejs.org.
2. Open Terminal (Mac) or Command Prompt (Windows) and move into the folder that holds these files, for example `cd Downloads/booknook`.
3. Run `npm install -g firebase-tools`.
4. Run `firebase login` and sign in with the same Google account you used for Firebase.
5. Open `.firebaserc` in a text editor and replace `YOUR-PROJECT-ID` with your Firebase project ID (the same one you put in `config.js`). On a Mac, press Cmd+Shift+. in Finder to show hidden files like this one.
6. Run `firebase deploy`. This publishes the site and the security rules together. The database from Step 3 must already exist.
7. The command prints a Hosting URL ending in `.web.app`. That is your link.

To update the site later, change the files and run `firebase deploy` again.

## Step 9. Try it before inviting everyone

Sign in, pick your name, add a book, vote for it, offer a book on the Swap tab and plan a meetup. Then sign in as a second person on another phone or browser and check that you can see each other's changes appear straight away.

---

## Good to know

- **Opening the file directly will not work.** `index.html` has to be opened through the GitHub link, not by double-clicking it on your computer.
- **Who can change what:** people can remove only things they added. Anyone can vote, start or finish a book, ask to borrow a book, and reply to a meetup. Each person can only change their own votes, ratings and replies.
- **Updating the site:** with GitHub Pages, open `index.html` in your repository, press the pencil icon, paste the new version and commit. With Firebase Hosting, run `firebase deploy` again.
- **Your own address:** both GitHub Pages and Firebase Hosting let you attach a custom domain in their settings if you ever want one.
- **Backups:** Firebase can export your data from **Firestore Database**, but for a book club you are unlikely to need it.

## Troubleshooting

- **"Setup needed" on the sign-in page:** `config.js` still has the `YOUR-...` placeholders, or you have not uploaded the edited version.
- **"This account is not on the club guest list":** the email in Authentication does not match an entry in `config/allowed`. Check spelling and that it is lower case.
- **Sign-in says the details do not match:** check the email and password, or use **Forgot password?**.
- **An "unauthorized domain" error:** in **Authentication**, **Settings**, **Authorized domains**, add the address you host on (for GitHub Pages, `YOUR-NAME.github.io`). Firebase Hosting addresses are allowed automatically.
- **Blank page that stays on "Loading":** check your internet connection and that the files are in the main folder of the repository (or your deploy folder), not inside another folder.
- **Anything else:** send the exact message you see to Claude.
