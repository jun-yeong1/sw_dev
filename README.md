# sw_dev
소프트웨어 실습 최종 조별과제

조원 깃허브 아이디
|조원|이준영|박준현|조아정|정성훈|
|:-:|:-:|:-:|:-:|:-:|
|깃허브 아이디|jun-yeong1|p-jh0|Ajms1104|SeongHun0915|

실행시 설치할 것
npm install express body-parser mysql axios express-session dotenv

#db 설정은 db/db.js에서

실행전 테이블 생성

CREATE TABLE `user` (
  `id` varchar(10) NOT NULL,
  `name` varchar(10) NOT NULL,
  `password` varchar(20) NOT NULL,
  `amount` int unsigned DEFAULT '0',
  PRIMARY KEY (`id`)
);

CREATE TABLE `orders` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_id` varchar(10) NOT NULL,
  `campus` varchar(255) NOT NULL,
  `completed` tinyint(1) DEFAULT '0',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `orders_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`)
);
CREATE TABLE `order_items` (
  `id` int NOT NULL AUTO_INCREMENT,
  `order_id` int NOT NULL,
  `name` varchar(255) NOT NULL,
  `price` decimal(10,2) NOT NULL,
  `quantity` int NOT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `order_id` (`order_id`),
  CONSTRAINT `order_items_ibfk_1` FOREIGN KEY (`order_id`) REFERENCES `orders` (`id`)
);


## 주제
사용자 위치 기반 동아대학교 카페 이용 사이트

## 기능
- 사용자 위치 기반으로 현재 위치와 학교 카페들의 위치 차이와 이동 시간 출력
- admin 페이지에서 사용자가 주문한 내역 확인, 완료 버튼 클릭 시 사용자 주문 내역 업데이트
- 각 사용자들은 자신이 주문 내역을 확인 및 완료 여부 파악 가능
- 회원가입, 회원정보 수정, 로그인, 로그아웃 기능
- 결제를 위한 캐쉬 충전 기능
- 회원 정보와 주문 정보는 mysql 저장
- 메뉴 페이지에서 메뉴를 클릭해 메뉴 담기, 결제, 주문 확인 기능
