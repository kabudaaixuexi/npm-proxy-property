module.exports = (...[,,descriptor]: Target) => {
  descriptor.writable = false;
  return descriptor;
}