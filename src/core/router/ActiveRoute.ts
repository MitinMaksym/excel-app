export class ActiveRoute {
  static get path() {
    return window.location.hash.slice(1);
  }

  static get param() {
    return window.location.hash.split("/")[1];
  }
  static navigate(hash: string) {
    return (window.location.hash = hash);
  }
}
