# Personal Resume Website

A modern, minimalistic personal resume website with smooth animations, blur effects, and responsive design.

## Features

✨ **Modern Design**
- Clean, minimalistic layout
- Beautiful gradient backgrounds
- Smooth animations and transitions

🎨 **Visual Effects**
- Floating shapes with blur effects
- Parallax scrolling
- 3D hover effects on project cards
- Custom cursor with hover states
- Particle system in hero section

📱 **Responsive Design**
- Mobile-first approach
- Hamburger menu for mobile devices
- Optimized for all screen sizes

⚡ **Performance**
- Smooth scrolling
- Throttled scroll events
- Optimized animations
- Fast loading times

## Customization Guide

### 1. Personal Information

Update the following in `index.html`:

```html
<!-- Replace "Your Name" with your actual name -->
<span class="logo-text">Your Name</span>
<span class="title-name">Your Name</span>
<span class="title-role">Your Job Title</span>

<!-- Update contact information -->
<span>your.email@example.com</span>
<span>+1 (555) 123-4567</span>
<span>Your City, Country</span>
```

### 2. About Section

Modify the about section with your information:

```html
<p class="about-description">
    Your personal description here...
</p>
```

Update skills:

```html
<div class="skill-category">
    <h3>Your Skill Category</h3>
    <div class="skill-tags">
        <span class="skill-tag">Skill 1</span>
        <span class="skill-tag">Skill 2</span>
        <!-- Add more skills -->
    </div>
</div>
```

### 3. Experience Section

Update your work experience:

```html
<div class="timeline-item">
    <div class="timeline-marker"></div>
    <div class="timeline-content">
        <div class="timeline-date">2022 - Present</div>
        <h3 class="timeline-title">Your Job Title</h3>
        <h4 class="timeline-company">Company Name</h4>
        <p class="timeline-description">
            Your job description...
        </p>
    </div>
</div>
```

### 4. Projects Section

Add your projects:

```html
<div class="project-card">
    <div class="project-image">
        <div class="project-placeholder">
            <i class="fas fa-laptop-code"></i>
        </div>
        <div class="project-overlay">
            <div class="project-links">
                <a href="your-live-demo-url" class="project-link">
                    <i class="fas fa-external-link-alt"></i>
                </a>
                <a href="your-github-url" class="project-link">
                    <i class="fab fa-github"></i>
                </a>
            </div>
        </div>
    </div>
    <div class="project-content">
        <h3 class="project-title">Project Name</h3>
        <p class="project-description">
            Project description...
        </p>
        <div class="project-tech">
            <span class="tech-tag">Technology 1</span>
            <span class="tech-tag">Technology 2</span>
        </div>
    </div>
</div>
```

### 5. Profile Image

To add your profile image, replace the placeholder in the hero section:

```html
<div class="image-placeholder">
    <img src="path/to/your/image.jpg" alt="Your Name" style="width: 100%; height: 100%; object-fit: cover; border-radius: 50%;">
</div>
```

### 6. Color Scheme

Customize colors in `styles.css` by modifying CSS variables:

```css
:root {
    --primary-color: #6366f1;        /* Main brand color */
    --primary-dark: #4f46e5;         /* Darker shade */
    --secondary-color: #f8fafc;      /* Background color */
    --accent-color: #06b6d4;         /* Accent color */
    --text-primary: #1e293b;         /* Main text color */
    --text-secondary: #64748b;       /* Secondary text */
}
```

### 7. Social Links

Update social media links in the contact section:

```html
<div class="social-links">
    <a href="your-linkedin-url" class="social-link">
        <i class="fab fa-linkedin"></i>
    </a>
    <a href="your-github-url" class="social-link">
        <i class="fab fa-github"></i>
    </a>
    <a href="your-twitter-url" class="social-link">
        <i class="fab fa-twitter"></i>
    </a>
    <a href="your-dribbble-url" class="social-link">
        <i class="fab fa-dribbble"></i>
    </a>
</div>
```

## File Structure

```
personalsite/
├── index.html          # Main HTML file
├── styles.css          # CSS styles and animations
├── script.js           # JavaScript functionality
└── README.md           # This file
```

## Browser Support

- Chrome (recommended)
- Firefox
- Safari
- Edge
- Mobile browsers

## Performance Features

- Smooth scrolling with throttled events
- Optimized animations using CSS transforms
- Lazy loading for better performance
- Responsive images and layouts

## Getting Started

1. Open `index.html` in your browser
2. Customize the content with your information
3. Update colors and styling as needed
4. Deploy to your preferred hosting platform

## Deployment Options

- **GitHub Pages**: Free hosting for static sites
- **Netlify**: Easy deployment with form handling
- **Vercel**: Fast deployment with great performance
- **Traditional Web Hosting**: Upload files via FTP

## Tips for Customization

1. **Images**: Use high-quality images optimized for web
2. **Content**: Keep descriptions concise and impactful
3. **Colors**: Maintain good contrast for accessibility
4. **Performance**: Optimize images and minimize file sizes
5. **SEO**: Add meta tags and structured data

## Support

If you need help customizing your site, feel free to:
- Check the browser console for any errors
- Validate your HTML and CSS
- Test on different devices and browsers

Enjoy your new personal website! 🚀
