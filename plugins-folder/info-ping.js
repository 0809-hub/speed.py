const { fetchJson } = require("../lib/myfunc");
const osUtils = require('node-os-utils');
const os = require('os');
const moment = require('moment-timezone'); // Untuk mengelola waktu dan tanggal
const process = require('process'); // Untuk mendapatkan informasi runtime bot

let handler = async (m, { isPremium, text, usedPrefix, command }) => {
	try {
		const cpu = osUtils.cpu;
		const mem = osUtils.mem;
		const drive = osUtils.drive;

		// Mendapatkan informasi CPU
		const cpuUsage = await cpu.usage();
		const cpuCount = cpu.count();
		const cpuCores = os.cpus(); // Informasi per core CPU

		// Mendapatkan informasi Memori
		const memInfo = await mem.info();

		// Mendapatkan informasi Drive
		const driveInfo = await drive.info();

		// Mendapatkan informasi OS menggunakan modul 'os' bawaan Node.js
		const osPlatform = os.platform(); // Platform (e.g., 'linux', 'win32', 'darwin')
		const osType = os.type(); // Tipe OS (e.g., 'Linux', 'Windows_NT', 'Darwin')
		const osRelease = os.release(); // Versi OS
		const osArch = os.arch(); // Arsitektur (e.g., 'x64', 'arm')
		const osUptime = moment.duration(os.uptime(), 'seconds').humanize(); // Uptime OS

		// Mendapatkan informasi runtime bot
		const botUptime = moment.duration(process.uptime(), 'seconds').humanize(); // Uptime bot
		const nodeVersion = process.version; // Versi Node.js
		const botMemoryUsage = (process.memoryUsage().rss / 1024 / 1024).toFixed(2); // Penggunaan memori bot dalam MB

		// Mendapatkan tanggal dan waktu hari ini
		const now = moment().tz('Asia/Jakarta'); // Sesuaikan timezone sesuai kebutuhan
		const todayDate = now.format('YYYY-MM-DD'); // Tanggal hari ini
		const todayTime = now.format('HH:mm:ss'); // Waktu hari ini

		// Membuat pesan informasi
		let infoMessage = `
*Informasi Perangkat:*

*CPU:*
- Penggunaan: ${cpuUsage}%
- Core: ${cpuCount}
- Detail Core:
${cpuCores.map((core, index) => `  *Core ${index + 1}:* ${core.model} (${core.speed} MHz)\n- Penggunaan: ${((core.times.user + core.times.nice + core.times.sys + core.times.irq) / core.times.idle * 100).toFixed(2)}%`).join('\n')}

*Memori:*
- Total: ${(memInfo.totalMemMb / 1024).toFixed(2)} GB
- Digunakan: ${(memInfo.usedMemMb / 1024).toFixed(2)} GB
- Tersedia: ${(memInfo.freeMemMb / 1024).toFixed(2)} GB

*Drive:*
- Total: ${(driveInfo.totalGb)} GB
- Digunakan: ${(driveInfo.usedGb)} GB
- Tersedia: ${(driveInfo.freeGb)} GB

*Sistem Operasi:*
- Platform: ${osPlatform}
- Tipe: ${osType}
- Versi: ${osRelease}
- Arsitektur: ${osArch}
- Uptime: ${osUptime}

*Runtime Bot:*
- Uptime: ${botUptime}
- Versi Node.js: ${nodeVersion}
- Penggunaan Memori: ${botMemoryUsage} MB

*Waktu dan Tanggal:*
- Tanggal: ${todayDate}
- Waktu: ${todayTime}
`;

		// Mengirim pesan informasi
		m.reply(infoMessage);
	} catch (error) {
		console.error(error);
		m.reply('Terjadi kesalahan saat mengambil informasi perangkat.');
	}
};

handler.command = ["ping"];
handler.tags = ["info"];
handler.help = ["ping"].map(cmd => `${cmd} *menampilkan informasi perangkat*`);

module.exports = handler;
