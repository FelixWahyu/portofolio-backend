import rateLimit from "express-rate-limit";

/**
 * Rate limiter untuk endpoint login.
 * Membatasi maksimal 5 percobaan login per IP dalam 15 menit.
 * Mencegah serangan brute-force pada akun admin.
 */
export const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 menit
  max: 5, // Maksimal 5 percobaan per window
  standardHeaders: true, // Return rate limit info di header `RateLimit-*`
  legacyHeaders: false, // Disable header `X-RateLimit-*`
  message: {
    success: false,
    message: "Terlalu banyak percobaan login. Silakan coba lagi setelah 15 menit.",
    error: null,
  },
});

/**
 * Rate limiter umum untuk seluruh API.
 * Membatasi 100 request per IP dalam 15 menit.
 * Melindungi API dari penyalahgunaan/DDoS sederhana.
 */
export const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 menit
  max: 100, // Maksimal 100 request per window
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    success: false,
    message: "Terlalu banyak request. Silakan coba lagi nanti.",
    error: null,
  },
});
