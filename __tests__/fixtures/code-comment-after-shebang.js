#!/usr/bin/env node // <-- this thing is a shebang. :)

/**
 * Get a shebang to use in node CLIs. Defaults to #!/usr/bin/env node
 * @returns string
 */
function getNodeSheBang() {
	return '#!/usr/bin/env node';
}

export { getNodeSheBang };
