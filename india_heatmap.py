# Copyright (c) 2025 CoastSense Project
# Licensed under MIT License
# See LICENSE file for details

import folium
import pandas as pd
import requests

# Step 1: Load geographical data for Indian states
def load_india_geojson():
    try:
        # Using a public GeoJSON for Indian states
        url = "https://raw.githubusercontent.com/geohacker/india/master/state/india_state.geojson"
        response = requests.get(url)
        response.raise_for_status()
        geojson_data = response.json()
        return geojson_data
    except Exception as e:
        print(f"Error loading GeoJSON: {e}")
        return None

# Step 2: Prepare sample data points (e.g., population density)
def prepare_sample_data():
    # Sample data: State-wise population density (people per sq km) - approximate values
    data = {
        'state_name': ['Andhra Pradesh', 'Arunachal Pradesh', 'Assam', 'Bihar', 'Chhattisgarh', 'Goa', 'Gujarat', 'Haryana', 'Himachal Pradesh', 'Jammu and Kashmir', 'Jharkhand', 'Karnataka', 'Kerala', 'Madhya Pradesh', 'Maharashtra', 'Manipur', 'Meghalaya', 'Mizoram', 'Nagaland', 'Odisha', 'Punjab', 'Rajasthan', 'Sikkim', 'Tamil Nadu', 'Telangana', 'Tripura', 'Uttar Pradesh', 'Uttarakhand', 'West Bengal', 'Andaman and Nicobar Islands', 'Chandigarh', 'Dadra and Nagar Haveli', 'Daman and Diu', 'Delhi', 'Jammu and Kashmir', 'Lakshadweep', 'Ladakh', 'Puducherry'],
        'population_density': [308, 17, 398, 1102, 189, 394, 308, 573, 123, 297, 414, 319, 859, 236, 365, 122, 52, 52, 17, 269, 551, 200, 86, 555, 312, 60, 829, 189, 1029, 44, 904, 970, 774, 11297, 297, 2.8, 208, 3182]
    }
    df = pd.DataFrame(data)
    return df

# Step 3: Generate base map centered on India
def create_base_map():
    # Center on India: latitude ~20.5937, longitude ~78.9629, zoom ~5
    m = folium.Map(location=[20.5937, 78.9629], zoom_start=5, tiles='OpenStreetMap')
    return m

# Step 4: Apply heatmap layer using Choropleth
def add_heatmap_layer(m, geojson_data, df):
    # Create a Choropleth map for heatmap visualization
    folium.Choropleth(
        geo_data=geojson_data,
        name='Population Density Heatmap',
        data=df,
        columns=['state_name', 'population_density'],
        key_on='feature.properties.NAME_1',  # State name
        fill_color='YlOrRd',
        fill_opacity=0.7,
        line_opacity=0.2,
        legend_name='Population Density (per sq km)',
        highlight=True
    ).add_to(m)

# Step 5: Add interactive features
def add_interactive_features(m, geojson_data, df):
    # Add tooltips
    folium.GeoJson(
        geojson_data,
        name='State Boundaries',
        tooltip=folium.GeoJsonTooltip(
            fields=['NAME_1'],
            aliases=['State Name:'],
            localize=True
        )
    ).add_to(m)

    # Add layer controls
    folium.LayerControl().add_to(m)

    # Add legend (Choropleth already includes a legend)

# Step 6: Handle edge cases
def handle_edge_cases(df):
    # Fill missing values with mean
    df['population_density'] = df['population_density'].fillna(df['population_density'].mean())
    # Handle data sparsity: If data is sparse, use default values
    if df.empty:
        print("Warning: Sample data is empty. Using default values.")
        df = pd.DataFrame({'state_code': ['IN'], 'population_density': [300]})
    return df

# Main function
def main():
    # Load data
    geojson_data = load_india_geojson()
    if geojson_data is None:
        print("Failed to load geographical data. Exiting.")
        return

    df = prepare_sample_data()
    df = handle_edge_cases(df)

    # Create map
    m = create_base_map()

    # Add layers
    add_heatmap_layer(m, geojson_data, df)
    add_interactive_features(m, geojson_data, df)

    # Save to HTML
    m.save('india_heatmap.html')
    print("Heatmap saved as 'india_heatmap.html'. Open in a web browser to view.")

if __name__ == "__main__":
    main()