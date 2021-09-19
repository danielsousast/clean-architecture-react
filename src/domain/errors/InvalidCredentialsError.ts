export class InvalidCredentialsError extends Error {
  constructor() {
    super("Crendenciais inválidas");
    this.name = "InvalidCredentialsError";
  }
}
