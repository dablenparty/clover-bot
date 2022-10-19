export default class EmptyQueueError extends Error {
  constructor() {
    super("The queue is empty");
  }
}
