# ----------- Build Stage -----------
FROM node:20 AS ui-build
WORKDIR /ui
COPY ui/ ./ui/
WORKDIR /ui/ui
RUN npm install
RUN npm run build

# ----------- Backend Build Stage -----------
FROM maven:3.9.6-eclipse-temurin-17 AS backend-build
WORKDIR /app
COPY . .
# Copy the built React UI into Spring Boot static resources
RUN rm -rf src/main/resources/static/*
COPY --from=ui-build /ui/ui/build/ ./src/main/resources/static/
RUN ./mvnw clean package -DskipTests

# ----------- Runtime Stage -----------
FROM mcr.microsoft.com/openjdk/jdk:17-ubuntu
WORKDIR /app
COPY --from=backend-build /app/target/roman-numeral-service-0.0.1-SNAPSHOT.jar app.jar

EXPOSE 8080
ENTRYPOINT ["java", "-jar", "app.jar"]