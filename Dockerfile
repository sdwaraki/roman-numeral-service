FROM mcr.microsoft.com/openjdk/jdk:17-ubuntu

VOLUME /tmp

ARG JAR_FILE=target/roman-numeral-service-0.0.1-SNAPSHOT.jar
COPY ${JAR_FILE} /app.jar

EXPOSE 8080

ENTRYPOINT ["java","-jar","/app.jar"]