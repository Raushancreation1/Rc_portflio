# Raushan Kumar - Portfolio

Welcome to my personal portfolio website built with Next.js, TypeScript, and Tailwind CSS. This project showcases my skills, projects, and experience as a developer.

## 🚀 Features

- Responsive design for all devices
- Dark/Light mode support
- Smooth scrolling navigation
- Project showcase with details
- Skills and experience section
- Contact form

## 🛠️ Technologies Used

- **Framework**: Next.js 14
- **Styling**: Tailwind CSS
- **Type Safety**: TypeScript
- **Icons**: React Icons
- **Animation**: Framer Motion
- **Form Handling**: React Hook Form

## 🚀 Getting Started

### Prerequisites

- Node.js 16.8 or later
- npm or yarn

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/Raushancreation1/C-DSA.git
   cd portfolio-app
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   yarn
   ```

3. Start the development server:
   ```bash
   npm run dev
   # or
   yarn dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## 🔐 Environment Setup

1. Create a `.env.local` file in the project root (`portfolio-app/`). This file is gitignored and automatically loaded by Next.js:

   ```bash
   # portfolio-app/.env.local
   MONGODB_URI="mongodb+srv://<username>:<password>@<your-cluster>.mongodb.net/?retryWrites=true&w=majority"
   MONGODB_DB="portfolio"
   ```

   - Replace `<your-cluster>.mongodb.net` with the exact host from MongoDB Atlas (e.g., `cluster0.9pblsb1.mongodb.net`).
   - Do not append your database name to the hostname.
   - If your password has special characters (e.g., @, /, #), URL-encode it.

2. In MongoDB Atlas:
   - Add your IP to Network Access (or use `0.0.0.0/0` temporarily for development).
   - Ensure a database user exists with the same username/password used above.

3. Restart the dev server so env vars are reloaded:

   ```bash
   npm run dev
   # or
   yarn dev
   ```

4. Verify the API and database connection by visiting:
   - `http://localhost:3000/api/projects` — should return JSON. If empty, you’ll see an empty `projects` array.

5. (Optional) Seed a test project:

   ```bash
   curl -i -X POST http://localhost:3000/api/projects \
     -H "Content-Type: application/json" \
     -d '{
       "title": "Test Project",
       "description": "A sample project to verify DB connection.",
       "tags": ["Next.js", "TypeScript", "MongoDB"],
       "image": "",
       "githubUrl": "https://github.com/your/repo",
       "liveUrl": "https://example.com"
     }'
   ```

   Expect `201 Created` with `{ ok: true, id: "..." }`.

## 🎨 Customization

- Update your personal information in the `src/data` directory
- Modify the theme colors in `tailwind.config.js`
- Add/update projects in the projects data file

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [Next.js Documentation](https://nextjs.org/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [React Icons](https://react-icons.github.io/react-icons/)
# Rc_portflio
