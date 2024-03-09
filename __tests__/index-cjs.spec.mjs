import { getRollUpBundle, getFixtureFilePath, getGeneratedContent } from './test-utils.mjs';

describe('shebangPlugin: cjs', () => {
	const format = 'cjs';
	const nodeShebang = '#!/usr/bin/env node';

	it('preseves existing shebang after successful rollup bundle', async () => {
		const inputFilePath = getFixtureFilePath('hello-world-cli.js');

		const bundle = await getRollUpBundle(inputFilePath);
		const generatedCode = await getGeneratedContent(bundle, format);

		expect(generatedCode.startsWith(nodeShebang)).toBe(true);
		expect(generatedCode).toMatchSnapshot();
	});

	it('replaces an existing shebang with a custom shebang', async () => {
		const inputFilePath = getFixtureFilePath('hello-world-cli.js');
		const customShebang = '#!/path/to/custom/interpreter';
		const bundle = await getRollUpBundle(inputFilePath, {
			shebang: customShebang
		});
		const generatedCode = await getGeneratedContent(bundle, format);

		expect(generatedCode.split('\n')[0]).toEqual(customShebang);
		expect(generatedCode.includes(nodeShebang)).toBe(false);
		expect(generatedCode).toMatchSnapshot();
	});

	it('returns unmodified files when no shebang is found', async () => {
		const inputFilePath = getFixtureFilePath('no-shebang.js');
		const bundle = await getRollUpBundle(inputFilePath);
		const generatedCode = await getGeneratedContent(bundle, format);

		expect(generatedCode).toMatchSnapshot();
	});

	it('should retain shebangs defined elsewhere in a file', async () => {
		const inputFilePath = getFixtureFilePath('code-comment-shebang.js');
		const bundle = await getRollUpBundle(inputFilePath);
		const generatedCode = await getGeneratedContent(bundle, format);

		const shebangInstances = generatedCode.split('\n').filter(line => line.includes(nodeShebang));

		expect(shebangInstances.length).toBe(2);
		expect(generatedCode).toMatchSnapshot();
	});

	it('should retain shebangs defined after some whitespace (and remove the leading whitespace)', async () => {
		const inputFilePath = getFixtureFilePath('empty-lines-before-shebang.js');
		const bundle = await getRollUpBundle(inputFilePath);
		const generatedCode = await getGeneratedContent(bundle, format);

		const shebangInstances = generatedCode.split('\n').filter(line => line.includes(nodeShebang));

		expect(generatedCode.split('\n')[0]).toEqual(nodeShebang);
		expect(shebangInstances.length).toBe(3);
		expect(generatedCode).toMatchSnapshot();
	});

	it('should retain comments defined after a shebang', async () => {
		const inputFilePath = getFixtureFilePath('code-comment-after-shebang.js');
		const bundle = await getRollUpBundle(inputFilePath);
		const generatedCode = await getGeneratedContent(bundle, format);

		expect(generatedCode.split('\n')[0]).toEqual('#!/usr/bin/env node // <-- this thing is a shebang. :)');
		expect(generatedCode).toMatchSnapshot();
	});
	
	it('should preserve shebang in files without an EOF character ', async () => {
		const inputFilePath = getFixtureFilePath('cli-without-eof.js');
		const bundle = await getRollUpBundle(inputFilePath);
		const generatedCode = await getGeneratedContent(bundle, format);

		expect(generatedCode.split('\n')[0]).toEqual(nodeShebang);
		expect(generatedCode).toMatchSnapshot();
	});
});

