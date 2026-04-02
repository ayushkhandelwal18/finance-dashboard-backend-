# Finance Dashboard Backend

A robust, role-based backend system designed for comprehensive financial management and dashboard analytics. This project serves as the foundational core for managing financial records securely, tracking expenses alongside income streams, and calculating system-wide aggregations.

## Tech Stack

- **Node.js**: Asynchronous event-driven JavaScript runtime.
- **Express.js**: Fast, unopinionated, minimalist web framework.
- **MongoDB (Mongoose)**: NoSQL database with elegant object modeling.
- **JWT Authentication**: Secure, stateless JSON Web Token protocol.
- **Bcrypt**: Robust password-hashing algorithm.
- **Express Rate Limit**: Brute-force protection middleware.
- **Joi**: Powerful schema description language and data validator.

## Features

- **JWT authentication**: Secure login mechanism offering stateless identity verification.
- **Role-based access control**: Specialized hierarchy utilizing Viewer, Analyst, and Admin tiers.
- **Financial records CRUD**: Integrated creation, deletion, updating, and traversal of financial trails.
- **Filtering, search, and pagination**: Deep query processing capability for robust dataset traversal.
- **Dashboard analytics**: Computation-heavy aggregation layers serving summaries, categorical groups, trends, and recent history natively executed over MongoDB.
- **Soft delete functionality**: Preserves historical data footprint securely without permanently dropping rows.
- **Rate limiting**: Throttled login entries enhancing overall API security.
- **Input validation and error handling**: Centralized exception flow preventing unsanitized entries while delivering clean JSON payloads.

## Project Structure

- **`controllers/`**: Central business logic handling request streams and formatting outgoing parameters.
- **`routes/`**: URI definition mappings directing endpoints securely towards their respective controllers.
- **`models/`**: MongoDB schema templates structurally dictating data shape parameters.
- **`middlewares/`**: Interceptive boundary logic covering security validations, token checks, and exception management.
- **`services/`**: Expandable generic integrations logic domain.
- **`utils/`**: Standardized reusable helpers representing format structures uniquely serving ApiError and ApiResponse.
- **`config/`**: Native mappings structuring environmental components natively mapped against MongoDB logic bounds.

## Installation and Setup

1. **Clone the repository**
```bash
git clone <repository-url>
cd finance_dashboard_backend
```

2. **Install dependencies**
```bash
npm install
```

3. **Environment Setup**
Create a `.env` file within the system root directory containing:
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/finance_dashboard
JWT_SECRET=your_jwt_secret_key
JWT_EXPIRES_IN=1d
CORS_ORIGIN=*
NODE_ENV=development
```

4. **Run Application**
```bash
# For Development (hot-reloading)
npm run dev

