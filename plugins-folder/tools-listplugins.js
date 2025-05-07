const fs = require("fs");
const path = require("path");

let handler = async (m, { sock, isOwner, text }) => {
	if (!isOwner) return
	let pluginDir = path.join(__dirname, "../plugins");
	let files = fs.readdirSync(pluginDir);
	if (files.length < 1) return m.reply("📂 Tidak ada file plugin yang tersedia.");
	let listPlugins = files.map(file => `📌 ${file}`).join("\n");
	return m.reply(`🔍 *Daftar Plugin yang Tersedia:*\n\n${listPlugins}`);
};

handler.help = ["listplugin"].map(cmd => `${cmd} *<nama file>*`);
handler.tags = ["tools"];
handler.command = ["listplugin", "listplugin"];

module.exports = handler;
