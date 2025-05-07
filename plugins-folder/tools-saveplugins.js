const fs = require("fs");

let handler = async (m, { sock, isOwner, text }) => {
	if (!isOwner) return
	if (!text) return m.reply("Masukkan nama file & reply dengan kode yang ingin disimpan!");
	if (!m.quoted) return m.reply("Reply pesan yang berisi kode!");
	if (!text.endsWith(".js")) return m.reply("Nama file harus berformat .js!");
	let filePath = `./plugins/${text.toLowerCase()}`;
	if (!fs.existsSync(filePath)) return m.reply("File plugin tidak ditemukan!");
	try {
		await fs.promises.writeFile(filePath, m.quoted.text);
		return m.reply(`✅ Berhasil mengedit file plugin *${text}*`);
	} catch (err) {
		return m.reply(`❌ Gagal menyimpan file: ${err.message}`);
	}
};

handler.help = ["saveplugin"].map(cmd => `${cmd} *<nama file> <kode>*`);
handler.tags = ["tools"];
handler.command = ["saveplugin", "saveplugin"];

module.exports = handler;
