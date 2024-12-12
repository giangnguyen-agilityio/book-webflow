# Book Webflow website

### 📝 Overview

- This document is intended to describe the requirements for my NextJS practice.
- Design: [Figma](https://www.figma.com/design/vrDLGDlGWrBahadzcS1giu/Book-Webflow-Website?node-id=0-1&t=ovHcM9338fZQvLAU-1)
- Plan: [Note](https://docs.google.com/document/d/18ck2zC5BfYcEsuesnNMAp6PRkZykmzDL1P743xlzK5w/edit?usp=sharing)

### ⌛ Timeline

- 14 working days

### 💻 Tech stacks

- [React 18](https://react.dev/)
- [NextJS](https://nextjs.org/)
- [NextUI](https://nextui.org/)
- [TailwindCSS](https://tailwindcss.com/)
- [Typescript](https://www.typescriptlang.org/)
- [MockAPI](https://mockapi.io/)

### 🛠️ Development tools

- [Husky](https://typicode.github.io/husky/)
- [Prettier](https://prettier.io/)
- [Eslint](https://eslint.org/)
- [Commitlint](https://commitlint.js.org/)
- [Storybook](https://github.com/storybookjs/storybook/tree/next/code/lib/cli)
- [Vercel](https://vercel.com)

### 🎯 Targets

- Understand and apply the core concepts of NextJS
- Utilize NextUI to create and customize UI components that match the design.
- Use Storybook to document React components.
- Improve PageSpeed scores to achieve the highest score around 90-95.
- Ensure responsive design that supports three device types: Mobile, Tablet, and Desktop.

### 🗂️ Features

Build a simple website with the following features:

- **Common:**

  - The header and footer should be shown on all pages
  - Navigation of the Header and Explore section at Footer will have the following items:
    - **My Store** page
    - **Articles** page
    - **Cart** icon: (Click on this icon will open the Cart modal)
  - Show active status for the menu item when accessing the page (Text will be changed to **_Yellow_** color)
  - Users can be directed to the 404-page error if they access a page that does not exist

- **My Store page**

  - Users can see the book list
  - Users can see pagination if the total books > 6
  - Users can be directed to the Book Detail page when clicking on any book item (without the **Order Today** button)
  - Users can click on the **Order Today** button to add a book to their cart if the total of that book ≥ 1
  - Users can see a snack bar notification for adding a book to cart status

- **Book Detail page**

  - Users can see the book's detailed information
  - Users can update quantity input. The default should be 1 and the number cannot < 1
  - Users can click on **Add to Cart** when the total of books that are chosen ≥ 1
  - Users can see a snack bar notification after adding a book into cart

- **Cart**
  - Users can click on the Cart icon on the header to open the Cart modal
  - Users can see all added books in the Cart
  - Users can update the quantity of each item but the quantity can’t > the total of books
  - Users can remove items from the cart
  - Users can see subtotal
  - Users can be directed to the Checkout page when they click on the **Continue to Checkout** button. (**Note:** you don’t need to handle payment, the checkout page can be shown as an incoming page. After checkout the cart will reset)
- **Articles**
  - Users can see the **Articles & Resources** section at the bottom of each page, except the **Articles** and **Article Detail** page. This section shows only the three latest articles and does not have pagination.
  - Users can see pagination if the total **Articles** > 9
  - Users can see the **Article Detail** page when they click on the **Read More** link

## How to run

### 📦 Prerequisites

Make sure you install packages with correct version below:

- [node v18.19.0](https://nodejs.org/en/download/package-manager)
- [pnpm 9.12.3](https://pnpm.io/installation)

- **Note:**:
  - Please add `.env` into root of project source code, refer `.env.sample`.

Check and update config image hosting on `next.config.mjs` file follow [Next.js document](https://nextjs.org/docs/messages/next-image-unconfigured-host)

### 📥 Get source code

| Command                                                                | Action                      |
| :--------------------------------------------------------------------- | :-------------------------- |
| `git clone git@gitlab.asoft-python.com:giang.nguyen/next-training.git` | Clone Repository with SSH   |
| `git checkout feature/practice-one`                                    | Checkout to the main Branch |

### ⚙️ Build and Run app

| Command              | Action                                     | Port                  |
| :------------------- | :----------------------------------------- | :-------------------- |
| `$ pnpm install`     | Install packages dependencies              | N/A                   |
| `$ pnpm build`       | Build app with optimized production mode   | N/A                   |
| `$ pnpm start`       | Starts the application in production mode. | http://localhost:3000 |
| `$ pnpm dev`         | Run the app in development mode            | http://localhost:3000 |
| `$ pnpm storybook`   | Run Storybook.                             | http://localhost:6006 |
| `$ pnpm test`        | Run Unit Test                              | N/A                   |
| `$ pnpm coverage`    | Generate code coverage                     | N/A                   |
| `$ pnpm test:update` | Update the Snapshot                        | N/A                   |
| `$ pnpm lint`        | Run the Eslint                             | N/A                   |

### 📁 Project structure

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
├── .editorconfig                   # Editor configuration
├── .env                            # Env
├── .env.sample                     # Env sample
├── .eslintrc.json                  # ESLint configuration
├── .gitignore                      # Git ignore file
├── .lintstagedrc                   # Lint-stage
├── .prettierrc                     # Prettier configuration
├── .commitlint.config.js           # Commitlint configuration
├── jest.config.ts                  # Jest configuration
├── jest.setup.ts                   # Jest setup configuration
├── next.config.mjs                 # Next.js configuration
├── postcss.config.mjs              # Post CSS configuration
├── tailwind.config.ts              # Tailwind CSS configuration
├── tsconfig.json                   # TypeScript configuration
├── pnpm-lock.yaml
└── package.json
```

### 👨‍💻 Author

- Giang Nguyen.
- Email: giang.nguyen@asnet.com.vn.
