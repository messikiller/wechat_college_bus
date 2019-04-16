
/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;
DROP TABLE IF EXISTS `migrations`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `migrations` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `migration` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `batch` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

LOCK TABLES `migrations` WRITE;
/*!40000 ALTER TABLE `migrations` DISABLE KEYS */;
INSERT INTO `migrations` VALUES (1,'2014_10_12_000000_create_users_table',1),(2,'2014_10_12_100000_create_password_resets_table',1);
/*!40000 ALTER TABLE `migrations` ENABLE KEYS */;
UNLOCK TABLES;
DROP TABLE IF EXISTS `t_charter_bus_records`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `t_charter_bus_records` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `user_id` int(11) unsigned NOT NULL DEFAULT '0',
  `type` tinyint(3) unsigned NOT NULL DEFAULT '0' COMMENT '类型，0-单程，1-往返，2-全天',
  `src` varchar(100) COLLATE utf8mb4_bin NOT NULL DEFAULT '' COMMENT '出发地',
  `dest` varchar(100) COLLATE utf8mb4_bin NOT NULL DEFAULT '' COMMENT '目的地',
  `started_at` int(11) NOT NULL DEFAULT '0' COMMENT '开始时间',
  `ended_at` int(11) NOT NULL DEFAULT '0' COMMENT '结束时间',
  `mobile` varchar(20) COLLATE utf8mb4_bin NOT NULL DEFAULT '' COMMENT '联系电话',
  `contactor` varchar(20) COLLATE utf8mb4_bin NOT NULL DEFAULT '' COMMENT '联系人姓名',
  `remark` varchar(250) COLLATE utf8mb4_bin NOT NULL DEFAULT '' COMMENT '备注',
  `passengers_num` int(11) unsigned NOT NULL DEFAULT '0' COMMENT '乘客总数',
  `price` bigint(20) unsigned NOT NULL DEFAULT '0' COMMENT '报价，单位：分',
  `status` tinyint(3) unsigned NOT NULL DEFAULT '0' COMMENT '状态，0-待报价，1-已报价',
  `created_at` int(11) unsigned NOT NULL DEFAULT '0' COMMENT '创建时间戳',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin;
/*!40101 SET character_set_client = @saved_cs_client */;

LOCK TABLES `t_charter_bus_records` WRITE;
/*!40000 ALTER TABLE `t_charter_bus_records` DISABLE KEYS */;
INSERT INTO `t_charter_bus_records` VALUES (1,0,1,'北京大学北大门','清华大学南校门',1552377481,1558173481,'123345345','messikiller','啊实打实地方斯蒂芬',0,0,0,1555236041),(2,0,1,'北京大学北大门','清华大学南校门',1552377481,1558173481,'123345345','messikiller','啊实打实地方斯蒂芬',20,0,0,1555236090),(3,0,1,'北京大学北大门','清华大学南校门',1552377481,1558173481,'123345345','messikiller','啊实打实地方斯蒂芬',20,2055,1,1555236191),(4,0,2,'阿萨德','阿萨德是法师打发',1554890593,1555495393,'3456756','第三方股份','大幅度发给谁打过的复合弓',5,2,1,1555236223);
/*!40000 ALTER TABLE `t_charter_bus_records` ENABLE KEYS */;
UNLOCK TABLES;
DROP TABLE IF EXISTS `t_members`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `t_members` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `wechat_id` varchar(100) COLLATE utf8mb4_bin NOT NULL DEFAULT '',
  `nickname` varchar(20) COLLATE utf8mb4_bin NOT NULL DEFAULT '' COMMENT '姓名',
  `avatar_url` varchar(250) COLLATE utf8mb4_bin NOT NULL DEFAULT '' COMMENT '头像URL',
  `college` varchar(100) COLLATE utf8mb4_bin NOT NULL DEFAULT '' COMMENT '学校',
  `id_card_no` varchar(60) COLLATE utf8mb4_bin NOT NULL DEFAULT '' COMMENT '身份证号码',
  `mobile` varchar(50) COLLATE utf8mb4_bin NOT NULL DEFAULT '',
  `is_manager` tinyint(3) unsigned NOT NULL DEFAULT '0' COMMENT '是否管理员，0-否，1-是',
  `created_at` int(11) unsigned NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin;
/*!40101 SET character_set_client = @saved_cs_client */;

LOCK TABLES `t_members` WRITE;
/*!40000 ALTER TABLE `t_members` DISABLE KEYS */;
INSERT INTO `t_members` VALUES (1,'123dfsfwre','messikiller','https://gw.alipayobjects.com/zos/rmsportal/MRhHctKOineMbKAZslML.jpg','家里蹲大学','2345454654654623','1233254345345',1,1555150130);
/*!40000 ALTER TABLE `t_members` ENABLE KEYS */;
UNLOCK TABLES;
DROP TABLE IF EXISTS `t_orders`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `t_orders` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `member_id` int(11) unsigned NOT NULL DEFAULT '0',
  `type` tinyint(3) unsigned NOT NULL DEFAULT '0' COMMENT '订单类型，0-直通车，1-包车，2-众筹',
  `price` bigint(20) unsigned NOT NULL DEFAULT '0' COMMENT '金额，单位：分',
  `status` tinyint(3) unsigned NOT NULL DEFAULT '0' COMMENT '状态，0-待支付，1-支付成功，2-已取消，3-已完成',
  `created_at` int(11) unsigned NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin;
