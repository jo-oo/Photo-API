-- phpMyAdmin SQL Dump
-- version 5.1.0
-- https://www.phpmyadmin.net/
--
-- Värd: localhost:8889
-- Tid vid skapande: 15 jul 2022 kl 15:10
-- Serverversion: 5.7.34
-- PHP-version: 7.4.21

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Databas: `photo_api`
--

-- --------------------------------------------------------

--
-- Tabellstruktur `albums`
--

CREATE TABLE `albums` (
  `id` int(11) NOT NULL,
  `title` varchar(250) NOT NULL,
  `user_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumpning av Data i tabell `albums`
--

INSERT INTO `albums` (`id`, `title`, `user_id`) VALUES
(5, 'Confetti Album', 15),
(6, ' Album', 15),
(7, 'hoo Album', 15),
(10, 'Elins1', 16),
(11, 'Elins2', 16),
(12, 'Elins3', 16),
(13, 'Gurra g', 17),
(15, 'Gurra fo', 17),
(16, 'Confetti\'R\'Us', 17),
(18, 'Eli', 17),
(19, 'Elis', 17),
(21, 'Elias', 17),
(23, 'Confetti\'R\'Us', 20);

-- --------------------------------------------------------

--
-- Tabellstruktur `albums_photos`
--

CREATE TABLE `albums_photos` (
  `id` int(11) NOT NULL,
  `photo_id` int(10) UNSIGNED DEFAULT NULL,
  `album_id` int(10) UNSIGNED DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumpning av Data i tabell `albums_photos`
--

INSERT INTO `albums_photos` (`id`, `photo_id`, `album_id`) VALUES
(1, 2, 5),
(2, 4, 5),
(3, 4, 8),
(14, 26, 16),
(15, 25, 16);

-- --------------------------------------------------------

--
-- Tabellstruktur `photos`
--

CREATE TABLE `photos` (
  `id` int(11) NOT NULL,
  `title` varchar(250) NOT NULL,
  `url` varchar(250) NOT NULL,
  `comment` varchar(250) DEFAULT NULL,
  `user_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumpning av Data i tabell `photos`
--

INSERT INTO `photos` (`id`, `title`, `url`, `comment`, `user_id`) VALUES
(2, 'Mitt nya foto', 'https://i.guim.co.uk/img/media/fe1e34da640c5c56ed16f76ce6f994fa9343d09d/0_174_3408_2046/master/3408.jpg?width=1200&height=900&quality=85&auto=format&fit=crop&s=0d3f33fb6aa6e0154b7713a00454c83d', NULL, 15),
(3, 'Mitt nya foto 2', 'https://i.guim.co.uk/img/media/fe1e34da640c5c56ed16f76ce6f994fa9343d09d/0_174_3408_2046/master/3408.jpg?width=1200&height=900&quality=85&auto=format&fit=crop&s=0d3f33fb6aa6e0154b7713a00454c83d', NULL, 10),
(4, 'Confetti Photo #1', 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30', 'Confetti', 15),
(5, 'Confettoooo Photo #1', 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30', 'Confetti', 15),
(6, 'Lolololo Photo #1', 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30', 'Confetti', 15),
(11, 'Gurras bild', 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30', 'Ccool', 16),
(12, 'Gurras bild2', 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30', 'Ccool', 16),
(13, 'Gurras bild3', 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30', 'Ccool', 16),
(14, 'Gurras bild4', 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30', 'Ccool', 16),
(16, 'Gurras nya bild 2', 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30', 'min nya bild', 17),
(24, 'Gurri', 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30', 'Confetti', 17),
(25, 'GurriGurra', 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30', 'Confetti', 17),
(26, 'GurriGurragurra', 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30', 'Confetti', 17),
(27, 'coo', 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30', 'Confetti', 17),
(28, 'Elin', 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30', 'Confetti', 17),
(29, 'Elin', 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30', 'Confetti', 17),
(30, 'Elin', 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30', 'Confetti', 17),
(32, 'Testarns', 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30', 'Kul', 20),
(35, 'Confetti Photo #12', 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30', 'Confetti', 21),
(36, 'Confetti Photo # asdfasdf', 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30', 'Confetti', 22),
(37, 'Confetti Photo # asdfasdf', 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30', 'Confetti', 22),
(38, 'Confetti Photo # asdfasdf', 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30', 'Confetti', 22),
(39, 'Confetti Photo # asdfasdf', 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30', 'Confetti', 22),
(40, 'Confetti Photo # asdfasdf', 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30', 'Confetti', 22);

-- --------------------------------------------------------

--
-- Tabellstruktur `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `email` varchar(250) NOT NULL,
  `password` varchar(250) NOT NULL,
  `first_name` varchar(250) NOT NULL,
  `last_name` varchar(250) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumpning av Data i tabell `users`
--

INSERT INTO `users` (`id`, `email`, `password`, `first_name`, `last_name`) VALUES
(7, 'johan@thorner3.com', '$2b$10$5mSaUusEEOxNss7kUn6WTuxBiksr3rjIOFYTnQ55lmh/rj0hyn8lO', 'Johan', 'Thörner'),
(8, 'johan4@test.se', '$2b$10$5MgVQvlLj4pnecViXPL9AO8forpNscL5HCfmLP5wfzL0udx.LgEn6', 'Johan', 'Nordström'),
(9, 'jn@hejsvejs.com', '$2b$10$lwDriDxQCY0jG/jLnS.B7uWJW7EbOQqBVX9Qjgpz8ChJt/dZRACGW', 'Johan', 'Nokk'),
(10, 'johan@betan.se', '$2b$10$Ih1470GjsgmFq4a8k0bqsOiKnDr0HOgvkuYY5plDQ3GFVhio2L/u.', 'Johan', 'Nokk'),
(11, 'johanna@coool.com', '$2b$10$LZit2dihsxe/ERU09Cuio.Pfq6RfTK93nUL/VqdoZy90fmUdwOe9q', 'Johan', 'Thork'),
(12, 'bo@bo.com', '$2b$10$kds.7L28.7dcrpmAUjNH.ee8tSlghXA0d38Lt.zJLRcdnkHi7B716', 'Bobo', 'Boooo'),
(13, 'johanna@test.com', '$2b$10$J0zaEKRzo.Grh3j4QiJa0ODkkXXPcnQxK8BF0K4HH2xiH2hi1EFum', 'Bobo', 'Boooo'),
(14, 'bo@test.com', '$2b$10$PuIlBa1k2AFfzZS98MObGuArSlmwiHV9.JsyKv4lSX8LYTNjx5uCm', 'Bobo', 'Boooo'),
(15, 'katt@katt.com', '$2b$10$HVonh1UlT1TElOtLSSNzdupTOaUvJAPTyPHiWw5NlAQWSRWaIpP.a', 'Johan', 'Nordström'),
(16, 'elin@lidköping.com', '$2b$10$qc1GTBQW6UsPbgH2VbLJZeGR.Q1ml73UM283Rg3LcXL9QA4CuCrbm', 'Elin', 'Ström'),
(17, 'gurra@gmail.com', '$2b$10$rakpqJTNS/uDbk6UKSNLruDAG4/clHRAJOWUc88j3j/9FTLeFQpSi', 'Elin', 'Ström'),
(18, 'gustav@gmail.com', '$2b$10$XoBpzDmhC0EkfwcDRUnp5OWyfRztk9mSUQnAd78.N4qsR.5vpc03S', 'Gustav', 'Gustavsson'),
(19, 'morgan@gmail.com', '$2b$10$YrFXdcTINraM4OzVFj2v4OTbZPkUf8Cae7tThM5VljQmcCOqQit6G', 'Morgan', 'Gustavsson'),
(20, 'test@test.com', '$2b$10$uCSBbC8U/umUqh9rYmAIOOg9U0x0a/iiBXVXqvEYonOAOGAp6wYU.', 'Test', 'Börjesson'),
(21, 'gu@gmail.com', '$2b$10$2sCo8lxYRyvVngx5zwlr0ORygS1XcCuKh6HvJK1/ZfY1uDKc9V4zG', 'Elin', 'Ström'),
(22, 'johan@gmail.com', '$2b$10$iDy2k.nfyenEgh3wJw2fKOosyPBfhbpUMmzeoHOKgnMp7JcAEFUhq', 'Elin', 'Ström');

--
-- Index för dumpade tabeller
--

--
-- Index för tabell `albums`
--
ALTER TABLE `albums`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`);

--
-- Index för tabell `albums_photos`
--
ALTER TABLE `albums_photos`
  ADD PRIMARY KEY (`id`);

--
-- Index för tabell `photos`
--
ALTER TABLE `photos`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`);

--
-- Index för tabell `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT för dumpade tabeller
--

--
-- AUTO_INCREMENT för tabell `albums`
--
ALTER TABLE `albums`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=26;

--
-- AUTO_INCREMENT för tabell `albums_photos`
--
ALTER TABLE `albums_photos`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=22;

--
-- AUTO_INCREMENT för tabell `photos`
--
ALTER TABLE `photos`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=41;

--
-- AUTO_INCREMENT för tabell `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=23;

--
-- Restriktioner för dumpade tabeller
--

--
-- Restriktioner för tabell `albums`
--
ALTER TABLE `albums`
  ADD CONSTRAINT `albums_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `Users` (`id`);

--
-- Restriktioner för tabell `photos`
--
ALTER TABLE `photos`
  ADD CONSTRAINT `photos_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
