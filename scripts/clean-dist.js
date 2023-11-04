const fs = require('fs');
const path = require('path');
const rimraf = require('rimraf');

const srcDir = path.join(__dirname, '..', 'src');
const distDir = path.join(__dirname, '..', 'dist');

function getEntities(dir, list = { files: [], dirs: [] }) {
	const entities = fs.readdirSync(dir);

	entities.forEach((entity) => {
		const fullPath = path.join(dir, entity);
		if (fs.statSync(fullPath).isDirectory()) {
			list.dirs.push(fullPath);
			list = getEntities(fullPath, list);
		}
		else {
			list.files.push(fullPath);
		}
	});

	return list;
}

const srcEntities = getEntities(srcDir);
const distEntities = getEntities(distDir);

const srcFiles = srcEntities.files.map((file) =>
	file.replace(srcDir + path.sep, '').replace(/\.ts$/, '.js'),
);
const distFiles = distEntities.files.map((file) =>
	file.replace(distDir + path.sep, ''),
);

const srcDirs = srcEntities.dirs.map((dir) =>
	dir.replace(srcDir + path.sep, ''),
);
const distDirs = distEntities.dirs.map((dir) =>
	dir.replace(distDir + path.sep, ''),
);

const filesToRemove = distFiles.filter((file) => !srcFiles.includes(file));
const dirsToRemove = distDirs.filter((dir) => !srcDirs.includes(dir));

filesToRemove.forEach((file) => {
	fs.unlinkSync(path.join(distDir, file));
});

dirsToRemove.forEach((dir) => {
	rimraf.sync(path.join(distDir, dir));
});
