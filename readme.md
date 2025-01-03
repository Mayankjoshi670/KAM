# Udaan Assignment - Lead Management System

### Project Overview
This system can be used by Key Account Managers (KAMs) to manage restaurant leads. The key features include adding, updating, and deleting restaurants, managing order details, restaurant POC (Point of Contact) details, and storing/retrieving call history. Additionally, it helps to track the performance of leads by identifying well-performing and underperforming leads. It can also determine which leads require a call today.

# Project Specialties

## 1. Hosted Live
The project is hosted live and is accessible over the internet. It can be accessed from both the development (`localhost`) and production environments with separate URLs for API endpoints.

- **Localhost URL:** `http://localhost:5000`
- **Production URL:** `https://kam-16kr.onrender.com`

---

## 2. REST APIs
The project utilizes RESTful APIs to interact with the backend. These APIs handle various functionalities such as fetching, creating, updating, and deleting data. The endpoints are well-defined and follow a clean structure for easy consumption by clients.

- **RESTful API Endpoints** are designed to be consistent and intuitive.
- **HTTP Methods** used: `GET`, `POST`, `DELETE`.

---

## 3. MySQL as Database
The project uses **MySQL** as its database management system. MySQL ensures fast and reliable storage and retrieval of data, providing strong support for relational data structures.

- **Database used:** MySQL
- Ensures data integrity and supports complex queries with optimized performance.

---

## 4. Best Structuring of Files
The project follows best practices for file structuring to ensure scalability and maintainability. The code is well-organized into appropriate folders, separating concerns between different components such as models, controllers, routes, and services.

- **File Structure Example:**
    - `models/` - For database models
    - `controllers/` - For business logic
    - `routes/` - For defining API routes
    - `services/` - For additional utilities and services

---

## 5. Extra Features like Peak Time
The project includes additional features like **Peak Time** functionality, which tracks and identifies the busiest times for restaurants. This feature can help the businesses optimize their operations and improve customer service.

- **Peak Time Feature**: Allows restaurants to track peak operational hours and make data-driven decisions.

---

## 6. Containerized the App
The application is containerized using **Docker**. Docker enables the app to run consistently across various environments (development, testing, production) by encapsulating the app in containers. This ensures smooth deployment and scalability.

- **Docker**: Used to containerize the application for easy deployment and management.
- Benefits:
  - Consistent environments
  - Easy to scale
  - Isolation of services


# System Requirements

- **Node.js 16.x** or higher
- **Docker** (for containerized setup)

### Installation and Running Instructions

1. **Extract the zip file** into your desired directory.

2. Navigate to the project folder:
   ```bash
   cd <project-folder>
   ```
 ### Install dependencies:
 ```npm install ```

### Run the server locally:

```
npm run dev
```
## This will start the server at http://localhost:5000.
## Base server link is https://kam-16kr.onrender.com
### Docker Setup
To run the project inside a Docker container, follow the instructions below:

### Build the Docker Image:

#### Copy code
```docker build -t my-node-app .```

####  Run the Docker Container:

```
docker run -p 5000:5000 my-node-app 
```

 ### The app will be available at http://localhost:5000
 
 
 
 
 
 # API Structure

## Localhost API Endpoints

### 1. `GET` - Fetch Leads
**URL:** `http://localhost:5000/api/v1/lead`

**Production URL:** `https://kam-16kr.onrender.com/api/v1/lead` 

**Description:**  
Fetch all the leads from the database.

**Response:**
- Status: 200 OK
- Body: A list of lead objects.

---

### 2. `POST` - Create a New Lead
**URL:** `http://localhost:5000/api/v1/lead`
**Production URL:** `https://kam-16kr.onrender.com/api/v1/lead` 

**Request Body:**
```json
{
  "name": "Pank",
  "address": "NO address",
  "status": "active",
  "frequency": "monthly"
}
```

### 3. `DELETE` - Delete a  Lead
**URL:** `http://localhost:5000/api/v1/lead/102`
**Production URL:** `https://kam-16kr.onrender.com/api/v1/lead/102` 

**Response:**
- Status: 200 OK
- Body: delete the lead .
```


```
### 4. `GET` - Fetch Well Performing Restaurants
**URL:** `http://localhost:5000/api/v1/restaurant/well_performing`  
**Production URL:** `https://kam-16kr.onrender.com/api/v1/restaurant/well_performing`

**Description:**  
Fetch all the well-performing restaurants from the database.

**Response:**
- Status: 200 OK
- Body: A list of well-performing restaurant objects.

---

### 5. `GET` - Fetch Underperforming Restaurants
**URL:** `http://localhost:5000/api/v1/restaurant/under_performing`  
**Production URL:** `https://kam-16kr.onrender.com/api/v1/restaurant/under_performing`

**Description:**  
Fetch all the underperforming restaurants from the database.

**Response:**
- Status: 200 OK
- Body: A list of underperforming restaurant objects.

### 6. `GET` - Fetch Peak Time for Restaurants
**URL:** `http://localhost:5000/api/v1/restaurant/peak_time`  
**Production URL:** `https://kam-16kr.onrender.com/api/v1/restaurant/peak_time`

**Description:**  
Fetch the peak time for restaurants from the database.

**Response:**
- Status: 200 OK
- Body: The peak time data for the restaurant(s).
 ```
 
 ```
 ### 7. `POST` - Add new call 
**URL:** `http://localhost:5000/api/v1/manage/call`

**Production URL:** `https://kam-16kr.onrender.com/api/v1/manage/call` 

**Request Body:**
```json
{
    "contactId":101 , 
    "restaurantId":101  
}


```
### 8. `GET` - Fetch Leads
**URL:** `http://localhost:5000/api/v1/manage/calldetails`

**Production URL:** `https://kam-16kr.onrender.com/api/v1/manage/calldetails` 

**Description:**  
Get all calls for today.

**Response:**
- Status: 200 OK
- Body: A list of lead objects.



### 9. `GET` - Fetch Leads
**URL:** `http://localhost:5000/api/v1/manage/call/100`

**Production URL:** `https://kam-16kr.onrender.com/api/v1/manage/call/100` 

**Description:**  
Get last call with the id .

**Response:**
- Status: 200 OK
- Body: A list of lead objects.





### 10. `POST` - Create a New Lead
**URL:** `http://localhost:5000/api/v1/interactions/call`

**Production URL:** `https://kam-16kr.onrender.com/api/v1/interactions/call` 

**Request Body:**
```json
{
  "contactId":101 ,  
   "restaurantId":100 

}

```
### 11. `POST` - Create a New Lead
**URL:** `http://localhost:5000/api/v1/interactions/order`

**Production URL:** `https://kam-16kr.onrender.com/api/v1/interactions/order` 

**Request Body:**
```json
{
     "restaurantId":102,
      "amount":2000
}

```
### 12. `GET` - Fetch Leads
**URL:** `http://localhost:5000/api/v1/interactions/102`

**Production URL:** `https://kam-16kr.onrender.com/api/v1/interactions/102` 

**Description:**  
Gets all intraction  .

**Response:**
- Status: 200 OK
- Body: A list of lead objects.

