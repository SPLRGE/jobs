![splrge banner](https://s3.splrge.dev/assets/brand/logo_white_3_1.png)

# Open positions @ SPLRGE ⭐

## Description
Cloned from [SPLRGE/vexa-jobs](https://github.com/splrge/vexa-jobs). Adapted for SPLRGE by dev team.
SPLRGE Jobs allows users to see the jobs available at [SPLRGE](https://splrge.dev). By clicking on a button, they are redirected to a form (Google Forms, Office Forms, ...) to apply.
The site's dashboard lets you read, create, modify and delete users, positions and categories.

## Installation

1. Clone the repository
2. Install the dependencies

```bash
npm install
```

3. Copy `.env.example` to `.env` and fill in the variables
4. Run the server

```bash
npm run dev
```

## Database migration

Generate a new migration

```bash
pnpm run migrate:generate
```

Run the migrations

```bash
pnpm run migrate:deploy
```

## Create the first account

1. Go to http://localhost:3000/initialize
2. Fill in the inputs

Don't forget these credentials!

## Documentation
The api documentation can be found at `/_nitro/scalar`

## Help

Join our [Discord server](https://splrge.dev/discord) for help.

## Contribute to the project

1. Don't hesitate to star this repo!
2. Create pull requests to improve/fix features.
