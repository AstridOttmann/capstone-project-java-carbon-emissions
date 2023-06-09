FROM openjdk:19
ENV ENVIRONMENT=prod
LABEL maintainer="name"
EXPOSE 8080
# /app entspricht pom.xml Tag <finalName> und jar <packaging>
ADD backend/target/app.jar app.jar
CMD [ "sh", "-c", "java -jar /app.jar" ]