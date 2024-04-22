export default function getEnv(name: string): string {
  const envVar = process.env[name];

  if (typeof envVar === 'undefined') {
    throw new Error(`Variable ${name} undefined.`);
  }

  return envVar;
}
