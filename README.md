# Zappy: Local Setup Guide

Follow these steps to run the Zappy project locally on your machine.

## Prerequisites
1. Ensure you have Docker installed and running.
2. Have Node.js and pnpm installed.
3. PostgreSQL database is required.

---

## Step 1: Add Environment Variables

Create a `.env` file for each service in your project and include the necessary database connection details (PostgreSQL URL, etc.).

Example `.env` file:
```env
DATABASE_URL=postgresql://username:password@localhost:5432/zappy
```

---

## Step 2: Set Up Kafka

- a great article by kafka [here](https://kafka.apache.org/quickstart)

### Option 1: Run Kafka Docker Container
Run the following command to start a Kafka container:
```bash
docker run -p 9092:9092 apache/kafka:3.9.0
```

If you already have a Kafka container, use the command below to start it:
```bash
docker start <container_id>
```

### Option 2: Access Kafka Container
If Kafka is running, access the container:
```bash
docker exec -it <container_id> /bin/bash
```

Once inside the container, navigate to the Kafka binary directory:
```bash
cd /opt/kafka/bin
```

---

## Step 3: Create Kafka Topic
Create a Kafka topic named `zap-events` by running the following command:
```bash
./kafka-topics.sh --create --topic zap-events --bootstrap-server localhost:9092
```

### Verify Topics
To list all topics:
```bash
./kafka-topics.sh --bootstrap-server localhost:9092 --list
```

---

## Step 4: Create Kafka Consumer
Create a consumer for the `zap-events` topic:
```bash
./kafka-console-consumer.sh --topic zap-events --from-beginning --bootstrap-server localhost:9092
```

---

## Step 5: Produce Messages to Kafka
### Option 1: From CLI
You can produce messages to the `zap-events` topic using the CLI:
```bash
./kafka-console-producer.sh --bootstrap-server localhost:9092 --topic zap-events
```
Enter a message and press Enter to send it.

### Option 2: From Node.js
The project includes a Node.js script to act as a producer. Refer to the relevant script in the codebase to produce events programmatically.

---

## You're All Set!
Your Zappy project should now be ready to run locally. For any issues, refer to the logs or project documentation.

