export function copyObject(srcObject) {
  try {
    return JSON.parse(JSON.stringify(srcObject));
  } catch (error) {
    return undefined;
  }
}
