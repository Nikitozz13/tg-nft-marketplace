
# Telegram Mini-App for NFT List

This project is a Telegram mini-app that allows authorized users to view a list of NFT items. The list is managed through a Notion page, and the application integrates the Notion API and TON HTTP-based APIs. The app is designed to be visually appealing, utilizing a clean and user-friendly interface with infinite scrolling for displaying NFT items.

## **Overview**

- **App Type**: Telegram Mini-App
- **User Authorization**: TON Connect (Authorization standard for TON)
- **Data Source**: Notion API (for managing NFT list) & TON HTTP-based APIs (for fetching on-chain data)
- **Pages**: 
  1. **Login Page**: Allows users to log in via TON Connect.
  2. **Home Page**: Displays the NFT items fetched from the Notion page and shows a list of cards with NFT data. The home page is only accessible to authorized users.

## **Prerequisites**

To run this project locally, ensure you have the following:

- **Node.js** installed (preferably version 14.x or higher)
- **Typescript** configured for the project
- **React/Node.js stack** (Can use your preferred framework like Next.js, Create React App, etc.)
- **Notion API** credentials (to fetch NFT data from your Notion page)
- **TON HTTP-based APIs** credentials (to fetch on-chain data)
- **TON Connect API** for user authentication

## **Installation**

Follow the steps below to set up the project locally:

### 1. Clone the repository

```bash
git clone https://github.com/your-repository-name.git
cd your-repository-name
```

### 2. Install dependencies

```bash
npm install
```

### 3. Set up environment variables

Create a `.env` file in the root directory and set the following environment variables:

```bash
NEXT_PUBLIC_MANIFEST_URL=your_tg_app_manifest_file
NOTION_API_KEY=your_notion_api_key
NOTION_DATABASE_ID=your_notion_database_id
```

Make sure to replace the placeholders with your actual API keys.

### 4. Run the app locally

Once you've set up your environment variables, you can start the development server:

```bash
pnpm run dev:https
```

Your app will be available at [https://localhost:3000](https://localhost:3000) in the browser.

If you want to launch the app in your Telegram Bot follow these steps:
- Create a new bot using BotFather
- Set up a menu button using ```/setmenubutton``` command for your bot and using https://127.0.0.1:3000 for the URL to be opened

### 5. Access the app

- The **Login Page** will prompt users to sign in via TON Connect.
- Upon successful login, users will be redirected to the **Home Page**, where they can view the NFT list.
- The NFT list will be fetched from the Notion page and displayed in cards. Initially, only the first 5 items will be shown, and the rest will be loaded dynamically using infinite scrolling.

## **Features**

### **Login Page**
- **TON Connect Authentication**: Allows users to sign in using their TON wallet.
- **Authorization Handling**: After successful authentication, the user is redirected to the home page.

### **Home Page**
- **NFT List**: Displays NFT items as cards. Each card will contain:
  - NFT image (if available)
  - NFT title
  - NFT description
  - Token friendly address (with the ability to copy the address)
  - Token raw address (with the ability to copy the address)
  - Token owner address (with the ability to copy the address)
- **Infinite Scroll**: Displays the first 5 items and dynamically loads more as the user scrolls down.

### **Integration with Notion API**
- The NFT items are fetched from a Notion table via the Notion API.
- Each NFT item will have an address, description, and other metadata, which is used to populate the cards.

### **Integration with TON HTTP APIs**
- Fetch on-chain data (such as token information) using the TON HTTP APIs.
- This is used to load additional data related to each NFT item.

## **How It Works**

1. **Login**: Users log in through the TON Connect authorization system.
2. **Fetch Data from Notion**: Once logged in, the app fetches the list of NFT items from the Notion table using the Notion API. Each item will contain metadata and other details that will be displayed in the app.
3. **Load More Data**: The first 5 NFT items are displayed, and additional items are loaded as the user scrolls down the page (infinite scroll).
4. **On-chain Data**: The app uses the TON HTTP APIs to retrieve on-chain data for the NFTs to show additional information like token balance, etc.

## **Technologies Used**

- **React** (for building the UI)
- **TypeScript** (for static typing)
- **Next.js** (for server-side rendering and static page generation)
- **Notion API** (for managing content)
- **TON HTTP APIs** (for on-chain data retrieval)
- **TON Connect** (for user authentication)
- **Tailwind CSS** (for styling the app)

## **License**

This project is licensed under the MIT License.
