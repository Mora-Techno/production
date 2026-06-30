export function getJwtSecret() {
  if (!process.env.JWT_SECRET) {
    throw new Error('JWT_SECRET not set');
  }
  return process.env.JWT_SECRET;
}
