# Pinax

Pinax is a personal website built with Next.js and Tailwind CSS. It features a responsive grid layout, a dark mode,
and a custom theme system. The website is hosted on Vercel and uses the Vercel Git Integration to automatically
deploy new commits to the website.

It's a work in progress, so expect some rough edges and bugs. If you find any, please feel free to open an issue or
submit a pull request.

## Setup

1. Clone the repository and install the dependencies:

```bash
git clone https://github.com/JasonLovesDoggo/Pinax.git
cd Pinax
bun install
```

2. Create a new file called `.env` in the root directory and add the following variables:

```bash
SPOTIFY_CLIENT_ID=your_spotify_client_id
SPOTIFY_CLIENT_SECRET=your_spotify_client_secret
```

You can get these values from the [spotify developer dashboard](https://developer.spotify.com/dashboard/).

3. Run the development server:

```bash
bun dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser to view the website.
