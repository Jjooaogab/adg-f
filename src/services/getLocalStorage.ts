/**
 * João que ama a nat <3
 *
 * @param   item  É para ser colocado o nome do item no localStorage que você deseja buscar.
 * @returns Um array com todas as informações.
 */
const getLocalStorage = ({ item }: { item: string }) => {
  const storedItem = localStorage.getItem(item);
  if (storedItem !== null) {
    const storedInfos = JSON.parse(storedItem);
    console.log(storedInfos);
    return storedInfos;
  }
}

export { getLocalStorage }