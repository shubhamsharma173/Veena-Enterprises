# Veena Enterprises Solar Services Website

A modern, SEO-optimized website for Veena Enterprises Solar Services built with Next.js 14, TypeScript, and Tailwind CSS.

## 🚀 Features

- **SEO Optimized**: Complete meta tags, structured data, sitemap, and robots.txt
- **Responsive Design**: Mobile-first approach with Tailwind CSS
- **Fast Performance**: Built with Next.js 14 for optimal loading speeds
- **Modern UI**: Clean, professional design matching the brand colors
- **Contact Integration**: Phone number links and contact forms
- **PWA Ready**: Web app manifest for mobile installation

## 🛠️ Tech Stack

- **Framework**: Next.js 14 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **Fonts**: Inter (Google Fonts)

## 📱 Pages & Sections

1. **Hero Section**: Compelling headline with call-to-action
2. **Services**: Solar panel installation, on-grid/off-grid systems, inverters & batteries, maintenance
3. **Why Choose Us**: Government subsidy assistance, quality panels, cost-effective solutions
4. **Contact**: Phone numbers, address, contact form
5. **Footer**: Company information and quick links

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd veena-enterprises-solar
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Run the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   ```

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📦 Build & Deploy

### Build for Production
```bash
npm run build
# or
yarn build
```

### Start Production Server
```bash
npm start
# or
yarn start
```

## 🔧 Configuration

### Environment Variables
Create a `.env.local` file in the root directory:

```env
NEXT_PUBLIC_SITE_URL=https://veenaenterprises.com
NEXT_PUBLIC_PHONE_1=9419962911
NEXT_PUBLIC_PHONE_2=8233261929
NEXT_PUBLIC_ADDRESS=57, Govind Nagar West, Amer Road, Jaipur 302001
```

### SEO Configuration
- Update `app/layout.tsx` with your Google Analytics code
- Modify meta tags in `app/layout.tsx`
- Update structured data with your business information

## 📊 SEO Features

- **Meta Tags**: Complete Open Graph and Twitter Card support
- **Structured Data**: LocalBusiness schema markup
- **Sitemap**: Automatic sitemap generation
- **Robots.txt**: Search engine crawling instructions
- **Performance**: Optimized images and fonts
- **Accessibility**: Semantic HTML and ARIA labels

## 🎨 Customization

### Colors
Update brand colors in `tailwind.config.js`:

```javascript
colors: {
  brand: {
    yellow: '#FFD700',
    darkBlue: '#1E3A8A',
    cream: '#F5F5DC',
    green: '#10B981',
  }
}
```

### Content
- Update business information in components
- Modify services and features
- Change contact details and address

## 📱 Mobile Optimization

- Responsive design for all screen sizes
- Touch-friendly navigation
- Optimized images and fonts
- Fast loading on mobile networks

## 🔍 Performance Optimization

- Next.js Image optimization
- Font optimization with `@next/font`
- Code splitting and lazy loading
- Minified CSS and JavaScript

## 📈 Analytics & Tracking

Add Google Analytics by updating the verification code in `app/layout.tsx`:

```javascript
verification: {
  google: 'your-google-verification-code',
},
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 📞 Support

For support or questions about the website:
- **Phone**: 9419962911, 8233261929
- **Address**: 57, Govind Nagar West, Amer Road, Jaipur 302001
- **Email**: info@veenaenterprises.com

## 🚀 Deployment

### Vercel (Recommended)
1. Connect your GitHub repository to Vercel
2. Configure environment variables
3. Deploy automatically on push

### Other Platforms
- Netlify
- AWS Amplify
- DigitalOcean App Platform

---

**Built with ❤️ for Veena Enterprises Solar Services** 