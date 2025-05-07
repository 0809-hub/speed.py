const { fetchJson } = require("../lib/myfunc");

let handler = async (m, { isPremium, text, usedPrefix, command }) => {
	try {
		if (!isPremium) return m.reply(mess.premium);
		if (!text) return m.reply('Tolong masukkan teks yang ingin Kamu tanyakan, kak!');
		const apiUrl = `https://api.siputzx.my.id/api/ai/joko?content=${encodeURIComponent(text)}`;
		try {
			const data = await fetchJson(apiUrl);
			if (data.status) {
				m.reply(data.data);
			} else {
				m.reply('Maaf, aku nggak bisa memberikan jawaban sekarang. Coba lagi nanti ya, kak!');
			}
		} catch (error) {
			console.error(error);
			m.reply('Oops! Ada masalah saat mencoba mengakses API. Pastikan koneksi internetmu lancar ya, kak!');
		}
	} catch (err) {
		console.error(err);
		m.reply("⚠️ Ups! Terjadi kesalahan, coba lagi nanti.");
	}
};

handler.command = ["jawaai"];
handler.tags = ["ai"];
handler.help = ["jawaai"].map(cmd => `${cmd} *teks*`);

module.exports = handler;
