# Torino API

A simple travel agency backend built with Node.js and Express.

## Installation

1. Clone the repository:

   ```sh

   git clone https://github.com/hooman-nourbakhsh/Torino-Api.git
   cd Torino-Api
   ```

2. Create a `.env` file in the root directory and add the following:

   ```env
   BASE_URL=http://localhost || https://real-domain.com
   PORT=6500
   JWT_SECRET= Some_Random_String_For_Secret_Key
   ```

3. Install dependencies:
   ```sh
   npm install
   ```

## Usage

- Start the server:

  ```sh
  npm start
  ```

- Start the server in development mode (with Nodemon):
  ```sh
  npm run dev
  ```

## Dependencies

- Express
- Mongoose
- JSON Web Token (JWT)
- CORS
- Dotenv
- Swagger UI Express
- UUID
