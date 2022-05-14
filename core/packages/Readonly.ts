export default (...[,,descriptor]: Target) => {
  descriptor.writable = false;
  return descriptor;
}