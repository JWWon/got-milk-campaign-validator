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
2. Add `.env.local` and fill out secrets (see `/@types/env.d.ts` how it uses environment variables)
   ```bash
   # Required
   NEXT_PUBLIC_TWELVE_LABS_API_KEY="YOUR_TWELVE_LABS_API_KEY"
   NEXT_PUBLIC_TWELVE_LABS_API_URL="https://api.twelvelabs.io/v1.2"
   # Optional
   NEXT_PUBLIC_GENERATE_HASHTAGS_PROMPT="DEFAULT_PROMPT_FOR_GENERATE_HASHTAG"
   NEXT_PUBLIC_VIDEO_VALIDATE_PROMPT="DEFAULT_PROMPT_FOR_VALIDATE_VIDEO"
   NEXT_PUBLIC_VIDEO_VALIDATE_QUERIES="DEFAULT_QUERIES_FOR_VALIDATE_VIDEO" # Use comma(,) to separate queries
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

## Features

### 1. Validate video based on search queries or generate prompt

> See [validateVideo](https://github.com/JWWon/got-milk-campaign-validator/blob/main/app/_components/VideoValidator/_actions/validateVideo.ts) server action to check the actual implementation.

It shows `Matched` or `Not matched` status with its reason as tooltip if the validation completed.

- For search queries, it validates video by checking if all queries are matched with `high` confidence.
- For generate, it validates video based on prompt and engineered to return in object format.

Currently, it triggered only when user click `Validate` button on right section. But in real scenario, it can be automated by triggering after indexing is completed.

> Check [webhook](https://docs.twelvelabs.io/docs/webhooks) docs to listen indexing done event on server

### 2. Generate hashtags on both autogen and custom

> See [generateGist](https://github.com/JWWon/got-milk-campaign-validator/blob/main/app/_components/VideoValidator/_actions/generateGist.ts) server action to check the actual implementation for generating custom hashtags.

It generates hashtags that represents central theme of the video on both automated and custom way.

- For generating hashtags with predefined configurations, it uses [[POST] /gist](https://docs.twelvelabs.io/reference/generate-gist).
- For custom hashtags, it defines how to describe theme with engineered to return in array format of hashtags.
