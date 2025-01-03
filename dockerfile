FROM node:16-alpine
 
WORKDIR /app
 
COPY package*.json ./
 
RUN npm install --production
 
COPY . .
 
EXPOSE 5000
 
CMD ["node", "index.js"]




# Build the Docker Image
# docker build -t my-node-app .

# Run the Docker Container
# docker run -p 5000:5000 my-node-app
# Lead Management System

## Project Overview
This project is a lead management system that allows you to manage, interact with, and track the status of leads and restaurants. The system supports multiple functionalities like adding and managing leads, tracking performance, managing calls, and recording interactions.

## System Requirements
- Node.js version > 20
- MySQL Database

## Installation Instructions

Follow the steps below to set up and run the project locally:

### 1. **Unzip the project folder:**
   Since the project is provided as a zip file, unzip it to your desired directory.

### 2. **Install Dependencies:**
   After unzipping the folder, navigate into the project directory and run the following command to install the required dependencies:
   ```bash
   npm install
3. Create .env file:
Create a .env file in the root directory and add the following configuration:

env
Copy code
PORT=5000
MYSQL_HOST='127.0.0.1'
MYSQL_USER='root'
MYSQL_PASSWORD='Mayank@123'
MYSQL_DB='db'
4. Run the Development Server:
To run the project locally, start the development server using the following command:

bash
Copy code
npm run dev
The server will be running at http://localhost:5000.

Docker Setup
To run the project inside a Docker container, follow the steps below.

1. Dockerfile
Create a Dockerfile in the root directory with the following content:

dockerfile
Copy code
FROM node:16-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install --production

COPY . .

EXPOSE 5000

CMD ["node", "index.js"]
2. Build the Docker Image
Open a terminal in the project directory and run the following command to build the Docker image:

bash
Copy code
docker build -t my-node-app .
3. Run the Docker Container
After building the Docker image, run the container with the following command:

bash
Copy code
docker run -p 5000:5000 my-node-app
This will run the project on port 5000 inside the container.

API Documentation
Lead Management
Get All Leads
Endpoint: GET /api/v1/lead
Description: Fetch all leads.
Production URL: https://kam-16kr.onrender.com/api/v1/lead
Add New Lead
Endpoint: POST /api/v1/lead
Request Body:
json
Copy code
{
  "name": "Pank",
  "address": "NO address",
  "status": "active",
  "frequency": "monthly"
}
Description: Add a new lead to the system.
Production URL: https://kam-16kr.onrender.com/api/v1/lead
Delete a Lead
Endpoint: DELETE /api/v1/lead/:id
Description: Delete a lead by its ID.
Example: DELETE /api/v1/lead/102
Production URL: https://kam-16kr.onrender.com/api/v1/lead/102
Performance Tracking
Get Well-Performing Restaurants
Endpoint: GET /api/v1/restaurant/well_performing
Description: Fetch well-performing restaurants.
Production URL: https://kam-16kr.onrender.com/api/v1/restaurant/well_performing
Get Under-Performing Restaurants
Endpoint: GET /api/v1/restaurant/under_performing
Description: Fetch under-performing restaurants.
Production URL: https://kam-16kr.onrender.com/api/v1/restaurant/under_performing
Get Peak Time Data
Endpoint: GET /api/v1/restaurant/peak_time
Description: Fetch peak time data for restaurants.
Production URL: https://kam-16kr.onrender.com/api/v1/restaurant/peak_time
Call Management
Add New Call
Endpoint: POST /api/v1/manage/call
Request Body:
json
Copy code
{
  "contactId": 101,
  "restaurantId": 101
}
Description: Add a new call entry.
Production URL: https://kam-16kr.onrender.com/api/v1/manage/call
Get Call Details for Today
Endpoint: GET /api/v1/manage/calldetails
Description: Fetch all calls made today.
Production URL: https://kam-16kr.onrender.com/api/v1/manage/calldetails
Get Last Call Details
Endpoint: GET /api/v1/manage/call/:id
Description: Fetch the details of the last call made.
Example: GET /api/v1/manage/call/100
Production URL: https://kam-16kr.onrender.com/api/v1/manage/call/100
Interactions
Record a Call Interaction
Endpoint: POST /api/v1/interactions/call
Request Body:
json
Copy code
{
  "contactId": 101,
  "restaurantId": 100
}
Description: Record a call interaction.
Production URL: https://kam-16kr.onrender.com/api/v1/interactions/call
Record an Order Interaction
Endpoint: POST /api/v1/interactions/order
Request Body:
json
Copy code
{
  "restaurantId": 102,
  "amount": 2000
}
Description: Record an order interaction.
Production URL: https://kam-16kr.onrender.com/api/v1/interactions/order
Get Interaction Details
Endpoint: GET /api/v1/interactions/:id
Description: Fetch details of an interaction by ID.
Example: GET /api/v1/interactions/102
Production URL: https://kam-16kr.onrender.com/api/v1/interactions/102
Notes:
Replace localhost:5000 with your production URL for live requests.
Ensure MySQL server is running and configured as per .env file before starting the application.
vbnet
Copy code

This `README.md` is now a comprehensive file that includes installation steps, Docker setup, API documentation, and production URLs. Let me know if you need any more adjustments!