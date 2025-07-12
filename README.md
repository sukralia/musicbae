# MusicBae - Music Before Anyone Else

A revolutionary music marketplace and community platform that connects artists and fans through a tipping-based "tip jar" system. MusicBae allows artists to share music directly with fans before traditional releases, enabling financial sustainability for artists via fan tips while providing fans with fresh, high-quality music.

## 🎵 Mission

**For Artists**: Create, Share, Receive  
**For Fans**: Discover, Support, Enjoy

## ✨ Features

### For Artists
- Upload up to 4 best songs (MP3/WAV formats)
- Admin approval system for quality control
- Tip jar for direct fan support
- Dashboard for managing music and viewing earnings
- Withdrawal system with 15% platform fee
- Profile customization with bio and photos

### For Fans
- Discover emerging artists and their music
- Tip artists with customizable amounts ($1-$1,000,000)
- Receive high-quality downloads after tipping
- Custom DJ-style boombox player for downloaded songs
- Social sharing capabilities
- Early access to music before public release

### Platform Features
- Mobile-first responsive design
- JWT authentication system
- Stripe payment integration
- Email notifications for downloads and approvals
- Admin dashboard for content moderation
- Real-time statistics and analytics

## 🛠️ Tech Stack

- **Frontend**: Next.js 14+, React, TypeScript
- **Styling**: Tailwind CSS, Framer Motion
- **Backend**: Next.js API Routes, Node.js
- **Database**: MongoDB with Mongoose ODM
- **Authentication**: JWT tokens
- **Payments**: Stripe
- **Email**: Nodemailer
- **File Storage**: AWS S3 (configurable)
- **Audio**: Howler.js for custom player

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ 
- MongoDB database
- Stripe account
- Email service (Gmail/SendGrid)

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd musicbae
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   Create a `.env.local` file in the root directory:
   ```env
   # Database
   MONGODB_URI=mongodb://localhost:27017/musicbae

   # JWT
   JWT_SECRET=your-super-secret-jwt-key-change-this-in-production

   # Stripe
   STRIPE_SECRET_KEY=sk_test_your_stripe_secret_key
   STRIPE_PUBLISHABLE_KEY=pk_test_your_stripe_publishable_key
   STRIPE_WEBHOOK_SECRET=whsec_your_webhook_secret

   # Email (Gmail)
   EMAIL_HOST=smtp.gmail.com
   EMAIL_PORT=587
   EMAIL_USER=your-email@gmail.com
   EMAIL_PASS=your-app-password

   # AWS S3 (for file storage)
   AWS_ACCESS_KEY_ID=your_aws_access_key
   AWS_SECRET_ACCESS_KEY=your_aws_secret_key
   AWS_REGION=us-east-1
   AWS_S3_BUCKET=musicbae-uploads

   # App
   NEXT_PUBLIC_APP_URL=http://localhost:3000
   ```

4. **Run the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📁 Project Structure

```
musicbae/
├── src/
│   ├── app/                 # Next.js app directory
│   │   ├── api/            # API routes
│   │   │   ├── auth/       # Authentication endpoints
│   │   │   ├── artists/    # Artist management
│   │   │   ├── songs/      # Song management
│   │   │   ├── tips/       # Tipping system
│   │   │   └── admin/      # Admin functions
│   │   ├── register/       # Registration page
│   │   ├── login/          # Login page
│   │   ├── artists/        # Artists listing
│   │   └── dashboard/      # User dashboard
│   ├── components/         # Reusable components
│   ├── lib/               # Utility functions
│   └── models/            # Database models
├── public/                # Static assets
└── package.json
```

## 🔧 Configuration

### Database Setup
1. Create a MongoDB database (local or Atlas)
2. Update `MONGODB_URI` in your environment variables
3. The app will automatically create collections and indexes

### Stripe Setup
1. Create a Stripe account
2. Get your API keys from the Stripe dashboard
3. Set up webhooks for payment processing
4. Update Stripe keys in environment variables

### Email Setup
1. For Gmail: Enable 2FA and generate an app password
2. For SendGrid: Create an API key
3. Update email configuration in environment variables

### File Storage
1. Create an AWS S3 bucket
2. Configure CORS for file uploads
3. Update AWS credentials in environment variables

## 🎯 Business Model

- **No upfront costs** for artists
- **15% service fee** on artist cashouts
- **Minimum $20 withdrawal** threshold
- **Default $5 tip** with customizable amounts
- **Free platform access** for fans

## 🚀 Deployment

### Vercel (Recommended)
1. Connect your GitHub repository to Vercel
2. Add environment variables in Vercel dashboard
3. Deploy automatically on push to main branch

### Other Platforms
The app can be deployed to any platform that supports Next.js:
- Netlify
- Railway
- DigitalOcean App Platform
- AWS Amplify

## 🔒 Security Features

- JWT token authentication
- Password hashing with bcrypt
- Input validation and sanitization
- CORS protection
- Rate limiting (recommended for production)
- Secure file upload validation

## 📱 Mobile Optimization

- Progressive Web App (PWA) ready
- Mobile-first responsive design
- Touch-friendly interface
- Offline capability (for downloaded songs)
- App-like navigation experience

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

For support, email support@musicbae.com or create an issue in the repository.

## 🎵 Roadmap

- [ ] Advanced audio player with visualizations
- [ ] Artist collaboration features
- [ ] Fan communities and forums
- [ ] Live streaming capabilities
- [ ] Mobile app development
- [ ] Advanced analytics dashboard
- [ ] Multi-language support
- [ ] NFT integration for exclusive content

---

**MusicBae** - Where music meets community, and artists find their audience.
