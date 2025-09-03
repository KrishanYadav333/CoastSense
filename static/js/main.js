// CoastSense Ocean Hazard Platform JavaScript - Alora Inspired
class OceanHazardPlatform {
    constructor() {
        this.map = null;
        this.heatmapLayer = null;
        this.markers = [];
        this.init();
    }

    init() {
        this.initMap();
        this.bindEvents();
        this.loadSampleData();
        this.initAnimations();
    }

    // Initialize Leaflet Map
    initMap() {
        if (document.getElementById('map')) {
            this.map = L.map('map').setView([20.5937, 78.9629], 5); // India center

            L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                attribution: '© OpenStreetMap contributors'
            }).addTo(this.map);

            // Force map to resize properly
            setTimeout(() => {
                this.map.invalidateSize();
            }, 200);

            // Initialize empty heatmap layer
            this.heatmapLayer = null;
        }
    }

    // Initialize Alora-style animations
    initAnimations() {
        // Initialize text animations if anime.js is available
        if (typeof anime !== 'undefined') {
            this.initTextAnimations();
        }

        // Initialize menu functionality
        this.initMenu();
    }

    // Initialize text animations
    initTextAnimations() {
        // Find all text with .tricks class and break each letter into a span
        var tricksWord = document.getElementsByClassName("tricks");
        for (var i = 0; i < tricksWord.length; i++) {
            var wordWrap = tricksWord.item(i);
            wordWrap.innerHTML = wordWrap.innerHTML.replace(/(^|<\\/?[^>]+>|\\s+)([^\\s<]+)/g, '$1<span class="tricksword">$2</span>');
        }

        var tricksLetter = document.getElementsByClassName("tricksword");
        for (var i = 0; i < tricksLetter.length; i++) {
            var letterWrap = tricksLetter.item(i);
            letterWrap.innerHTML = letterWrap.textContent.replace(/\\S/g, "<span class='letter'>$&</span>");
        }

        // Fade Up Animation
        var fadeUp = anime.timeline({
            loop: false,
            autoplay: false,
        });

        fadeUp.add({
            targets: '.fade-up .letter',
            translateY: [100,0],
            translateZ: 0,
            opacity: [0,1],
            easing: "easeOutExpo",
            duration: 1400,
            delay: (el, i) => 300 + 30 * i
        });

        // Fade Up 2 Animation
        var fadeUp2 = anime.timeline({
            loop: false,
            autoplay: false,
        });

        fadeUp2.add({
            targets: '.fade-up2 .letter',
            translateY: [100,0],
            translateZ: 0,
            opacity: [0,1],
            easing: "easeOutExpo",
            duration: 1400,
            delay: (el, i) => 300 + 30 * i
        });

        // Play animations
        setTimeout(() => {
            fadeUp.play();
            fadeUp2.play();
        }, 500);
    }

    // Initialize menu functionality
    initMenu() {
        const menuButton = document.querySelector('.menu-button');
        const navMenu = document.querySelector('.nav-menu');
        
        if (menuButton && navMenu) {
            menuButton.addEventListener('click', () => {
                menuButton.classList.toggle('w--open');
                navMenu.classList.toggle('w--open');
            });
        }
    }

    // Bind event listeners
    bindEvents() {
        // Filter change events
        const filters = document.querySelectorAll('.filter-select');
        filters.forEach(filter => {
            filter.addEventListener('change', () => this.applyFilters());
        });

        // File upload handling
        const fileInput = document.getElementById('media-upload');
        if (fileInput) {
            fileInput.addEventListener('change', this.handleFileUpload);
        }

        // Form submission
        const reportForm = document.getElementById('report-form');
        if (reportForm) {
            reportForm.addEventListener('submit', this.handleReportSubmission.bind(this));
        }

        // Get location button
        const locationBtn = document.getElementById('get-location');
        if (locationBtn) {
            locationBtn.addEventListener('click', this.getCurrentLocation.bind(this));
        }

        // Smooth scrolling for anchor links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth'
                    });
                }
            });
        });
    }

    // Load sample hazard data
    loadSampleData() {
        const sampleReports = [
            { 
                lat: 19.0760, 
                lng: 72.8777, 
                type: 'High Waves', 
                severity: 'high', 
                time: '2024-01-15 14:30',
                location: 'Mumbai Coast',
                description: 'Unusually high waves observed near Marine Drive'
            },
            { 
                lat: 13.0827, 
                lng: 80.2707, 
                type: 'Storm Surge', 
                severity: 'high', 
                time: '2024-01-15 12:15',
                location: 'Chennai Coast',
                description: 'Storm surge affecting coastal areas'
            },
            { 
                lat: 22.5726, 
                lng: 88.3639, 
                type: 'Coastal Flooding', 
                severity: 'low', 
                time: '2024-01-15 16:45',
                location: 'Kolkata Coast',
                description: 'Minor coastal flooding during high tide'
            },
            { 
                lat: 15.2993, 
                lng: 74.1240, 
                type: 'Abnormal Tides', 
                severity: 'medium', 
                time: '2024-01-15 11:20',
                location: 'Goa Coast',
                description: 'Abnormal tidal patterns observed'
            },
            { 
                lat: 11.9416, 
                lng: 79.8083, 
                type: 'High Waves', 
                severity: 'high', 
                time: '2024-01-15 13:10',
                location: 'Pondicherry Coast',
                description: 'High waves causing beach erosion'
            }
        ];

        this.displayReports(sampleReports);
        this.updateStats(sampleReports);
    }

    // Display reports on map
    displayReports(reports) {
        if (!this.map) return;

        // Clear existing markers
        this.markers.forEach(marker => this.map.removeLayer(marker));
        this.markers = [];

        // Add new markers with Alora-style popups
        reports.forEach(report => {
            const color = this.getSeverityColor(report.severity);
            const marker = L.circleMarker([report.lat, report.lng], {
                radius: 10,
                fillColor: color,
                color: '#fff',
                weight: 3,
                opacity: 1,
                fillOpacity: 0.8
            }).addTo(this.map);

            marker.bindPopup(`
                <div class="popup-content" style="
                    background: linear-gradient(135deg, #1dcdfe 0%, #34f5c5 100%);
                    color: white;
                    padding: 1rem;
                    border-radius: 8px;
                    box-shadow: 0 5px 15px rgba(0,0,0,0.2);
                ">
                    <h4 style="margin: 0 0 0.5rem 0; font-weight: 700;">${report.type}</h4>
                    <p style="margin: 0.25rem 0;"><strong>Location:</strong> ${report.location}</p>
                    <p style="margin: 0.25rem 0;"><strong>Severity:</strong> ${report.severity.toUpperCase()}</p>
                    <p style="margin: 0.25rem 0;"><strong>Time:</strong> ${report.time}</p>
                    <p style="margin: 0.5rem 0 0 0; font-size: 0.9rem;">${report.description}</p>
                </div>
            `);

            this.markers.push(marker);
        });

        // Create heatmap data
        const heatmapData = reports.map(report => [report.lat, report.lng, this.getSeverityWeight(report.severity)]);
        this.updateHeatmap(heatmapData);
    }

    // Update heatmap layer
    updateHeatmap(data) {
        if (typeof L !== 'undefined' && L.heatLayer) {
            if (this.heatmapLayer) {
                this.map.removeLayer(this.heatmapLayer);
            }
            this.heatmapLayer = L.heatLayer(data, {
                radius: 30,
                blur: 20,
                maxZoom: 17,
                gradient: {
                    0.2: '#34f5c5', 
                    0.5: '#1dcdfe', 
                    0.8: '#f39c12', 
                    1.0: '#e74c3c'
                }
            }).addTo(this.map);
            console.log('Heatmap created with', data.length, 'points');
        } else {
            console.log('Heatmap plugin not loaded');
        }
    }

    // Get severity color (Alora-inspired)
    getSeverityColor(severity) {
        const colors = {
            low: '#34f5c5',    // Aquamarine
            medium: '#1dcdfe', // Deep Sky Blue
            high: '#e74c3c'    // Red
        };
        return colors[severity] || '#95a5a6';
    }

    // Get severity weight for heatmap
    getSeverityWeight(severity) {
        const weights = { low: 0.3, medium: 0.6, high: 1.0 };
        return weights[severity] || 0.5;
    }

    // Apply filters
    applyFilters() {
        const hazardType = document.getElementById('hazard-type')?.value;
        const timeRange = document.getElementById('time-range')?.value;
        const severityFilter = document.getElementById('severity-filter')?.value;
        const location = document.getElementById('location-filter')?.value;

        console.log('Applying filters:', { hazardType, timeRange, severityFilter, location });
        
        // Show loading animation
        this.showNotification('Applying filters...', 'info');
        
        // Simulate filter application (replace with actual API call)
        setTimeout(() => {
            this.showNotification('Filters applied successfully!', 'success');
        }, 1000);
    }

    // Handle file upload
    handleFileUpload(event) {
        const files = event.target.files;
        const preview = document.getElementById('file-preview');
        
        if (preview) {
            preview.innerHTML = '';
            Array.from(files).forEach(file => {
                const div = document.createElement('div');
                div.className = 'file-item';
                div.style.cssText = `
                    background: linear-gradient(135deg, #1dcdfe 0%, #34f5c5 100%);
                    color: white;
                    padding: 0.5rem 1rem;
                    margin: 0.25rem 0;
                    border-radius: 20px;
                    font-size: 0.9rem;
                    display: inline-block;
                    margin-right: 0.5rem;
                `;
                div.textContent = file.name;
                preview.appendChild(div);
            });
        }
    }

    // Handle report form submission
    handleReportSubmission(event) {
        event.preventDefault();
        
        const formData = new FormData(event.target);
        const reportData = {
            hazardType: formData.get('hazard-type'),
            severity: formData.get('severity'),
            description: formData.get('description'),
            location: formData.get('location'),
            latitude: formData.get('latitude'),
            longitude: formData.get('longitude'),
            eventDate: formData.get('event-date'),
            eventTime: formData.get('event-time'),
            reporterName: formData.get('reporter-name'),
            reporterContact: formData.get('reporter-contact'),
            additionalInfo: formData.get('additional-info')
        };

        console.log('Report submitted:', reportData);
        
        // Show success message with Alora styling
        this.showNotification('Report submitted successfully! Thank you for contributing to coastal safety.', 'success');
        
        // Reset form
        event.target.reset();
        
        // Reset file preview
        const preview = document.getElementById('file-preview');
        if (preview) preview.innerHTML = '';
        
        // Set current date/time again
        const now = new Date();
        const date = now.toISOString().split('T')[0];
        const time = now.toTimeString().split(' ')[0].substring(0, 5);
        
        document.getElementById('event-date').value = date;
        document.getElementById('event-time').value = time;
    }

    // Get current location
    getCurrentLocation() {
        if (navigator.geolocation) {
            const button = document.getElementById('get-location');
            const originalText = button.innerHTML;
            button.innerHTML = '<span class="loading"></span> Getting location...';
            button.disabled = true;
            
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const lat = position.coords.latitude;
                    const lng = position.coords.longitude;
                    
                    document.getElementById('latitude').value = lat.toFixed(6);
                    document.getElementById('longitude').value = lng.toFixed(6);
                    
                    // Reverse geocoding (simplified)
                    document.getElementById('location').value = `${lat.toFixed(4)}, ${lng.toFixed(4)}`;
                    
                    button.innerHTML = originalText;
                    button.disabled = false;
                    this.showNotification('Location obtained successfully!', 'success');
                },
                (error) => {
                    button.innerHTML = originalText;
                    button.disabled = false;
                    this.showNotification('Unable to get location. Please enter manually.', 'error');
                    console.error('Geolocation error:', error);
                }
            );
        } else {
            this.showNotification('Geolocation is not supported by this browser.', 'error');
        }
    }

    // Update dashboard statistics
    updateStats(reports) {
        const stats = {
            total: reports.length,
            high: reports.filter(r => r.severity === 'high').length,
            medium: reports.filter(r => r.severity === 'medium').length,
            low: reports.filter(r => r.severity === 'low').length
        };

        // Animate stat numbers
        const statElements = {
            'total-reports': stats.total,
            'high-severity': stats.high,
            'medium-severity': stats.medium,
            'low-severity': stats.low
        };

        Object.entries(statElements).forEach(([id, value]) => {
            const element = document.getElementById(id);
            if (element) {
                this.animateNumber(element, 0, value, 1000);
            }
        });
    }

    // Animate number counting
    animateNumber(element, start, end, duration) {
        const startTime = performance.now();
        
        const animate = (currentTime) => {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            
            const current = Math.floor(start + (end - start) * progress);
            element.textContent = current;
            
            if (progress < 1) {
                requestAnimationFrame(animate);
            }
        };
        
        requestAnimationFrame(animate);
    }

    // Show notification with Alora styling
    showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        
        const colors = {
            success: 'linear-gradient(135deg, #34f5c5 0%, #1dcdfe 100%)',
            error: 'linear-gradient(135deg, #e74c3c 0%, #c0392b 100%)',
            info: 'linear-gradient(135deg, #1dcdfe 0%, #34f5c5 100%)'
        };
        
        notification.style.cssText = `
            position: fixed;
            top: 100px;
            right: 20px;
            background: ${colors[type]};
            color: white;
            padding: 1rem 2rem;
            border-radius: 25px;
            z-index: 10000;
            animation: slideIn 0.3s ease;
            box-shadow: 0 5px 15px rgba(0,0,0,0.2);
            font-weight: 500;
            max-width: 300px;
        `;
        
        notification.textContent = message;
        document.body.appendChild(notification);

        setTimeout(() => {
            notification.style.animation = 'slideOut 0.3s ease';
            setTimeout(() => {
                notification.remove();
            }, 300);
        }, 3000);
    }
}

// Initialize the platform when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.platform = new OceanHazardPlatform();
});

// Add CSS animations
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from { transform: translateX(100%); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
    }
    
    @keyframes slideOut {
        from { transform: translateX(0); opacity: 1; }
        to { transform: translateX(100%); opacity: 0; }
    }
    
    .file-item {
        background: linear-gradient(135deg, #1dcdfe 0%, #34f5c5 100%);
        color: white;
        padding: 0.5rem 1rem;
        margin: 0.25rem 0.5rem 0.25rem 0;
        border-radius: 20px;
        font-size: 0.9rem;
        display: inline-block;
        font-weight: 500;
    }
    
    .popup-content h4 {
        background: rgba(255,255,255,0.2);
        padding: 0.5rem;
        border-radius: 5px;
        margin: -0.5rem -0.5rem 0.5rem -0.5rem;
    }
    
    .w--open .nav-menu {
        display: block !important;
    }
    
    .nav-menu {
        display: none;
    }
`;
document.head.appendChild(style);