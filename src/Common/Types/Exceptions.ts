class LiveDataWriteError extends Error {
  constructor(message) {
    super(message);
    this.name = "LiveDataWriteError";
  }
}
