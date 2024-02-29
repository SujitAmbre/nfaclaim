export const resetLocalStorage = () => {
    localStorage.removeItem('_nfa_token');
    localStorage.removeItem('_nfa_role');
    localStorage.removeItem('_nfa_userInfo');
}


export const getTodayDate = () => {
    const today = new Date();
    const month = today.getMonth()+1;
    const year = today.getFullYear();
    const date = today.getDate();
    const currentDate = `${year}-${month}-${date}`;
    return currentDate;
  }
  export const getCurrentDate = () => {
    const today = new Date();
    const month = today.getMonth();
    const year = today.getFullYear();
    const date = today.getDate();
    const todayDate = `${year}-${month}-${date}`;
    return todayDate;
  }