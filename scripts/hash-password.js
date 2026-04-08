const bcrypt = require("bcryptjs");

const pwd = process.argv[2];
if (!pwd) {
  console.error("Usage: node scripts/hash-password.js <plain-password>");
  process.exit(1);
}

bcrypt.hash(pwd, 10).then((hash) => {
  const forNextEnv = hash.replaceAll("$", "\\$");
  console.log("Add to ADMIN_PASSWORD_HASH in .env.local (backslashes required — Next.js treats $ as variable expansion):\n");
  console.log(forNextEnv);
  console.log("\nRaw bcrypt (do not paste unescaped into .env.local):\n" + hash);
});