/*!40101 SET character_set_client = @saved_cs_client */;

LOCK TABLES `t_orders` WRITE;
/*!40000 ALTER TABLE `t_orders` DISABLE KEYS */;
/*!40000 ALTER TABLE `t_orders` ENABLE KEYS */;
UNLOCK TABLES;
DROP TABLE IF EXISTS `t_raise_addresses`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `t_raise_addresses` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `title` varchar(50) COLLATE utf8mb4_bin NOT NULL DEFAULT '' COMMENT '地址名称',
  `created_at` int(11) unsigned NOT NULL DEFAULT '0' COMMENT '创建时间戳',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin;
/*!40101 SET character_set_client = @saved_cs_client */;

LOCK TABLES `t_raise_addresses` WRITE;
/*!40000 ALTER TABLE `t_raise_addresses` DISABLE KEYS */;
/*!40000 ALTER TABLE `t_raise_addresses` ENABLE KEYS */;
UNLOCK TABLES;
DROP TABLE IF EXISTS `t_through_bus_records`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `t_through_bus_records` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `bus_id` int(11) unsigned NOT NULL DEFAULT '0' COMMENT '直达车路线ID',
  `user_id` int(11) unsigned NOT NULL DEFAULT '0',
  `passengers` text COLLATE utf8mb4_bin NOT NULL COMMENT '乘客信息JSON',
  `created_at` int(11) unsigned NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin;
/*!40101 SET character_set_client = @saved_cs_client */;

LOCK TABLES `t_through_bus_records` WRITE;
/*!40000 ALTER TABLE `t_through_bus_records` DISABLE KEYS */;
/*!40000 ALTER TABLE `t_through_bus_records` ENABLE KEYS */;
UNLOCK TABLES;
DROP TABLE IF EXISTS `t_through_buses`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `t_through_buses` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `src` varchar(100) COLLATE utf8mb4_bin NOT NULL DEFAULT '' COMMENT '起始地',
  `dest` varchar(100) COLLATE utf8mb4_bin NOT NULL DEFAULT '' COMMENT '目的地',
  `price` bigint(50) unsigned NOT NULL DEFAULT '0' COMMENT '单价，分/人',
  `left_at` int(11) unsigned NOT NULL DEFAULT '0' COMMENT '出发时间',
  `arrived_at` int(11) unsigned NOT NULL DEFAULT '0' COMMENT '抵达时间',
  `start_date` int(11) unsigned NOT NULL DEFAULT '0' COMMENT '可用起始日期',
  `end_date` int(11) unsigned NOT NULL DEFAULT '0' COMMENT '可用截止日期',
  `created_at` int(11) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin;
/*!40101 SET character_set_client = @saved_cs_client */;

LOCK TABLES `t_through_buses` WRITE;
/*!40000 ALTER TABLE `t_through_buses` DISABLE KEYS */;
INSERT INTO `t_through_buses` VALUES (1,'背景sad静安寺','阿萨德了会计师对方',3456,36930,44130,1559318400,1560873600,1555147366),(2,'贵州大学西大门11','华西大学22',4590,4225,51330,1552492800,1553097600,1555150130);
/*!40000 ALTER TABLE `t_through_buses` ENABLE KEYS */;
UNLOCK TABLES;
DROP TABLE IF EXISTS `t_user_password_resets`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `t_user_password_resets` (
  `email` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `token` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  KEY `t_user_password_resets_email_index` (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

LOCK TABLES `t_user_password_resets` WRITE;
/*!40000 ALTER TABLE `t_user_password_resets` DISABLE KEYS */;
/*!40000 ALTER TABLE `t_user_password_resets` ENABLE KEYS */;
UNLOCK TABLES;
DROP TABLE IF EXISTS `t_users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `t_users` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `password` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `remember_token` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `t_users_email_unique` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

LOCK TABLES `t_users` WRITE;
/*!40000 ALTER TABLE `t_users` DISABLE KEYS */;
INSERT INTO `t_users` VALUES (1,'admin','admin@qq.com','$2y$10$MYHQSoTNB0jTgOT2X3bFfuPDBabBRE/Td6exCKNJ098Y3AaJW0bSy','ciU0Hsm5hEaAe7Hm7FdEY3z0uegMfVT6Zuyvm6l80iQsfRszoNr4z4HmepZV',NULL,NULL),(2,'user1','user@user.com','$2y$10$gomO3iLHjnKz3xwux/VRsOTo.PJOOzfgVXnLaGVG.mT6udDrOyEU2','iumRrADfRia7Sa5ioitVnRwPbtbeXZv4HLISS7FD9vgdnKPg2kzxrkSEyKDX','2019-04-15 06:46:37','2019-04-15 07:02:37');
/*!40000 ALTER TABLE `t_users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
