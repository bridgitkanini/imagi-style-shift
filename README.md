# Welcome to your Lovable project

## Project info

**URL**: https://lovable.dev/projects/a734e7de-8f06-4342-9f56-da94b031369a

## About Imagi Style Shift

**Imagi Style Shift** is a comprehensive AI-powered image generation and transformation platform that allows users to create, edit, and transform images using cutting-edge artificial intelligence technology.

### 🎨 Core Features

**AI Image Generation**

- Generate stunning images from text descriptions using OpenAI's DALL-E models
- Support for multiple AI models: DALL-E 2, DALL-E 3, and GPT Image 1
- Customizable image sizes and quality settings
- Vivid and natural style options for DALL-E 3

**AI Image Editing**

- Edit existing images with natural language prompts
- Add, remove, or modify elements in photos
- Change backgrounds, add accessories, or alter styles
- High-resolution output support

**Style Transformation**

- Transform photos into Studio Ghibli-style artwork
- Convert images into detailed action figures
- Preserve original image details in transformations
- Batch processing capabilities

**User Management & History**

- Complete image history tracking
- Download and share generated images
- Delete and manage saved images
- User authentication with Clerk

**Subscription System**

- Free tier: 5 generations per month
- Pro tier ($7.99/month): 25 generations per month
- Pro Plus tier ($19.99/month): 500 generations per month
- Usage tracking and limits enforcement
- Stripe-powered payment processing

### 🛠 Technical Architecture

**Frontend**

- React 18 with TypeScript
- Vite for fast development and building
- Tailwind CSS for styling
- shadcn/ui component library
- React Router for navigation
- React Query for data fetching

**Backend & Infrastructure**

- Supabase for database and authentication
- Supabase Edge Functions for serverless API
- OpenAI API integration for image generation
- Supabase Storage for image management
- Stripe integration for payments

**Key Dependencies**

- @clerk/clerk-react for authentication
- @supabase/supabase-js for backend services
- @tanstack/react-query for data management
- openai for AI image generation
- react-router-dom for routing
- lucide-react for icons

### 📱 Pages & Components

**Main Pages**

- `/` - Home page with AI tools interface
- `/history` - User's image generation history
- `/plan` - Subscription management

**Core Components**

- `TextToImageGenerator` - AI image generation from text
- `ImageEditor` - AI-powered image editing
- `StyleSelector` - Style transformation options
- `ImageUpload` - File upload functionality
- `AIImageResults` - Display and manage generated images
- `CurrentPlanDisplay` - Subscription status
- `ImageGalleryWidget` - Image gallery interface

### 🔐 Authentication & Security

- User authentication powered by Clerk
- Secure API endpoints with authentication headers
- Usage limits enforced per user
- Image storage with user-specific paths
- Subscription validation for premium features

### 💳 Subscription Tiers

**Free Plan**

- 5 image generations per month
- Basic image editing features
- Community support

**Pro Plan ($7.99/month)**

- 25 image generations per month
- Advanced editing tools
- Priority support
- High-resolution exports

**Pro Plus Plan ($19.99/month)**

- 500 image generations per month
- All Pro features
- API access
- Team collaboration features

## How can I edit this code?

There are several ways of editing your application.

**Use Lovable**

Simply visit the [Lovable Project](https://lovable.dev/projects/a734e7de-8f06-4342-9f56-da94b031369a) and start prompting.

Changes made via Lovable will be committed automatically to this repo.

**Use your preferred IDE**

If you want to work locally using your own IDE, you can clone this repo and push changes. Pushed changes will also be reflected in Lovable.

The only requirement is having Node.js & npm installed - [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)

Follow these steps:

```sh
# Step 1: Clone the repository using the project's Git URL.
git clone <YOUR_GIT_URL>

# Step 2: Navigate to the project directory.
cd <YOUR_PROJECT_NAME>

# Step 3: Install the necessary dependencies.
npm i

# Step 4: Start the development server with auto-reloading and an instant preview.
npm run dev
```

**Edit a file directly in GitHub**

- Navigate to the desired file(s).
- Click the "Edit" button (pencil icon) at the top right of the file view.
- Make your changes and commit the changes.

**Use GitHub Codespaces**

- Navigate to the main page of your repository.
- Click on the "Code" button (green button) near the top right.
- Select the "Codespaces" tab.
- Click on "New codespace" to launch a new Codespace environment.
- Edit files directly within the Codespace and commit and push your changes once you're done.

## How can I deploy this project?

Simply open [Lovable](https://lovable.dev/projects/a734e7de-8f06-4342-9f56-da94b031369a) and click on Share -> Publish.

## Can I connect a custom domain to my Lovable project?

Yes, you can!

To connect a domain, navigate to Project > Settings > Domains and click Connect Domain.

Read more here: [Setting up a custom domain](https://docs.lovable.dev/tips-tricks/custom-domain#step-by-step-guide)
