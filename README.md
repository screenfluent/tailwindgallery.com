# Tailwind Gallery

A curated collection of beautiful websites built with Tailwind CSS. This platform allows users to discover, submit, and showcase websites that utilize Tailwind CSS, while also connecting website owners with Tailwind experts.

## Features

- **Website Showcase**: Browse and discover websites built with Tailwind CSS
- **Technology Stack**: Track technologies used in each website
- **Expert Directory**: Connect with verified Tailwind CSS experts
- **User Profiles**: Customizable profiles for developers and agencies
- **Submission System**: Submit and manage website listings
- **Verification System**: Verify website ownership and expert credentials

## Tech Stack

- [Astro](https://astro.build) - Web framework
- [Tailwind CSS](https://tailwindcss.com) - CSS framework
- [TypeScript](https://www.typescriptlang.org) - Programming language
- [@astrojs/db](https://docs.astro.build/en/guides/integrations-guide/db/) - Database integration

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn

### Installation

1. Clone the repository
```bash
git clone https://github.com/yourusername/tailwindgallery.git
cd tailwindgallery
```

2. Install dependencies
```bash
npm install
```

3. Start the development server
```bash
npm run dev
```

The application will be available at `http://localhost:4321`

## Project Structure

```
├── db/                # Database configuration and seeds
│   ├── config.ts      # Database schema definition
│   └── seeds/         # Seed data for development
├── docs/              # Documentation
├── src/
│   ├── components/    # Reusable UI components
│   ├── layouts/       # Page layouts
│   ├── pages/         # Application routes
│   └── utils/         # Utility functions
└── public/            # Static assets
```

## Database Schema

The project uses Astro DB with the following main tables:

- `Users` - User accounts and profiles
- `Websites` - Website submissions and details
- `Technologies` - Technology stack information
- `Profiles` - Expert and owner profiles
- `Activities` - User actions and engagement

For detailed schema information, see `db/config.ts`.

## Documentation

- [Deployment Guide](docs/dokku-deployment.md) - Instructions for deploying with Dokku

## Contributing

Contributions are welcome! Please read our contributing guidelines before submitting pull requests.

## License

This project is licensed under the MIT License - see the LICENSE file for details.
