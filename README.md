Automatic video validator demo for "Got Milk" campaign

## Getting Started

### Prerequisites

#### 1. Install [pnpm](https://pnpm.io/)

> Follow the guide on [official installation docs](https://pnpm.io/ko/installation)

```bash
# This guideline is for mac users
curl -fsSL https://get.pnpm.io/install.sh | sh -
brew install corepack
corepack enable pnpm
```

If you want to use other package manager like `yarn` or `npm`, you can still use them. But using pnpm is recommended.

#### 2. `[Optional]` Setup [vercel cli](https://vercel.com/docs/cli#installing-vercel-cli)

> This project is dependent on pulling secret keys on runtime from Vercel server.

```bash
pnpm -i g vercel
vercel login # This command will automatically connecting local environment with your vercel project
```

If you don't want to use Vercel for rolling out on your local environment, you can still run without Vercel by following steps below.

1. Delete `predev` script from `package.json`
   ```diff
   {
     ...
     "scripts": {
   -   "predev": "vercel env pull"
       ...
     },
     ...
   }
   ```
2. Add `.env.local` and fill out secrets
   ```bash
   NEXT_PUBLIC_TWELVE_LABS_API_KEY="YOUR_TWELVE_LABS_API_KEY"
   ```

### Commands

```bash
# Install packages
pnpm i

# Run dev server
pnpm dev
```

### Deploy

This project is in PoC step, so it leverages Vercel for hosting. But it can be bootstrapped in any environments later on.

## Learn More

### Features

> TBD