# For Production
npm start
```

## API Documentation

### Authentication APIs

#### Register Account
Creates a new system entity granting access.
- **Method**: POST
- **Body**: 
  ```json
  {
    "name": "Jane Doe",
    "email": "jane@example.com",
    "password": "securepassword123",
    "role": "analyst"
  }
  ```
- **Response**: `{ "success": true, "message": "User registered successfully", "data": { "user": {...}, "token": "..." } }`

#### Account Login
Authenticates utilizing system credentials returning a signed token flow.
- **Method**: POST
- **Body**:
  ```json
  {
    "email": "jane@example.com",
    "password": "securepassword123"
  }
  ```
- **Response**: `{ "success": true, "message": "User logged in successfully", "data": { "user": {...}, "token": "..." } }`

### User Management APIs

#### Retrieve Users
Fetches all active user accounts resolving natively downward.
- **Method**: GET
- **Response**: `{ "success": true, "message": "Users retrieved successfully", "data": { "users": [...] } }`

#### Update User
Modifies target user privileges or activity metrics systematically mapped against role.
- **Method**: PATCH
- **Body**:
  ```json
  {
    "role": "admin",
    "isActive": false
  }
  ```
- **Response**: `{ "success": true, "message": "User updated successfully", "data": { "user": {...} } }`

### Financial Record APIs

#### Create Record
Initializes a new financial statement bound deeply to the authorized entity.
- **Method**: POST
- **Body**:
  ```json
  {
    "amount": 1500,
    "type": "income",
    "category": "Salary",
    "date": "2026-04-01T00:00:00.000Z",
    "notes": "March salary compensation"
  }
  ```
- **Response**: `{ "success": true, "message": "Record created successfully", "data": { "record": {...} } }`

#### Retrieve Records
Fetches financial records mapping timeline limitations while applying standard pagination controls.
- **Method**: GET
- **Query Parameters**: `page`, `limit`, `type`, `category`, `startDate`, `endDate`
- **Response**: `{ "success": true, "message": "Records retrieved successfully", "data": { "records": [...], "pagination": {...} } }`

#### Update Record
Safely rewrites inner object fields enforcing Joi structure parameters conditionally.
- **Method**: PATCH
- **Body**:
  ```json
  {
    "amount": 1600,
    "notes": "Adjusted compensation"
  }
  ```
- **Response**: `{ "success": true, "message": "Record updated successfully", "data": { "record": {...} } }`

#### Soft Delete Record
Marks the target dimension utilizing internal state triggers functionally omitting trace results automatically later cleanly.
- **Method**: DELETE
- **Response**: `{ "success": true, "message": "Record deleted successfully", "data": {} }`

### Dashboard Aggregate APIs

#### Aggregated Summary
Calculates aggregate total income alongside general total expense yielding static balances safely.
- **Method**: GET
- **Response**: `{ "success": true, "message": "Summary retrieved successfully", "data": { "totalIncome": 1500, "totalExpense": 0, "netBalance": 1500 } }`

#### Category Distribution
Parses internal numerical flows resolving entirely isolated sums mapping dynamically against established categorical metrics cleanly.
- **Method**: GET
- **Response**: `{ "success": true, "message": "Category distribution retrieved successfully", "data": { "categories": [...] } }`

#### Financial Trends
Quantifies isolated transactional blocks directly categorized securely per-month mapping explicit differences directly internally.
- **Method**: GET
- **Response**: `{ "success": true, "message": "Trends retrieved successfully", "data": { "trends": { "2026-04": {...} } } }`

#### Recent Operations
Gauges timeline components parsing heavily descending timeline traces yielding direct limits.
- **Method**: GET
- **Response**: `{ "success": true, "message": "Recent transactions retrieved successfully", "data": { "recent": [...] } }`

## Authentication Guide

1. Resolve the target server explicitly mapping authentication login algorithms sequentially executing parameters correctly.
2. Retain the resulting JWT Token trace payload. 
3. Explicitly execute logic supplying header checks utilizing string formatting sequentially.
   ```http
   Authorization: Bearer <token>
   ```

## Role Permissions Table

| Privilege   | Viewer | Analyst | Admin |
| ----------- | :----: | :-----: | :---: |
| Access Dashboard Analytics | ❌ | ✅ | ✅ |
| Retrieve Records           | ✅ | ✅ | ✅ |
| Perform Record Changes     | ❌ | ❌ | ✅ |
| Retrieve System Accounts   | ❌ | ❌ | ✅ |
| Adjust System Accounts     | ❌ | ❌ | ✅ |

## Error Handling

Guaranteed consistent response payloads ensuring standardized implementation execution across platforms safely locking payloads globally down structurally. 
```json
{
  "success": false,
  "message": "Resource not found",
  "data": null
}
```

## Testing Instructions

1. Initialize **Postman** or **Thunder Client**.
2. Target authentication components validating account creation seamlessly.
3. Map authorization payloads generating keys efficiently sequentially mapping variables actively fetching Bearer values logically.
4. Execute token checks assigning token results mapped inside Header values uniformly.
5. Recursively invoke aggregate structures matching route criteria correctly mapping sequential steps efficiently down logically. 

## Assumptions

- **Headless Build**: Native backend mappings structuring pure integration systems safely explicitly rendering API outputs gracefully exclusively explicitly without Frontend ties actively. 
- **Hierarchical Depth**: Role allocations map natively preserving integrity logic limits strictly linearly executing.
- **Immutable Preservations**: Native modification actions leverage Soft Delete sequences mapping internal dimension results maintaining native integrity footprint securely dynamically cleanly.
