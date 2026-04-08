import fs from 'node:fs/promises';
import path from 'node:path';
import { execFileSync } from 'node:child_process';
import { fileURLToPath, pathToFileURL } from 'node:url';

const repoRoot = fileURLToPath(new URL('..', import.meta.url));
const distIndex = path.join(repoRoot, 'dist', 'index.js');
const distTypes = path.join(repoRoot, 'dist', 'index.d.ts');
const packDir = path.join(repoRoot, '.tmp-pack');

const assertFileExists = async (filePath) => {
  await fs.access(filePath);
};

await assertFileExists(distIndex);
await assertFileExists(distTypes);

const sdkModule = await import(pathToFileURL(distIndex).href);
for (const exportName of ['Permission', 'validatePluginManifest', 'createPermissionChecker']) {
  if (!(exportName in sdkModule)) {
    throw new Error(`Missing expected dist export: ${exportName}`);
  }
}

await fs.rm(packDir, { recursive: true, force: true });
await fs.mkdir(packDir, { recursive: true });

execFileSync('pnpm', ['pack', '--pack-destination', packDir], {
  cwd: repoRoot,
  stdio: 'pipe',
});

const packedFiles = await fs.readdir(packDir);
const tarball = packedFiles.find((entry) => entry.endsWith('.tgz'));
if (!tarball) {
  throw new Error('pnpm pack did not produce a tarball');
}

const tarballEntries = execFileSync('tar', ['-tf', path.join(packDir, tarball)], {
  cwd: repoRoot,
  encoding: 'utf8',
}).split('\n');

for (const expectedEntry of [
  'package/dist/index.js',
  'package/dist/index.d.ts',
  'package/README.md',
  'package/LICENSE',
  'package/package.json',
]) {
  if (!tarballEntries.includes(expectedEntry)) {
    throw new Error(`Packed tarball is missing ${expectedEntry}`);
  }
}

await fs.rm(packDir, { recursive: true, force: true });

console.log('Package verification passed.');
