-- MySQL dump 10.13  Distrib 8.0.34, for Win64 (x86_64)
--
-- Host: localhost    Database: todo
-- ------------------------------------------------------
-- Server version	8.0.34

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `project`
--

DROP TABLE IF EXISTS `project`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `project` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `created_date` datetime(6) DEFAULT NULL,
  `title` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `project`
--

LOCK TABLES `project` WRITE;
/*!40000 ALTER TABLE `project` DISABLE KEYS */;
INSERT INTO `project` VALUES (6,'2024-10-28 09:02:39.100996','Todo Appln'),(7,'2024-10-28 10:32:44.073196','Todo Application3'),(8,'2024-10-29 22:44:08.314518','Todo Application5'),(10,'2024-11-01 15:51:14.099645','Push the changes'),(11,'2024-11-01 16:11:24.567519','commit the changes'),(12,'2024-11-01 18:35:00.142159','Complete TODO Project'),(13,'2024-11-01 19:16:01.305102','Project complete');
/*!40000 ALTER TABLE `project` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `todo`
--

DROP TABLE IF EXISTS `todo`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `todo` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `created_date` datetime(6) DEFAULT NULL,
  `description` varchar(255) DEFAULT NULL,
  `status` varchar(255) DEFAULT NULL,
  `updated_date` datetime(6) DEFAULT NULL,
  `project_id` bigint DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FKar5jun3w6snk3ymjm3uth2w34` (`project_id`),
  CONSTRAINT `FKar5jun3w6snk3ymjm3uth2w34` FOREIGN KEY (`project_id`) REFERENCES `project` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=32 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `todo`
--

LOCK TABLES `todo` WRITE;
/*!40000 ALTER TABLE `todo` DISABLE KEYS */;
INSERT INTO `todo` VALUES (11,'2024-10-28 09:03:34.687013','Complete the backend and databse setup','Done','2024-11-01 18:15:25.326186',6),(12,'2024-10-28 09:03:48.963763','complete the total setup','Pending','2024-10-28 09:03:50.497080',6),(15,'2024-10-29 22:44:15.082861','Login Form','Done','2024-11-01 18:13:31.257416',8),(16,'2024-10-29 22:44:24.185620','Google Form','Done','2024-11-01 18:27:28.164420',8),(17,'2024-10-29 23:07:50.370408','Project completed ','Done','2024-11-01 18:27:34.841154',8),(22,'2024-11-01 11:28:22.157677','complete by EOD','Pending','2024-11-01 16:33:00.541579',7),(26,'2024-11-01 16:11:24.568519','push changes to production','Done','2024-11-01 16:11:24.568519',11),(27,'2024-11-01 16:22:47.091272','change the layout','Done','2024-11-01 16:23:34.868810',8),(28,'2024-11-01 16:26:02.721759','submit the form','Done','2024-11-01 19:15:33.897004',8),(29,'2024-11-01 18:33:52.068286','Commit the changes to JIRA','Pending','2024-11-01 18:33:52.068286',10),(30,'2024-11-01 18:35:00.142159','status changing is not working properly and dont know about edit button','Done','2024-11-01 19:12:21.778151',12),(31,'2024-11-01 19:16:01.305102','Complete the project','Done','2024-11-01 19:16:10.897811',13);
/*!40000 ALTER TABLE `todo` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-11-02 11:27:53
