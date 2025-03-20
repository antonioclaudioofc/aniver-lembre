export function validatePasswordsMatch(
  password: string,
  confirmPassword: string
): boolean {
  return password === confirmPassword;
}
