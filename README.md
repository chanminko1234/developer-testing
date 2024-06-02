# Real Estate Property Search Feature

This repository contains a real estate property search feature developed using Next.js, MySQL, and GraphQL. The search feature allows users to filter properties based on sale or rent, price range, number of bedrooms, and area. Additionally, the listing page displays the project name, short title, price, bedroom count, area, short description, and an image gallery that supports mouse interaction on PCs and swipe gestures on mobile devices. The project aims to achieve a Google Insight score of 95 or higher and handle a large number of fake properties to test query performance.

## Features

- Search properties based on sale or rent or buy, price range, number of bedrooms, and area.
- Search autocomplete feature to assist users in quickly finding properties.
- Listing page displaying property details including project name, title, price, bedroom count, bathroom count, description, and image gallery.
- Image gallery supports mouse interaction on PCs and swipe gestures on mobile devices.
- Google Insight score optimization.
- Performance testing with a large number of fake properties.

## Technologies Used

- Next.js: React framework for building server-side rendered applications.
- MySQL: Relational database management system for storing property data.
- GraphQL: Query language for interacting with the server.
- Apollo Server: GraphQL server implementation.
- Nexus: GraphQL schema definition and code-first approach library.
- Docker Compose: Tool for defining and running multi-container Docker applications.

## Getting Started

### Prerequisites

- Docker installed on your machine.

### Installation

1. **Clone the repository:**

    ```bash
    git clone https://github.com/chanminko1234/developer-testing.git real-estate-property-search
    ```

2. **Navigate to the project directory:**

    ```bash
    cd real-estate-property-search
    ```

3. **Start MySQL database using Docker Compose:**

    ```bash
    docker-compose up -d
    ```

4. **Open your browser and navigate to [http://localhost:3000](http://localhost:3000) to access the application.**

### Optional

5. **Seed the database with 1,000,000 fake records:**

   To populate the database with a large dataset for performance testing, you can use the following command:

   ```bash
   npx prisma db seed 1000000
