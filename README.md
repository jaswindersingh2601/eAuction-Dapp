# GoBid - Online Auction Platform

#### It is decentralized Online Auction platform built on the top of Ethereum Blockchain. It provides blockchain security over the bidding process and removes the third party in the online bidding system and provides trust and transparency to the users. All the functionalities are defined the Smart Contract which is written in the solidity.

## Build with
![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)  ![Web3.js](https://img.shields.io/badge/web3.js-F16822?style=for-the-badge&logo=web3.js&logoColor=white)  ![Solidity](https://img.shields.io/badge/Solidity-%23363636.svg?style=for-the-badge&logo=solidity&logoColor=white)

## Key Features
- Users can place bid in Ether by connecting their blockchain address with wallet. As bid is placed the amount is deducted from the account.
- Users have to join auction before place bid, Otherwise bid will not be placed.
- Any user can create auction who want to set his product for auction
- Users and auctioneer can see what is the highest Bid and who is the winner at current time.
- Winner should confirm the product is delivered to him, then his bidding amount will send to auctioneer account. Otherwise the amount will remain in the contract balance. This add more security and trust to the application.

## Screenshots

- #### All Auctions page
  ![image](https://user-images.githubusercontent.com/101857182/212639931-24f31307-aeb7-4767-9747-a4b355d8aa7e.png)
  ![image](https://user-images.githubusercontent.com/101857182/212640926-8ac86293-3d48-4972-9e6f-4ff492594f27.png)
- #### View Auctions page
  - For bidder
  ![image](https://user-images.githubusercontent.com/101857182/212641408-2bf5a24a-e082-4139-8537-f10c4575c886.png)
  
  - For auctioneer
  ![image](https://user-images.githubusercontent.com/101857182/212641950-6305c06e-43d1-48e9-ba76-d5273cc8cee5.png)
- #### Create Auction page
  ![image](https://user-images.githubusercontent.com/101857182/212643060-1fef316f-cd2e-4d29-ba45-12906442dc9a.png)
- #### Your Auction page
  - Here current address participated and created auctions will be shown based on upcoming, ongoing and ended section.
  ![image](https://user-images.githubusercontent.com/101857182/212642907-dc9b8748-5532-40e4-8184-f03a0fead3c7.png)

## 🤖 Installation Guidelines

### 👇 Prerequisites

Before installation, please make sure you have already installed the following tools:

- [Git](https://git-scm.com/downloads)
- [Nodejs](https://nodejs.org/en/download/)
- [Ganache](https://trufflesuite.com/ganache/)

### 🛠 Installation Steps

1. Clone this repo `https://github.com/jaswindersingh2601/eAuction-Dapp.git`
2. Go to cloned project directory, type`cd client` press enter and then run `npm install` in the terminal.
3. Now in the root of the project run `npm i -g truffle` in terminal
4. Create a new project in ganache setup port, host, and current project truffle-config.js file by importing the project in ganache.
5. Add the Same port and host in the truffle-configfile as added in the ganache project.
6. Run truffle migrate --reset at root project level in cmd or in the shell.
7. Open the ganache project and in see in the contract tab where the contract is deployed, then copy the address of Auction Factory contract.
8. Pick deployed contract address and update `const factoryAddress` with picked address in `./client/src/ABI.js` file.
9. Connect or import opened ganache project addresses to the browser by meta mask wallet.
10. now in terminal make sure you are in client folder and run `npm start`

Now you will see the application at localhost:3000.

> If you are new to Git and GitHub then must check out **[git-github-practice](https://github.com/CryptoverseWeb3/git-github-practice)** repository **first** and contribute to it before you contributing to other open-source projects. 
  
