-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Waktu pembuatan: 30 Nov 2025 pada 16.18
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
(3, 'Kedisiplinan', 0.2, 'benefit'),
(4, 'Kehadiran', 0.1, 'benefit');

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
(1, 1, 1, 80),
(2, 1, 2, 85),
(3, 1, 3, 88),
(4, 1, 4, 92),
(5, 2, 1, 80),
(6, 2, 2, 82),
(7, 2, 3, 78),
(8, 2, 4, 85),
(9, 3, 1, 95),
(10, 3, 2, 90),
(11, 3, 3, 93),
(12, 3, 4, 94),
(13, 4, 1, 70),
(14, 4, 2, 75),
(15, 4, 3, 72),
(16, 4, 4, 78),
(17, 5, 1, 85),
(18, 5, 2, 88),
(19, 5, 3, 84),
(20, 5, 4, 89),
(21, 6, 1, 78),
(22, 6, 2, 80),
(23, 6, 3, 79),
(24, 6, 4, 82),
(25, 7, 1, 92),
(26, 7, 2, 88),
(27, 7, 3, 91),
(28, 7, 4, 90),
(29, 8, 1, 65),
(30, 8, 2, 70),
(31, 8, 3, 68),
(32, 8, 4, 72),
(33, 9, 1, 88),
(34, 9, 2, 86),
(35, 9, 3, 83),
(36, 9, 4, 87),
(37, 10, 1, 75),
(38, 10, 2, 78),
(39, 10, 3, 76),
(40, 10, 4, 80),
(42, 11, 2, 60),
(43, 11, 3, 80),
(44, 11, 4, 80),
(45, 12, 1, 70);

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
(3, 'Cici', '103', 1),
(4, 'Dedi', '104', 1),
(5, 'Eka', '105', 1),
(6, 'Fajar', '106', 1),
(7, 'Gina', '107', 1),
(8, 'Hani', '108', 1),
(9, 'Irfan', '109', 1),
(10, 'Joko', '110', 1),
(11, 'Lina', '201', 2),
(12, 'Mira', '202', 2),
(13, 'Nana', '203', 2),
(14, 'Omar', '204', 2),
(15, 'Putri', '205', 2),
(16, 'Qori', '206', 2),
(17, 'Rama', '207', 2),
(18, 'Siti', '208', 2),
(19, 'Toni', '209', 2),
(20, 'Umar', '210', 2),
(21, 'Vina', '301', 3),
(22, 'Wulan', '302', 3),
(23, 'Xena', '303', 3),
(24, 'Yoga', '304', 3),
(25, 'Zaki', '305', 3),
(26, 'Aisyah', '306', 3),
(27, 'Bagas', '307', 3),
(28, 'Citra', '308', 3),
(29, 'Danu', '309', 3),
(30, 'Edo', '310', 3),
(31, 'Farah', '401', 4),
(32, 'Gilang', '402', 4),
(33, 'Hana', '403', 4),
(34, 'Ilham', '404', 4),
(35, 'Jihan', '405', 4),
(36, 'Kaka', '406', 4),
(37, 'Laila', '407', 4),
(38, 'Miko', '408', 4),
(39, 'Novi', '409', 4),
(40, 'Oni', '410', 4),
(41, 'Peni', '501', 5),
(42, 'Qori', '502', 5),
(43, 'Riko', '503', 5),
(44, 'Salsa', '504', 5),
(45, 'Tari', '505', 5),
(46, 'Udin', '506', 5),
(47, 'Via', '507', 5),
(48, 'Wahyu', '508', 5),
(49, 'Xena', '509', 5),
(50, 'Yusuf', '510', 5),
(51, 'Zahra', '601', 6),
(52, 'Ari', '602', 6),
(53, 'Bayu', '603', 6),
(54, 'Cindy', '604', 6),
(55, 'Deni', '605', 6),
(56, 'Eva', '606', 6),
(57, 'Fikri', '607', 6),
(58, 'Gita', '608', 6),
(59, 'Heri', '609', 6),
(60, 'Indah', '610', 6);

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
(2, 'wali1a', '12345', 'Wali Kelas 1A', 'wali_kelas', 1),
(3, 'wali1b', '12345', 'Wali Kelas 1B', 'wali_kelas', 2),
(4, 'wali2a', '12345', 'Wali Kelas 2A', 'wali_kelas', 3),
(5, 'wali2b', '12345', 'Wali Kelas 2B', 'wali_kelas', 4),
(6, 'wali3a', '12345', 'Wali Kelas 3A', 'wali_kelas', 5),
(7, 'wali3b', '12345', 'Wali Kelas 3B', 'wali_kelas', 6);

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
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT untuk tabel `criteria`
--
ALTER TABLE `criteria`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT untuk tabel `scores`
--
ALTER TABLE `scores`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=48;

--
-- AUTO_INCREMENT untuk tabel `students`
--
ALTER TABLE `students`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=61;

--
-- AUTO_INCREMENT untuk tabel `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

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
