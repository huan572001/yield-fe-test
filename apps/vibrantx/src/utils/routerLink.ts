const routerLinks = (name: string) => {
  const array: any = {
    Home: "/",
    Tokenpage: "/strategy",
    Portfolio: "/portfolio",
  }; // 💬 generate link to here
  return array[name];
};
export default routerLinks;
