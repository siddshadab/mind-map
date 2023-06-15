# Mind-Map

This Mind-Map contains a frontend and a backend application for user authentication.

## Folder Structure

After creation, your project should look like this:


## Backend

The backend application is built with Spring Boot and is located in the `be/userAuth` directory.

### Prerequisites

- Java Development Kit (JDK) 17 (https://adoptium.net/en-GB/download/)
- Apache Maven (https://maven.apache.org)
- PostgreSQL

### Installation

1. Open a terminal and navigate to the `be/userAuth` directory.
2. Run the following command to build the backend application:

   ```shell
   mvn clean install

### Configuration

Open the application.properties file in the src/main/resources directory.

Set the database connection details (URL, username, password, etc.):

```
spring.datasource.url= jdbc:postgresql://localhost:5432/mindmapper?stringtype=unspecified useSSL=false&serverTimezone=UTC&useLegacyDatetimeCode=false
spring.datasource.username= root
spring.datasource.password= root
#spring.datasource.driver-class-name=com.mysql.cj.jdbc.Driver
spring.jpa.properties.hibernate.dialect = org.hibernate.dialect.PostgreSQLDialect

```

Make sure on first run 

```
spring.jpa.hibernate.ddl-auto= update

```
to 
```
spring.jpa.hibernate.ddl-auto= create

```

after first sucessfull run if all tables created in database revert it back to update



Replace jdbc:mysql://localhost:3306/mydatabase with the URL of your database and root and password with your database credentials.

Running the Application
Run the following command to start the backend application:

```
mvn spring-boot:run
```

The backend API will be accessible at http://localhost:9092 

## Frontend
The frontend application is built with React.js and is located in the root directory.

### Prerequisites

- Node.js (https://nodejs.org)
- Yarn package manager (https://yarnpkg.com)

### Installation
Open a terminal and navigate to the root directory.

Run the following command to install the dependencies:

```
Yarn
```

### Running the Application

Run the following command to start the frontend application:

```
Yarn start
```

Open a web browser and navigate to http://localhost:3000 to access the application.

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

## License
