# URL Shortener

## Description
A simple URL shortener service that takes long URLs and converts them into shorter, more manageable links.

## Features
- Shorten long URLs
- Redirect to original URLs using the shortened links
- Track the number of times a shortened URL has been accessed

## Installation
1. Clone the repository:
    ```sh
    git clone https://github.com/Piyu-Pika/url-shortener.git
    ```
2. Navigate to the project directory:
    ```sh
    cd url-shortener
    ```
3. Install dependencies:
    ```sh
    npm install
    ```

## Usage
1. Start the server:
    ```sh
    npm start
    ```
2. Open your browser and navigate to `http://localhost:3000`.

## API Endpoints
- `POST /shorten`: Shorten a long URL
- `GET /:shortUrl`: Redirect to the original URL
- `GET /:shortUrl/stats`: Get statistics for a shortened URL

## Contributing
1. Fork the repository
2. Create a new branch (`git checkout -b feature-branch`)
3. Commit your changes (`git commit -am 'Add new feature'`)
4. Push to the branch (`git push origin feature-branch`)
5. Create a new Pull Request

## License
This project is licensed under the MIT License.
