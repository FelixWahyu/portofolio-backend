import pkg from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import pg from "pg";
import bcrypt from "bcrypt";
import dotenv from "dotenv";

dotenv.config();

const { PrismaClient } = pkg;

const pool = new pg.Pool({ connectionString: process.env.DATABASE_URL });
const adapter = new PrismaPg(pool);

const prisma = new PrismaClient({ adapter });

const projectsData = [
  {
    titleId: "Roti Mruyung Sales Management System",
    titleEn: "Roti Mruyung Sales Management System",
    descriptionId: "Website penjualan dan manajemen toko roti berbasis web dengan dashboard analytics, manajemen pesanan, dan laporan penjualan real-time berbasis PDF.",
    descriptionEn: "Web-based bakery sales and management website with analytics dashboard, order management, and real-time PDF-based sales reports.",
    image: "/img/project-image/web-sales.webp",
    category: "Web",
    tech: ["Laravel 12", "Tailwind CSS", "WhatsApp API", "Alpine.js"],
    problemId: "Bisnis masih mengandalkan promosi melalui media sosial tanpa website resmi. Selain itu, pencatatan penjualan dan pesanan masih dilakukan secara manual sehingga berisiko menyebabkan data tercecer dan kehilangan informasi transaksi.",
    problemEn: "Businesses still rely on social media promotions without an official website. Furthermore, recording sales and orders is still done manually, which risks data loss and loss of transaction information.",
    roleId: "Fullstack Developer — melakukan observasi langsung terhadap kebutuhan bisnis, merancang company profile dan sistem penjualan berbasis website, mendesain struktur database, prototype sistem, hingga pengembangan aplikasi secara end-to-end.",
    roleEn: "Fullstack Developer — conducts direct observation of business needs, designs company profiles and website-based sales systems, designs database structures, system prototypes, and develops end-to-end applications.",
    impactId: "Membantu meningkatkan efisiensi operasional bisnis hingga 20% serta meminimalkan kesalahan pencatatan stok dan transaksi.",
    impactEn: "Helps improve business operational efficiency by up to 20% and minimize stock and transaction recording errors.",
    featuresId: [
      "Manajemen produk & stok",
      "Sistem transaksi penjualan",
      "Dashboard analytics",
      "Laporan penjualan real-time",
      "Manajemen pesanan",
      "Manajemen pengguna",
      "Pengaturan profil toko"
    ],
    featuresEn: [
      "Product & Stock Management",
      "Sales Transaction System",
      "Analytics Dashboard",
      "Real-Time Sales Reports",
      "Order Management",
      "User Management",
      "Store Profile Settings"
    ],
    demolink: "https://rotimruyungcafe-guesthouse.com/",
    sourcelink: "https://github.com/FelixWahyu",
    sortOrder: 1,
    isPublished: true,
  },
  {
    titleId: "Grocery Store Point of Sales System",
    titleEn: "Grocery Store Point of Sales System",
    descriptionId: "Sistem kasir berbasis web dengan dashboard analytics dan integrasi AI Gemini untuk membantu pengelolaan toko secara modern dan efisien.",
    descriptionEn: "Web-based cashier system with analytics dashboard and Gemini AI integration to help manage your store in a modern and efficient manner.",
    image: "/img/project-image/pos-laravel.webp",
    category: "Web",
    tech: ["Laravel 12", "Tailwind CSS", "Gemini API", "JavaScript"],
    problemId: "Toko masih menggunakan pencatatan transaksi manual tanpa sistem kasir digital, sehingga laporan stok dan transaksi sering tidak akurat serta berisiko kehilangan data.",
    problemEn: "The store still uses manual transaction recording without digital cashier system, resulting in inaccurate stock and transaction reports and the risk of data loss.",
    roleId: "Fullstack Developer — menganalisis kebutuhan bisnis, merancang prototype sistem, mendesain database, dan mengembangkan sistem POS berbasis website.",
    roleEn: "Fullstack Developer — analyzes business needs, designs a system prototype, designs a database, and develops a website-based POS system.",
    impactId: "Meningkatkan efisiensi proses transaksi hingga 30% dan membantu pengelolaan stok menjadi lebih akurat.",
    impactEn: "Increases transaction process efficiency by up to 30% and helps with more accurate stock management.",
    featuresId: [
      "Manajemen produk & stok",
      "Multi authentication untuk admin & kasir",
      "Sistem POS untuk kasir",
      "Dashboard analytics",
      "Laporan penjualan & stok",
      "Manajemen pengguna",
      "Integrasi AI Gemini"
    ],
    featuresEn: [
      "Product & Stock Management",
      "Multi-Authentication for Admins & Cashiers",
      "POS System for Cashiers",
      "Dashboard Analytics",
      "Sales & Stock Reports",
      "User Management",
      "Gemini AI Integration"
    ],
    demolink: "https://kasir.sidudigitalprint.com/login",
    sourcelink: "https://github.com/FelixWahyu",
    sortOrder: 2,
    isPublished: true,
  },
  {
    titleId: "Simple E-Commerce Platform",
    titleEn: "Simple E-Commerce Platform",
    descriptionId: "Platform e-commerce modern dengan integrasi Midtrans Payment Gateway, katalog produk, detail produk, dan keranjang belanja.",
    descriptionEn: "Modern e-commerce platform with Midtrans Payment Gateway integration, product catalog, product details, and shopping cart.",
    image: "/img/project-image/simple-ecommerce.webp",
    category: "Web",
    tech: ["React", "Midtrans API", "Tailwind CSS"],
    problemId: "Membangun platform e-commerce sederhana untuk mendukung penjualan produk secara online dengan sistem pembayaran otomatis dan pengalaman pengguna yang modern.",
    problemEn: "Building a simple e-commerce platform to support online product sales with an automated payment system and a modern user experience.",
    roleId: "Frontend Developer — merancang prototype UI, mengintegrasikan backend API, dan membangun antarmuka website yang responsif dan modern.",
    roleEn: "Frontend Developer — designing UI prototypes, integrating backend APIs, and building a responsive and modern website interface.",
    impactId: "Membangun sistem e-commerce modern dengan proses pembayaran otomatis dan pengalaman pengguna yang lebih efisien.",
    impactEn: "Building a modern e-commerce system with an automated payment process and a more efficient user experience.",
    featuresId: [
      "Sistem transaksi online",
      "Integrasi Midtrans Payment Gateway",
      "Review produk",
      "Detail produk & galeri",
      "Keranjang belanja",
      "Wishlist produk"
    ],
    featuresEn: [
      "Online transaction system",
      "Midtrans Payment Gateway integration",
      "Product reviews",
      "Product details & gallery",
      "Shopping cart",
      "Product wishlist"
    ],
    demolink: "",
    sourcelink: "https://github.com/FelixWahyu",
    sortOrder: 3,
    isPublished: true,
  },
  {
    titleId: "Coffee Shop Website with Midtrans",
    titleEn: "Coffee Shop Website with Midtrans",
    descriptionId: "Website toko kopi berbasis HTML, CSS, dan JavaScript dengan integrasi Midtrans Payment Gateway untuk transaksi online.",
    descriptionEn: "Coffee shop website based on HTML, CSS, and JavaScript with Midtrans Payment Gateway integration for online transactions.",
    image: "/img/project-image/coffe-shop.webp",
    category: "Web",
    tech: ["HTML5", "CSS3", "JavaScript", "Midtrans API"],
    problemId: "Membangun website penjualan kopi untuk membantu bisnis coffee shop menyediakan layanan pemesanan online dan pembayaran digital.",
    problemEn: "Building a coffee sales website to help coffee shop businesses provide online ordering and digital payment services.",
    roleId: "Frontend Developer — merancang UI website, mengintegrasikan payment gateway Midtrans, serta membangun tampilan responsif untuk berbagai perangkat.",
    roleEn: "Frontend Developer — designing the website UI, integrating the Midtrans payment gateway, and building a responsive display for various devices.",
    impactId: "Membantu digitalisasi bisnis coffee shop melalui website modern dengan sistem transaksi online yang lebih praktis.",
    impactEn: "Helping the digitalization of coffee shop businesses through a modern website with a more practical online transaction system.",
    featuresId: [
      "Katalog produk",
      "Keranjang belanja",
      "Checkout pesanan",
      "Integrasi pembayaran otomatis",
      "Responsive design"
    ],
    featuresEn: [
      "Product catalog",
      "Shopping cart",
      "Order checkout",
      "Automatic payment integration",
      "Responsive design"
    ],
    demolink: "https://felixwahyu.github.io/kedai-kopi-kenangan-alam/",
    sourcelink: "https://github.com/FelixWahyu",
    sortOrder: 4,
    isPublished: true,
  },
  {
    titleId: "Personal Portfolio Website",
    titleEn: "Personal Portfolio Website",
    descriptionId: "Website portfolio modern dengan dashboard statistik GitHub dan WakaTime untuk menampilkan aktivitas coding dan personal branding profesional.",
    descriptionEn: "A modern portfolio website with a GitHub and WakaTime statistics dashboard to showcase your coding activities and professional personal branding.",
    image: "/img/project-image/personal-portofolio.webp",
    category: "Web",
    tech: ["React", "Tailwind CSS", "WakaTime API", "Express"],
    problemId: "Membangun website portfolio profesional untuk meningkatkan personal branding, menampilkan proyek, pengalaman, serta statistik aktivitas coding.",
    problemEn: "Building a professional portfolio website to enhance your personal branding, showcase your projects, experience, and coding activity statistics.",
    roleId: "Fullstack Developer — mendesain UI/UX modern, membangun backend API, dan mengembangkan frontend website portfolio secara responsif.",
    roleEn: "Fullstack Developer — designing a modern UI/UX, building a backend API, and developing a responsive frontend portfolio website.",
    impactId: "Meningkatkan personal branding profesional dan mempermudah recruiter melihat pengalaman serta proyek yang telah dikembangkan.",
    impactEn: "Improve your professional personal branding and make it easier for recruiters to see your experience and developed projects.",
    featuresId: [
      "Multi-language support",
      "Dark & light mode",
      "Dashboard statistik coding",
      "Informasi kontak",
      "Project showcase"
    ],
    featuresEn: [
      "Multi-language support",
      "Dark & Light mode",
      "Coding statistics dashboard",
      "Contact information",
      "Project showcase"
    ],
    demolink: "https://www.felixws.my.id/",
    sourcelink: "https://github.com/FelixWahyu",
    sortOrder: 5,
    isPublished: true,
  },
  {
    titleId: "Portfolio Website",
    titleEn: "Portfolio Website",
    descriptionId: "Website portfolio berbasis React dengan desain modern untuk menampilkan informasi personal dan project development.",
    descriptionEn: "A React-based portfolio website with a modern design to display personal information and development projects.",
    image: "/img/project-image/web-portofolio.webp",
    category: "Web",
    tech: ["React", "Tailwind CSS", "JavaScript"],
    problemId: "Membangun website portfolio pertama sebagai media personal branding dan showcase project development.",
    problemEn: "Building my first portfolio website as a personal branding platform and showcase of development projects.",
    roleId: "Fullstack Developer — merancang desain antarmuka dan mengembangkan frontend website yang modern dan responsif.",
    roleEn: "Fullstack Developer — designing the interface and developing a modern and responsive website frontend.",
    impactId: "Menjadi media personal branding awal untuk menampilkan kemampuan dan pengalaman pengembangan website.",
    impactEn: "Becoming a personal media platform Initial branding to showcase website development skills and experience.",
    featuresId: [
      "Multi-language support",
      "Informasi kontak",
      "GitHub statistics",
      "Responsive design"
    ],
    featuresEn: [
      "Multi-language support",
      "Contact information",
      "GitHub statistics",
      "Responsive design"
    ],
    demolink: "https://felixwahyu.github.io/my-portofolio-website/",
    sourcelink: "https://github.com/FelixWahyu",
    sortOrder: 6,
    isPublished: true,
  },
  {
    titleId: "Book Store E-Commerce Website",
    titleEn: "Book Store E-Commerce Website",
    descriptionId: "Website e-commerce toko buku dengan desain modern, fitur katalog produk, dan integrasi WhatsApp serta Midtrans.",
    descriptionEn: "Bookstore e-commerce website with a modern design, product catalog features, and WhatsApp and Midtrans integration.",
    image: "/img/project-image/book-store.webp",
    category: "Web",
    tech: ["React", "Tailwind CSS", "TypeScript", "WhatsApp", "Midtrans"],
    problemId: "Membangun platform penjualan buku online untuk membantu meningkatkan branding toko serta mempermudah proses pemesanan pelanggan.",
    problemEn: "Building an online bookselling platform to help improve store branding and simplify the customer ordering process.",
    roleId: "Fullstack Developer — merancang dan mengembangkan sistem e-commerce, frontend modern, serta integrasi backend API.",
    roleEn: "Fullstack Developer — designing and developing an e-commerce system, modern frontend, and backend API integration.",
    impactId: "Membantu digitalisasi penjualan buku dengan integrasi pemesanan otomatis dan payment gateway modern.",
    impactEn: "Helping digitize book sales with automated booking integration and a modern payment gateway.",
    featuresId: [
      "Katalog produk",
      "Keranjang belanja",
      "Pemesanan otomatis via WhatsApp",
      "Pencarian produk",
      "Detail produk",
      "Wishlist produk"
    ],
    featuresEn: [
      "Product catalog",
      "Shopping cart",
      "Automatic ordering via WhatsApp",
      "Product search",
      "Product details",
      "Product wishlist"
    ],
    demolink: "",
    sourcelink: "https://github.com/FelixWahyu",
    sortOrder: 7,
    isPublished: true,
  },
  {
    titleId: "Car Rental Booking Website",
    titleEn: "Car Rental Booking Website",
    descriptionId: "Website rental mobil berbasis CodeIgniter 4 dengan fitur booking kendaraan dan otomatisasi reservasi via WhatsApp.",
    descriptionEn: "CodeIgniter 4-based car rental website with vehicle booking features and automated reservations via WhatsApp.",
    image: "/img/project-image/garasi-rental.webp",
    category: "Web",
    tech: ["PHP", "Tailwind CSS", "CodeIgniter 4", "MySQL", "WhatsApp"],
    problemId: "Bisnis rental mobil membutuhkan platform digital untuk meningkatkan layanan pelanggan dan mempermudah proses reservasi kendaraan.",
    problemEn: "Car rental businesses need a digital platform to improve customer service and simplify the vehicle reservation process.",
    roleId: "Fullstack Developer — merancang dan mengembangkan sistem rental mobil berbasis web dengan UI modern dan backend management system.",
    roleEn: "Fullstack Developer — designing and developing a web-based car rental system with a modern UI and backend management system.",
    impactId: "Meningkatkan kepercayaan pelanggan dan membantu proses reservasi kendaraan menjadi lebih cepat dan efisien.",
    impactEn: "Increasing customer confidence and helping the vehicle reservation process become faster and more efficient.",
    featuresId: [
      "Daftar mobil",
      "Detail kendaraan",
      "Reservasi via WhatsApp",
      "Review & rating",
      "Status reservasi"
    ],
    featuresEn: [
      "Car List",
      "Vehicle Details",
      "Reservation via WhatsApp",
      "Review & Rating",
      "Reservation Status"
    ],
    demolink: "",
    sourcelink: "https://github.com/FelixWahyu",
    sortOrder: 8,
    isPublished: true,
  }
];

async function main() {
  const adminEmail = "admin@felixws.my.id";
  const placeholderPassword = "adminpassword123";
  
  const hashedPassword = await bcrypt.hash(placeholderPassword, 10);

  console.log("Seeding admin user...");
  
  const admin = await prisma.user.upsert({
    where: { email: adminEmail },
    update: {},
    create: {
      email: adminEmail,
      name: "Admin Felix",
      password: hashedPassword,
      role: "admin",
    },
  });

  console.log({ admin });

  console.log("Seeding projects...");
  
  // Clear existing projects to avoid duplicate entries when re-seeding
  await prisma.project.deleteMany({});
  
  for (const project of projectsData) {
    const createdProject = await prisma.project.create({
      data: project
    });
    console.log(`Created project: ${createdProject.titleId}`);
  }

  console.log("Seed finished successfully.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
