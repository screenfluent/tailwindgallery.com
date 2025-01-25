# 🎨 Tailwind Gallery

Discover stunning websites built with Tailwind CSS. A curated collection of the most beautiful and inspiring Tailwind-powered designs.

## 🌐 [Visit Tailwind Gallery](https://tailwindgallery.com)

### ✨ Project Status

![Status](https://img.shields.io/badge/status-beta-blue)
![Version](https://img.shields.io/badge/version-1.0.0-green)
![Websites](https://img.shields.io/badge/websites-50+-purple)

#### Current Focus
- 🚀 Performance optimization
- 🎨 New design system
- 📱 Mobile experience improvements
- 🔍 Advanced search features

[View our complete roadmap →](https://github.com/screenfluent/tailwindgallery.com/projects/1)

### 🤝 Contributing

While the source code is private, we welcome:
- [Submit a website](https://github.com/screenfluent/tailwindgallery.com/issues/new?template=website_submission.md)
- [Request a feature](https://github.com/screenfluent/tailwindgallery.com/issues/new?template=feature_request.md)
- [Report a bug](https://github.com/screenfluent/tailwindgallery.com/issues/new?template=bug_report.md)

[Learn more about contributing →](./CONTRIBUTING.md)

### 📈 Progress

- [View Changelog](./CHANGELOG.md)
- [Project Boards](https://github.com/screenfluent/tailwindgallery.com/projects)
- [Milestones](https://github.com/screenfluent/tailwindgallery.com/milestones)

### 📬 Contact

For business inquiries or partnership opportunities:
- Website: [tailwindgallery.com](https://tailwindgallery.com)
- Twitter: [@tailwindgallery](https://twitter.com/tailwindgallery)

---

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

## License

This project is licensed under the MIT License - see the LICENSE file for details.

---

© 2025 Tailwind Gallery. All rights reserved.
