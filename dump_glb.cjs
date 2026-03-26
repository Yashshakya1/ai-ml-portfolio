const fs = require('fs');
const crypto = require('crypto');

function generateAESKey(password) {
  const passwordBuffer = Buffer.from(password);
  const hashedPassword = crypto.createHash("sha256").update(passwordBuffer).digest();
  return crypto.createSecretKey(hashedPassword.slice(0, 32));
}

function decryptFile(filePath, password) {
  const encryptedData = fs.readFileSync(filePath);
  const iv = encryptedData.slice(0, 16);
  const data = encryptedData.slice(16);
  
  const passwordBuffer = Buffer.from(password);
  const key = crypto.createHash("sha256").update(passwordBuffer).digest().slice(0, 32);
  
  const decipher = crypto.createDecipheriv('aes-256-cbc', key, iv);
  const decrypted = Buffer.concat([decipher.update(data), decipher.final()]);
  return decrypted;
}

try {
  const decrypted = decryptFile('/Users/yashshakya787/3d portfolio website/Portfolio-Website/public/models/character.enc', 'Character3D#@');
  
  // GLB structure: 
  // 4 bytes: magic 'glTF'
  // 4 bytes: version 2
  // 4 bytes: length
  // 4 bytes: chunk 0 length
  // 4 bytes: chunk 0 type 'JSON'
  // Then the JSON string!
  
  const chunk0Length = decrypted.readUInt32LE(12);
  const chunk0Type = decrypted.toString('utf-8', 16, 20);
  
  if (chunk0Type === 'JSON') {
    const jsonStr = decrypted.toString('utf-8', 20, 20 + chunk0Length);
    const gltf = JSON.parse(jsonStr);
    
    console.log("----- NODES -----");
    if (gltf.nodes) gltf.nodes.forEach((n, i) => console.log(`Node ${i}: ${n.name}`));
    
    console.log("\n----- MESHES -----");
    if (gltf.meshes) gltf.meshes.forEach((m, i) => console.log(`Mesh ${i}: ${m.name}`));
    
    console.log("\n----- MATERIALS -----");
    if (gltf.materials) gltf.materials.forEach((m, i) => console.log(`Material ${i}: ${m.name}`));
  } else {
    console.log("No JSON chunk found");
  }
} catch (e) {
  console.error(e);
}
