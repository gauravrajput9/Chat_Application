# ChatFlow - Real-Time Messaging Platform

[![Production Ready](https://img.shields.io/badge/Production-Ready-green.svg)](https://github.com/your-repo/chatflow)
[![Performance](https://img.shields.io/badge/Performance-Optimized-blue.svg)](https://github.com/your-repo/chatflow)
[![Security](https://img.shields.io/badge/Security-Enhanced-orange.svg)](https://github.com/your-repo/chatflow)

A high-performance, production-ready real-time chat application built with the MERN stack, Socket.IO, and modern best practices.

## 🚀 Features

### Core Features
- ✅ **Real-time messaging** with Socket.IO
- ✅ **User authentication** with JWT
- ✅ **File sharing** with image support
- ✅ **Online status** tracking
- ✅ **Message history** with pagination
- ✅ **Responsive design** for all devices

### Production Features
- 🔒 **Security enhancements** (Helmet, rate limiting, input validation)
- 📊 **Performance monitoring** (Core Web Vitals)
- 🚦 **Health checks** and graceful shutdown
- 📝 **Comprehensive logging** with Winston
- 🐳 **Docker containerization**
- 🔍 **SEO optimization** with meta tags and structured data

## 🛠 Technology Stack

### Backend
- **Node.js** + **Express.js**
- **MongoDB** with Mongoose ODM
- **Socket.IO** for real-time communication
- **JWT** for authentication
- **Cloudinary** for image storage
- **Winston** for logging
- **Helmet** for security
- **Rate limiting** with express-rate-limit

### Frontend
- **React.js** with Vite
- **Zustand** for state management
- **Tailwind CSS** for styling
- **Socket.IO Client** for real-time features
- **Axios** for HTTP requests
- **Web Vitals** for performance monitoring

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- MongoDB
- Cloudinary account (for image uploads)

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/your-username/chatflow.git
cd chatflow
```

2. **Backend Setup**
```bash
cd backend
npm install
cp .env.example .env
# Fill in your environment variables
npm run dev
```

3. **Frontend Setup**
```bash
cd ../frontend
npm install
npm run dev
```

## 📁 Project Structure

```
ChatFlow/
├── backend/
│   ├── controller/          # Route handlers
│   ├── middleware/          # Custom middleware
│   ├── models/             # MongoDB schemas
│   ├── routes/             # API routes
│   ├── utils/              # Utility functions
│   ├── logs/               # Application logs
│   └── uploads/            # File uploads
├── frontend/
│   ├── src/
│   │   ├── components/     # React components
│   │   ├── pages/          # Page components
│   │   ├── store/          # Zustand stores
│   │   ├── hooks/          # Custom hooks
│   │   └── lib/           # Utilities
│   └── public/            # Static assets
├── docker-compose.prod.yml # Production deployment
└── README.md
```

## 🐳 Production Deployment

### Docker Deployment

1. **Prepare environment**
```bash
cp .env.production .env
# Update with your production values
```

2. **Deploy with Docker Compose**
```bash
docker-compose -f docker-compose.prod.yml up -d
```

### Manual Deployment

1. **Build frontend**
```bash
cd frontend
npm run build
```

2. **Start backend in production**
```bash
cd backend
NODE_ENV=production npm start
```

## 🔧 Configuration

### Environment Variables

#### Backend (.env)
```env
# Database
MONGODB_URI=mongodb://localhost:27017/chatflow
JWT_SECRET=your-secret-key

# Cloudinary
CLOUDINARY_CLOUD_NAME=your-cloud-name
CLOUDINARY_API_KEY=your-api-key
CLOUDINARY_API_SECRET=your-api-secret

# App Configuration
CLIENT_URL=http://localhost:5173
PORT=3000
NODE_ENV=development
```

#### Frontend (.env)
```env
VITE_API_URL=http://localhost:3000
```

## 📊 Performance Optimizations

### Backend Optimizations
- **Database indexing** for faster queries
- **Message pagination** to reduce payload
- **Rate limiting** to prevent abuse
- **Compression** middleware
- **Efficient socket handling**

### Frontend Optimizations
- **Optimistic updates** for better UX
- **Lazy loading** components
- **Performance monitoring** with Web Vitals
- **PWA capabilities**
- **SEO optimization**

## 🔒 Security Features

- **JWT authentication** with secure cookies
- **Rate limiting** on all endpoints
- **Input validation** and sanitization
- **CORS** configuration
- **Security headers** with Helmet
- **Error handling** without information leakage

## 📈 Monitoring & Analytics

### Health Checks
- `/health` endpoint for application status
- Docker health checks
- Database connection monitoring

### Performance Monitoring
- Core Web Vitals tracking
- Custom performance metrics
- Real-time chat performance monitoring

### Logging
- Structured logging with Winston
- Separate error and combined logs
- Log rotation and management

## 🚀 SEO & Ranking Optimizations

### Technical SEO
- ✅ Semantic HTML structure
- ✅ Meta tags optimization
- ✅ Open Graph tags
- ✅ Twitter Cards
- ✅ Structured data (JSON-LD)
- ✅ PWA manifest
- ✅ Robots.txt
- ✅ Sitemap ready

### Performance
- ✅ Core Web Vitals monitoring
- ✅ Image optimization
- ✅ Code splitting
- ✅ Compression
- ✅ Caching strategies

## 🐛 Bug Fixes Implemented

### Message Rendering Bug Fix
**Issue**: Messages not rendering for newly logged in users
**Solution**: 
- Fixed socket message filtering in `subscribeToNewMessage`
- Added proper conversation context checking
- Improved optimistic updates handling

## 🔧 API Endpoints

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `POST /api/auth/logout` - User logout

### Messages
- `GET /api/message/getAllContacts` - Get all users
- `GET /api/message/chats` - Get chat partners
- `GET /api/message/:id` - Get messages with pagination
- `POST /api/message/send/:id` - Send message

### User
- `GET /api/user/check` - Check authentication
- `PUT /api/user/update` - Update profile

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Socket.IO team for real-time capabilities
- MongoDB team for the database
- All contributors and testers

---

**Made with ❤️ for seamless communication**