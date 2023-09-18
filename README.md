# Musica Test app

In this test, I am required to build a simple application that displays tracks using the Deezer api

## Getting Started

1. Clone the repository

```bash
git clone https://github.com/bamoha/musica
```

2. Install dependencies

```bash
npm i
# or
yarn install
# or
pnpm install
```

3. Run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://127.0.0.1:5173/](http://127.0.0.1:5173/) with your browser to see the result.

## Deployment

The application is deployed to [https://musica-khaki-seven.vercel.app/](https://musica-khaki-seven.vercel.app/), visit with your browser to see the result.

## Stack

1. React
2. Chakra UI


1. I decided to build this application with react js because its fast to get started with and I am able to leverage on react's built in components.
2. I also decided to use Chakra UI, because its a UI component library and I am able to pick out some already styled components and give it my own style specifications.
3. I displayed the track list as a grid because it is visually easier to see in that format.
4. I made sure that the application is fully responsive.

- Home page: This page displays a search bar that enables you search for anything

- Artist page: This page displays the details of an artist. It also uses the id of the artist as a param such that if you share a link to the artist, the person that you share it to will see the details of the artist without having to search for him first

The project was bundled and created with Vite.
