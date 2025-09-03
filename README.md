# CoastSense - Ocean Hazard Monitoring Platform

Copyright (c) 2025 CoastSense Project
Licensed under MIT License - See LICENSE file for details

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

### Prerequisites

- **Python 3.7+** (for running Python scripts)
- **Web browser** (Chrome 80+, Firefox 75+, Safari 13+, or Edge 80+)
- **Internet connection** (for map tiles and external resources)

### Installation

1. **Clone or download** the project files to your local machine

2. **Set up Python environment** (optional but recommended):
   ```bash
   # Create virtual environment
   python -m venv venv

   # Activate virtual environment
   # On Windows:
   venv\Scripts\activate
   # On macOS/Linux:
   source venv/bin/activate
   ```

3. **Install Python dependencies**:
   ```bash
   pip install -r requirements.txt
   ```

### Running the Project

#### Option 1: View Static HTML Files (Quick Start)

1. **Open the home page**:
   - Navigate to the project directory
   - Open `templates/home.html` in your web browser
   - Or open any HTML file directly in your browser

2. **Navigate the application**:
   - Use the navigation menu to switch between pages
   - Start with the Home page to see the overview
   - Visit the Dashboard to see the interactive map
   - Use the Report page to test the hazard reporting form

#### Option 2: Run Python Scripts

1. **Generate India Heatmap**:
   ```bash
   python india_heatmap.py
   ```
   This will create `india_heatmap.html` with an interactive map of India showing population density data.

2. **Update Copyright Notices**:
   ```bash
   python update_copyright.py
   ```
   This will update copyright years in all project files to the current year.

### Using the Application

#### Dashboard Features

1. **Interactive Map**:
   - View hazard reports as colored markers on the map
   - Click on markers to see detailed information
   - Use zoom controls to navigate different regions

2. **Heatmap Visualization**:
   - Switch between different heatmap types:
     - **Density**: Shows concentration of reports
     - **Severity**: Shows severity levels
     - **Time**: Shows temporal distribution
   - Adjust time filters (1h, 6h, 24h, 7d, 30d)

3. **Statistics Panel**:
   - View real-time counts of total, high, medium, and low severity reports
   - Statistics update automatically as you apply filters

#### Hazard Reporting

1. **Access the Report Form**:
   - Click "Report Hazard" in the navigation
   - Fill in the comprehensive reporting form

2. **Geolocation**:
   - Click "Get Current Location" to auto-fill coordinates
   - Or manually enter latitude/longitude

3. **Media Upload**:
   - Attach photos or videos as evidence
   - Supported formats: images and videos

4. **Form Validation**:
   - All required fields are validated before submission
   - Real-time feedback for form errors

#### Additional Features

- **Responsive Design**: Works on desktop, tablet, and mobile devices
- **Live Updates**: Dashboard updates every 30 seconds with new data
- **Menu Navigation**: Access additional pages via the hamburger menu
- **Smooth Scrolling**: Navigate to different sections with smooth animations

### Development

To modify the project:

1. **HTML Templates**: Edit files in the `templates/` directory
2. **Styling**: Modify `static/css/style.css` for visual changes
3. **JavaScript**: Update `static/js/main.js` for interactive features
4. **Python Scripts**: Modify `india_heatmap.py` or `update_copyright.py` as needed

### Troubleshooting

- **Map not loading**: Check your internet connection for map tiles
- **Geolocation not working**: Ensure browser permissions are granted
- **Python scripts failing**: Make sure all dependencies are installed via `pip install -r requirements.txt`
- **Files not found**: Ensure you're running commands from the project root directory

## Browser Support

- Chrome 80+
- Firefox 75+
- Safari 13+
- Edge 80+

## License

Developed for the Ministry of Earth Sciences (MoES) - Indian National Centre for Ocean Information Services (INCOIS)