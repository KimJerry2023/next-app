// 导出所有语言翻译资源
export { zh } from './zh';
export { en } from './en';
export { ja } from './ja';

// 合并所有翻译资源
import { zh } from './zh';
import { en } from './en';
import { ja } from './ja';

export const resources = {
  zh,
  en,
  ja
};
