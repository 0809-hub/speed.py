const fs = require("fs");
const path = require("path");

let handler = async (m, { sock, isOwner, text }) => {
	if (!isOwner) return
	if (!text) return m.reply("⚠️ Masukkan nama file plugin dan reply dengan kode!");
	if (!m.quoted) return m.reply("⚠️ Reply pesan yang berisi kode plugin!");
	if (!text.endsWith(".js")) return m.reply("⚠️ Nama file harus berformat *.js*!");
	let filePath = path.join(__dirname, "../plugins", text.toLowerCase());
	if (fs.existsSync(filePath)) return m.reply("❌ Nama file plugin sudah ada di folder plugins!");
	try {
		await fs.promises.writeFile(filePath, m.quoted.text);
		return m.reply(`✅ Berhasil menambahkan file plugin *${text}*`);
	} catch (err) {
		return m.reply(`❌ Gagal menyimpan file: ${err.message}`);
	}
};

handler.help = ["addplugin"].map(cmd => `${cmd} *<nama file>*`);
handler.tags = ["tools"];
handler.command = ["addplugin", "addplugins"];

module.exports = handler;
