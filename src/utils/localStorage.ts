export const saveToken = (token: string) => {
  localStorage.setItem('user', token);
};

export const getToken = () => {
  return localStorage.getItem('user');
};

export const removeToken = () => {
  localStorage.removeItem('user');
};

export const setExpireModal = (date: string) => {
  return localStorage.setItem('expire', date);
};

export const getExpireModal = () => {
  return localStorage.getItem('expire');
};

export const getFirstReplyUser = () => {
  return localStorage.getItem('firstReply');
};

export const setFirstReplyUser = () => {
  return localStorage.setItem('firstReply', 'false');
};

export const getListViewTooltip = () => {
  return localStorage.getItem('listView');
};

export const setListViewTooltip = () => {
  return localStorage.setItem('listView', 'false');
};
