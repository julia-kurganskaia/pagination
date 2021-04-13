//@ts-check

const items = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42];

export function makeApage(pageNumber) {
  let pageInfo = {
    totalItemsNumber: 42,
    itemsPerPage: 10,
    itemsToShow: [],
  };
  const itemsIndex = (pageNumber - 1) * pageInfo.itemsPerPage;
  let arr = [];
  for (let i = itemsIndex; i < items.length; i++) {
    if (arr.length < pageInfo.itemsPerPage) {
      arr.push(items[i]);
    }
  }
  pageInfo.itemsToShow = arr;
  return pageInfo;
};
