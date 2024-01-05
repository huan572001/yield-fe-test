const routerLinks = (name: string) => {
  const array: any = {
    Home: "/",
    Tokenpage: "/tokenpage",
    Portfolio: "/portfolio",
  }; // 💬 generate link to here
  return array[name];
};
export default routerLinks;
