-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Waktu pembuatan: 25 Nov 2025 pada 15.18
-- Versi server: 10.4.32-MariaDB
-- Versi PHP: 8.0.30

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `spksiswa2`
--

-- --------------------------------------------------------

--
-- Struktur dari tabel `classes`
--

CREATE TABLE `classes` (
  `id` int(11) NOT NULL,
  `class_name` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data untuk tabel `classes`
--

INSERT INTO `classes` (`id`, `class_name`) VALUES
(1, 'Kelas 1A'),
(2, 'Kelas 1B'),
(3, 'Kelas 2A'),
(4, 'Kelas 2B'),
(5, 'Kelas 3A'),
(6, 'Kelas 3B');

-- --------------------------------------------------------

--
-- Struktur dari tabel `criteria`
--

CREATE TABLE `criteria` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `weight` double NOT NULL,
  `type` enum('benefit','cost') NOT NULL DEFAULT 'benefit'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data untuk tabel `criteria`
--

INSERT INTO `criteria` (`id`, `name`, `weight`, `type`) VALUES
(1, 'Nilai Akademik', 0.4, 'benefit'),
(2, 'Sikap', 0.3, 'benefit'),
(4, 'Absen', 0.4, 'benefit'),
(6, 'Nilai Akademik', 0.8, 'benefit');

-- --------------------------------------------------------

--
-- Struktur dari tabel `scores`
--

CREATE TABLE `scores` (
  `id` int(11) NOT NULL,
  `student_id` int(11) NOT NULL,
  `criteria_id` int(11) NOT NULL,
  `score` double NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data untuk tabel `scores`
--

INSERT INTO `scores` (`id`, `student_id`, `criteria_id`, `score`) VALUES
(1, 1, 1, 90),
(2, 1, 2, 85),
(4, 2, 1, 88),
(5, 2, 2, 87),
(7, 3, 1, 70),
(8, 3, 2, 90);

-- --------------------------------------------------------

--
-- Struktur dari tabel `students`
--

CREATE TABLE `students` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `nis` varchar(50) NOT NULL,
  `class_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data untuk tabel `students`
--

INSERT INTO `students` (`id`, `name`, `nis`, `class_id`) VALUES
(1, 'Ahmad', '101', 1),
(2, 'Budi', '102', 1),
(3, 'Cici', '201', 2),
(4, 'Budi Santoso', '202501', 1);

-- --------------------------------------------------------

--
-- Struktur dari tabel `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `username` varchar(100) NOT NULL,
  `password` varchar(255) NOT NULL,
  `full_name` varchar(255) NOT NULL,
  `role` enum('admin','wali_kelas') NOT NULL,
  `class_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data untuk tabel `users`
--

INSERT INTO `users` (`id`, `username`, `password`, `full_name`, `role`, `class_id`) VALUES
(1, 'admin', 'admin123', 'Administrator', 'admin', NULL),
(2, 'wali1', '12345', 'Wali Kelas 1A', 'wali_kelas', 1),
(3, 'wali2', '12345', 'Wali Kelas 1B', 'wali_kelas', 2),
(4, 'wali3', '12345', 'Wali Kelas 2A', 'wali_kelas', 3),
(5, 'wali4', '12345', 'Wali Kelas 2B', 'wali_kelas', 4),
(6, 'wali5', '12345', 'Wali Kelas 3A', 'wali_kelas', 5),
(7, 'wali6', '12345', 'Wali Kelas 3B', 'wali_kelas', 6),
(8, 'santi', '123456', 'Ibu Santi', 'wali_kelas', 1);

--
-- Indexes for dumped tables
--

--
-- Indeks untuk tabel `classes`
--
ALTER TABLE `classes`
  ADD PRIMARY KEY (`id`);

--
-- Indeks untuk tabel `criteria`
--
ALTER TABLE `criteria`
  ADD PRIMARY KEY (`id`);

--
-- Indeks untuk tabel `scores`
--
ALTER TABLE `scores`
  ADD PRIMARY KEY (`id`),
  ADD KEY `student_id` (`student_id`),
  ADD KEY `criteria_id` (`criteria_id`);

--
-- Indeks untuk tabel `students`
--
ALTER TABLE `students`
  ADD PRIMARY KEY (`id`),
  ADD KEY `class_id` (`class_id`);

--
-- Indeks untuk tabel `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `username` (`username`),
  ADD KEY `class_id` (`class_id`);

--
-- AUTO_INCREMENT untuk tabel yang dibuang
--

--
-- AUTO_INCREMENT untuk tabel `classes`
--
ALTER TABLE `classes`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT untuk tabel `criteria`
--
ALTER TABLE `criteria`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT untuk tabel `scores`
--
ALTER TABLE `scores`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT untuk tabel `students`
--
ALTER TABLE `students`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT untuk tabel `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- Ketidakleluasaan untuk tabel pelimpahan (Dumped Tables)
--

--
-- Ketidakleluasaan untuk tabel `scores`
--
ALTER TABLE `scores`
  ADD CONSTRAINT `scores_ibfk_1` FOREIGN KEY (`student_id`) REFERENCES `students` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `scores_ibfk_2` FOREIGN KEY (`criteria_id`) REFERENCES `criteria` (`id`) ON DELETE CASCADE;

--
-- Ketidakleluasaan untuk tabel `students`
--
ALTER TABLE `students`
  ADD CONSTRAINT `students_ibfk_1` FOREIGN KEY (`class_id`) REFERENCES `classes` (`id`) ON DELETE CASCADE;

--
-- Ketidakleluasaan untuk tabel `users`
--
ALTER TABLE `users`
  ADD CONSTRAINT `users_ibfk_1` FOREIGN KEY (`class_id`) REFERENCES `classes` (`id`) ON DELETE SET NULL;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
