import * as utils from '../utils';

export default async (url, parentClassDescription) => {
  const fetch1 = await utils.ftch(url, 'get', 'cors');
  await fetch1;
  const classesPair = {};
  classesPair[parentClassDescription] = fetch1;
  return classesPair;
};
