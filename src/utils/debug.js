/**
 * This function allows display console message depends on DEBUG MODE (REACT_APP_DEBUG)
 * @param {callback function} console
 * @Usage. debug( () => console.log(message));
 */
export default function debug(callback) {
  if (
    process.env.REACT_APP_DEBUG === "True"
    ||
    process.env.REACT_APP_DEBUG === "true"
  ){
    callback();
  }
}
