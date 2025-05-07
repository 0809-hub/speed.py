const fs = require("fs");
const path = require("path");

let handler = async (m, { sock, isOwner, text }) => {
	if (!isOwner) return
	if (!text) return m.reply("⚠️ Masukkan nama file plugin!");
	if (!text.endsWith(".js")) return m.reply("⚠️ Nama file harus berformat *.js*!");
	let filePath = path.join(__dirname, "../plugins", text.toLowerCase());
	if (!fs.existsSync(filePath)) return m.reply("❌ File plugin tidak ditemukan!");
	try {
		let fileContent = await fs.promises.readFile(filePath, "utf-8");
		return m.reply(`📜 *Isi Plugin ${text}:*\n\n\`\`\`${fileContent}\`\`\``);
	} catch (err) {
		return m.reply(`❌ Gagal membaca file: ${err.message}`);
	}
};

handler.help = ["getplugin"].map(cmd => `${cmd} *<nama file>*`);
handler.tags = ["tools"];
handler.command = ["getplugin", "getplugin"];

module.exports = handler;
