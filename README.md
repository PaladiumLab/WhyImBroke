# WhyImBroke - Personal Finance Management Platform

![WhyImBroke Dashboard](https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?auto=format&fit=crop&q=80&w=1200)

A comprehensive personal finance management platform that helps you track expenses, connect bank accounts, and make informed financial decisions. Mobile App will launch upon success metrics of this webapp.

## 🌟 Features

- **Bank Account Integration**: Connect your bank accounts securely using Plaid API
- **Transaction Management**: Import and categorize transactions automatically
- **CSV Import**: Parse bank statements from CSV files
- **Financial Analytics**: Comprehensive metrics and visualizations
- **Expense Tracking**: Monitor daily, weekly, and monthly expenses
- **Multi-Account Support**: Manage multiple bank accounts in one place
- **Secure Authentication**: Protected access to your financial data

## 🚀 Tech Stack

### Frontend
- React 18
- TypeScript
- Tailwind CSS
- React Router DOM
- React Query
- RadixUI
- ShadCN UI Library
- Recharts (for data visualization)
- Lucide React (for icons)

### Backend
- Node.js
- Express.js
- MongoDB
- Mongoose
- Plaid API
- JWT Authentication

## 📦 Prerequisites

Before you begin, ensure you have the following installed:
- Node.js (v18 or higher)
- MongoDB
- npm or yarn
- Git

## 🛠️ Installation & Setup

### 1. Clone the Repository

\`\`\`bash
git clone https://github.com/yourusername/whyimbroke.git
cd whyimbroke
\`\`\`

### 2. Frontend Setup

\`\`\`bash
# Navigate to client directory
cd client

# Install dependencies
npm install

# Create .env file
cp .env.example .env

# Start development server
npm run dev
\`\`\`

### 3. Backend Setup

\`\`\`bash
# Navigate to server directory
cd server

# Install dependencies
npm install

# Create .env file
cp .env.example .env

# Start development server
npm run dev
\`\`\`

### 4. Environment Variables

#### Frontend (.env)
\`\`\`env
VITE_API_URL=http://localhost:5000
VITE_PLAID_ENV=sandbox
\`\`\`

#### Backend (.env)
\`\`\`env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/whyimbroke
JWT_SECRET=your_jwt_secret
PLAID_CLIENT_ID=your_plaid_client_id
PLAID_SECRET=your_plaid_secret
PLAID_ENV=sandbox
\`\`\`

## 🧪 Testing

\`\`\`bash
# Run frontend tests
cd client
npm run test

# Run backend tests
cd server
npm run test
\`\`\`

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (\`git checkout -b feature/AmazingFeature\`)
3. Commit your changes (\`git commit -m 'Add some AmazingFeature'\`)
4. Push to the branch (\`git push origin feature/AmazingFeature\`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👥 Authors

- Your Name - Initial work - [YourGitHub](https://github.com/yourusername)

## 🙏 Acknowledgments

- [Plaid](https://plaid.com/) for banking integration
- [React](https://reactjs.org/) community
- [MongoDB](https://www.mongodb.com/) team
- All contributors and supporters