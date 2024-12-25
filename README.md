<div align="center">
  <h1>Book Webflow Website</h1>
  <p>The website built with <strong>Next JS</strong> for book shopping and article reading</p>

  <nav>
    <a href="#-features">Features</a> •
    <a href="#tech-stack">Tech Stack</a> •
    <a href="#-getting-started">Getting Started</a> •
    <a href="#development">Development</a> •
    <a href="#-project-structure">Project Structure</a>
  </nav>

  <div class="mt-2">
    <img src="https://img.shields.io/badge/React-18-gray?logo=react&logoColor=white&labelColor=black" alt="React 18">
    <img src="https://img.shields.io/badge/Next.js-15-gray?logo=next.js&logoColor=white&labelColor=black" alt="Next.js 15">
    <img src="https://img.shields.io/badge/TypeScript-3178C6?logo=typescript&logoColor=white" alt="TypeScript">
    <img src="https://img.shields.io/badge/TailwindCSS-06B6D4?logo=tailwindcss&logoColor=white" alt="Tailwind CSS">
  </div>
</div>

## 🔑 Features

<details>
<summary><strong>Store</strong></summary>

- Show the book list with pagination
- View book details with quantity selection
- Add books to the cart with quantity validation
- Show the notification system for cart actions
</details>

<details>
<summary><strong>Shopping Cart</strong></summary>

- View cart items in the modal
- Update item quantities with stock validation
- Remove items from the cart
- Calculate subtotal
- Checkout flow with cart reset
</details>

<details>
<summary><strong>Articles & Resources</strong></summary>

- Show the article list with pagination
- Read the detailed articles
- Latest articles showcase **(3 articles)** on main pages
- Article preview and **"Read More"** functionality
</details>

## Tech Stack

<table>
  <tr>
    <td align="center"><img src="https://raw.githubusercontent.com/github/explore/80688e429a7d4ef2fca1e82350fe8e3517d3494d/topics/react/react.png?size=48" width="30" height="30"/><br/>React 18</td>
    <td align="center"><img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/nextjs/nextjs-original.svg" width="30" height="30"/><br/>Next.js 15</td>
    <td align="center"><img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/typescript/typescript-original.svg" width="30" height="30"/><br/>TypeScript</td>
    <td align="center"><img src="https://avatars.githubusercontent.com/u/67109815?s=48&v=4" width="30" height="30"/><br/>Tailwind CSS</td>
  </tr>
</table>

## Development Tools

<table>
  <tr>
    <td align="center"><img src="https://raw.githubusercontent.com/github/explore/80688e429a7d4ef2fca1e82350fe8e3517d3494d/topics/eslint/eslint.png" width="30" height="30"/><br/>ESLint</td>
    <td align="center"><img src="https://prettier.io/icon.png" width="30" height="30"/><br/>Prettier</td>
    <td align="center"><img src="https://avatars.githubusercontent.com/u/15703675?s=200&v=4" width="30" height="30"/><br/>Husky</td>
    <td align="center"><img src="https://commitlint.js.org/assets/icon.svg" width="30" height="30"/><br/>Commitlint</td>
    <td align="center"><img src="https://raw.githubusercontent.com/storybookjs/brand/master/icon/icon-storybook-default.svg" width="30" height="30"/><br/>Storybook</td>
    <td align="center"><img src="https://assets.vercel.com/image/upload/v1607554385/repositories/vercel/logo.png" width="30" height="30"/><br/>Vercel</td>
  </tr>
</table>

## ⚡ Getting Started

### Prerequisites

```bash
node v18.19.0
pnpm 9.12.3
```

### Quick Start

1️⃣ Clone and switch to feature branch:

```bash
git clone git@gitlab.asoft-python.com:giang.nguyen/next-training.git
cd next-training
git checkout feature/practice-one
```

2️⃣ Install dependencies:

```bash
pnpm install
```

3️⃣ Set up environment:

- Copy `.env.sample` to `.env`
- Check and update config image hosting on `next.config.mjs` file follow [Next.js document](https://nextjs.org/docs/messages/next-image-unconfigured-host)

4️⃣ Start development server:

```bash
pnpm dev
```

## Development

| Command            | Description              | Port |
| ------------------ | ------------------------ | ---- |
| `pnpm dev`         | Start development server | 3000 |
| `pnpm build`       | Build for production     | -    |
| `pnpm start`       | Start production server  | 3000 |
| `pnpm storybook`   | Launch Storybook         | 6006 |
| `pnpm test`        | Run tests                | -    |
| `pnpm coverage`    | Generate coverage report | -    |
| `pnpm test:update` | Update the Snapshot      | -    |
| `pnpm lint`        | Run linter               | -    |

## 📁 Project Structure

<details>
<summary>Click to expand</summary>

```shell
.
├── README.md                       # README file
├── .husky                          # Husky configuration
├── .storybook                      # Storybook folder
├── public                          # Public assets folder
├── src
│   ├── apis                        # APIs
│   ├── app                         # Next.js App (App Router)
│   ├── components                  # React components
│   ├── constants                   # App constants
│   ├── context                     # App context
│   ├── icons                       # Icons folder
│   ├── mocks                       # App mock data
│   ├── models                      # Model type definitions
│   ├── services                    # Handle data with API: GET, POST, PUT, DELETE
│   ├── themes                      # Custom tailwindCSS styles
│   ├── types                       # Type definitions
│   ├── ui                          # Feature components
│   ├── utils                       # Utilities folder
├── .env                            # Env
├── .env.sample                     # Env sample
└── [config files...]               # Various configurations
```

</details>

## Author

- Giang Nguyen.
- Email: giang.nguyen@asnet.com.vn.

---
