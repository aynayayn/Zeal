import {request} from './request';

export function getCategories() {
  return request({
    url: '/category',
  });
}

export function getSubcategories(maitKey) {
  return request({
    url: '/subcategory',
    params: {
      maitKey,
    },
  });
}

export function getCategoryDetail(miniWallkey, type) {
  return request({
    url: '/subcategory/detail',
    params: {
      miniWallkey,
      type,
    }
  });
}
