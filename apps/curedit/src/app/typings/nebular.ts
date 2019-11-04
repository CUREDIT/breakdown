export class DataGridTree<T> {
  data: T;
  children?: DataGridTree<T>[] = [];
  expanded = false;
}
