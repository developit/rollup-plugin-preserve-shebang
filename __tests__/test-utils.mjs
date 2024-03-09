import { rollup } from 'rollup';
import path from 'path';
import shebangPlugin from '../index'; // Adjust the import path as necessary
import nodeResolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const fixturesDir = path.join(__dirname, 'fixtures');

async function getGeneratedContent(bundle, format = 'cjs') {
	const { output } = await bundle.generate({ format });
	return output[0].code;
}

async function getRollUpBundle(inputFilePath, shebangPluginOptions = {}) {
	const bundle = await rollup({
		input: inputFilePath,
		plugins: [shebangPlugin(shebangPluginOptions), nodeResolve(), commonjs()]
	});

	return bundle;
}

function getFixtureFilePath(filename) {
	return path.join(fixturesDir, filename);
}

export { getRollUpBundle, getGeneratedContent, getFixtureFilePath };

