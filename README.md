# CoastSense - Ocean Hazard Monitoring Platform

A front-end prototype for the Integrated Platform for Crowdsourced Ocean Hazard Reporting and Social Media Analytics, developed for INCOIS (Indian National Centre for Ocean Information Services).

## Features

- **Modern UI Design**: Alora-inspired elegant and responsive design
- **Interactive Dashboard**: Real-time heatmap visualization using Leaflet.js
- **Hazard Reporting**: Comprehensive form with geolocation and media upload
- **Role-based Interface**: Ready for citizen, official, and analyst access levels
- **Django-Ready**: Clean structure for easy Django template integration

## Project Structure

```
CoastSense/
├── static/
│   ├── css/
│   │   └── style.css          # Main stylesheet with Alora-inspired design
│   ├── js/
│   │   └── main.js            # Interactive functionality and map integration
│   └── images/                # Static images (to be added)
├── templates/
│   ├── home.html              # Landing page with hero section
│   ├── dashboard.html         # Interactive map and analytics dashboard
│   └── report.html            # Hazard reporting form
└── README.md
```

## Pages

### 1. Home Page (`home.html`)
- Hero section with call-to-action buttons
- Feature showcase
- Navigation with login button
- Responsive design for mobile and desktop

### 2. Dashboard (`dashboard.html`)
- Interactive map with Leaflet.js integration
- Heatmap visualization for hazard density
- Real-time statistics and filters
- Sidebar with recent reports and social media feed placeholder
- Map legend and controls

### 3. Report Form (`report.html`)
- Comprehensive hazard reporting form
- Geolocation services integration
- Media upload functionality
- Emergency contact information
- Reporting guidelines

## Technologies Used

- **HTML5**: Semantic markup
- **CSS3**: Modern styling with gradients, animations, and responsive design
- **JavaScript (ES6+)**: Interactive functionality
- **Leaflet.js**: Interactive maps and heatmap visualization
- **Leaflet.heat**: Heatmap layer plugin

## Key Features

### Interactive Map
- Real-time hazard visualization
- Heatmap layer for density analysis
- Clickable markers with popup information
- Filter controls for hazard type, time range, and severity

### Responsive Design
- Mobile-first approach
- Flexible grid layouts
- Touch-friendly interface
- Cross-browser compatibility

### Django Integration Ready
- Clean folder structure following Django conventions
- Template structure ready for `{% load static %}` tags
- Form elements with proper `action` and `method` attributes
- Modular CSS and JavaScript files

## Sample Data

The platform includes sample hazard data for demonstration:
- Mumbai Coast: High Waves (High Severity)
- Chennai Coast: Storm Surge (High Severity)
- Kolkata Coast: Coastal Flooding (Low Severity)
- Goa Coast: Abnormal Tides (Medium Severity)
- Pondicherry Coast: High Waves (High Severity)

## Future Integration

This front-end is designed to integrate seamlessly with:
- Django backend framework
- PostgreSQL/PostGIS database
- Social media APIs (Twitter, Facebook)
- NLP processing engines
- Early warning systems
- Mobile applications

## Getting Started

1. Open any HTML file in a web browser
2. Navigate between pages using the navigation menu
3. Test the interactive features:
   - View the dashboard map and heatmap
   - Submit a test report (form validation only)
   - Use the geolocation feature
   - Apply filters on the dashboard

## Browser Support

- Chrome 80+
- Firefox 75+
- Safari 13+
- Edge 80+

## License

Developed for the Ministry of Earth Sciences (MoES) - Indian National Centre for Ocean Information Services (INCOIS)